import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import SpecialtyModal from "./components/SpecialtyModal";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);

  const [specialties, setSpecialties] = useState([
    {
      id: "SPE001",
      name: "Tim mạch",
      description: "Chuyên điều trị các bệnh về tim và mạch máu",
      doctorCount: 3,
      status: "Hoạt động"
    },
    {
      id: "SPE002",
      name: "Nội khoa",
      description: "Chuyên điều trị các bệnh nội khoa tổng quát",
      doctorCount: 5,
      status: "Hoạt động"
    },
    {
      id: "SPE003",
      name: "Ngoại khoa",
      description: "Chuyên phẫu thuật và điều trị ngoại khoa",
      doctorCount: 4,
      status: "Hoạt động"
    },
    {
      id: "SPE004",
      name: "Sản phụ khoa",
      description: "Chuyên chăm sóc sức khỏe phụ nữ và sản khoa",
      doctorCount: 2,
      status: "Hoạt động"
    }
  ]);

  const handleAddSpecialty = () => {
    setEditingSpecialty(null);
    setIsModalOpen(true);
  };

  const handleEditSpecialty = (specialty) => {
    setEditingSpecialty(specialty);
    setIsModalOpen(true);
  };

  const handleDeleteSpecialty = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chuyên khoa này?")) {
      setSpecialties(specialties.filter(specialty => specialty.id !== id));
    }
  };

  const handleSaveSpecialty = (specialtyData) => {
    if (editingSpecialty) {
      setSpecialties(specialties.map(specialty => 
        specialty.id === editingSpecialty.id ? { ...specialty, ...specialtyData } : specialty
      ));
    } else {
      const newSpecialty = {
        id: `SPE${String(specialties.length + 1).padStart(3, '0')}`,
        doctorCount: 0,
        ...specialtyData
      };
      setSpecialties([...specialties, newSpecialty]);
    }
    setIsModalOpen(false);
    setEditingSpecialty(null);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Hoạt động") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Chuyên khoa</h1>
          <p className="text-gray-600 mt-1">Quản lý các chuyên khoa trong bệnh viện</p>
        </div>
        <Button 
          onClick={handleAddSpecialty}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm chuyên khoa
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã chuyên khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên chuyên khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số bác sĩ
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
              {specialties.map((specialty) => (
                <tr key={specialty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {specialty.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {specialty.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">{specialty.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {specialty.doctorCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(specialty.status)}>
                      {specialty.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditSpecialty(specialty)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSpecialty(specialty.id)}
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

      <SpecialtyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSpecialty(null);
        }}
        onSave={handleSaveSpecialty}
        editingSpecialty={editingSpecialty}
      />
    </div>
  );
};

export default SpecialtiesPage;
