// Career, business and leadership interest questions on the gala registration form.
// Keep in sync with server/questions.js (the API validates against the same list).
export interface GalaQuestion {
  id: string;
  number: number;
  title: string;
  type: 'single' | 'multi';
  max: number;
  hint: string;
  options: string[];
  allowOther?: boolean;
}

export const OTHER = 'Other';

export const GALA_QUESTIONS: GalaQuestion[] = [
  {
    id: 'motivation', number: 2, type: 'multi', max: 2, hint: 'Select up to two',
    title: 'What is your primary motivation for attending IBA 2026?',
    options: [
      'Career Advancement and Professional Growth',
      'Business Growth and Sustainability',
      'Leadership Development',
      'Professional Networking and Collaboration',
      'Learning from Successful Business Leaders',
      'Business Succession and Legacy Building',
    ],
  },
  {
    id: 'masterclass', number: 3, type: 'multi', max: 3, hint: 'Select up to three',
    title: 'Which masterclass topics would you be most interested in exploring through IBA and IBB+ 2027?',
    options: [
      'Career Growth and Professional Excellence',
      'Entrepreneurship and Business Scaling',
      'Leadership and Executive Development',
      'Personal Branding and Professional Influence',
      'Business Succession and Sustainability',
      'Financial Management and Business Strategy',
    ],
  },
  {
    id: 'challenge', number: 4, type: 'single', max: 1, hint: 'Select one', allowOther: true,
    title: 'What is your greatest challenge in advancing your career or growing your business?',
    options: [
      'Limited Career Advancement Opportunities',
      'Business Growth and Sustainability',
      'Leadership and Management Challenges',
      'Access to Professional Guidance',
      'Building Strategic Professional Networks',
      'Business Succession and Continuity',
    ],
  },
  {
    id: 'community', number: 5, type: 'single', max: 1, hint: 'Select one',
    title: 'Would you be interested in joining the IBB+ Community in 2027 to stay connected with opportunities for professional growth, business collaboration, and continuous learning?',
    options: [
      'Yes, I would like to receive membership information',
      'Maybe, I would like to learn more',
      'Not at the moment',
    ],
  },
  {
    id: 'competencies', number: 6, type: 'multi', max: 2, hint: 'Select up to two',
    title: 'Which leadership competencies are you most interested in strengthening?',
    options: [
      'Strategic Thinking and Decision-Making',
      'Effective Communication and Influence',
      'People Management and Team Development',
      'Leading Change and Innovation',
      'Ethical Leadership and Accountability',
      'Executive Presence and Personal Leadership',
      'Succession Planning and Developing Future Leaders',
    ],
  },
  {
    id: 'aspiration', number: 7, type: 'single', max: 1, hint: 'Select one',
    title: 'What is your greatest aspiration in your leadership journey?',
    options: [
      'Advancing into Senior Leadership or Executive Roles',
      'Becoming a More Effective and Influential Leader',
      'Building and Leading a Sustainable Business',
      'Developing and Mentoring the Next Generation of Leaders',
      'Leading Organizational Transformation and Innovation',
      'Creating a Lasting Professional or Business Legacy',
    ],
  },
  {
    id: 'mentorship', number: 8, type: 'single', max: 1, hint: 'Select one',
    title: 'How would you like to engage with expert-led mentorship through IBA and IBB+ masterclasses?',
    options: [
      'Attend masterclasses to learn from experienced leaders',
      'Participate in interactive discussions and practical learning sessions',
      'Share my expertise as a masterclass facilitator',
      'Interested in both learning and contributing',
      'Not at the moment',
    ],
  },
  {
    id: 'development', number: 9, type: 'single', max: 1, hint: 'Select one',
    title: 'Which area of long-term career or business development interests you most?',
    options: [
      'Progressing into Senior Leadership',
      'Preparing for Executive Responsibilities',
      'Building and Sustaining a Successful Business',
      'Transitioning from Employment to Entrepreneurship',
      'Business Succession and Continuity',
      'Developing Future Leaders',
      'Building a Meaningful Professional Legacy',
    ],
  },
];

export type InterestAnswers = Record<string, string[]>;

/** Parse the JSON blob stored by the API into { answers, other }. */
export function parseInterests(raw: string | null | undefined): { answers: InterestAnswers; other: string } {
  if (!raw) return { answers: {}, other: '' };
  try {
    const obj = JSON.parse(raw) as Record<string, unknown>;
    const answers: InterestAnswers = {};
    for (const q of GALA_QUESTIONS) {
      const v = obj[q.id];
      if (Array.isArray(v)) answers[q.id] = v.filter((x): x is string => typeof x === 'string');
    }
    return { answers, other: typeof obj.challengeOther === 'string' ? obj.challengeOther : '' };
  } catch {
    return { answers: {}, other: '' };
  }
}
