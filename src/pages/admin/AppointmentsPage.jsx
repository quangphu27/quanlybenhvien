import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

const AppointmentsPage = () => {
  const [appointments] = useState([
    {
      id: "APT001",
      patient: "Nguyễn Văn A",
      doctor: "BS. Trần Thị B",
      date: "2025-01-10",
      time: "09:00",
      specialty: "Tim mạch",
      status: "Confirmed"
    },
    {
      id: "APT002",
      patient: "Lê Thị C", 
      doctor: "BS. Phạm Văn D",
      date: "2025-01-10",
      time: "10:30",
      specialty: "Nội khoa",
      status: "Pending"
    },
    {
      id: "APT003",
      patient: "Hoàng Văn E",
      doctor: "BS. Trần Thị B",
      date: "2025-01-10", 
      time: "14:00",
      specialty: "Tim mạch",
      status: "Confirmed"
    }
  ]);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Lịch khám</h1>
          <p className="text-gray-600 mt-1">Quản lý lịch hẹn khám bệnh</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm lịch khám
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã lịch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bệnh nhân</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bác sĩ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giờ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-green-600 hover:text-green-900"><CheckCircle className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><XCircle className="w-4 h-4" /></button>
                    <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
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

export default AppointmentsPage;
