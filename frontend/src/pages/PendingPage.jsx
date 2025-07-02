import React, { useState, useMemo } from 'react';
import { layoutClasses, SORT_OPTIONS, menuItems, PRODUCTIVITY_CARD } from '../assets/dummy';
import { Clock, Filter, ListChecks, Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModel';

const PendingPage = () => {
  const { tasks = [], refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) => !t.completed || (typeof t.completed === 'string' && t.completed.toLowerCase() === 'no')
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      const order = { high: 3, medium: 2, low: 1 };
      return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()];
    });
  }, [tasks, sortBy]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={layoutClasses.container.replace('p-6', 'p-4 w-64 bg-gray-100')}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PRODUCTIVITY</h2>
          <div className={PRODUCTIVITY_CARD.container}>
            <div className={PRODUCTIVITY_CARD.header}>
              <span className={PRODUCTIVITY_CARD.label}>Completion Rate</span>
            </div>
            <div className={PRODUCTIVITY_CARD.barBg}>
              <div
                className={PRODUCTIVITY_CARD.barFg}
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-purple-700">{completionRate}%</span>
          </div>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path} className={layoutClasses.tabButton(false).replace('px-3', 'px-4')}>
              {item.icon}
              <span className="text-sm font-medium text-gray-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={layoutClasses.container + ' flex-1 p-4'}>
        <div className={layoutClasses.headerWrapper}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <ListChecks className="text-purple-500" /> Pending Task
            </h1>
            <p className="text-sm text-gray-500 mt-1 ml-7">
              {sortedPendingTasks.length} task{sortedPendingTasks.length !== 1 && 's'} needing your attention
            </p>
          </div>
          <div className={layoutClasses.sortBox}>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Filter className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={layoutClasses.select}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>
            <div className={layoutClasses.tabWrapper}>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={layoutClasses.tabButton(sortBy === opt.id)}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={layoutClasses.addBox} onClick={() => setShowModal(true)}>
          <div className="flex items-center justify-center gap-3 text-gray-500 group-hover:text-purple-600 transition-colors">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
              <Plus className="text-purple-500" size={18} />
            </div>
            <span className="font-medium">Add New Task</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-4 flex-1">
            {sortedPendingTasks.length === 0 ? (
              <div className={layoutClasses.emptyState}>
                <div className="max-w-xs mx-auto py-6">
                  <div className={layoutClasses.emptyIconBg}>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Up to date!</h3>
                  <p className="text-sm text-gray-500 mb-4">All tasks are complete – excellent job!</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className={layoutClasses.emptyBtn}
                  >
                    Create New Task
                  </button>
                </div>
              </div>
            ) : (
              sortedPendingTasks.map((task) => (
                <TaskItem
                  key={task._id || task.id}
                  task={task}
                  showCompleteCheckbox
                  onDelete={() => handleDelete(task._id || task.id)}
                  onToggleComplete={() => handleToggleComplete(task._id || task.id, task.completed)}
                  onEdit={() => { setSelectedTask(task); setShowModal(true); }}
                  onRefresh={refreshTasks}
                />
              ))
            )}
          </div>
          <div className="w-64 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Statistics</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Total Tasks</span>
                <span className="text-purple-500">{totalTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Completed</span>
                <span className="text-purple-500">{completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Completion Rate</span>
                <span className="text-purple-500">{completionRate}%</span>
              </div>
              <div className="mt-4">
                <span>Task Progress</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TaskModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setSelectedTask(null); refreshTasks(); }}
          taskToEdit={selectedTask}
        />
      </div>
    </div>
  );
};

export default PendingPage;