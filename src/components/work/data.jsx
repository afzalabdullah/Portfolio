// src/components/work/data.jsx
import Tawil1 from "../../assets/images/tawil/tawil1.png";
import Tawil2 from "../../assets/images/tawil/tawil2.png";
import Tawil3 from "../../assets/images/tawil/tawil3.png";

import KodeKinetics from "../../assets/images/kodekinetics/kodekinetics-home.png";
import KodeKineticsHome from "../../assets/images/kodekinetics/kodekinetics.png";

import NoLimitsDashboard from "../../assets/images/nolimits/nolimits2.png";
import NoLimitsMembers from "../../assets/images/nolimits/nolimits3.png";

import NoorAndSonsRFQ from "../../assets/images/noorandsons/RFQ-Automation.png";
import NoorAndSonsInventory from "../../assets/images/noorandsons/inventory.png";

// Expense Tracker Images
import ExpenseTracker1 from "../../assets/images/expensetracker/exp-1.png";
import ExpenseTracker2 from "../../assets/images/expensetracker/exp-2.png";
import ExpenseTracker3 from "../../assets/images/expensetracker/exp-3.png";
import ExpenseTracker4 from "../../assets/images/expensetracker/exp-4.png";
import ExpenseTracker5 from "../../assets/images/expensetracker/exp-5.png";
import ExpenseTracker6 from "../../assets/images/expensetracker/exp-6.png";
import ExpenseTracker7 from "../../assets/images/expensetracker/exp-7.png";
import ExpenseTracker8 from "../../assets/images/expensetracker/exp-8.png";
import ExpenseTracker9 from "../../assets/images/expensetracker/exp-9.png";
import ExpenseTracker10 from "../../assets/images/expensetracker/exp-10.png";
import ExpenseTracker11 from "../../assets/images/expensetracker/exp-11.png";
import ExpenseTracker12 from "../../assets/images/expensetracker/exp-12.png";

import FacialRecAttendance4 from "../../assets/images/facial-recognition/f1.png";
import FacialRecAttendance2 from "../../assets/images/facial-recognition/f2.png";
import FacialRecAttendance3 from "../../assets/images/facial-recognition/f3.png";
import FacialRecAttendance1 from "../../assets/images/facial-recognition/f4.png";
import FacialRecAttendance5 from "../../assets/images/facial-recognition/f5.png";
import AIDBQuery1 from "../../assets/images/ai-db-query/db-qu-1.png";
import AIDBQuery2 from "../../assets/images/ai-db-query/db-qu-2.png";
import AIDBQuery3 from "../../assets/images/ai-db-query/db-qu-3.png";


import hrmsDashboard from "../../assets/images/hrms/dashboard.png";


export const projects = [
  {
    id: 1,
    title: "Tawil - The Community Network",
    description:
      "All-in-one Muslim community app to connect, discover masjids, halal restaurants, events, jobs, and strengthen the Ummah.",
    longDescription:
      "Connect. Discover. Empower.\n\nFind nearby mosques, halal food, community events, job opportunities, and more — all in one seamless platform.",
    images: [Tawil1, Tawil2, Tawil3], // Multiple images
    category: "Flutter",
    link: "https://mytawil.com",
    appLinks: {
      playStore: "https://play.google.com/store/apps/details?id=com.tawil.app",
      appStore: "https://apps.apple.com/app/tawil/id1234567890",
    },
    tags: ["Community", "Mobile App", "Flutter"],
  },
  {
    id: 2,
    title: "Kode Kinetics",
    description:
      "Professional website for Kode Kinetics Software Agency showcasing services, portfolio, and client work.",
    images: [KodeKinetics,KodeKineticsHome],
    category: "Website",
    link: "https://www.kodekinetics.com/",
    tags: ["Next.js", "React", "Agency"],
  },
  {
    id: 3,
    title: "No Limits Fitness Studio - Gym Management System",
    description:
      "Complete gym management system with member registration, payments, attendance (ZKTeco integration), staff salaries, WhatsApp/Email reminders, and detailed reports.",
    images: [NoLimitsDashboard, NoLimitsMembers],
    category: "Web App",
    tags: ["ASP.NET Core MVC", "MSSQL", "Gym Management"],
  },
  {
    id: 4,
    title: "Noor & Sons Inventory & AI-Powered RFQ System",
    description:
      "AI-powered sales, inventory, and RFQ/quotation management system with performance tracking, conversion rates, price recommendations, and client visit logging.",
    images: [NoorAndSonsRFQ, NoorAndSonsInventory],
    category: "Web App",
    tags: ["AI", "Inventory", "Sales", "RFQ"],
  },
  {
    id: 5,
    title: "Expense Tracker App",
    description:
      "Clean and modern expense tracker app built with Flutter and Firebase for personal finance management.",
    images: [ExpenseTracker1,ExpenseTracker2,ExpenseTracker3,ExpenseTracker4,ExpenseTracker5,ExpenseTracker6,ExpenseTracker7,ExpenseTracker8,ExpenseTracker9,ExpenseTracker10,ExpenseTracker11,ExpenseTracker12],
    category: "Flutter",
    tags: ["Finance", "Mobile App"],
  },
  {
    id: 6,
    title: "Facial Recognition Attendance System (TPL Trakker)",
    description:
      "Employee attendance system using FaceNet model for accurate and secure facial recognition.",
    images: [FacialRecAttendance1, FacialRecAttendance2, FacialRecAttendance3, FacialRecAttendance4, FacialRecAttendance5],
    category: "AI + Flutter",
    tags: ["Facial Recognition", "FaceNet", "Attendance"],
  },
  {
    id: 7,
    title: "HRMS & Payroll System",
    description:
      "Full-featured HR and payroll system with ZKTeco device integration for real-time attendance, salary, loans, advances, hiring/firing, and more.",
    images: [hrmsDashboard],
    category: "Web App",
    tags: ["HRMS", "Payroll", "ZKTeco"],
  },
  {
    id: 8,
    title: "AI-Powered Database Query Chat App",
    description:
      "Chat with your database using natural language. Supports multiple databases and provides intelligent SQL query generation.",
    images: [AIDBQuery1,AIDBQuery2,AIDBQuery3],
    category: "AI + Web App",
    tags: ["AI", "LLM", "Database", "Chat"],
  },
];