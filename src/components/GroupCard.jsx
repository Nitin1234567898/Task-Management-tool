import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Check, FolderOpen, Pencil } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GroupCard({
  group,
  onUpdateTitle,
  onAddTask,
  onToggleTask,
  onDeleteGroup,
}) {
  const [newTaskText, setNewTaskText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(group.id, newTaskText.trim());
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const handleUpdateTitle = (newTitle) => {
    if (newTitle.trim()) {
      onUpdateTitle(group.id, newTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleToggleTask = (taskId, isCompleted) => {
    if (!isCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#CCCCCC', '#999999'],
      });
    }
    onToggleTask(group.id, taskId);
  };

  const cardStyle = {
    backgroundColor: 'rgba(28, 28, 28, 0.7)', // Dark grey, almost black
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderColor: 'rgba(255, 255, 255, 0.1)', // Faint white border
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={cardStyle}
      className="w-full rounded-2xl border text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <FolderOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {isEditingTitle ? (
            <input
              type="text"
              defaultValue={group.title}
              onBlur={(e) => handleUpdateTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle(e.target.value)}
              className="bg-transparent border-b border-gray-600 focus:outline-none text-white font-semibold w-full"
              autoFocus
            />
          ) : (
            <h2 className="font-semibold truncate">{group.title}</h2>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 text-gray-400">
          <button onClick={() => setIsEditingTitle(true)} className="p-1 rounded hover:bg-gray-700 hover:text-white" aria-label="Edit title">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setIsAdding(!isAdding)} className="p-1 rounded hover:bg-gray-700 hover:text-white" aria-label="Add task">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => onDeleteGroup(group.id)} className="p-1 rounded hover:bg-gray-700 hover:text-white" aria-label="Delete group">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
        {group.tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <button
              onClick={() => handleToggleTask(task.id, task.completed)}
              className={`w-5 h-5 rounded border-2 flex-shrink-0 transition-colors ${
                task.completed ? 'bg-gray-200 border-gray-400' : 'border-gray-600'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-black" />}
            </button>
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {task.text}
            </span>
          </div>
        ))}
         {group.tasks.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500 text-center py-4">No tasks yet!</p>
        )}
      </div>

      {/* Add Task Input */}
      {isAdding && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border-t border-gray-700/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="New task..."
              className="w-full px-2 py-1 text-sm bg-black/20 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500"
              autoFocus
            />
            <button onClick={handleAddTask} className="px-3 py-1 text-sm font-semibold bg-gray-800 rounded hover:bg-gray-700">
              Add
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
