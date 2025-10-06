import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "" },
    { icon: Stethoscope, label: "Bác sĩ", path: "doctors" },
    { icon: Users, label: "Chuyên khoa", path: "specialties" },
    { icon: UserCheck, label: "Bệnh nhân", path: "patients" },
    { icon: Calendar, label: "Lịch khám", path: "appointments" },
    { icon: Clock, label: "Lịch làm việc", path: "work-schedules" },
    { icon: Settings, label: "Lịch đặc biệt", path: "special-schedules" },
    { icon: Users, label: "Người dùng", path: "users" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Bệnh viện</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quản trị hệ thống
            </h2>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Quản lý</h3>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === `/admin/${item.path}` || 
                              (item.path === "" && location.pathname === "/admin");
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
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
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
