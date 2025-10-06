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

const DoctorModal = ({ isOpen, onClose, onSave, editingDoctor }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    experience: "",
    status: "Hoạt động"
  });

  const [errors, setErrors] = useState({});

  const specialties = [
    "Tim mạch",
    "Nội khoa", 
    "Ngoại khoa",
    "Sản phụ khoa",
    "Nhi khoa",
    "Da liễu",
    "Mắt",
    "Tai mũi họng",
    "Thần kinh",
    "Tâm thần"
  ];

  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        name: editingDoctor.name || "",
        specialty: editingDoctor.specialty || "",
        phone: editingDoctor.phone || "",
        email: editingDoctor.email || "",
        experience: editingDoctor.experience || "",
        status: editingDoctor.status || "Hoạt động"
      });
    } else {
      setFormData({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        experience: "",
        status: "Hoạt động"
      });
    }
    setErrors({});
  }, [editingDoctor, isOpen]);

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

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên bác sĩ";
    }

    if (!formData.specialty) {
      newErrors.specialty = "Vui lòng chọn chuyên khoa";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Vui lòng nhập kinh nghiệm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingDoctor ? "Sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Tên bác sĩ */}
          <div className="grid gap-2">
            <Label htmlFor="name">Tên bác sĩ *</Label>
            <Input
              id="name"
              placeholder="Nhập tên bác sĩ"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Chuyên khoa */}
          <div className="grid gap-2">
            <Label htmlFor="specialty">Chuyên khoa *</Label>
            <Select 
              value={formData.specialty} 
              onValueChange={(value) => handleInputChange("specialty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialty && (
              <p className="text-red-600 text-sm">{errors.specialty}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Kinh nghiệm */}
          <div className="grid gap-2">
            <Label htmlFor="experience">Kinh nghiệm *</Label>
            <Input
              id="experience"
              placeholder="Ví dụ: 5 năm, 10 năm"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
            />
            {errors.experience && (
              <p className="text-red-600 text-sm">{errors.experience}</p>
            )}
          </div>

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
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Nghỉ phép">Nghỉ phép</SelectItem>
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
            {editingDoctor ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorModal;
