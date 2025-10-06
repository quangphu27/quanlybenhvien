import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Key } from "lucide-react";
import UserModal from "./components/UserModal";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
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
    },
    {
      id: "USR004",
      username: "nurse01",
      fullName: "Nguyễn Thị D",
      email: "nurse01@hospital.com",
      role: "Y tá",
      status: "Hoạt động",
      lastLogin: "2025-01-10 07:30"
    },
    {
      id: "USR005",
      username: "manager01",
      fullName: "Trần Văn E",
      email: "manager01@hospital.com",
      role: "Quản lý",
      status: "Tạm khóa",
      lastLogin: "2025-01-09 16:20"
    }
  ]);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleViewUser = (user) => {
    console.log("Xem chi tiết người dùng:", user);
  };

  const handleResetPassword = (user) => {
    console.log("Reset mật khẩu cho:", user);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Cập nhật người dùng
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
    } else {
      // Thêm người dùng mới
      const newUser = {
        id: `USR${String(users.length + 1).padStart(3, '0')}`,
        lastLogin: "Chưa đăng nhập",
        ...userData
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

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
    } else if (role === "Y tá") {
      return `${baseClasses} bg-pink-100 text-pink-800`;
    } else if (role === "Quản lý") {
      return `${baseClasses} bg-orange-100 text-orange-800`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="text-gray-600 mt-1">Quản lý tài khoản người dùng hệ thống</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên đăng nhập
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đăng nhập cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-green-600 hover:text-green-900"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleResetPassword(user)}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Reset mật khẩu"
                    >
                      <Key className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
    </div>
  );
};

export default UsersPage;
