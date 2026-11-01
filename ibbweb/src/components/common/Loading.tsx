import impactLogo from "/src/assets/logo/logo.png";

export const Loading = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#768f00] border-t-transparent rounded-full animate-spin"></div>
        <img 
          src={impactLogo}
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
