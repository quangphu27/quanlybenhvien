import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpecialScheduleModal = ({ isOpen, onClose, onSave, editingSchedule }) => {
  const [formData, setFormData] = useState({
    doctorName: "",
    date: "",
    workTime: "",
    slotDuration: "",
    status: "Làm việc"
  });

  const [errors, setErrors] = useState({});

  // Danh sách bác sĩ mẫu
  const doctors = [
    "BS. Trần Thị Bích",
    "BS. Phạm Văn Dũng", 
    "BS. Nguyễn Văn Giang",
    "BS. Lê Thị Hoa",
    "BS. Võ Minh Tuấn"
  ];

  useEffect(() => {
    if (editingSchedule) {
      setFormData({
        doctorName: editingSchedule.doctorName || "",
        date: editingSchedule.date || "",
        workTime: editingSchedule.workTime || "",
        slotDuration: editingSchedule.slotDuration || "",
        status: editingSchedule.status || "Làm việc"
      });
    } else {
      setFormData({
        doctorName: "",
        date: "",
        workTime: "",
        slotDuration: "",
        status: "Làm việc"
      });
    }
    setErrors({});
  }, [editingSchedule, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Xóa lỗi khi người dùng nhập
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.doctorName.trim()) {
      newErrors.doctorName = "Vui lòng chọn bác sĩ";
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày";
    }

    if (!formData.workTime.trim()) {
      newErrors.workTime = "Vui lòng nhập giờ làm việc";
    }

    if (formData.status === "Làm việc" && !formData.slotDuration.trim()) {
      newErrors.slotDuration = "Vui lòng nhập thời lượng slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleWorkTimeChange = (value) => {
    if (value === "Nghỉ cả ngày") {
      setFormData(prev => ({
        ...prev,
        workTime: value,
        slotDuration: "-",
        status: "Nghỉ"
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        workTime: value,
        status: "Làm việc"
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingSchedule ? "Sửa lịch đặc biệt" : "Thêm lịch đặc biệt"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Chọn bác sĩ */}
          <div className="grid gap-2">
            <Label htmlFor="doctorName">Bác sĩ *</Label>
            <Select 
              value={formData.doctorName} 
              onValueChange={(value) => handleInputChange("doctorName", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor} value={doctor}>
                    {doctor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorName && (
              <p className="text-red-600 text-sm">{errors.doctorName}</p>
            )}
          </div>

          {/* Chọn ngày */}
          <div className="grid gap-2">
            <Label htmlFor="date">Ngày *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            {errors.date && (
              <p className="text-red-600 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Giờ làm việc */}
          <div className="grid gap-2">
            <Label htmlFor="workTime">Giờ làm việc *</Label>
            <Select 
              value={formData.workTime} 
              onValueChange={handleWorkTimeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giờ làm việc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00 - 12:00">08:00 - 12:00</SelectItem>
                <SelectItem value="14:00 - 18:00">14:00 - 18:00</SelectItem>
                <SelectItem value="08:00 - 18:00">08:00 - 18:00</SelectItem>
                <SelectItem value="Nghỉ cả ngày">Nghỉ cả ngày</SelectItem>
              </SelectContent>
            </Select>
            {errors.workTime && (
              <p className="text-red-600 text-sm">{errors.workTime}</p>
            )}
          </div>

          {/* Thời lượng slot */}
          {formData.status === "Làm việc" && (
            <div className="grid gap-2">
              <Label htmlFor="slotDuration">Thời lượng slot *</Label>
              <Select 
                value={formData.slotDuration} 
                onValueChange={(value) => handleInputChange("slotDuration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời lượng slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 phút">15 phút</SelectItem>
                  <SelectItem value="30 phút">30 phút</SelectItem>
                  <SelectItem value="45 phút">45 phút</SelectItem>
                  <SelectItem value="60 phút">60 phút</SelectItem>
                </SelectContent>
              </Select>
              {errors.slotDuration && (
                <p className="text-red-600 text-sm">{errors.slotDuration}</p>
              )}
            </div>
          )}

          {/* Trạng thái */}
          <div className="grid gap-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Làm việc">Làm việc</SelectItem>
                <SelectItem value="Nghỉ">Nghỉ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Hủy
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            {editingSchedule ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialScheduleModal;
