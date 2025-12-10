import { SiInstagram, SiFacebook, SiX, SiLinkedin } from "react-icons/si";

export const socialPlatformsSchema = [
  {
    id: "instagram",
    name: "Instagram",
    icon: SiInstagram,
    connected: true,
    accountName: "@your_brand",
    lastSynced: "2 hours ago",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: SiFacebook,
    connected: true,
    accountName: "Your Brand Page",
    lastSynced: "5 hours ago",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: SiX,
    connected: false,
    accountName: null,
    lastSynced: null,
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: SiLinkedin,
    connected: true,
    accountName: "Your Company",
    lastSynced: "1 day ago",
    color: "from-blue-600 to-blue-800",
  },
];
