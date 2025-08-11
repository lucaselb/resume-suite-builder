import type { ResumeData } from '../types/resume';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA, USA',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  },
  summary: 'Experienced Full-Stack Developer with 5+ years of expertise in building scalable web applications using modern technologies. Passionate about creating clean, efficient code and delivering exceptional user experiences. Proven track record of leading development teams and successfully launching multiple high-impact projects.',
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Full-Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Led development of microservices architecture serving 1M+ users\n• Implemented automated testing pipeline reducing deployment time by 60%\n• Mentored junior developers and conducted code reviews\n• Built responsive web applications using React, Node.js, and PostgreSQL'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: '• Developed customer-facing web applications with React and TypeScript\n• Collaborated with UX/UI designers to implement pixel-perfect designs\n• Optimized application performance resulting in 40% faster load times\n• Integrated third-party APIs and payment gateways'
    },
    {
      id: '3',
      company: 'WebSolutions',
      position: 'Junior Developer',
      location: 'New York, NY',
      startDate: '2019-06',
      endDate: '2020-02',
      current: false,
      description: '• Built and maintained WordPress websites for small businesses\n• Implemented responsive designs and cross-browser compatibility\n• Learned modern web development practices and version control\n• Provided technical support and bug fixes'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '8.0',
      description: '• Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems\n• Dean\'s List (Fall 2017, Spring 2018)\n• Senior Project: E-commerce Platform with Machine Learning Recommendations'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming Languages' },
    { id: '2', name: 'TypeScript', level: 'Advanced', category: 'Programming Languages' },
    { id: '3', name: 'Python', level: 'Advanced', category: 'Programming Languages' },
    { id: '4', name: 'Java', level: 'Intermediate', category: 'Programming Languages' },
    { id: '5', name: 'React', level: 'Expert', category: 'Frontend Frameworks' },
    { id: '6', name: 'Vue.js', level: 'Advanced', category: 'Frontend Frameworks' },
    { id: '7', name: 'Angular', level: 'Intermediate', category: 'Frontend Frameworks' },
    { id: '8', name: 'Node.js', level: 'Expert', category: 'Backend Technologies' },
    { id: '9', name: 'Express.js', level: 'Advanced', category: 'Backend Technologies' },
    { id: '10', name: 'PostgreSQL', level: 'Advanced', category: 'Databases' },
    { id: '11', name: 'MongoDB', level: 'Intermediate', category: 'Databases' },
    { id: '12', name: 'AWS', level: 'Advanced', category: 'Cloud & DevOps' },
    { id: '13', name: 'Docker', level: 'Intermediate', category: 'Cloud & DevOps' },
    { id: '14', name: 'Git', level: 'Expert', category: 'Tools' },
    { id: '15', name: 'Figma', level: 'Intermediate', category: 'Design Tools' }
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Analytics Dashboard',
      description: 'Built a comprehensive analytics dashboard for e-commerce businesses featuring real-time sales tracking, customer insights, and inventory management. Implemented data visualization with Chart.js and integrated multiple payment gateways.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Stripe API'],
      url: 'https://analytics-demo.johndoe.dev',
      github: 'https://github.com/johndoe/ecommerce-analytics',
      startDate: '2023-01',
      endDate: '2023-04'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Developed a collaborative task management application with real-time updates, team collaboration features, and advanced filtering options. Implemented drag-and-drop functionality and offline capabilities.',
      technologies: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'],
      url: 'https://taskmanager.johndoe.dev',
      github: 'https://github.com/johndoe/task-manager',
      startDate: '2022-08',
      endDate: '2022-11'
    },
    {
      id: '3',
      name: 'Weather Forecast API',
      description: 'Created a RESTful API service that aggregates weather data from multiple sources and provides accurate forecasts with machine learning predictions. Includes rate limiting, caching, and comprehensive documentation.',
      technologies: ['Python', 'FastAPI', 'Redis', 'Docker', 'ML Models'],
      url: '',
      github: 'https://github.com/johndoe/weather-api',
      startDate: '2022-03',
      endDate: '2022-06'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-CSA-2023-001234',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: '2',
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022-11',
      expiryDate: '2024-11',
      credentialId: 'GCP-PD-2022-567890',
      url: 'https://cloud.google.com/certification'
    },
    {
      id: '3',
      name: 'Certified Kubernetes Application Developer',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022-05',
      expiryDate: '2025-05',
      credentialId: 'CKAD-2022-789012',
      url: 'https://training.linuxfoundation.org/certification'
    }
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Fluent' },
    { id: '3', name: 'French', proficiency: 'Conversational' },
    { id: '4', name: 'Japanese', proficiency: 'Basic' }
  ]
};
