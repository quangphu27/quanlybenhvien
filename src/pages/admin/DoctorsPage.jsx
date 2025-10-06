import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import DoctorModal from "./components/DoctorModal";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Dữ liệu mẫu bác sĩ
  const [doctors, setDoctors] = useState([
    {
      id: "DOC001",
      name: "BS. Trần Thị Bích",
      specialty: "Tim mạch",
      phone: "0123456789",
      email: "tranthibich@hospital.com",
      experience: "10 năm",
      status: "Hoạt động"
    },
    {
      id: "DOC002",
      name: "BS. Phạm Văn Dũng", 
      specialty: "Nội khoa",
      phone: "0987654321",
      email: "phamvandung@hospital.com",
      experience: "8 năm",
      status: "Hoạt động"
    },
    {
      id: "DOC003",
      name: "BS. Nguyễn Văn Giang",
      specialty: "Ngoại khoa", 
      phone: "0369852147",
      email: "nguyenvangiang@hospital.com",
      experience: "12 năm",
      status: "Nghỉ phép"
    },
    {
      id: "DOC004",
      name: "BS. Lê Thị Hoa",
      specialty: "Sản phụ khoa",
      phone: "0741258963", 
      email: "lethihua@hospital.com",
      experience: "6 năm",
      status: "Hoạt động"
    }
  ]);

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  const handleSaveDoctor = (doctorData) => {
    if (editingDoctor) {
      // Cập nhật bác sĩ
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id ? { ...doctor, ...doctorData } : doctor
      ));
    } else {
      // Thêm bác sĩ mới
      const newDoctor = {
        id: `DOC${String(doctors.length + 1).padStart(3, '0')}`,
        ...doctorData
      };
      setDoctors([...doctors, newDoctor]);
    }
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Hoạt động") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Bác sĩ</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin bác sĩ trong hệ thống</p>
        </div>
        <Button 
          onClick={handleAddDoctor}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm bác sĩ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng số bác sĩ</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(d => d.status === "Hoạt động").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-500">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nghỉ phép</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(d => d.status === "Nghỉ phép").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chuyên khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kinh nghiệm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(doctor.status)}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-600 hover:text-red-900"
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
      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDoctor(null);
        }}
        onSave={handleSaveDoctor}
        editingDoctor={editingDoctor}
      />
    </div>
  );
};

export default DoctorsPage;
