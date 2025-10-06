import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import PatientModal from "./components/PatientModal";

const PatientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patients, setPatients] = useState([
    {
      id: "PAT001",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      age: 35,
      gender: "Nam",
      address: "Hà Nội",
      status: "Hoạt động",
      registrationDate: "2025-01-05"
    },
    {
      id: "PAT002",
      name: "Lê Thị C",
      phone: "0987654321", 
      email: "lethic@email.com",
      age: 28,
      gender: "Nữ",
      address: "TP.HCM",
      status: "Hoạt động",
      registrationDate: "2025-01-06"
    },
    {
      id: "PAT003",
      name: "Hoàng Văn E",
      phone: "0369852147",
      email: "hoangvane@email.com",
      age: 42,
      gender: "Nam",
      address: "Đà Nẵng",
      status: "Hoạt động",
      registrationDate: "2025-01-07"
    },
    {
      id: "PAT004",
      name: "Đỗ Thị F",
      phone: "0741258963",
      email: "dothif@email.com",
      age: 31,
      gender: "Nữ",
      address: "Cần Thơ",
      status: "Tạm khóa",
      registrationDate: "2025-01-08"
    },
    {
      id: "PAT005",
      name: "Phạm Văn G",
      phone: "0912345678",
      email: "phamvang@email.com",
      age: 55,
      gender: "Nam",
      address: "Hải Phòng",
      status: "Hoạt động",
      registrationDate: "2025-01-09"
    }
  ]);

  const handleAddPatient = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này?")) {
      setPatients(patients.filter(patient => patient.id !== patientId));
    }
  };

  const handleViewPatient = (patient) => {
    console.log("Xem chi tiết bệnh nhân:", patient);
  };

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      // Cập nhật bệnh nhân
      setPatients(patients.map(patient => 
        patient.id === editingPatient.id ? { ...patient, ...patientData } : patient
      ));
    } else {
      // Thêm bệnh nhân mới
      const newPatient = {
        id: `PAT${String(patients.length + 1).padStart(3, '0')}`,
        registrationDate: new Date().toISOString().split('T')[0],
        ...patientData
      };
      setPatients([...patients, newPatient]);
    }
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    return status === "Hoạt động" 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin bệnh nhân</p>
        </div>
        <Button 
          onClick={handleAddPatient}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm bệnh nhân
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã bệnh nhân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuổi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giới tính
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
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
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(patient.status)}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewPatient(patient)}
                      className="text-green-600 hover:text-green-900"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditPatient(patient)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
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
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPatient(null);
        }}
        onSave={handleSavePatient}
        editingPatient={editingPatient}
      />
    </div>
  );
};

export default PatientsPage;
