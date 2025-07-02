import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { baseControlClasses, priorityStyles } from '../assets/dummy';

const TaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const [task, setTask] = useState({
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    priority: taskToEdit?.priority || 'Low',
    dueDate: taskToEdit?.dueDate || '',
    completed: taskToEdit?.completed || 'No',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
            <Plus className="text-purple-500" /> Create New Task
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className={baseControlClasses}
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className={baseControlClasses}
                placeholder="Add details about your task"
                rows="3"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={task.priority}
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  className={`${baseControlClasses} ${priorityStyles[task.priority]}`}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                  className={baseControlClasses}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={task.completed === 'No'}
                    onChange={() => setTask({ ...task, completed: 'No' })}
                    className="mr-2"
                  />
                  In Progress
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={task.completed === 'Yes'}
                    onChange={() => setTask({ ...task, completed: 'Yes' })}
                    className="mr-2"
                  />
                  Completed
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-md transition-all duration-200"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;