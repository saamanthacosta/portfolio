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
    company: 'experience.items.dosable.company',
    role: 'experience.items.dosable.role',
    startDate: '2025-02',
    endDate: null,
    description: null,
    tech: [],
    isCurrent: true,
  },
  {
    id: 'objectEdge',
    company: 'experience.items.objectEdge.company',
    role: 'experience.items.objectEdge.role',
    startDate: '2022-09',
    endDate: '2025-01',
    description: 'experience.items.objectEdge.description',
    tech: ['Vue.js', 'TypeScript', 'Tailwind', 'AWS', 'CommerceTools'],
    isCurrent: false,
  },
  {
    id: 'personetics',
    company: 'experience.items.personetics.company',
    role: 'experience.items.personetics.role',
    startDate: '2021-08',
    endDate: '2022-08',
    description: 'experience.items.personetics.description',
    tech: ['React', 'Redux', 'Styled Components', 'Storybook'],
    isCurrent: false,
  },
  {
    id: 'primeupTrainee',
    company: 'experience.items.primeupTrainee.company',
    role: 'experience.items.primeupTrainee.role',
    startDate: '2020-11',
    endDate: '2021-08',
    description: 'experience.items.primeupTrainee.description',
    tech: ['C#', '.NET Core', 'SQL Server', 'Azure', 'Jenkins'],
    isCurrent: false,
  },
  {
    id: 'primeupIntern',
    company: 'experience.items.primeupIntern.company',
    role: 'experience.items.primeupIntern.role',
    startDate: '2019-04',
    endDate: '2020-11',
    description: 'experience.items.primeupIntern.description',
    tech: ['React', 'Angular', 'TypeScript', 'SonarQube'],
    isCurrent: false,
  },
]

export const skills: Skills = {
  frontend: [
    'html-css',
    'javascript',
    'typescript',
    'vue',
    'react',
    'web-accessibility',
    'state-management',
    'tailwind',
    'styled-components',
  ],
  backend: ['node-js', 'express', 'csharp', 'php'],
  cloud: ['aws', 'azure'],
  database: ['mysql', 'sql-server'],
}

export const contact: Contact = {
  email: 'samantha_apcosta@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/saamanthacosta/',
  github: 'https://github.com/saamanthacosta',
}
