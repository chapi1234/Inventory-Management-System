declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type Icon = FC<IconProps>;
  export const LayoutDashboard: Icon;
  export const Users: Icon;
  export const User: Icon;
  export const Building2: Icon;
  export const Clock: Icon;
  export const Calendar: Icon;
  export const DollarSign: Icon;
  export const UserCircle: Icon;
  export const LogOut: Icon;
  export const Bell: Icon;
  export const Search: Icon;
  export const Plus: Icon;
  export const LogIn: Icon;
  export const Edit2: Icon;
  export const Trash2: Icon;
  export const MoreVertical: Icon;
  export const CheckCircle2: Icon;
  export const X: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const MapPin: Icon;
  export const Briefcase: Icon;
  export const Download: Icon;
}
