/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { INITIAL_TASKS, INITIAL_COMPLETED_LOGS } from './data/mockData';
import { Task, CompletedLog } from './types';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { TaskScreen } from './components/TaskScreen';
import { ContextScreen } from './components/ContextScreen';
import { NotifyScreen } from './components/NotifyScreen';
import { IntegrateScreen } from './components/IntegrateScreen';
import { ConfettiCanvas, ConfettiCanvasRef } from './components/ConfettiCanvas';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { SlackThreadModal } from './components/SlackThreadModal';
import { SimulateIngestModal } from './components/SimulateIngestModal';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [completedLogs, setCompletedLogs] = useState<CompletedLog[]>(INITIAL_COMPLETED_LOGS);
  const [activeTab, setActiveTab] = useState<NavTab>('tasks');
  const [selectedTask, setSelectedTask] = useState<Task>(INITIAL_TASKS[1]); // Default to Elena Vance counter-offer for context
  const [notifyTask, setNotifyTask] = useState<Task>(INITIAL_TASKS[0]); // Default to Q3 hiring roadmap for notify

  // View mode on wide screens
  const [isWideMode, setIsWideMode] = useState<boolean>(false);

  // Modals
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isSlackModalOpen, setIsSlackModalOpen] = useState(false);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);

  // Confetti ref
  const confettiRef = useRef<ConfettiCanvasRef | null>(null);

  // Toast pill state
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    subtitle: string;
    taskId?: string;
    restorableTask?: Task;
  }>({
    visible: false,
    title: 'Task Completed',
    subtitle: 'Intimating channel via Slack...',
  });

  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

  // Trigger confetti burst
  const triggerConfetti = (rect?: DOMRect) => {
    if (confettiRef.current) {
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      confettiRef.current.triggerBurst(x, y);
    }
  };

  // Mark task completed handler with Confetti & Toast
  const handleToggleTaskComplete = (taskId: string, rect?: DOMRect) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];
    if (task.completed) return; // already completed

    // 1. Confetti burst
    triggerConfetti(rect);

    // 2. Mark completed
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: true, completedAt: 'Just now' } : t
    );
    setTasks(updatedTasks);

    // 3. Add to completed ledger
    const newLog: CompletedLog = {
      id: 'log-' + Date.now(),
      title: task.title,
      completedAgo: 'Just now',
      source: task.source,
    };
    setCompletedLogs([newLog, ...completedLogs]);

    // 4. Show Intimation Toast
    if (toastTimeout) clearTimeout(toastTimeout);
    setToast({
      visible: true,
      title: 'Task Completed',
      subtitle: `Intimating ${task.source}...`,
      taskId: task.id,
      restorableTask: task,
    });

    const timeout = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4500);
    setToastTimeout(timeout);
  };

  // Undo task completion
  const handleUndo = () => {
    if (!toast.taskId || !toast.restorableTask) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === toast.taskId ? { ...t, completed: false } : t))
    );
    setCompletedLogs((prev) => prev.filter((log) => log.title !== toast.restorableTask?.title));
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // When user clicks a task in the feed to inspect context
  const handleSelectTaskForContext = (task: Task) => {
    setSelectedTask(task);
    setActiveTab('context');
  };

  // When user clicks action button to jump straight to notify
  const handleSelectTaskForNotify = (task: Task) => {
    setNotifyTask(task);
    setActiveTab('notify');
  };

  // When user completes intimation from NotifyScreen
  const handleConfirmSendNotify = (taskId: string, _message: string, _deliveryMode: string) => {
    handleToggleTaskComplete(taskId);
    setTimeout(() => {
      setActiveTab('tasks');
    }, 1000);
  };

  // Complete silently
  const handleCompleteSilently = (taskId: string) => {
    handleToggleTaskComplete(taskId);
    setActiveTab('tasks');
  };

  // Add synthesized task
  const handleAddSynthesizedTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    triggerConfetti();
    setToast({
      visible: true,
      title: 'New Directive Synthesized',
      subtitle: `${newTask.source} • AI Impact Score 99.4%`,
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3800);
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-[#11131b] text-[#e1e1ed] flex flex-col relative selection:bg-[#4edea3]/30 selection:text-[#4edea3]">
      {/* Particle Canvas */}
      <ConfettiCanvas ref={confettiRef} />

      {/* Persistent App Header */}
      <Header
        activeScreenTitle={activeTab}
        isWideMode={isWideMode}
        onToggleWideMode={() => setIsWideMode(!isWideMode)}
        onQuickSimulate={() => setIsIngestModalOpen(true)}
      />

      {/* Floating Action Toast / Intimation Banner */}
      <div
        className={`fixed top-18 inset-x-4 mx-auto max-w-sm z-[70] bg-[#1d1f28]/95 backdrop-blur-xl border border-[#4edea3]/40 rounded-xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-between gap-3 transition-all duration-300 ease-out ${
          toast.visible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#4edea3]/20 text-[#4edea3] shrink-0">
            <span className="material-symbols-outlined text-[17px] animate-spin">sync</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['Space_Grotesk'] text-xs font-semibold text-[#e1e1ed] truncate">
              {toast.title}
            </span>
            <span className="font-['Geist'] text-[11px] text-[#4edea3] font-mono truncate">
              {toast.subtitle}
            </span>
          </div>
        </div>

        {toast.restorableTask && (
          <button
            onClick={handleUndo}
            className="shrink-0 px-2.5 py-1 rounded-md bg-[#282a32] hover:bg-[#373942] text-xs font-medium text-[#c0c1ff] hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
            type="button"
          >
            Undo
          </button>
        )}
      </div>

      {/* Main View Area */}
      <main className="flex-1 w-full pt-16 flex flex-col items-center">
        {/* If in Wide Console Mode on desktop */}
        {isWideMode ? (
          <div className="w-full max-w-7xl px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
            {/* Left Column: Tasks Feed */}
            <div className="lg:col-span-6 bg-[#0c0e16]/60 rounded-2xl border border-white/[0.04] p-2">
              <div className="p-3 border-b border-white/[0.04] flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                  Active Directives Queue
                </span>
                <span className="text-xs font-mono text-[#4edea3]">
                  {pendingCount} Pending
                </span>
              </div>
              <TaskScreen
                tasks={tasks}
                completedLogs={completedLogs}
                onToggleTaskComplete={handleToggleTaskComplete}
                onSelectTaskForContext={handleSelectTaskForContext}
                onSelectTaskForNotify={handleSelectTaskForNotify}
              />
            </div>

            {/* Right Column: Context Inspector or Dispatch Hub */}
            <div className="lg:col-span-6 bg-[#0c0e16]/60 rounded-2xl border border-white/[0.04] p-2 overflow-y-auto max-h-[calc(100vh-7rem)]">
              <div className="p-3 border-b border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('context')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === 'context'
                        ? 'bg-[#10b981] text-[#002113] font-bold'
                        : 'text-[#bbcabf] hover:text-white'
                    }`}
                  >
                    Deep Context
                  </button>
                  <button
                    onClick={() => setActiveTab('notify')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === 'notify'
                        ? 'bg-[#10b981] text-[#002113] font-bold'
                        : 'text-[#bbcabf] hover:text-white'
                    }`}
                  >
                    Dispatch / Notify
                  </button>
                  <button
                    onClick={() => setActiveTab('integrations')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === 'integrations'
                        ? 'bg-[#10b981] text-[#002113] font-bold'
                        : 'text-[#bbcabf] hover:text-white'
                    }`}
                  >
                    Integrations
                  </button>
                </div>
              </div>

              {activeTab === 'context' && (
                <ContextScreen
                  task={selectedTask}
                  onBackToQueue={() => setActiveTab('tasks')}
                  onMarkDone={(t) => handleToggleTaskComplete(t.id)}
                  onOpenPdfModal={() => setIsPdfModalOpen(true)}
                  onOpenSlackThreadModal={() => setIsSlackModalOpen(true)}
                />
              )}

              {activeTab === 'notify' && (
                <NotifyScreen
                  task={notifyTask}
                  onConfirmSend={handleConfirmSendNotify}
                  onCompleteSilently={handleCompleteSilently}
                />
              )}

              {activeTab === 'integrations' && (
                <IntegrateScreen onTriggerSync={() => triggerConfetti()} />
              )}
            </div>
          </div>
        ) : (
          /* Mobile / Focused View (Exact match to provided screenshots) */
          <div className="w-full">
            {activeTab === 'tasks' && (
              <TaskScreen
                tasks={tasks}
                completedLogs={completedLogs}
                onToggleTaskComplete={handleToggleTaskComplete}
                onSelectTaskForContext={handleSelectTaskForContext}
                onSelectTaskForNotify={handleSelectTaskForNotify}
              />
            )}

            {activeTab === 'context' && (
              <ContextScreen
                task={selectedTask}
                onBackToQueue={() => setActiveTab('tasks')}
                onMarkDone={(t) => handleToggleTaskComplete(t.id)}
                onOpenPdfModal={() => setIsPdfModalOpen(true)}
                onOpenSlackThreadModal={() => setIsSlackModalOpen(true)}
              />
            )}

            {activeTab === 'notify' && (
              <NotifyScreen
                task={notifyTask}
                onConfirmSend={handleConfirmSendNotify}
                onCompleteSilently={handleCompleteSilently}
              />
            )}

            {activeTab === 'integrations' && (
              <IntegrateScreen onTriggerSync={() => triggerConfetti()} />
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingTasksCount={pendingCount}
      />

      {/* Modals */}
      <PdfPreviewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onApproveDirectly={() => {
          handleToggleTaskComplete('task-2');
          setActiveTab('tasks');
        }}
      />

      <SlackThreadModal
        isOpen={isSlackModalOpen}
        onClose={() => setIsSlackModalOpen(false)}
        onPostReply={(reply) => {
          setToast({
            visible: true,
            title: 'Reply Dispatched to #eng-hiring-leads',
            subtitle: `“${reply.slice(0, 35)}...”`,
          });
          setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3500);
        }}
      />

      <SimulateIngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onAddTask={handleAddSynthesizedTask}
      />
    </div>
  );
}
