import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  emp: any;
  refreshData: () => void;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  emp,
  refreshData,
}: ConfirmDeleteModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/employees/${emp.id}`
      );
      console.log("Delete response:", response);
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {emp?.name}?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
