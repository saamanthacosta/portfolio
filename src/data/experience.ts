export interface ExperienceRecord {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  description: string | null
  tech: string[]
  isCurrent: boolean
}

export interface Skills {
  frontend: string[]
  backend: string[]
  cloud: string[]
  database: string[]
}

export interface Contact {
  email: string
  linkedin: string
  github: string
}

export const experience: ExperienceRecord[] = [
  {
    id: 'dosable',
    company: 'Dosable',
    role: 'Frontend Engineer',
    startDate: '2025-02',
    endDate: null,
    description: null,
    tech: [],
    isCurrent: true,
  },
  {
    id: 'objectEdge',
    company: 'Object Edge',
    role: 'Software Engineer',
    startDate: '2022-09',
    endDate: '2025-01',
    description:
      'Developed and maintained e-commerce solutions with a mobile-first approach. Implemented server-side rendering for improved performance and SEO. Conducted A/B testing to optimize conversion rates and user experience. Collaborated with cross-functional teams using Agile methodologies.',
    tech: ['Vue.js', 'TypeScript', 'Tailwind', 'AWS', 'CommerceTools'],
    isCurrent: false,
  },
  {
    id: 'personetics',
    company: 'Personetics',
    role: 'Frontend Software Engineer',
    startDate: '2021-08',
    endDate: '2022-08',
    description:
      'Built and maintained an accessible, internationalized component library used across multiple banking products. Ensured WCAG compliance and optimized bundle sizes. Worked closely with designers to implement pixel-perfect UI components in Storybook.',
    tech: ['React', 'Redux', 'Styled Components', 'Storybook'],
    isCurrent: false,
  },
  {
    id: 'primeupTrainee',
    company: 'PrimeUp',
    role: 'Trainee',
    startDate: '2020-11',
    endDate: '2021-08',
    description:
      'Developed microservices using C# and .NET Core with REST/SOAP APIs. Implemented domain-driven design patterns and worked with large SQL databases. Set up CI/CD pipelines with Jenkins for automated deployments to Azure cloud.',
    tech: ['C#', '.NET Core', 'SQL Server', 'Azure', 'Jenkins'],
    isCurrent: false,
  },
  {
    id: 'primeupIntern',
    company: 'PrimeUp',
    role: 'Intern',
    startDate: '2019-04',
    endDate: '2020-11',
    description:
      'Developed dynamic web applications using React and Angular frameworks. Integrated real-time features with Socket.IO for live updates. Contributed to automating component library generation and improved code quality with SonarQube analysis.',
    tech: ['React', 'Angular', 'TypeScript', 'SonarQube'],
    isCurrent: false,
  },
]

export const skills: Skills = {
  frontend: [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'React.js',
    'Web Accessibility',
    'Vuex/Pinia',
    'Tailwind',
    'Styled Components',
  ],
  backend: ['Node.js', 'Express', 'C#', 'PHP'],
  cloud: ['AWS', 'Azure'],
  database: ['MySQL', 'SQL Server'],
}

export const contact: Contact = {
  email: 'samantha_apcosta@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/saamanthacosta/',
  github: 'https://github.com/saamanthacosta',
}
