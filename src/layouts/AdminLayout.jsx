import { Outlet } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  Clock, 
  UserCheck,
  Settings,
  Menu,
  X
} from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Stethoscope, label: "Bác sĩ", path: "/admin/doctors" },
    { icon: Users, label: "Chuyên khoa", path: "/admin/specialties" },
    { icon: UserCheck, label: "Bệnh nhân", path: "/admin/patients" },
    { icon: Calendar, label: "Lịch khám", path: "/admin/appointments" },
    { icon: Clock, label: "Lịch làm việc", path: "/admin/work-schedules" },
    { icon: Settings, label: "Lịch đặc biệt", path: "/admin/special-schedules" },
    { icon: Users, label: "Người dùng", path: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Bệnh viện</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quản trị hệ thống
            </h2>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Quản lý</h3>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
