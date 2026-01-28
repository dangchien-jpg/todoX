import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const handleClick = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {title: newTaskTitle});
        toast.success("Thêm nhiệm vụ thành công");
        handleNewTaskAdded();
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi thêm nhiệm vụ");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập nội dung để thêm nhiệm vụ");
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      handleClick();
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6 cursor-pointer"
          onClick={handleClick}
          disabled = {!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
