declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type Icon = FC<IconProps>;

  // Layout & Navigation
  export const LayoutDashboard: Icon;
  export const Menu: Icon;
  export const ArrowRight: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const ArrowUpDown: Icon;
  export const SlidersHorizontal: Icon;

  // Inventory & Products
  export const Package: Icon;
  export const Package2: Icon;
  export const Boxes: Icon;
  export const Tag: Icon;
  export const Warehouse: Icon;
  export const ShoppingCart: Icon;
  export const ShoppingBag: Icon;
  export const Truck: Icon;
  export const Archive: Icon;

  // Finance & Analytics
  export const TrendingUp: Icon;
  export const TrendingDown: Icon;
  export const BarChart3: Icon;
  export const BarChart2: Icon;
  export const DollarSign: Icon;
  export const PieChart: Icon;
  export const Activity: Icon;

  // People & Auth
  export const Users: Icon;
  export const User: Icon;
  export const UserCircle: Icon;
  export const UserPlus: Icon;
  export const Building2: Icon;
  export const Briefcase: Icon;
  export const LogIn: Icon;
  export const LogOut: Icon;
  export const Shield: Icon;
  export const ShieldCheck: Icon;

  // Status & Alerts
  export const CheckCircle: Icon;
  export const CheckCircle2: Icon;
  export const AlertTriangle: Icon;
  export const AlertCircle: Icon;
  export const XCircle: Icon;
  export const Info: Icon;
  export const Bell: Icon;
  export const BellOff: Icon;

  // Actions & UI
  export const Plus: Icon;
  export const X: Icon;
  export const Edit: Icon;
  export const Edit2: Icon;
  export const Edit3: Icon;
  export const Trash: Icon;
  export const Trash2: Icon;
  export const Save: Icon;
  export const Copy: Icon;
  export const Download: Icon;
  export const Upload: Icon;
  export const Share: Icon;
  export const Filter: Icon;
  export const Search: Icon;
  export const RefreshCw: Icon;
  export const MoreVertical: Icon;
  export const MoreHorizontal: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const Settings: Icon;
  export const Zap: Icon;
  export const Star: Icon;

  // Communication
  export const Mail: Icon;
  export const Phone: Icon;
  export const MessageSquare: Icon;
  export const Send: Icon;

  // Location & Time
  export const MapPin: Icon;
  export const Map: Icon;
  export const Clock: Icon;
  export const Calendar: Icon;
  export const CalendarDays: Icon;
  export const Timer: Icon;

  // Misc
  export const Globe: Icon;
  export const Link: Icon;
  export const ExternalLink: Icon;
  export const FileText: Icon;
  export const File: Icon;
  export const Folder: Icon;
  export const Database: Icon;
  export const Server: Icon;
  export const Lock: Icon;
  export const Unlock: Icon;
  export const Key: Icon;
  export const ArrowRightLeft: Icon;
}
