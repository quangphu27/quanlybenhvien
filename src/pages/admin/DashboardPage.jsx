import { useState } from "react";
import { 
  Calendar, 
  UserCheck, 
  Users, 
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const DashboardPage = () => {
  // Dữ liệu thống kê
  const stats = [
    {
      title: "Lịch khám hôm nay",
      value: "24",
      subtitle: "Pending & Confirmed",
      icon: Calendar,
      color: "bg-blue-500"
    },
    {
      title: "Lịch bị hủy",
      value: "8", 
      subtitle: "Tháng này",
      icon: AlertCircle,
      color: "bg-red-500"
    },
    {
      title: "Bác sĩ hoạt động",
      value: "15",
      subtitle: "Đang làm việc", 
      icon: UserCheck,
      color: "bg-green-500"
    },
    {
      title: "Bệnh nhân",
      value: "342",
      subtitle: "Tổng số",
      icon: Users,
      color: "bg-purple-500"
    }
  ];

  // Dữ liệu lịch khám sắp tới
  const upcomingAppointments = [
    {
      id: "APT001",
      patient: "Nguyễn Văn A",
      doctor: "BS. Trần Thị B",
      date: "2025-01-10",
      time: "09:00",
      status: "Confirmed"
    },
    {
      id: "APT002", 
      patient: "Lê Thị C",
      doctor: "BS. Phạm Văn D",
      date: "2025-01-10",
      time: "10:30",
      status: "Pending"
    },
    {
      id: "APT003",
      patient: "Hoàng Văn E", 
      doctor: "BS. Trần Thị B",
      date: "2025-01-10",
      time: "14:00",
      status: "Confirmed"
    },
    {
      id: "APT004",
      patient: "Đỗ Thị F",
      doctor: "BS. Nguyễn Văn G", 
      date: "2025-01-10",
      time: "15:30",
      status: "Pending"
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Confirmed") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (status === "Pending") {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hoạt động hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lịch khám 7 ngày gần nhất */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lịch khám 7 ngày gần nhất
          </h3>
          <div className="h-64">
            <div className="flex items-end justify-between h-full space-x-2">
              {[
                { day: "T2", count: 12, height: "h-16" },
                { day: "T3", count: 18, height: "h-20" },
                { day: "T4", count: 15, height: "h-18" },
                { day: "T5", count: 22, height: "h-24" },
                { day: "T6", count: 19, height: "h-20" },
                { day: "T7", count: 8, height: "h-12" },
                { day: "CN", count: 5, height: "h-8" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-full bg-blue-500 rounded-t ${item.height} mb-2`}></div>
                  <span className="text-xs text-gray-600">{item.day}</span>
                  <span className="text-xs font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trạng thái lịch khám */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Trạng thái lịch khám
          </h3>
          <div className="h-64">
            <div className="flex items-center justify-center h-full">
              <div className="relative w-48 h-48">
                {/* Pie chart simulation */}
                <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                <div className="absolute inset-0 rounded-full border-8 border-green-500 transform rotate-90"></div>
                <div className="absolute inset-0 rounded-full border-8 border-yellow-500 transform rotate-180"></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-500 transform rotate-270"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Tổng lịch</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="text-sm font-medium">8%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
                <span className="text-sm font-medium">2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Lịch khám sắp tới
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã lịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bệnh nhân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(appointment.status)}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
