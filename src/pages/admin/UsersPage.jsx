import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const UsersPage = () => {
  const [users] = useState([
    {
      id: "USR001",
      username: "admin",
      fullName: "Nguyễn Văn Admin",
      email: "admin@hospital.com",
      role: "Quản trị viên",
      status: "Hoạt động",
      lastLogin: "2025-01-10 09:00"
    },
    {
      id: "USR002",
      username: "doctor01",
      fullName: "BS. Trần Thị Bích",
      email: "doctor01@hospital.com", 
      role: "Bác sĩ",
      status: "Hoạt động",
      lastLogin: "2025-01-10 08:30"
    },
    {
      id: "USR003",
      username: "receptionist01",
      fullName: "Lê Thị C",
      email: "receptionist01@hospital.com",
      role: "Lễ tân",
      status: "Hoạt động", 
      lastLogin: "2025-01-10 07:45"
    }
  ]);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    return status === "Hoạt động" 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (role === "Quản trị viên") {
      return `${baseClasses} bg-purple-100 text-purple-800`;
    } else if (role === "Bác sĩ") {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="text-gray-600 mt-1">Quản lý tài khoản người dùng hệ thống</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đăng nhập cuối</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
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

export default UsersPage;
