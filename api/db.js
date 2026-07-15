const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

const defaultContent = {
  hero: {
    name: "Abdullah",
    accent: "Afzal",
    description: "Designing and engineering large-scale distributed systems with a focus on system architecture, scalability, and high-availability infrastructure. Based in Pakistan, engineering for global impact.",
    roles: [
      "Senior Software Engineer",
      "System Design Engineer",
      "Full Stack Architect",
      "Enterprise Solutions Lead"
    ],
    experience: "3+",
    projectsCount: "20+",
    status: "Open to Work"
  },
  about: {
    tag: "The Architect",
    titleName: "Abdullah",
    titleHighlight: "Afzal",
    whoami: "I am a Senior Software Engineer & System Design Engineer specializing in architecting large-scale distributed systems, high-availability infrastructure, and enterprise-grade platforms that serve millions.",
    philosophy: "Design systems that scale. Architect solutions that endure. Engineer every layer — from infrastructure to interface.",
    resumeUrl: "/Abdullah_Resume.pdf"
  },
  skills: [
    {
      title: "Frontend Development",
      description: "Building responsive, interactive, and high-performance user interfaces.",
      skills: [
        { name: "React / Next.js", icon: "SiNextdotjs", level: "Advanced", color: "#000000" },
        { name: "JavaScript", icon: "SiJavascript", level: "Advanced", color: "#F7DF1E" },
        { name: "TypeScript", icon: "SiReact", level: "Proficient", color: "#3178C6" },
        { name: "Tailwind CSS", icon: "SiTailwindcss", level: "Advanced", color: "#06B6D4" },
        { name: "HTML5/CSS3", icon: "SiHtml5", level: "Expert", color: "#E34F26" }
      ]
    },
    {
      title: "Backend & Systems",
      description: "Architecting scalable server-side logic and robust database schemas.",
      skills: [
        { name: "ASP.Net Core", icon: "SiDotnet", level: "Expert", color: "#512BD4" },
        { name: "Node.js / Express", icon: "SiNodedotjs", level: "Advanced", color: "#339933" },
        { name: "Laravel (PHP)", icon: "SiLaravel", level: "Advanced", color: "#FF2D20" },
        { name: "MySQL / PostgreSQL", icon: "SiMysql", level: "Expert", color: "#4479A1" },
        { name: "MongoDB", icon: "SiMongodb", level: "Proficient", color: "#47A248" }
      ]
    },
    {
      title: "Mobile & Hybrid",
      description: "Creating seamless cross-platform mobile experiences.",
      skills: [
        { name: "Flutter", icon: "SiFlutter", level: "Expert", color: "#02569B" },
        { name: "Dart", icon: "SiDart", level: "Expert", color: "#00CCFF" },
        { name: "Firebase", icon: "SiFirebase", level: "Advanced", color: "#FFCA28" }
      ]
    },
    {
      title: "DevOps & Tooling",
      description: "Streamlining development workflows and infrastructure.",
      skills: [
        { name: "Docker", icon: "SiDocker", level: "Proficient", color: "#2496ED" },
        { name: "Git / GitHub", icon: "SiGit", level: "Expert", color: "#F05032" },
        { name: "Postman / API", icon: "SiPostman", level: "Advanced", color: "#FF6C37" },
        { name: "Figma (UI/UX)", icon: "SiFigma", level: "Proficient", color: "#F24E1E" }
      ]
    }
  ],
  qualification: {
    experience: [
      {
        title: "Kode Kinetics (USA)",
        subtitle: "Senior Software Engineer",
        detail: "Remote — Architecting scalable distributed systems",
        date: "Dec 2024 – Present",
        start: "2024-12-01",
        end: null,
        current: true
      },
      {
        title: "Rajby Textiles Pvt. Ltd",
        subtitle: "Senior Software Engineer – ERP",
        detail: "Enterprise architecture & system design",
        date: "Nov 2024 – Present",
        start: "2024-11-01",
        end: null,
        current: true
      },
      {
        title: "TPL Trakker Ltd.",
        subtitle: "Assistant Manager – R&D",
        detail: "Research & development leadership",
        date: "Aug 2024 – Nov 2024",
        start: "2024-08-01",
        end: "2024-11-01",
        current: false
      },
      {
        title: "TPL Trakker Ltd.",
        subtitle: "Trainee Engineer – R&D",
        detail: "IoT & telematics solutions",
        date: "May 2023 – Aug 2024",
        start: "2023-05-01",
        end: "2024-08-01",
        current: false
      }
    ],
    education: [
      {
        title: "PAF - KIET",
        subtitle: "BE Software Engineering",
        detail: "GPA 3.45 / 4.0",
        date: "2020 – 2024",
        start: "2020-01-01",
        end: "2024-01-01",
        current: false
      },
      {
        title: "Govt. National College",
        subtitle: "Intermediate",
        detail: "Pre-Engineering",
        date: "2018 – 2020",
        start: "2018-01-01",
        end: "2020-01-01",
        current: false
      },
      {
        title: "Seerat-E-Complex",
        subtitle: "Matriculation",
        detail: "Science",
        date: "2008 – 2018",
        start: "2008-01-01",
        end: "2018-01-01",
        current: false
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Shaheen Track - Fleet Management System",
      description: "A comprehensive real-time vehicle tracking and fleet management system with live telemetry, geofencing, fuel monitoring, and advanced analytics.",
      longDescription: "Shaheen Track is a professional-grade fleet management solution designed for real-time monitoring and security. \n\nKey features include:\n- Live Vehicle Tracking with high-precision telemetry.\n- Geofencing and instant alerts for unauthorized movements.\n- Fuel consumption monitoring and efficiency reports.\n- Detailed analytics for driver behavior and vehicle health.\n- Multi-organization support with advanced RBAC (Role-Based Access Control).",
      images: [
        "/images/shaheen-track/1.png",
        "/images/shaheen-track/2.png",
        "/images/shaheen-track/3.png",
        "/images/shaheen-track/4.png",
        "/images/shaheen-track/5.png",
        "/images/shaheen-track/6.png",
        "/images/shaheen-track/7.png"
      ],
      category: "Web App",
      link: "https://shaheentrack.pk",
      tags: ["Fleet Management", "Real-time Tracking", "Web App", "Geofencing"]
    },
    {
      id: 2,
      title: "Tawil - The Community Network",
      description: "All-in-one Muslim community app to connect, discover masjids, halal restaurants, events, jobs, and strengthen the Ummah.",
      longDescription: "Connect. Discover. Empower.\n\nFind nearby mosques, halal food, community events, job opportunities, and more — all in one seamless platform.",
      images: [
        "/images/tawil/tawil1.png",
        "/images/tawil/tawil2.png",
        "/images/tawil/tawil3.png"
      ],
      category: "Flutter",
      link: "https://mytawil.com",
      appLinks: {
        playStore: "https://play.google.com/store/apps/details?id=com.tawil.app",
        appStore: "https://apps.apple.com/app/tawil/id1234567890"
      },
      tags: ["Community", "Mobile App", "Flutter"]
    },
    {
      id: 3,
      title: "Kode Kinetics",
      description: "Professional website for Kode Kinetics Software Agency showcasing services, portfolio, and client work.",
      images: [
        "/images/kodekinetics/kodekinetics-home.png",
        "/images/kodekinetics/kodekinetics.png"
      ],
      category: "Website",
      link: "https://www.kodekinetics.com/",
      tags: ["Next.js", "React", "Agency"]
    },
    {
      id: 4,
      title: "No Limits Fitness Studio - Gym Management System",
      description: "Complete gym management system with member registration, payments, attendance (ZKTeco integration), staff salaries, WhatsApp/Email reminders, and detailed reports.",
      images: [
        "/images/nolimits/nolimits2.png",
        "/images/nolimits/nolimits3.png"
      ],
      category: "Web App",
      tags: ["ASP.NET Core MVC", "MSSQL", "Gym Management"]
    },
    {
      id: 5,
      title: "NEXORA - The Intelligence Platform",
      description: "RFQ Automation along with Inventory Management",
      longDescription: "Nexora is an intelligent platform designed to streamline business operations through automated RFQ processing and comprehensive inventory tracking. It features AI-powered sales insights, performance tracking, conversion rate optimization, and automated price recommendations to drive business growth.",
      images: [
        "/images/ai-powerd-rfq-automation/1.png",
        "/images/ai-powerd-rfq-automation/2.png",
        "/images/ai-powerd-rfq-automation/3.png",
        "/images/ai-powerd-rfq-automation/4.png",
        "/images/ai-powerd-rfq-automation/5.png"
      ],
      category: "Web App",
      tags: ["AI", "Inventory", "Sales", "RFQ", "Automation"]
    },
    {
      id: 6,
      title: "Expense Tracker App",
      description: "Clean and modern expense tracker app built with Flutter and Firebase for personal finance management.",
      images: [
        "/images/expensetracker/exp-1.png",
        "/images/expensetracker/exp-2.png",
        "/images/expensetracker/exp-3.png",
        "/images/expensetracker/exp-4.png",
        "/images/expensetracker/exp-5.png",
        "/images/expensetracker/exp-6.png",
        "/images/expensetracker/exp-7.png",
        "/images/expensetracker/exp-8.png",
        "/images/expensetracker/exp-9.png",
        "/images/expensetracker/exp-10.png",
        "/images/expensetracker/exp-11.png",
        "/images/expensetracker/exp-12.png"
      ],
      category: "Flutter",
      tags: ["Finance", "Mobile App"]
    },
    {
      id: 7,
      title: "Facial Recognition Attendance System (TPL Trakker)",
      description: "Employee attendance system using FaceNet model for accurate and secure facial recognition.",
      images: [
        "/images/facial-recognition/f4.png",
        "/images/facial-recognition/f2.png",
        "/images/facial-recognition/f3.png",
        "/images/facial-recognition/f1.png",
        "/images/facial-recognition/f5.png"
      ],
      category: "AI + Flutter",
      tags: ["Facial Recognition", "FaceNet", "Attendance"]
    },
    {
      id: 8,
      title: "HRMS & Payroll System",
      description: "Full-featured HR and payroll system with ZKTeco device integration for real-time attendance, salary, loans, advances, hiring/firing, and more.",
      images: [
        "/images/hrms/dashboard.png"
      ],
      category: "Web App",
      tags: ["HRMS", "Payroll", "ZKTeco"]
    },
    {
      id: 9,
      title: "AI-Powered Database Query Chat App",
      description: "Chat with your database using natural language. Supports multiple databases and provides intelligent SQL query generation.",
      images: [
        "/images/ai-db-query/db-qu-1.png",
        "/images/ai-db-query/db-qu-2.png",
        "/images/ai-db-query/db-qu-3.png"
      ],
      category: "AI + Web App",
      tags: ["AI", "LLM", "Database", "Chat"]
    }
  ],
  contact: {
    email: "afzalabdullah066@gmail.com",
    whatsapp: "(+92) 311 6702805",
    whatsappLink: "https://api.whatsapp.com/send/?phone=923116702805&text&type=phone_number&app_absent=0",
    linkedin: "Abdullah Afzal",
    linkedinLink: "https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/",
    emailjsServiceId: "service_pdf9ymo",
    emailjsTemplateId: "template_vhduyv3",
    emailjsPublicKey: "vCwOaTQBBdQFTgP5b"
  },
  aiChat: {
    welcomeMessage: "Hi! I'm Abdullah's AI assistant. How can I help you today?",
    quickQuestions: [
      "What are your core skills?",
      "Tell me about your latest project",
      "How can I contact you?",
      "Are you available for freelance?"
    ],
    qna: [
      { keyword: "skills", response: "Abdullah excels in React, JavaScript, Responsive Design, and modern CSS techniques. He also has experience with Flutter and Firebase." },
      { keyword: "project", response: "Abdullah has worked on several premium projects including modern portfolio designs, mobile apps, and dashboard interfaces. Check out the 'Work' section for details!" },
      { keyword: "work", response: "Abdullah has worked on several premium projects including modern portfolio designs, mobile apps, and dashboard interfaces. Check out the 'Work' section for details!" },
      { keyword: "contact", response: "You can reach Abdullah via the Contact form below, or connect with him on LinkedIn and GitHub. He's always open to new opportunities!" },
      { keyword: "hire", response: "You can reach Abdullah via the Contact form below, or connect with him on LinkedIn and GitHub. He's always open to new opportunities!" },
      { keyword: "freelance", response: "You can reach Abdullah via the Contact form below, or connect with him on LinkedIn and GitHub. He's always open to new opportunities!" },
      { keyword: "default", response: "That's a great question! I'm still learning, but you can explore Abdullah's portfolio or use the contact form to ask him directly." }
    ]
  }
};

async function initDb() {
  const client = await pool.connect();
  try {
    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id VARCHAR(50) PRIMARY KEY,
        content JSONB NOT NULL
      );
    `);
    
    // Check if main data row exists
    const checkRes = await client.query('SELECT 1 FROM portfolio_data WHERE id = $1', ['main']);
    if (checkRes.rowCount === 0) {
      console.log("DB: Initializing default portfolio data...");
      await client.query('INSERT INTO portfolio_data (id, content) VALUES ($1, $2)', ['main', JSON.stringify(defaultContent)]);
      console.log("DB: Default portfolio data initialized successfully!");
    } else {
      console.log("DB: Portfolio data already exists, skipping initialization.");
    }
  } catch (err) {
    console.error("DB Error in initialization:", err);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  initDb
};
