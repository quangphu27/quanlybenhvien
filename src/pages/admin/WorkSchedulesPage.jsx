import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const WorkSchedulesPage = () => {
  const [schedules] = useState([
    {
      id: "WS001",
      doctor: "BS. Trần Thị Bích",
      specialty: "Tim mạch",
      dayOfWeek: "Thứ 2",
      startTime: "08:00",
      endTime: "12:00",
      slotDuration: "30 phút",
      status: "Hoạt động"
    },
    {
      id: "WS002",
      doctor: "BS. Phạm Văn Dũng",
      specialty: "Nội khoa", 
      dayOfWeek: "Thứ 3",
      startTime: "14:00",
      endTime: "18:00",
      slotDuration: "30 phút",
      status: "Hoạt động"
    }
  ]);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    return status === "Hoạt động" 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Lịch làm việc</h1>
          <p className="text-gray-600 mt-1">Quản lý lịch làm việc của bác sĩ</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm lịch làm việc
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã lịch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bác sĩ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thứ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giờ bắt đầu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giờ kết thúc</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời lượng slot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.dayOfWeek}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.slotDuration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(schedule.status)}>{schedule.status}</span>
                  </td>
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

export default WorkSchedulesPage;
