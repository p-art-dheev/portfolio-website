// ============================================================
// Portfolio Configuration
// Edit this file to customize your portfolio content & theme.
// ============================================================

export const config = {
  // ---- Personal Information ----
  personal: {
    name: 'Pardheev Vatturu',
    title: 'Full-Stack Developer & UI/UX Enthusiast',
    tagline: 'Building digital experiences that matter',
    bio: [
      "I'm a B.Tech AI Engineering student interested in web development and generative AI, and I like learning new tools while working on practical projects that help me improve step by step through hands-on experience.",
      "I also enjoy exploring creative tech like digital art and 3D design, which adds a different perspective to how I build and think about things.",
    ],
    email: 'pardheev.vatturu1234@gmail.com',
    website: 'pardheev.online',
    profileImage: '/assets/images/profile.jpg',
  },

  // ---- Education ----
  education: {
    degree: 'B. Tech CSE-AI',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    years: '2023 - 2027',
    gpa: '8.24',
  },

  // ---- Music Playlist ----
  music: [
    {
      title: 'Wildflower',
      artist: 'Billie Eilish',
      album: 'Hit Me Hard and Soft',
      coverArt: '/assets/images/WildFlower.webp',
      audioFile: '/assets/audio/WildFlower.mp3',
    },
    {
      title: 'Viva La Vida',
      artist: 'Coldplay',
      album: 'Viva La Vida or Death and All His Friends',
      coverArt: '/assets/images/VivaLaVida.webp',
      audioFile: '/assets/audio/VivaLaVida.mp3',
    },
    {
      title: 'End of Beginning',
      artist: 'Djo',
      album: 'DECIDE',
      coverArt: '/assets/images/EndOfBeginning.webp',
      audioFile: '/assets/audio/EndOfBeginning.mp3',
    },
  ],

  // ---- GitHub Integration ----
  github: {
    username: 'p-art-dheev',
    startYear: 2025, // Earliest year shown in the year selector
  },

  // ---- Social Links ----
  socials: [
    { name: 'GitHub', icon: 'FaGithub', url: 'https://github.com/p-art-dheev', hoverColor: 'group-hover:text-gray-300' },
    { name: 'LinkedIn', icon: 'FaLinkedin', url: 'https://www.linkedin.com/in/pardheev-vatturu-863399284/', hoverColor: 'group-hover:text-[#0A66C2]' },
    { name: 'Twitter', icon: 'FaTwitter', url: 'https://twitter.com/yourusername', hoverColor: 'group-hover:text-[#1DA1F2]' },
    { name: 'Instagram', icon: 'FaInstagram', url: 'https://www.instagram.com/graphicoal__arts/', hoverColor: 'group-hover:text-[#E4405F]' },
    { name: 'pardheev.vatturu1234@gmail.com', icon: 'FaEnvelope', url: 'mailto:pardheev.vatturu1234@gmail.com', hoverColor: 'group-hover:text-green-500' },
  ],

  // ---- Tech Stack ----
  techStack: [
    { name: 'HTML5', icon: 'FaHtml5', color: 'text-orange-500' },
    { name: 'CSS', icon: 'FaCss3Alt', color: 'text-blue-500' },
    { name: 'JavaScript', icon: 'FaJs', color: 'text-yellow-400' },
    { name: 'C++', icon: 'SiCplusplus', color: 'text-blue-400' },
    { name: 'Node.js', icon: 'FaNodeJs', color: 'text-green-500' },
    { name: 'Python', icon: 'FaPython', color: 'text-lime-400' },
    { name: 'Git', icon: 'FaGitAlt', color: 'text-orange-600' },
    { name: 'GitHub', icon: 'FaGithub', color: 'text-gray-300' },
    { name: 'VS Code', icon: 'VscVscode', color: 'text-blue-500' },
    { name: 'React', icon: 'FaReact', color: 'text-cyan-400' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: 'text-sky-400' },
  ],

  // ---- Projects ----
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      icon: 'FaLaptopCode',
      tags: ['React', 'Node.js', 'MongoDB'],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Task Management App',
      description: 'Intuitive task manager with real-time collaboration',
      icon: 'FaMobileAlt',
      tags: ['Vue.js', 'Firebase', 'Tailwind'],
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting tool',
      icon: 'FaChartLine',
      tags: ['React', 'D3.js', 'Express'],
      gradient: 'from-lime-500 to-green-500',
    },
    {
      title: 'AI Chatbot',
      description: 'ML-powered conversational assistant',
      icon: 'FaRobot',
      tags: ['Python', 'TensorFlow', 'FastAPI'],
      gradient: 'from-teal-500 to-cyan-500',
    },
  ],

  // ---- Quotes (rotated in the hero section) ----
  quotes: [
    { text: 'Code is poetry written in logic.', author: 'Anonymous' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
    { text: 'Experience is the name everyone gives to their mistakes.', author: 'Oscar Wilde' },
    { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
    { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
    { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  ],

  // ---- EmailJS Config ----
  emailjs: {
    serviceId: 'service_dh3af3a',
    templateId: 'template_hh5svqq',
    publicKey: 'PdqWxSLujl7epzRZX',
  },

  // ---- Theme ----
  theme: {
    primary: '#059669',    // Darker Emerald (better for light mode)
    secondary: '#0d9488',  // Darker Teal
  },
}
