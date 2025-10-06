import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import SpecialScheduleModal from "./components/SpecialScheduleModal";

const SpecialSchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Dữ liệu mẫu
  const [schedules, setSchedules] = useState([
    {
      id: "SPEC001",
      doctorName: "BS. Trần Thị Bích",
      date: "2025-01-15",
      workTime: "08:00 - 12:00",
      slotDuration: "30 phút",
      status: "Làm việc"
    },
    {
      id: "SPEC002", 
      doctorName: "BS. Phạm Văn Dũng",
      date: "2025-01-20",
      workTime: "Nghỉ cả ngày",
      slotDuration: "-",
      status: "Nghỉ"
    },
    {
      id: "SPEC003",
      doctorName: "BS. Nguyễn Văn Giang", 
      date: "2025-01-18",
      workTime: "14:00 - 18:00",
      slotDuration: "30 phút",
      status: "Làm việc"
    }
  ]);

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch đặc biệt này?")) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  const handleSaveSchedule = (scheduleData) => {
    if (editingSchedule) {
      // Cập nhật lịch đặc biệt
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id ? { ...schedule, ...scheduleData } : schedule
      ));
    } else {
      // Thêm lịch đặc biệt mới
      const newSchedule = {
        id: `SPEC${String(schedules.length + 1).padStart(3, '0')}`,
        ...scheduleData
      };
      setSchedules([...schedules, newSchedule]);
    }
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Làm việc") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch đặc biệt</h1>
          <p className="text-gray-600 mt-1">Quản lý các thay đổi tạm thời trong lịch làm việc</p>
        </div>
        <Button 
          onClick={handleAddSchedule}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm lịch đặc biệt
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã lịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ làm việc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời lượng slot
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
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {schedule.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.workTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {schedule.slotDuration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(schedule.status)}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditSchedule(schedule)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
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
      <SpecialScheduleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSchedule(null);
        }}
        onSave={handleSaveSchedule}
        editingSchedule={editingSchedule}
      />
    </div>
  );
};

export default SpecialSchedulePage;
