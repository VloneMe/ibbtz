import ibbLogo from "../../assets/logo/IBB+ NEW LOGO-1.png";

interface LogoProps {
  className?: string;
  imgClasses?: string;
  showLabel?: boolean;
  labelText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo = ({ 
  className = "", 
  imgClasses = "", 
  showLabel = false, 
  labelText = "IBB+",
  size = 'md'
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 p-2 px-5 ${className}`}>
      <img 
        src={ibbLogo}
        alt="IBB+ Logo - Ideals Beyond Ideas"
        className={`object-contain ${sizeClasses[size]} ${imgClasses}`}
      />
      {showLabel && (
        <span className={`font-extrabold tracking-widest text-white ${textSizeClasses[size]}`}>
          {labelText}
        </span>
      )}
    </div>
  );
};