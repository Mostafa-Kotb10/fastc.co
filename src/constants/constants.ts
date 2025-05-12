import {
  calculatorSrc,
  counterSrc,
  handWithTabletSrc,
  storageShelfSrc,
  tablet1Src,
} from "@/assets";

import { MdSecurity, MdWarning, MdPointOfSale } from "react-icons/md";

import { FiPackage, FiUsers, FiTrendingUp, FiCalendar } from "react-icons/fi";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaDocker,
  FaChartLine,
  FaFileInvoiceDollar,
  FaStore,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";

import { IconType } from "react-icons/lib";
import { ReportItem } from "@/pages/dashboard/sales/sales.types";
import { LineChart } from "lucide-react";

export type TimelineItem = {
  title: string;
  description: string;
  icon: IconType;
  src: string;
  direction: "ltr" | "rtl";
  Bgcolor: string;
};

export const techStack = [
  {
    icon: FaReact,
    name: "React",
    color: "#61DBFB",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    color: "#000000",
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    color: "#3178C6",
  },
  {
    icon: FaNodeJs,
    name: "Node.js",
    color: "#68A063",
  },
  {
    icon: SiMongodb,
    name: "MongoDB",
    color: "#47A248",
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    color: "#336791",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
    color: "#06B6D4",
  },
  {
    icon: FaPython,
    name: "Python",
    color: "#3776AB",
  },
  {
    icon: FaGithub,
    name: "GitHub",
    color: "#181717",
  },
  {
    icon: FaDocker,
    name: "Docker",
    color: "#2496ED",
  },
];

export const Pharmacies = [
  "CVS Pharmacy",
  "Walgreens",
  "Rite Aid",
  "Walmart Pharmacy",
  "Kroger Pharmacy",
  "Albertsons Pharmacy",
  "Publix Pharmacy",
  "Costco Pharmacy",
  "Sam's Club Pharmacy",
  "Hy-Vee Pharmacy",
  "H-E-B Pharmacy",
  "Meijer Pharmacy",
  "Safeway Pharmacy",
  "Fred Meyer Pharmacy",
  "Giant Eagle Pharmacy",
];

export const timelineItems: TimelineItem[] = [
  {
    title: "Streamline Pharmacy Operations Effortlessly",
    description:
      "The system features an automated invoicing function that allows users to scan products using a camera. It instantly generates an invoice with accurate pricing, making the checkout process quick and efficient.",
    icon: MdPointOfSale,
    src: counterSrc,
    direction: "ltr",
    Bgcolor: "bg-cyan-700",
  },
  {
    title: "Automated Invoicing for Faster Transactions",
    description:
      "The system features an automated invoicing function that allows users to scan products using a camera. It instantly generates an invoice with accurate pricing, making the checkout process quick and efficient.",
    icon: FaFileInvoiceDollar,
    src: calculatorSrc,
    direction: "rtl",
    Bgcolor: "bg-cyan-600",
  },

  {
    title: "Interactive Dashboard for Performance Insights",
    description:
      "A user-friendly dashboard provides comprehensive reports on daily and monthly sales and profits. This allows pharmacy owners to monitor financial performance effortlessly and make informed business decisions.",
    icon: FaChartLine,
    src: tablet1Src,
    direction: "ltr",
    Bgcolor: "bg-cyan-400",
  },
  {
    title: "Low-Stock Alerts and Supplier Integration",
    description:
      "The system identifies products that need restocking and enables direct order placement from suppliers. This feature helps maintain product availability and prevents stock shortages.",
    src: storageShelfSrc,
    icon: MdWarning,
    direction: "rtl",
    Bgcolor: "bg-cyan-300",
  },
  {
    title: "Secure Employee Management and Access Control",
    description:
      "Pharmacy owners can create employee accounts with customized access permissions, ensuring data security and efficient workflow management while preventing unauthorized access.",
    icon: MdSecurity,
    src: handWithTabletSrc,
    direction: "ltr",
    Bgcolor: "bg-cyan-200",
  },
  {
    title: "Secure Employee Management and Access Control",
    description:
      "Pharmacy owners can create employee accounts with customized access permissions, ensuring data security and efficient workflow management while preventing unauthorized access.",
    icon: MdSecurity,
    src: handWithTabletSrc,
    direction: "rtl",
    Bgcolor: "bg-cyan-200",
  },
];

export type FeatureCard = {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ComponentType;
  src: string;
  Bgcolor: string;
};

export const featureCards: FeatureCard[] = [
  {
    title: "Streamline Pharmacy Operations Effortlessly",
    description:
      "The system features an automated invoicing function that allows users to scan products using a camera. It instantly generates an invoice with accurate pricing, making the checkout process quick and efficient.",
    benefits: [
      "Automated invoicing with camera scan",
      "Instant invoice generation",
      "Faster checkout process",
    ],
    icon: MdPointOfSale,
    src: counterSrc,
    Bgcolor: "bg-cyan-700",
  },
  {
    title: "Automated Invoicing for Faster Transactions",
    description:
      "Reduce transaction times with a fully automated invoicing system. Simply scan products to generate invoices instantly, ensuring pricing accuracy and efficiency.",
    benefits: [
      "Quick product scanning",
      "Accurate pricing",
      "Seamless checkout experience",
    ],
    icon: FaFileInvoiceDollar,
    src: calculatorSrc,
    Bgcolor: "bg-cyan-600",
  },
  {
    title: "Interactive Dashboard for Performance Insights",
    description:
      "A user-friendly dashboard provides comprehensive reports on daily and monthly sales and profits. This allows pharmacy owners to monitor financial performance effortlessly and make informed business decisions.",
    benefits: [
      "Real-time sales tracking",
      "Monthly performance reports",
      "Data-driven decision making",
    ],
    icon: FaChartLine,
    src: tablet1Src,
    Bgcolor: "bg-cyan-400",
  },
  {
    title: "Low-Stock Alerts and Supplier Integration",
    description:
      "The system identifies products that need restocking and enables direct order placement from suppliers. This feature helps maintain product availability and prevents stock shortages.",
    benefits: [
      "Automated low-stock alerts",
      "Seamless supplier integration",
      "Prevent stock shortages",
    ],
    icon: MdWarning,
    src: storageShelfSrc,
    Bgcolor: "bg-cyan-300",
  },
  {
    title: "Secure Employee Management and Access Control",
    description:
      "Pharmacy owners can create employee accounts with customized access permissions, ensuring data security and efficient workflow management while preventing unauthorized access.",
    benefits: [
      "Role-based access control",
      "Improved data security",
      "Efficient employee management",
    ],
    icon: MdSecurity,
    src: handWithTabletSrc,
    Bgcolor: "bg-cyan-200",
  },
];

export interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jeannie Grant",
    date: "June 01, 2023",
    rating: 5,
    text: "FastAF has transformed how we manage prescriptions. The automated refill system saves us hours every week, reducing stress for both staff and customers!",
  },
  {
    id: 2,
    name: "Derval Russell",
    date: "November 09, 2023",
    rating: 5,
    text: "We've been using FastAF for over a year, and the support has been incredible. Their system ensures we stay compliant while making insurance claims seamless.",
  },
  {
    id: 3,
    name: "Sophia Adams",
    date: "October 15, 2023",
    rating: 5,
    text: "FastAF’s customer support is top-notch. Whenever we need help, they respond quickly and ensure our pharmacy operations run smoothly!",
  },
  {
    id: 4,
    name: "Mark Stevenson",
    date: "September 05, 2023",
    rating: 4,
    text: "A great platform for managing patient records and prescriptions. The UI is intuitive, but I'd love to see more integrations in the future.",
  },
  {
    id: 5,
    name: "Emily Carter",
    date: "August 22, 2023",
    rating: 5,
    text: "FastAF has streamlined our workflow significantly. We process prescriptions faster and avoid compliance issues thanks to their automated checks.",
  },
];

export type SidebarLink = {
  title: string;
  path: string;
  icon: IconType;
};

export const sidebarLinks: SidebarLink[] = [
  {
    title: "Analysis",
    path: "",
    icon: LineChart,
  },
  {
    title: "Inventory",
    path: "inventory",
    icon: FiPackage,
  },
  {
    title: "Employees",
    path: "employees",
    icon: FiUsers,
  },
  {
    title: "Sales",
    path: "sales",
    icon: FiTrendingUp,
  },
  {
    title: "Expiry Warning",
    path: "expiry-warning",
    icon: FiCalendar,
  },
  {
    title: "Pharmacy",
    path: "pharmacy",
    icon: FaStore,
  },
];

export type InventoryItem = {
  drugId: string;
  drugName: string;
  drugForm: string;
  quantity: number;
  expiryDate: string;
  cost: number;
  price: number;
};

// export const inventoryData: InventoryItem[] = [
//   {
//     drugId: "D001",
//     drugName: "Paracetamol",
//     drugForm: "Tablet",
//     quantity: 500,
//     expiryDate: "12/12/2026",
//     cost: 2,
//     price: 4,
//   },
//   {
//     drugId: "D002",
//     drugName: "Ibuprofen",
//     drugForm: "Capsule",
//     quantity: 300,
//     expiryDate: "06/08/2025",
//     cost: 3,
//     price: 6,
//   },
//   {
//     drugId: "D003",
//     drugName: "Amoxicillin",
//     drugForm: "Syrup",
//     quantity: 150,
//     expiryDate: "09/04/2026",
//     cost: 5,
//     price: 10,
//   },
//   {
//     drugId: "D004",
//     drugName: "Cetirizine",
//     drugForm: "Tablet",
//     quantity: 700,
//     expiryDate: "11/11/2027",
//     cost: 1.5,
//     price: 3,
//   },
//   {
//     drugId: "D005",
//     drugName: "Metformin",
//     drugForm: "Tablet",
//     quantity: 250,
//     expiryDate: "03/07/2026",
//     cost: 4,
//     price: 7,
//   },
//   {
//     drugId: "D006",
//     drugName: "Omeprazole",
//     drugForm: "Capsule",
//     quantity: 450,
//     expiryDate: "02/09/2025",
//     cost: 3.5,
//     price: 6,
//   },
//   {
//     drugId: "D007",
//     drugName: "Loratadine",
//     drugForm: "Tablet",
//     quantity: 600,
//     expiryDate: "05/10/2026",
//     cost: 2,
//     price: 4,
//   },
//   {
//     drugId: "D008",
//     drugName: "Azithromycin",
//     drugForm: "Tablet",
//     quantity: 400,
//     expiryDate: "08/03/2026",
//     cost: 6,
//     price: 12,
//   },
//   {
//     drugId: "D009",
//     drugName: "Ranitidine",
//     drugForm: "Syrup",
//     quantity: 180,
//     expiryDate: "01/12/2025",
//     cost: 3,
//     price: 5.5,
//   },
//   {
//     drugId: "D010",
//     drugName: "Aspirin",
//     drugForm: "Tablet",
//     quantity: 550,
//     expiryDate: "04/06/2027",
//     cost: 1.8,
//     price: 3.5,
//   },
//   {
//     drugId: "D011",
//     drugName: "Clindamycin",
//     drugForm: "Capsule",
//     quantity: 200,
//     expiryDate: "07/08/2026",
//     cost: 7,
//     price: 14,
//   },
//   {
//     drugId: "D012",
//     drugName: "Furosemide",
//     drugForm: "Tablet",
//     quantity: 320,
//     expiryDate: "10/10/2025",
//     cost: 2.5,
//     price: 5,
//   },
//   {
//     drugId: "D013",
//     drugName: "Doxycycline",
//     drugForm: "Capsule",
//     quantity: 280,
//     expiryDate: "12/01/2027",
//     cost: 5.5,
//     price: 10,
//   },
//   {
//     drugId: "D014",
//     drugName: "Hydrochlorothiazide",
//     drugForm: "Tablet",
//     quantity: 360,
//     expiryDate: "09/09/2026",
//     cost: 2.2,
//     price: 4,
//   },
//   {
//     drugId: "D015",
//     drugName: "Prednisone",
//     drugForm: "Tablet",
//     quantity: 410,
//     expiryDate: "06/11/2027",
//     cost: 3.8,
//     price: 7,
//   },
//   {
//     drugId: "D016",
//     drugName: "Atorvastatin",
//     drugForm: "Tablet",
//     quantity: 480,
//     expiryDate: "01/04/2027",
//     cost: 6.5,
//     price: 12,
//   },
//   {
//     drugId: "D017",
//     drugName: "Ciprofloxacin",
//     drugForm: "Tablet",
//     quantity: 300,
//     expiryDate: "03/03/2026",
//     cost: 5,
//     price: 9,
//   },
//   {
//     drugId: "D018",
//     drugName: "Levothyroxine",
//     drugForm: "Tablet",
//     quantity: 520,
//     expiryDate: "07/07/2027",
//     cost: 1.2,
//     price: 2.5,
//   },
//   {
//     drugId: "D019",
//     drugName: "Salbutamol",
//     drugForm: "Inhaler",
//     quantity: 140,
//     expiryDate: "02/02/2026",
//     cost: 12,
//     price: 20,
//   },
//   {
//     drugId: "D020",
//     drugName: "Insulin Glargine",
//     drugForm: "Injection",
//     quantity: 75,
//     expiryDate: "11/12/2026",
//     cost: 25,
//     price: 40,
//   },
//   {
//     drugId: "D021",
//     drugName: "Warfarin",
//     drugForm: "Tablet",
//     quantity: 290,
//     expiryDate: "05/05/2025",
//     cost: 3,
//     price: 5.5,
//   },
//   {
//     drugId: "D022",
//     drugName: "Gabapentin",
//     drugForm: "Capsule",
//     quantity: 330,
//     expiryDate: "10/10/2026",
//     cost: 6,
//     price: 11,
//   },
//   {
//     drugId: "D023",
//     drugName: "Losartan",
//     drugForm: "Tablet",
//     quantity: 390,
//     expiryDate: "09/01/2026",
//     cost: 3.5,
//     price: 6.5,
//   },
//   {
//     drugId: "D024",
//     drugName: "Morphine",
//     drugForm: "Injection",
//     quantity: 50,
//     expiryDate: "12/12/2025",
//     cost: 18,
//     price: 30,
//   },
//   {
//     drugId: "D025",
//     drugName: "Nifedipine",
//     drugForm: "Capsule",
//     quantity: 260,
//     expiryDate: "06/06/2026",
//     cost: 4.5,
//     price: 8,
//   },
// ];

export type InventoryItemTest = {
  drugId: string;
  drugName: string;
  drugForm: string;
  quantity: number;
  quantityNeeded: number;
  quantityShortage: number;
};

export const inventoryDataTest: InventoryItemTest[] = [
  {
    drugId: "D001",
    drugName: "Paracetamol",
    drugForm: "Tablet",
    quantity: 500,
    quantityNeeded: 500,
    quantityShortage: 0,
  },
  {
    drugId: "D002",
    drugName: "Ibuprofen",
    drugForm: "Capsule",
    quantity: 300,
    quantityNeeded: 500,
    quantityShortage: 200,
  },
  {
    drugId: "D003",
    drugName: "Amoxicillin",
    drugForm: "Syrup",
    quantity: 150,
    quantityNeeded: 500,
    quantityShortage: 350,
  },
  {
    drugId: "D004",
    drugName: "Cetirizine",
    drugForm: "Tablet",
    quantity: 700,
    quantityNeeded: 500,
    quantityShortage: 0,
  },
  {
    drugId: "D005",
    drugName: "Metformin",
    drugForm: "Tablet",
    quantity: 250,
    quantityNeeded: 500,
    quantityShortage: 250,
  },
  {
    drugId: "D006",
    drugName: "Omeprazole",
    drugForm: "Capsule",
    quantity: 450,
    quantityNeeded: 500,
    quantityShortage: 50,
  },
  {
    drugId: "D007",
    drugName: "Loratadine",
    drugForm: "Tablet",
    quantity: 600,
    quantityNeeded: 500,
    quantityShortage: 0,
  },
  {
    drugId: "D008",
    drugName: "Azithromycin",
    drugForm: "Tablet",
    quantity: 400,
    quantityNeeded: 500,
    quantityShortage: 100,
  },
  {
    drugId: "D009",
    drugName: "Ranitidine",
    drugForm: "Syrup",
    quantity: 180,
    quantityNeeded: 500,
    quantityShortage: 320,
  },
  {
    drugId: "D010",
    drugName: "Aspirin",
    drugForm: "Tablet",
    quantity: 550,
    quantityNeeded: 500,
    quantityShortage: 0,
  },
  {
    drugId: "D011",
    drugName: "Clindamycin",
    drugForm: "Capsule",
    quantity: 200,
    quantityNeeded: 500,
    quantityShortage: 300,
  },
  {
    drugId: "D012",
    drugName: "Furosemide",
    drugForm: "Tablet",
    quantity: 320,
    quantityNeeded: 500,
    quantityShortage: 180,
  },
  {
    drugId: "D013",
    drugName: "Doxycycline",
    drugForm: "Capsule",
    quantity: 280,
    quantityNeeded: 500,
    quantityShortage: 220,
  },
  {
    drugId: "D014",
    drugName: "Hydrochlorothiazide",
    drugForm: "Tablet",
    quantity: 360,
    quantityNeeded: 500,
    quantityShortage: 140,
  },
  {
    drugId: "D015",
    drugName: "Prednisone",
    drugForm: "Tablet",
    quantity: 410,
    quantityNeeded: 500,
    quantityShortage: 90,
  },
  {
    drugId: "D016",
    drugName: "Atorvastatin",
    drugForm: "Tablet",
    quantity: 480,
    quantityNeeded: 500,
    quantityShortage: 20,
  },
  {
    drugId: "D017",
    drugName: "Ciprofloxacin",
    drugForm: "Tablet",
    quantity: 300,
    quantityNeeded: 500,
    quantityShortage: 200,
  },
  {
    drugId: "D018",
    drugName: "Levothyroxine",
    drugForm: "Tablet",
    quantity: 520,
    quantityNeeded: 500,
    quantityShortage: 0,
  },
  {
    drugId: "D019",
    drugName: "Salbutamol",
    drugForm: "Inhaler",
    quantity: 140,
    quantityNeeded: 500,
    quantityShortage: 360,
  },
  {
    drugId: "D020",
    drugName: "Insulin Glargine",
    drugForm: "Injection",
    quantity: 75,
    quantityNeeded: 500,
    quantityShortage: 425,
  },
  {
    drugId: "D021",
    drugName: "Warfarin",
    drugForm: "Tablet",
    quantity: 290,
    quantityNeeded: 500,
    quantityShortage: 210,
  },
  {
    drugId: "D022",
    drugName: "Gabapentin",
    drugForm: "Capsule",
    quantity: 330,
    quantityNeeded: 500,
    quantityShortage: 170,
  },
  {
    drugId: "D023",
    drugName: "Losartan",
    drugForm: "Tablet",
    quantity: 390,
    quantityNeeded: 500,
    quantityShortage: 110,
  },
  {
    drugId: "D024",
    drugName: "Morphine",
    drugForm: "Injection",
    quantity: 50,
    quantityNeeded: 500,
    quantityShortage: 450,
  },
  {
    drugId: "D025",
    drugName: "Nifedipine",
    drugForm: "Capsule",
    quantity: 260,
    quantityNeeded: 500,
    quantityShortage: 240,
  },
  {
    drugId: "D020",
    drugName: "Insulin Glargine",
    drugForm: "Injection",
    quantity: 75,
    quantityNeeded: 500,
    quantityShortage: 425,
  },
  {
    drugId: "D021",
    drugName: "Warfarin",
    drugForm: "Tablet",
    quantity: 0,
    quantityNeeded: 500,
    quantityShortage: 500,
  },
  {
    drugId: "D022",
    drugName: "Gabapentin",
    drugForm: "Capsule",
    quantity: 330,
    quantityNeeded: 500,
    quantityShortage: 170,
  },
  {
    drugId: "D023",
    drugName: "Losartan",
    drugForm: "Tablet",
    quantity: 0,
    quantityNeeded: 500,
    quantityShortage: 500,
  },
  {
    drugId: "D024",
    drugName: "Morphine",
    drugForm: "Injection",
    quantity: 50,
    quantityNeeded: 500,
    quantityShortage: 450,
  },
  {
    drugId: "D025",
    drugName: "Nifedipine",
    drugForm: "Capsule",
    quantity: 0,
    quantityNeeded: 500,
    quantityShortage: 500,
  },
];

export const dummyReports: ReportItem[] = [
  {
    drug: {
      id: 1073741824,
      name: "Aspirin",
      form: "Tablet",
      createdBy: {
        id: 1073741824,
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        role: "OWNER",
        fbUser: true,
        managedUser: true,
        createdAt: "2025-05-10T09:19:53.961Z",
        updatedAt: "2025-05-10T09:19:53.961Z",
      },
      units: 100,
      fullPrice: 0.5,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    cashier: {
      id: 1073741824,
      name: "Jane Smith",
      username: "janesmith",
      email: "janesmith@example.com",
      phone: "+0987654321",
      role: "CASHIER",
      fbUser: true,
      managedUser: true,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    quantity: 50,
    revenue: 25,
    profit: 10,
    type: "RECEIPT_ISSUED",
    status: "COMPLETED",
  },
  {
    drug: {
      id: 1073741825,
      name: "Ibuprofen",
      form: "Capsule",
      createdBy: {
        id: 1073741825,
        name: "Alice Cooper",
        username: "alicecooper",
        email: "alicecooper@example.com",
        phone: "+1234567891",
        role: "OWNER",
        fbUser: true,
        managedUser: true,
        createdAt: "2025-05-10T09:19:53.961Z",
        updatedAt: "2025-05-10T09:19:53.961Z",
      },
      units: 200,
      fullPrice: 0.7,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    cashier: {
      id: 1073741825,
      name: "Bob Brown",
      username: "bobbrown",
      email: "bobbrown@example.com",
      phone: "+0987654322",
      role: "CASHIER",
      fbUser: true,
      managedUser: true,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    quantity: 100,
    revenue: 70,
    profit: 30,
    type: "RECEIPT_ISSUED",
    status: "COMPLETED",
  },
  {
    drug: {
      id: 1073741826,
      name: "Paracetamol",
      form: "Syrup",
      createdBy: {
        id: 1073741826,
        name: "David Black",
        username: "davidblack",
        email: "davidblack@example.com",
        phone: "+1234567892",
        role: "OWNER",
        fbUser: true,
        managedUser: true,
        createdAt: "2025-05-10T09:19:53.961Z",
        updatedAt: "2025-05-10T09:19:53.961Z",
      },
      units: 150,
      fullPrice: 0.3,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    cashier: {
      id: 1073741826,
      name: "Emily White",
      username: "emilywhite",
      email: "emilywhite@example.com",
      phone: "+0987654323",
      role: "CASHIER",
      fbUser: true,
      managedUser: true,
      createdAt: "2025-05-10T09:19:53.962Z",
      updatedAt: "2025-05-10T09:19:53.962Z",
    },
    quantity: 75,
    revenue: 22.5,
    profit: 12,
    type: "RECEIPT_ISSUED",
    status: "COMPLETED",
  },
];
