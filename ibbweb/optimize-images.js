#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes all images in src/assets/ folder
 * Requires: sharp package (npm install --save-dev sharp)
 * 
 * Usage: node optimize-images.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('❌ Sharp is not installed!');
  console.log('📦 Installing sharp...\n');
  require('child_process').execSync('npm install --save-dev sharp', { stdio: 'inherit' });
  sharp = require('sharp');
}

const assetsDir = path.join(__dirname, 'src/assets');
const backupDir = path.join(__dirname, 'src/assets/originals');

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('📁 Created backup directory:', backupDir);
}

// Get all image files
const imageFiles = fs.readdirSync(assetsDir)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('opt_'));

console.log(`\n🖼️  Found ${imageFiles.length} images to optimize\n`);

const optimizeImage = async (filename) => {
  const input = path.join(assetsDir, filename);
  const backup = path.join(backupDir, filename);
  const temp = path.join(assetsDir, `opt_${filename}`);
  
  // Get original size
  const originalStats = fs.statSync(input);
  const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
  
  try {
    // Backup original
    fs.copyFileSync(input, backup);
    
    // Determine output format
    const ext = path.extname(filename).toLowerCase();
    let sharpInstance = sharp(input)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      });
    
    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({
        quality: 85,
        compressionLevel: 9
      });
    }
    
    // Optimize and save
    await sharpInstance.toFile(temp);
    
    // Get optimized size
    const optimizedStats = fs.statSync(temp);
    const optimizedSize = (optimizedStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    // Replace original with optimized
    fs.unlinkSync(input);
    fs.renameSync(temp, input);
    
    console.log(`✅ ${filename}`);
    console.log(`   ${originalSize} MB → ${optimizedSize} MB (${reduction}% reduction)\n`);
    
    return {
      filename,
      originalSize: originalStats.size,
      optimizedSize: optimizedStats.size,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`❌ Failed to optimize ${filename}:`, error.message);
    // Restore from backup if optimization failed
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, input);
    }
    return null;
  }
};

// Optimize all images
(async () => {
  const results = [];
  
  for (const file of imageFiles) {
    const result = await optimizeImage(file);
    if (result) results.push(result);
  }
  
  // Summary
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Optimized: ${results.length} images`);
  console.log(`📦 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🎉 New size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Space saved: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📉 Total reduction: ${totalReduction}%`);
  console.log('\n💡 Original images backed up to: src/assets/originals/');
  console.log('='.repeat(50) + '\n');
})();

