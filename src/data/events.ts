import { EventItem } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'quiz',
    name: 'Technical Quiz',
    shortDesc: 'A rapid-fire battle of technical wits and trivia covering computer science fundamentals, emerging tech, and history.',
    longDesc: 'Test your knowledge across a wide range of computer science topics including algorithms, networking, web technologies, cybersecurity, and recent industry trends. Teams of up to 2 can participate. Features an initial screening round followed by an on-stage buzzer finale.',
    dateTime: 'Oct 16, 2026 · 10:30 AM',
    time: '10:30 AM - 12:30 PM',
    venue: 'CS Lab 1 (First Floor)',
    coordinators: ['Prof. A. Krishnan (9876543210)', 'Siddharth M. (Student Joint Sec)'],
    maxParticipants: 2
  },
  {
    id: 'coding',
    name: 'Coding Challenge',
    shortDesc: 'Race against time to solve complex algorithms and real-world optimization problems with maximum efficiency.',
    longDesc: 'Put your problem-solving skills to the ultimate test. Solve dynamic programming, recursion, and string manipulation challenges under constraints of memory and CPU execution time. Supported languages: C++, Java, Python, and JavaScript.',
    dateTime: 'Oct 16, 2026 · 01:30 PM',
    time: '01:30 PM - 03:30 PM',
    venue: 'PG Computer Centre (Second Floor)',
    coordinators: ['Dr. Sarah Kurian (9876543211)', 'Ananya R. (Student Coordinator)'],
    maxParticipants: 1
  },
  {
    id: 'paper',
    name: 'Paper Presentation',
    shortDesc: 'Present innovative research, case studies, or technical papers before a panel of academic and industry judges.',
    longDesc: 'A prestigious forum for aspiring engineers to present original research and development papers. Key focus areas include Artificial Intelligence, Blockchain, Internet of Things, Green Computing, and Advanced Cloud Architectures.',
    dateTime: 'Oct 16, 2026 · 10:30 AM',
    time: '10:30 AM - 12:30 PM',
    venue: 'Department Seminar Hall (Ground Floor)',
    coordinators: ['Dr. R. Ramanujam (9876543212)', 'Vikram K. (Student Coordinator)'],
    maxParticipants: 2
  },
  {
    id: 'expo',
    name: 'Project Expo',
    shortDesc: 'Showcase your working prototypes, software tools, or hardware solutions to peers, professors, and experts.',
    longDesc: 'Bring your engineering projects to life! Display working prototypes, web platforms, mobile apps, or hardware systems. Highlight the societal impact, innovation level, and engineering architecture of your build to win the grand innovation prize.',
    dateTime: 'Oct 16, 2026 · 01:30 PM',
    time: '01:30 PM - 03:30 PM',
    venue: 'Main Block Exhibition Hall (CS Block Wing)',
    coordinators: ['Prof. Latha Venkatesh (9876543213)', 'Rahul Sharma (Student Coordinator)'],
    maxParticipants: 3
  },
  {
    id: 'debugging',
    name: 'Debugging Challenge',
    shortDesc: 'Find, diagnose, and resolve hidden logical, syntax, and memory-leak bugs across multiple codebases.',
    longDesc: 'A high-pressure debugging event where you must identify logical, syntax, and performance issues across a series of broken code snippets. Formats include competitive debugging rounds in C, Python, and JavaScript.',
    dateTime: 'Oct 16, 2026 · 03:30 PM',
    time: '03:30 PM - 04:30 PM',
    venue: 'Internet Lab (First Floor)',
    coordinators: ['Mr. J. Daniel (9876543214)', 'Priyanka S. (Student Coordinator)'],
    maxParticipants: 1
  },
  {
    id: 'poster',
    name: 'Poster Presentation',
    shortDesc: 'Combine creative visual design and technical writing to illustrate complex computer science concepts.',
    longDesc: 'Illustrate complex technological concepts or futuristic solutions on a single poster canvas. Perfect balance of aesthetic design, information layout, and concise technical explanations. Themes: Cyber Security in the 2020s, Sustainable Tech, and Space-Age Computing.',
    dateTime: 'Oct 16, 2026 · 10:30 AM',
    time: '10:30 AM - 12:30 PM',
    venue: 'CS Block Central Foyer',
    coordinators: ['Dr. P. Meena (9876543215)', 'Senthil Kumar (Student Coordinator)'],
    maxParticipants: 2
  }
];
