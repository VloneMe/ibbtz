import ibb14 from "/src/assets/ibb1.jpg";
import ibb2 from "/src/assets/ibb2.jpg";
import ibb3 from "/src/assets/ibb3.jpg";
import ibb4 from "/src/assets/ibb4.jpg";

export interface NextEventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  image: string;
  category: string;
  registrationLink?: string;
  isUpcoming: boolean;
  theme?: string;
  edition?: string;
  // Extended fields for detailed page
  fullDescription?: string;
  agenda?: EventAgendaItem[];
  speakers?: EventSpeaker[];
  venue?: EventVenue;
  pricing?: EventPricing;
  requirements?: string[];
  benefits?: string[];
  contactInfo?: EventContact;
  socialMedia?: EventSocialMedia;
  tags?: string[];
  maxAttendees?: number;
  currentAttendees?: number;
  registrationDeadline?: string;
  cancellationPolicy?: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  duration: string;
}

export interface EventSpeaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  image?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface EventVenue {
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  amenities: string[];
  parkingInfo?: string;
  publicTransport?: string[];
}

export interface EventPricing {
  isFree: boolean;
  currency: string;
  earlyBird?: {
    price: number;
    deadline: string;
  };
  regular: {
    price: number;
  };
  groupDiscount?: {
    minAttendees: number;
    discountPercent: number;
  };
}

export interface EventContact {
  email: string;
  phone: string;
  website: string;
  organizer: string;
}

export interface EventSocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

// IBB 14th Edition - The Impact Business Breakfast
export const nextEvent: NextEventData = {
  id: "ibb-14th-edition",
  title: "The Impact Business Breakfast",
  description: "Join us for the 14th Edition of The Impact Business Breakfast, where we'll explore how to catalyze Tanzania's human capital and ignite a knowledge-driven economy to fulfill the promise of Vision 2050.",
  fullDescription: "The Impact Business Breakfast (IBB) is a premier networking and knowledge-sharing platform that brings together industry leaders, entrepreneurs, government officials, and professionals to discuss critical issues affecting Tanzania's economic development. This 14th edition focuses on the crucial topic of human capital development and its role in building a knowledge-driven economy that aligns with Tanzania's Vision 2050.",
  date: "November 28, 2025",
  time: "8:00 AM - 11:00 AM EAT",
  location: "Tanzania",
  speaker: "Industry Leaders & Experts",
  image: ibb14,
  category: "Business Leadership",
  registrationLink: "/",
  isUpcoming: true,
  theme: "Catalyzing Tanzania's Human Capital: What will it Take to Ignite a Knowledge Driven Economy and Fulfill The Promise of Vision 2050",
  edition: "14th Edition",
  agenda: [
    {
      time: "08:00 AM",
      title: "Registration & Networking",
      description: "Welcome coffee and networking session",
      duration: "30 minutes"
    },
    {
      time: "08:30 AM",
      title: "Opening Remarks",
      description: "Welcome address and event overview",
      speaker: "Event Organizer",
      duration: "15 minutes"
    },
    {
      time: "08:45 AM",
      title: "Keynote Presentation",
      description: "Main presentation on catalyzing Tanzania's human capital",
      speaker: "Industry Expert",
      duration: "45 minutes"
    },
    {
      time: "09:30 AM",
      title: "Panel Discussion",
      description: "Interactive Q&A session with industry leaders",
      speaker: "Panel of Experts",
      duration: "60 minutes"
    },
    {
      time: "10:30 AM",
      title: "Networking Break",
      description: "Coffee break and networking opportunities",
      duration: "30 minutes"
    },
    {
      time: "11:00 AM",
      title: "Closing Remarks",
      description: "Summary and next steps",
      duration: "15 minutes"
    }
  ],
  speakers: [
    {
      name: "Dr. Jane Mwalimu",
      title: "Director of Human Capital Development",
      company: "Ministry of Education, Science and Technology",
      bio: "Dr. Mwalimu has over 15 years of experience in education policy and human capital development. She has led numerous initiatives to improve Tanzania's education system and workforce development programs.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/jane-mwalimu",
        twitter: "https://twitter.com/jane_mwalimu"
      }
    },
    {
      name: "Mr. Peter Kimaro",
      title: "CEO",
      company: "Tanzania Private Sector Foundation",
      bio: "Mr. Kimaro is a seasoned business leader with extensive experience in private sector development and economic policy. He has been instrumental in shaping Tanzania's business environment.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/peter-kimaro"
      }
    }
  ],
  venue: {
    name: "Tanzania Investment Center",
    address: "Plot No. 1, Block 1, Kivukoni Front",
    city: "Dar es Salaam",
    country: "Tanzania",
    capacity: 200,
    amenities: ["WiFi", "Air Conditioning", "Projector", "Sound System", "Catering Services"],
    parkingInfo: "Free parking available on-site",
    publicTransport: ["DART Bus", "Dala Dala", "Taxi Services"]
  },
  pricing: {
    isFree: true,
    currency: "TZS",
    earlyBird: {
      price: 0,
      deadline: "November 10, 2025"
    },
    regular: {
      price: 0
    }
  },
  requirements: [
    "Business professional or entrepreneur",
    "Interest in human capital development",
    "Valid email address for registration"
  ],
  benefits: [
    "Networking with industry leaders",
    "Insights on Tanzania's Vision 2050",
    "Knowledge sharing on human capital development",
    "Breakfast and refreshments",
    "Certificate of attendance",
    "Access to event materials"
  ],
  contactInfo: {
    email: "events@impactadvisory.co.tz",
    phone: "+255 123 456 789",
    website: "www.impactadvisory.co.tz",
    organizer: "Impact Advisory Africa"
  },
  socialMedia: {
    facebook: "https://facebook.com/impactadvisory",
    twitter: "https://twitter.com/impactadvisory",
    linkedin: "https://linkedin.com/company/impactadvisory"
  },
  tags: ["Human Capital", "Vision 2050", "Business Leadership", "Networking", "Knowledge Economy"],
  maxAttendees: 200,
  currentAttendees: 45,
  registrationDeadline: "November 18, 2025",
  cancellationPolicy: "Free cancellation up to 24 hours before the event"
};

// Alternative sample events for variety
export const sampleEvents: NextEventData[] = [
  {
    id: "sustainability-workshop",
    title: "Sustainable Business Practices Workshop",
    description: "Learn how to integrate sustainability into your business model for long-term success and environmental impact.",
    date: "April 20, 2025",
    time: "9:00 AM - 4:00 PM EAT",
    location: "Impact Advisory Offices, Dar es Salaam",
    speaker: "Prof. James Mwalimu",
    image: ibb2,
    category: "Sustainability",
    registrationLink: "/events/register",
    isUpcoming: true
  },
  {
    id: "youth-empowerment",
    title: "Youth Empowerment and Entrepreneurship Summit",
    description: "Empowering the next generation of leaders and entrepreneurs with practical skills and mentorship opportunities.",
    date: "May 10, 2025",
    time: "8:00 AM - 6:00 PM EAT",
    location: "University of Dar es Salaam",
    speaker: "Ms. Grace Mwamba & Startup Panel",
    image: ibb3,
    category: "Youth Development",
    registrationLink: "/events/register",
    isUpcoming: true
  },
  {
    id: "tech-innovation",
    title: "Technology Innovation Conference",
    description: "Exploring the latest technological innovations and their impact on business transformation in Tanzania.",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM EAT",
    location: "Dar es Salaam Tech Hub",
    speaker: "Dr. Sarah Kimaro & Tech Leaders",
    image: ibb4,
    category: "Technology",
    registrationLink: "/events/register",
    isUpcoming: true
  }
];