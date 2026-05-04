import { ReactNode } from "react";

export const Table = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <thead className={`[&_tr]:border-b ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <tr className={`border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 ${className}`}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);
