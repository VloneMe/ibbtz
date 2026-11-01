import { socialLinks, type SocialLink } from '../../data/socialLinks';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

interface Props {
  className?: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Facebook':
      return <Facebook className="h-5 w-5" />;
    case 'Twitter':
      return <Twitter className="h-5 w-5" />;
    case 'Linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'Instagram':
      return <Instagram className="h-5 w-5" />;
    case 'Youtube':
      return <Youtube className="h-5 w-5" />;
    default:
      return null;
  }
};

export const SocialLinks = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      {socialLinks.map((link: SocialLink, idx: number) => (
        <Link
          key={idx}
          to={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-white ${link.color}`}
        >
          {getIcon(link.iconName)}
        </Link>
      ))}
    </div>
  );
};