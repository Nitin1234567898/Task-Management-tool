import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Zap } from 'lucide-react';
import { GroupCard } from './components/GroupCard';
import { Greeting } from './components/Greeting'; // Import the new component
import LightPillarBackground from './components/LightPillarBackground';

export default function App() {
  const [groups, setGroups] = useState([]); // Initial state is now an empty array

  const { completedTasks, totalTasks, progress } = useMemo(() => {
    const allTasks = groups.flatMap(g => g.tasks);
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.completed).length;
    const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
    return { completedTasks: completed, totalTasks: total, progress: progressPercentage };
  }, [groups]);

  const addGroup = () => {
    const newGroup = {
      id: `group-${crypto.randomUUID()}`,
      title: 'New Group',
      tasks: [],
    };
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (groupId) => {
    setGroups(groups.filter((g) => g.id !== groupId));
  };

  const updateGroupTitle = (groupId, newTitle) => {
    setGroups(groups.map((g) => (g.id === groupId ? { ...g, title: newTitle } : g)));
  };

  const addTask = (groupId, taskText) => {
    const newTask = { id: `task-${crypto.randomUUID()}`, text: taskText, completed: false };
    setGroups(groups.map((g) => (g.id === groupId ? { ...g, tasks: [...g.tasks, newTask] } : g)));
  };

  const toggleTask = (groupId, taskId) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        return { ...g, tasks: g.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) };
      })
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Layer 1: Background. Fixed to viewport and behind everything else. */}
      <div className="fixed inset-0 z-0">
        <LightPillarBackground />
      </div>

      {/* Layer 3: Fixed UI Elements */}
      <div className="fixed top-0 left-0 z-20 w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="m-4 p-2 px-4 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md shadow-lg w-fit pointer-events-auto"
        >
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Zap className="w-4 h-4 text-gray-400" />
            <span>Level Progress</span><span className="text-gray-600">•</span><span>{completedTasks}/{totalTasks} XP</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={addGroup}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-gray-700"
        aria-label="Add new group"
      >
        <Plus size={32} />
      </motion.button>

      {/* Layer 2: Scrollable Grid Content */}
      <main className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 pt-24">
          <AnimatePresence>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onUpdateTitle={updateGroupTItle}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteGroup={deleteGroup}
              />
            ))}
          </AnimatePresence>
        </div>
        {groups.length === 0 && <Greeting />}
      </main>
    </div>
  );
}
