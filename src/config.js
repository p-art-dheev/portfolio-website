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
    profileImage: '/assets/images/profile1.jpeg',
    profileImage2: '/assets/images/profile2.png',
  },

  // ---- Education ----
  education: {
    degree: 'B. Tech CSE-AI',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    years: '2023 - 2027',
    gpa: '8.25',
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
      title: 'Codeproctor',
      description: 'A technical assessment and proctoring platform built with Next.js and Serverless Postgres.',
      icon: 'FaLaptopCode',
      tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'NextAuth'],
      gradient: 'from-green-500 to-emerald-500',
      liveUrl: 'https://codeproctor.vercel.app/',
      githubUrl: 'https://github.com/TeamKraken-D03/codeproctor',
      images: [
        '/assets/projects/1/1.png',
        '/assets/projects/1/2.png',
        '/assets/projects/1/3.png',
        '/assets/projects/1/4.png',
      ]
    },
    {
      title: 'Electricity Load Forecasting',
      description: 'Time series analysis project for predicting electricity demand with Python and forecasting techniques.',
      icon: 'FaMobileAlt',
      tags: ['Python', 'Time Series', 'Pandas', 'Forecasting'],
      gradient: 'from-emerald-500 to-teal-500',
      images: [
        'assets/projects/2/1.png',
      ]
    },
    {
      title: 'Automated Waste Segregation Using Manipulator',
      description: 'Automated waste segregation using a manipulator-based detection and control workflow.',
      icon: 'FaChartLine',
      tags: ['Analytics', 'Automation', 'Computer Vision', 'Manipulator'],
      gradient: 'from-lime-500 to-green-500',
      images: [
        'assets/projects/3/1.png',
      ]
    },
    {
      title: 'RFID Assisted Vehicle Speed Monitoring & Classification',
      description: 'RFID-assisted vehicle speed monitoring and classification.',
      icon: 'FaRobot',
      tags: ['Python', 'RFID', 'Classification'],
      gradient: 'from-teal-500 to-cyan-500',
      images: [
        'assets/projects/4/1.png',
      ]
    },
    {
      title: 'Graph Memory Agents',
      description: 'An in-progress agent system for graph-backed memory, retrieval, and reasoning workflows.',
      icon: 'FaBrain',
      tags: [],
      gradient: 'from-fuchsia-500 to-violet-500',
      status: {
        label: 'Currently building',
      },
    },
  ],

  // ---- Artworks ----
  artworks: [
    {
      title: 'Radha Krishna',
      caption: 'Description for Artwork 1',
      medium: 'Graphite',
      date: '2026',
      image: '/assets/artworks/1/cover.jpeg',
    },
    {
      title: 'Thorffin',
      caption: 'Description for Artwork 2',
      medium: 'Water Colours',
      date: '2024',
      image: '/assets/artworks/2/cover.jpeg',
    },
    {
      title: 'Krishna',
      caption: 'Description for Artwork 3',
      medium: 'Colour Pencils',
      date: '2024',
      image: '/assets/artworks/3/cover.jpeg',
    },
    {
      title: 'Golden Pup',
      caption: 'Description for Artwork 4',
      medium: 'Digital Art',
      date: '2024',
      image: '/assets/artworks/4/cover.jpeg',
    },
    {
      title: 'The Gaze',
      caption: 'Description for Artwork 5',
      medium: 'Charcoal',
      date: '2023',
      image: '/assets/artworks/5/cover.jpeg',
    }
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
