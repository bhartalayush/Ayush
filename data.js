// ==========================================
// RESUME DATA CONFIGURATION: AYUSH BHARTAL
// ==========================================

const RESUME_DATA = {
  // ----------------------------------------
  // PERSONAL INFORMATION & HERO
  // ----------------------------------------
  personalInfo: {
    name: "Ayush Bhartal",
    status: "Student",
    educationBrief: "B.Tech in Computer Science & Engineering",
    title: "AI/ML & Software Developer",
    subtitle: "Passionate about AI/ML, software engineering, and data-driven systems.",
    location: "Pune, India - 411030",
    phone: "+91 9130196188",
    email: "bhartalayush@gmail.com",
    avatar: "", // Explicitly empty (using left interactive canvas and right details)
    bio: "Third-year B.Tech Computer Engineering student passionate about AI/ML and software development, with experience building projects involving digital twins, audio processing, and data-driven systems.",
    resumeUrl: "AyushBhartalResume.pdf",
    socials: {
      github: "https://github.com/bhartalayush",
      linkedin: "https://www.linkedin.com/in/ayush-bhartal-8918103a5/",
      email: "mailto:bhartalayush@gmail.com"
    }
  },

  // ----------------------------------------
  // MODULAR SECTIONS LAYOUT CONFIGURATION
  // ----------------------------------------
  sections: [
    {
      id: "skills",
      navTitle: "Skills",
      title: "Technical Skills",
      subtitle: "TECHNICAL INDEX",
      type: "skills",
      theme: "light",
      mascots: [
        { class: "mascot-skills-1", color: "yellow" },
        { class: "mascot-skills-2", color: "red" }
      ]
    },
    {
      id: "projects",
      navTitle: "Projects",
      title: "Featured Projects",
      subtitle: "PROJECTS CATALOG",
      type: "projects",
      theme: "dark",
      mascots: [
        { class: "mascot-projects-1", color: "cyan" },
        { class: "mascot-projects-2", color: "yellow" }
      ]
    },
    {
      id: "experience",
      navTitle: "Experience",
      title: "Experience & Activities",
      subtitle: "CHRONOLOGY",
      type: "experience",
      theme: "dark",
      mascots: [
        { class: "mascot-experience-1", color: "red" },
        { class: "mascot-experience-2", color: "cyan" }
      ]
    }
  ],

  // ----------------------------------------
  // WORK EXPERIENCE & ACTIVITIES
  // ----------------------------------------
  experience: [
    {
      role: "Music Head",
      company: "Firodia Karandak",
      location: "Pune, India",
      period: "2025",
      description: "Led and coordinated the music team for the Firodia Karandak competition.",
      bullets: [
        "Orchestrated live musical arrangements for a 15-member ensemble.",
        "Collaborated with directors to sync soundscapes for theatrical scenes."
      ],
      tags: ["Leadership", "Creative Direction", "Project Management"]
    },
    {
      role: "Technical Team Member",
      company: "AWS Cloud Club",
      location: "Pune, India",
      period: "2024 - Present",
      description: "Contributed to cloud architecture initiatives and club workshops.",
      bullets: [
        "Helped organize cloud computing workshops and serverless bootcamps."
      ],
      tags: ["AWS Cloud", "Serverless", "Cloud Architecture"]
    },
    {
      role: "Volunteer",
      company: "Cyber Security Awareness Initiative",
      location: "Pune, India",
      period: "2024",
      description: "Conducted cybersecurity training and digital safety sessions.",
      bullets: [
        "Educated youths on identifying phishing scams and online security."
      ],
      tags: ["Cybersecurity", "Digital Safety", "Community Outreach"]
    }
  ],

  // ----------------------------------------
  // EDUCATION
  // ----------------------------------------
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (Pursuing)",
      school: "Deccan Education Society, Pune University",
      location: "Pune, India",
      period: "2024 - 2028",
      grade: "FY CGPA: 9.02 | Sem III SGPA: 8.90",
      description: "Specializing in software engineering, algorithmic problem solving, database systems, and machine learning models. Expected Graduation: 2028."
    }
  ],

  // ----------------------------------------
  // PROJECTS (ALL 6 FROM RESUME)
  // ----------------------------------------
  projects: [
    {
      title: "Speech Analysis & Assessment System",
      description: "Developed a speech analytics pipeline for transcription, pause detection, and fluency assessment utilizing Faster Whisper local AI models.",
      category: "ai",
      image: "assets/speechanalysis.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Python", "Faster Whisper", "Pandas", "Audio Analytics"]
    },
    {
      title: "Terracotta Pot Digital Twin",
      description: "Built a 3D digital twin in Unity simulating terracotta water cooling behaviors using environmental datasets.",
      category: "simulation",
      image: "assets/claypot.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Unity Engine", "C#", "Python", "Data Visualization"]
    },
    {
      title: "Flood Simulation & Risk Visualizer",
      description: "Simulated flood propagation vectors using topography and rainfall parameters to map hazard zones.",
      category: "simulation",
      image: "assets/floodsimulation.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Python", "Data Modeling", "Risk Assessment"]
    },
    {
      title: "Chord Detection & Harmonic Tool",
      description: "An audio processing engine detecting musical chords in real-time.",
      category: "audio",
      image: "assets/chorddetection.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Python", "Audio Processing", "Signal Systems"]
    },
    {
      title: "PRAVAH Smart Traffic Management",
      description: "An AI-enabled traffic control prototype featuring automated emergency priority and routing (SIH 2025).",
      category: "ai",
      image: "assets/pravah.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Computer Vision", "Machine Learning", "Python"]
    },
    {
      title: "Plagiarism Case DB Project",
      description: "Designed and built a database management system to log, track, and manage academic plagiarism cases.",
      category: "db",
      image: "assets/plagiarismcasedb.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["MySQL", "Database Systems", "OOP"]
    },
    {
      title: "Sudoku Solver",
      description: "Developed a Java based Sudoku Solver using recursive backtracking algorithms to solve valid Sudoku puzzles efficiently. Designed an interactive interface featuring Sudoku puzzle generation/randomization, user input validation, and automatic solving functionality.",
      category: "java",
      image: "assets/sudokusolver.png",
      liveUrl: "#",
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Java", "Algorithms", "Backtracking", "GUI"]
    }
  ],

  // ----------------------------------------
  // TECHNICAL SKILLS
  // ----------------------------------------
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "C / C++", level: 85 },
        { name: "Java", level: 80 },
        { name: "Python", level: 90 },
        { name: "C# (Unity)", level: 75 }
      ]
    },
    {
      category: "Data Science & ML",
      items: [
        { name: "Pandas", level: 85 },
        { name: "NumPy", level: 85 },
        { name: "Matplotlib", level: 80 }
      ]
    },
    {
      category: "Databases & Core CS",
      items: [
        { name: "MySQL", level: 85 },
        { name: "OOP", level: 88 },
        { name: "DBMS", level: 88 },
        { name: "COA", level: 80 },
        { name: "Discrete Math", level: 78 }
      ]
    },
    {
      category: "Web & UI",
      items: [
        { name: "HTML & CSS", level: 85 },
        { name: "Java Swing", level: 80 }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", level: 85 },
        { name: "Tableau", level: 75 },
        { name: "LaserCAD", level: 70 },
        { name: "Google AI Studio", level: 80 },
        { name: "n8n", level: 75 },
        { name: "Ultimaker Cura", level: 70 },
        { name: "Unity Engine", level: 75 }
      ]
    }
  ]
};
