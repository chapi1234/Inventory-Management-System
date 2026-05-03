"use client";

import React, { useState } from 'react';
import { Button, Card } from '@hrms/ui';
import { LoginForm, useAuth } from '@hrms/auth';
import { EmployeeTable, useEmployees } from '@hrms/employees';
import { DepartmentList, useDepartments } from '@hrms/departments';
import { AttendanceWidget } from '@hrms/attendance';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Clock, 
  Calendar, 
  DollarSign, 
  UserCircle,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const { user, login, logout, loading: authLoading } = useAuth();
  const { employees, loading: employeesLoading } = useEmployees();
  const { departments, loading: deptsLoading } = useDepartments();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (authLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <LoginForm onLogin={login} onSuccess={() => {}} />
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'employees', icon: Users, label: 'Employees' },
    { id: 'departments', icon: Building2, label: 'Departments' },
    { id: 'attendance', icon: Clock, label: 'Attendance' },
    { id: 'leave', icon: Calendar, label: 'Leave' },
    { id: 'payroll', icon: DollarSign, label: 'Payroll' },
    { id: 'profile', icon: UserCircle, label: 'My Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight">HRMS Pro</span>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right">
                <p className="text-sm font-bold">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                {user.avatar ? <img src={user.avatar} alt="" /> : <div className="h-full w-full flex items-center justify-center"><UserCircle className="h-6 w-6 text-slate-400" /></div>}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Good Morning, {user.firstName}!</h1>
                  <p className="text-slate-500">Here's what's happening today.</p>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Add Record
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="flex items-center gap-4 border-l-4 border-blue-500">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Employees</p>
                    <p className="text-2xl font-bold">{employees.length}</p>
                  </div>
                </Card>
                <Card className="flex items-center gap-4 border-l-4 border-purple-500">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Departments</p>
                    <p className="text-2xl font-bold">{departments.length}</p>
                  </div>
                </Card>
                <Card className="flex items-center gap-4 border-l-4 border-green-500">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">On Leave Today</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </Card>
                <Card className="flex items-center gap-4 border-l-4 border-orange-500">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Late Attendance</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Recent Hires</h2>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <EmployeeTable employees={employees.slice(0, 5)} loading={employeesLoading} />
                  </Card>
                </div>
                <div className="space-y-8">
                  <AttendanceWidget />
                  <Card>
                    <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Active Jobs</span>
                        <span className="font-bold">8</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[65%]"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Pending Approvals</span>
                        <span className="font-bold">4</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full w-[40%]"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Employee Directory</h1>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Add Employee</Button>
              </div>
              <EmployeeTable employees={employees} loading={employeesLoading} />
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-3xl font-bold">Departments</h1>
              <DepartmentList departments={departments} />
            </div>
          )}

          {/* Other tabs would go here */}
          {['attendance', 'leave', 'payroll', 'profile'].includes(activeTab) && (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              Module {activeTab} is being implemented...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
