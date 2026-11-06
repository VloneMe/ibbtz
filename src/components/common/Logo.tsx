import ibbLogo from "../../assets/logo/IBB+ NEW LOGO-1.png";

interface LogoProps {
  className?: string;
  imgClasses?: string;
  showLabel?: boolean;
  labelText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = { sm: 'h-8', md: 'h-10', lg: 'h-14', xl: 'h-20' };

export const Logo = ({ className = '', imgClasses = '', showLabel = false, labelText = 'IBB+', size = 'md' }: LogoProps) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <img src={ibbLogo} alt="IBB+ Impact Business Breakfast" className={`w-auto object-contain ${sizeClasses[size]} ${imgClasses}`} />
    {showLabel && <span className="font-display text-xl font-semibold text-navy">{labelText}</span>}
  </span>
);
