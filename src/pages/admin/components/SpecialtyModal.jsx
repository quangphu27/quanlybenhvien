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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpecialtyModal = ({ isOpen, onClose, onSave, editingSpecialty }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Hoạt động"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingSpecialty) {
      setFormData({
        name: editingSpecialty.name || "",
        description: editingSpecialty.description || "",
        status: editingSpecialty.status || "Hoạt động"
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Hoạt động"
      });
    }
    setErrors({});
  }, [editingSpecialty, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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
      newErrors.name = "Vui lòng nhập tên chuyên khoa";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
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
            {editingSpecialty ? "Sửa chuyên khoa" : "Thêm chuyên khoa mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên chuyên khoa *</Label>
            <Input
              id="name"
              placeholder="Nhập tên chuyên khoa"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả *</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả chuyên khoa"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

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
                <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
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
            {editingSpecialty ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialtyModal;
