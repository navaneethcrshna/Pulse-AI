import React, { useState } from 'react';
import { Task, CompletedLog } from '../types';

interface TaskScreenProps {
  tasks: Task[];
  completedLogs: CompletedLog[];
  onToggleTaskComplete: (taskId: string, triggerRect?: DOMRect) => void;
  onSelectTaskForContext: (task: Task) => void;
  onSelectTaskForNotify: (task: Task) => void;
}

export const TaskScreen: React.FC<TaskScreenProps> = ({
  tasks,
  completedLogs,
  onToggleTaskComplete,
  onSelectTaskForContext,
  onSelectTaskForNotify,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'slack' | 'email' | 'today'>('all');
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);

  // Active uncompleted tasks
  const uncompletedTasks = tasks.filter((t) => !t.completed);

  // Filter logic
  const filteredTasks = uncompletedTasks.filter((task) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'slack') return task.type.includes('slack');
    if (activeFilter === 'email') return task.type.includes('email');
    if (activeFilter === 'today') return task.type.includes('today');
    return true;
  });

  // Calculate live counts
  const totalActiveCount = uncompletedTasks.length;
  const slackCount = uncompletedTasks.filter((t) => t.type.includes('slack')).length;
  const emailCount = uncompletedTasks.filter((t) => t.type.includes('email')).length;
  const todayCount = uncompletedTasks.filter((t) => t.type.includes('today')).length;
  const highPriorityCount = uncompletedTasks.filter((t) => t.isHighPriority).length;

  const handleCheckboxClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCompletingTaskId(task.id);
    setTimeout(() => {
      onToggleTaskComplete(task.id, rect);
      setCompletingTaskId(null);
    }, 450);
  };

  const handleOneTapApprove = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCompletingTaskId(task.id);
    setTimeout(() => {
      onToggleTaskComplete(task.id, rect);
      setCompletingTaskId(null);
    }, 450);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-28 pt-3 space-y-4 max-w-xl mx-auto">
      {/* Executive AI Morning Briefing Card */}
      <section className="relative overflow-hidden rounded-xl bg-[#191b23] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] p-5 border border-white/[0.04]">
        {/* Atmospheric Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#3131c0]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col space-y-3">
          {/* Card Sub-header & Pulsing Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3131c0]/30 text-[#c0c1ff] border border-[#c0c1ff]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </span>
              <span className="font-['Geist'] text-[11px] uppercase tracking-wider font-semibold">
                Autonomous Synthesis
              </span>
            </div>
            <span className="font-['Geist'] text-xs text-[#bbcabf] flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-[14px] text-[#4edea3]">auto_awesome</span>
              98.4% Acc.
            </span>
          </div>

          {/* Briefing Body */}
          <div className="space-y-1">
            <h2 className="font-['Space_Grotesk'] text-lg text-[#e1e1ed] font-semibold tracking-tight">
              Executive Telemetry Brief
            </h2>
            <p className="font-['Geist'] text-sm text-[#bbcabf] leading-relaxed">
              <span className="font-semibold text-[#4edea3]">
                {totalActiveCount} critical directive{totalActiveCount === 1 ? '' : 's'}
              </span>{' '}
              synthesized across 42 executive communications and 8 Slack channels over past 7 days.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="flex flex-col p-2.5 rounded-lg bg-[#1d1f28] shadow-sm border border-white/[0.03]">
              <span className="font-['Space_Grotesk'] text-base text-[#4edea3] font-bold font-mono">
                {String(highPriorityCount).padStart(2, '0')}
              </span>
              <span className="font-['Geist'] text-[10px] text-[#bbcabf] uppercase tracking-wider mt-0.5 font-medium">
                High Priority
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#1d1f28] shadow-sm border border-white/[0.03]">
              <span className="font-['Space_Grotesk'] text-base text-[#c0c1ff] font-bold font-mono">
                02
              </span>
              <span className="font-['Geist'] text-[10px] text-[#bbcabf] uppercase tracking-wider mt-0.5 font-medium">
                Awaiting Reply
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#1d1f28] shadow-sm border border-white/[0.03]">
              <span className="font-['Space_Grotesk'] text-base text-[#7bd0ff] font-bold font-mono">
                15m
              </span>
              <span className="font-['Geist'] text-[10px] text-[#bbcabf] uppercase tracking-wider mt-0.5 font-medium">
                Est. Throughput
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Stream Controls */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Geist'] text-[11px] uppercase font-semibold transition-all active:scale-95 shrink-0 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_16px_rgba(78,222,163,0.35)]'
              : 'bg-[#1d1f28] text-[#bbcabf] hover:text-[#e1e1ed]'
          }`}
          type="button"
        >
          <span>All Actions</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === 'all'
                ? 'bg-[#003824]/20 text-[#003824]'
                : 'bg-[#33343d] text-[#bbcabf]'
            }`}
          >
            {totalActiveCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('slack')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Geist'] text-[11px] uppercase font-semibold transition-all active:scale-95 shrink-0 cursor-pointer ${
            activeFilter === 'slack'
              ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_16px_rgba(78,222,163,0.35)]'
              : 'bg-[#1d1f28] text-[#bbcabf] hover:text-[#e1e1ed]'
          }`}
          type="button"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]"></span>
          <span>Slack Feeds</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === 'slack'
                ? 'bg-[#003824]/20 text-[#003824]'
                : 'bg-[#33343d] text-[#bbcabf]'
            }`}
          >
            {slackCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('email')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Geist'] text-[11px] uppercase font-semibold transition-all active:scale-95 shrink-0 cursor-pointer ${
            activeFilter === 'email'
              ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_16px_rgba(78,222,163,0.35)]'
              : 'bg-[#1d1f28] text-[#bbcabf] hover:text-[#e1e1ed]'
          }`}
          type="button"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]"></span>
          <span>Unopened Email</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === 'email'
                ? 'bg-[#003824]/20 text-[#003824]'
                : 'bg-[#33343d] text-[#bbcabf]'
            }`}
          >
            {emailCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('today')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Geist'] text-[11px] uppercase font-semibold transition-all active:scale-95 shrink-0 cursor-pointer ${
            activeFilter === 'today'
              ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_16px_rgba(78,222,163,0.35)]'
              : 'bg-[#1d1f28] text-[#bbcabf] hover:text-[#e1e1ed]'
          }`}
          type="button"
        >
          <span>Due Today</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === 'today'
                ? 'bg-[#003824]/20 text-[#003824]'
                : 'bg-[#33343d] text-[#bbcabf]'
            }`}
          >
            {todayCount}
          </span>
        </button>
      </section>

      {/* Feed Header Telemetry */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">view_timeline</span>
          <span className="font-['Space_Grotesk'] text-xs text-[#e1e1ed] tracking-wider uppercase font-semibold">
            Priority Feed
          </span>
        </div>
        <span className="font-['Geist'] text-[11px] text-[#bbcabf] font-mono">
          Order: AI Impact Score
        </span>
      </div>

      {/* Task Stream / Cards */}
      <div className="space-y-3" id="task-feed">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#191b23] border border-white/[0.04]">
            <span className="material-symbols-outlined text-4xl text-[#4edea3] mb-2">task_alt</span>
            <p className="font-['Space_Grotesk'] text-base text-white font-medium">All Directives Clear</p>
            <p className="text-xs text-[#bbcabf] mt-1">No pending tasks matching this filter filter.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleting = completingTaskId === task.id;

            return (
              <article
                key={task.id}
                onClick={() => onSelectTaskForContext(task)}
                className={`task-card group relative flex flex-col p-4 rounded-xl bg-[#191b23] shadow-md transition-all duration-300 hover:bg-[#1d1f28] border cursor-pointer ${
                  isCompleting
                    ? 'completing shadow-[0_0_24px_rgba(16,185,129,0.35)] border-[#4edea3]/50 scale-[0.99] translate-x-1'
                    : 'border-white/[0.04] hover:border-white/[0.1]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Interactive Checkbox with animated SVG stroke */}
                  <button
                    aria-label={`Mark "${task.title}" as completed`}
                    onClick={(e) => handleCheckboxClick(e, task)}
                    className={`task-checkbox relative mt-0.5 min-w-[24px] min-h-[24px] w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-300 active:scale-90 shadow-inner cursor-pointer ${
                      task.completed || isCompleting
                        ? 'checked bg-[#10b981] border-[#4edea3] shadow-[0_0_16px_rgba(16,185,129,0.8)]'
                        : 'bg-[#0c0e16] border-[#3c4a42]/80 hover:border-[#4edea3]/80'
                    }`}
                    type="button"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke={task.completed || isCompleting ? '#003824' : 'transparent'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 14 14"
                    >
                      <path className="checkmark-path" d="M2.5 7.5L5.5 10.5L11.5 3.5"></path>
                    </svg>
                  </button>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Origin & Telemetry Badges */}
                    <div className="flex items-center flex-wrap gap-2">
                      {task.channelName?.startsWith('#') ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#3131c0]/20 text-[#c0c1ff] font-['Geist'] text-[11px] font-semibold">
                          <span className="font-bold">#</span> {task.channelName.replace('#', '')}
                        </span>
                      ) : task.source.includes('Gmail') ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] font-['Geist'] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[12px]">mail</span> Gmail
                        </span>
                      ) : task.source.includes('Outlook') ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#19aee8]/25 text-[#7bd0ff] font-['Geist'] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[12px]">mail_outline</span> Outlook
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#3131c0]/20 text-[#c0c1ff] font-['Geist'] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[12px]">chat</span> Direct Message
                        </span>
                      )}

                      {task.id === 'task-1' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#93000a]/30 text-[#ffb4ab] font-['Geist'] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[11px]">alternate_email</span> Direct Mention
                        </span>
                      )}

                      {task.id === 'task-2' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#19aee8]/20 text-[#7bd0ff] font-['Geist'] text-[11px] font-semibold">
                          Urgent Follow-up
                        </span>
                      )}

                      {task.id === 'task-4' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#33343d] text-[#bbcabf] font-['Geist'] text-[11px]">
                          <span className="material-symbols-outlined text-[11px]">forum</span> 4 Replies
                        </span>
                      )}

                      <span className={`font-['Geist'] text-[11px] font-mono ml-auto flex items-center gap-0.5 ${task.timeDueColor || 'text-[#4edea3]'}`}>
                        {task.timeDue.includes('PM') && (
                          <span className="material-symbols-outlined text-[13px]">alarm</span>
                        )}
                        {task.timeDue}
                      </span>
                    </div>

                    {/* Main Directive */}
                    <h3 className="font-['Space_Grotesk'] text-base text-[#e1e1ed] font-semibold tracking-tight leading-snug">
                      <span className={`strikethrough-sweep ${isCompleting ? 'completing' : ''}`}>
                        {task.title}
                      </span>
                    </h3>

                    {/* Sub-Snippet Quote */}
                    <div className="p-2.5 rounded-lg bg-[#0c0e16]/60 border border-white/[0.02]">
                      <p className="font-['Geist'] text-xs text-[#bbcabf] italic truncate">
                        {task.quoteSnippet}
                      </p>
                    </div>

                    {/* Meta Author & Action Trigger Footprint */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        {task.author.avatarUrl ? (
                          <img
                            alt={task.author.name}
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-white/10"
                            src={task.author.avatarUrl}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[#3131c0] flex items-center justify-center text-[10px] text-[#c0c1ff] font-bold">
                            {task.author.initials || 'LC'}
                          </div>
                        )}
                        <span className="font-['Geist'] text-xs text-[#bbcabf]">
                          {task.author.name}
                        </span>
                      </div>

                      {/* Right Action Badge or One-Tap Approve */}
                      {task.actionFooter.type === 'approve-btn' ? (
                        <button
                          onClick={(e) => handleOneTapApprove(e, task)}
                          className="approve-action-btn flex items-center gap-1 px-2.5 py-1 rounded bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] font-['Geist'] text-[11px] font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
                          type="button"
                        >
                          <span>Approve (1-Tap)</span>
                        </button>
                      ) : task.actionFooter.type === 'auto-reply' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTaskForNotify(task);
                          }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#4edea3]/10 hover:bg-[#4edea3]/20 text-[#4edea3] font-['Geist'] text-[11px] font-medium transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[12px]">send</span>
                          <span>Auto-reply queued</span>
                        </button>
                      ) : task.actionFooter.type === 'draft-ready' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTaskForNotify(task);
                          }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1d1f28] hover:bg-[#282a32] text-[#7bd0ff] font-['Geist'] text-[11px] font-medium border border-white/[0.04] transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[12px]">edit_note</span>
                          <span>Draft ready</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-[#bbcabf] font-['Geist'] text-[11px]">
                          <span className="material-symbols-outlined text-[13px]">attach_file</span>
                          <span>2 Redlines</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Completed Today Intimation Drawer / Summary Footer */}
      <section className="rounded-xl bg-[#191b23] p-4 space-y-2.5 shadow-md border border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
            </div>
            <h4 className="font-['Space_Grotesk'] text-sm text-[#e1e1ed] font-semibold">
              Completed &amp; Intimated Today
            </h4>
          </div>
          <span
            id="completed-counter-badge"
            className="font-['Geist'] text-[11px] text-[#4edea3] px-2.5 py-0.5 rounded bg-[#4edea3]/10 font-bold transition-all duration-300"
          >
            {completedLogs.length} Synced
          </span>
        </div>

        {/* Micro Completed Logs */}
        <div className="space-y-1.5 pt-1">
          {completedLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2 rounded-lg bg-[#1d1f28] text-xs border border-white/[0.02]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px] shrink-0">
                  check_circle
                </span>
                <span className="font-['Geist'] text-xs text-[#bbcabf] truncate line-through">
                  {log.title}
                </span>
              </div>
              <span className="font-['Geist'] text-[11px] text-[#86948a] shrink-0 ml-2 font-mono">
                {log.completedAgo}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
