export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/impactadvisory',
    iconName: 'Facebook',
    color: 'text-blue-500 hover:text-blue-400'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/impactadvisory',
    iconName: 'Twitter',
    color: 'text-blue-400 hover:text-blue-300'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/impactadvisory',
    iconName: 'Linkedin',
    color: 'text-blue-600 hover:text-blue-500'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/impactadvisory',
    iconName: 'Instagram',
    color: 'text-pink-500 hover:text-pink-400'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@impactadvisory',
    iconName: 'Youtube',
    color: 'text-red-500 hover:text-red-400'
  }
];
