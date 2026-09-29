import React, { useState } from 'react';
import { Task } from '../types';

interface ContextScreenProps {
  task: Task;
  onBackToQueue: () => void;
  onMarkDone: (task: Task) => void;
  onOpenPdfModal?: () => void;
  onOpenSlackThreadModal?: () => void;
}

export const ContextScreen: React.FC<ContextScreenProps> = ({
  task,
  onBackToQueue,
  onMarkDone,
  onOpenPdfModal,
  onOpenSlackThreadModal,
}) => {
  const [isThreadCollapsed, setIsThreadCollapsed] = useState(false);
  const [responseNote, setResponseNote] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const context = task.contextData || {
    dueBadge: 'Due Today',
    extractedAgo: 'Extracted via AI 2 hrs ago',
    readingTime: 'Est. reading time: 1 min',
    touchpoints: 3,
    confidence: '98% Confidence',
    decisionDelta: '+$18,000',
    competitiveRisk: 'High Expiry',
    synthesisText:
      'Pulse AI extracted this task from an unopened thread. Elena Vance requested your explicit sign-off because candidate received an external offer.',
    events: [],
    suggestedDraft: 'Approve base match up to $210k. Proceed with offer pack.',
  };

  const candidate = context.candidate || {
    name: 'Jordan M. Vance-Lee',
    title: 'Ex-Snowflake, Apache Spark Core Contributor',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5P63su9fcXPyxTtXH3f0rci9cS7hhjy318di_6VU4haSB3-grX7d5rNhL1TS-6rQZKpkzPUg8zobYDGpGSGp05cGidhow0xdRxgBiGt1Q2WNbvDnuESiT-dCPpQrPWo0TteFjVcSF4DH1LZ7KF4gsflBJbzYL01vhkrCspohLeNYsu8LzHeGTFnnIpxeTwODQd-7jDvQNP0qIqjUIeaoR7_danR17Sn-Q4vxapobTSWIeJGnT4WYFw',
    topScoreBadge: 'Top 2% Score',
    archRating: '9.6 / 10.0',
    percentage: 96,
  };

  const handleFillDraft = () => {
    setResponseNote(context.suggestedDraft);
  };

  const handleExecuteApproval = () => {
    setIsResolved(true);
    setToastMessage(`Task resolved & Elena Vance intimated via Slackbot!`);
    onMarkDone(task);
  };

  const handleUndo = () => {
    setIsResolved(false);
    setToastMessage(null);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-xl mx-auto">
      {/* Top Navigation & Breadcrumbs */}
      <div className="px-4 sm:px-6 py-2 flex items-center justify-between">
        <button
          onClick={onBackToQueue}
          className="flex items-center gap-1 text-[#bbcabf] hover:text-[#e1e1ed] transition-colors py-1 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-['Geist'] text-xs font-semibold uppercase tracking-wider">
            Back to Queue
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Task telemetry link copied to clipboard!');
              }
            }}
            aria-label="Share telemetry context"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#1d1f28] hover:bg-[#282a32] text-[#bbcabf] hover:text-white transition-colors cursor-pointer border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            aria-label="More options"
            onClick={() => alert(`Active directive ID: ${task.id}\nStatus: Autonomous Parsing Live`)}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#1d1f28] hover:bg-[#282a32] text-[#bbcabf] hover:text-white transition-colors cursor-pointer border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </div>

      {/* Primary Task Executive Header */}
      <div className="px-4 sm:px-6 pt-1 pb-4 flex flex-col gap-2.5">
        {/* Urgency & Provenance Pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#93000a]/30 text-[#ffb4ab] font-['Geist'] text-[11px] uppercase font-semibold border border-[#93000a]/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb4ab] animate-pulse"></span>
            <span>High Priority</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1d1f28] text-[#bbcabf] font-['Geist'] text-[11px] border border-white/[0.04]">
            <span className="material-symbols-outlined text-[13px] text-[#4edea3]">auto_awesome</span>
            <span>{context.extractedAgo}</span>
          </div>
        </div>

        {/* Task Headline */}
        <h1 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#e1e1ed] font-semibold tracking-tight leading-snug">
          {task.title}
        </h1>

        {/* Meta Details Row */}
        <div className="flex items-center gap-3 text-[#bbcabf] font-['Geist'] text-xs flex-wrap font-mono">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#e1e1ed] font-medium">Pending action</span>
          </div>
          <span className="text-[#3c4a42]">·</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#7bd0ff]">schedule</span>
            <span>{context.readingTime}</span>
          </div>
          <span className="text-[#3c4a42]">·</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">timer</span>
            <span className="text-[#ffb4ab] font-medium">{context.dueBadge}</span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 flex flex-col gap-4">
        {/* Recruiter / Origin Lead Mini Card */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#191b23] border border-white/[0.04] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#282a32] shrink-0 ring-1 ring-[#4edea3]/30">
              <img
                alt={task.author.name}
                className="w-full h-full object-cover"
                src={
                  task.author.avatarUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbsIKg9Sy0p4nz1mJRvHrNuLzadgou5yXs3T3LtJ2w3rJbIUqONboBtK7oCNcWtvgisPE0rRJemRxB0RVp7H7HijqThNdoxQkxPQ0W6RRNkzQqN_9N0Nj_M_Y-JLJXJCtiochJ9aWnknG8X7Buq8XoiPlyMRzjKQmY9JH3WOi0jwDvo4gPsWhcdmrBY1Pek3LD0xozSsJU3uE47L1a6MjMI0uthelpTbCwjV926RlZVqP9qVzCf_kRKw'
                }
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-['Space_Grotesk'] text-sm text-[#e1e1ed] font-semibold truncate">
                {task.author.name}
              </span>
              <span className="font-['Geist'] text-xs text-[#bbcabf] truncate">
                {task.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <span className="font-['Geist'] text-[10px] px-2 py-0.5 rounded bg-[#282a32] text-[#4edea3] font-bold tracking-wider font-mono border border-white/[0.05]">
              {context.touchpoints} TOUCHPOINTS
            </span>
          </div>
        </div>

        {/* AI Synthesis Summary Box (Violet/Indigo Monolithic Node) */}
        <div className="relative rounded-xl overflow-hidden bg-[#1d1f28] p-4 sm:p-5 shadow-md border border-[#3131c0]/40">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
            <div className="flex items-center gap-1.5 text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">psychology</span>
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-wider font-bold">
                AI Synthesis
              </span>
            </div>
            {/* Confidence Score Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3131c0]/40 text-[#c0c1ff] font-['Geist'] text-[11px] font-mono border border-[#c0c1ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span>{context.confidence}</span>
            </div>
          </div>

          <p className="font-['Geist'] text-sm text-[#e1e1ed] leading-relaxed mb-3">
            {context.synthesisText}
          </p>

          {/* Key Synthesis Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-lg p-2.5 bg-[#0c0e16]/80 border border-white/[0.04]">
              <span className="font-['Geist'] text-[10px] text-[#86948a] block uppercase tracking-wider mb-0.5 font-medium">
                Decision Delta
              </span>
              <span className="font-['Space_Grotesk'] text-base text-[#4edea3] font-semibold font-mono">
                {context.decisionDelta}
              </span>
              <span className="font-['Geist'] text-xs text-[#bbcabf] block mt-0.5">
                Base match ceiling
              </span>
            </div>
            <div className="rounded-lg p-2.5 bg-[#0c0e16]/80 border border-white/[0.04]">
              <span className="font-['Geist'] text-[10px] text-[#86948a] block uppercase tracking-wider mb-0.5 font-medium">
                Competitive Risk
              </span>
              <span className="font-['Space_Grotesk'] text-base text-[#ffb4ab] font-semibold font-mono">
                {context.competitiveRisk}
              </span>
              <span className="font-['Geist'] text-xs text-[#bbcabf] block mt-0.5">
                Stripe deadline: Today
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Source Telemetry Stream */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] text-xs text-[#e1e1ed] font-semibold uppercase tracking-wider">
                Source Telemetry
              </span>
              <span className="font-['Geist'] text-[10px] px-1.5 py-0.5 rounded bg-[#1d1f28] text-[#bbcabf] font-mono border border-white/[0.04]">
                {context.events?.length || 2} events
              </span>
            </div>

            <button
              onClick={() => setIsThreadCollapsed(!isThreadCollapsed)}
              className="text-[#4edea3] hover:text-[#6ffbbe] font-['Geist'] text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span>{isThreadCollapsed ? 'EXPAND (2)' : 'COLLAPSE ALL'}</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                  isThreadCollapsed ? 'rotate-180' : ''
                }`}
              >
                expand_less
              </span>
            </button>
          </div>

          {!isThreadCollapsed && (
            <div className="flex flex-col gap-2.5 transition-all duration-300">
              {/* Event 1: Gmail Thread */}
              <div className="rounded-xl bg-[#191b23] p-4 flex flex-col gap-2 shadow-sm border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-['Geist'] font-semibold bg-[#282a32] text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-[13px]">mail</span>
                      <span>Gmail</span>
                    </span>
                    <span className="font-['Geist'] text-xs text-[#e1e1ed] font-medium">
                      Elena Vance
                    </span>
                  </div>
                  <span className="font-['Geist'] text-[11px] text-[#86948a] font-mono">
                    Yesterday 4:15 PM
                  </span>
                </div>

                <div className="font-['Geist'] text-[11px] text-[#bbcabf] font-mono">
                  To: <span className="text-[#e1e1ed]">Alex Mercer (VP Eng)</span> &lt;alex@company.com&gt;
                </div>

                <p className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] leading-relaxed">
                  “Hi Alex, we reached consensus on Jordan's Senior Data Engineer loop! Attached is the revised compensation breakdown. Can you confirm if we have green light to match the base salary?”
                </p>

                {/* Attachment Pill with interactive preview */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1d1f28] mt-1 border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-[#93000a]/30 flex items-center justify-center shrink-0 text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Geist'] text-xs text-[#e1e1ed] font-medium truncate">
                        Jordan_Offer_Breakdown_v2.pdf
                      </span>
                      <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                        240 KB • Confidential Exec
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenPdfModal}
                    className="shrink-0 px-2.5 py-1 rounded bg-[#282a32] hover:bg-[#33343d] text-[#e1e1ed] text-[11px] font-['Geist'] font-medium flex items-center gap-1 transition-colors cursor-pointer border border-white/[0.05]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#4edea3]">visibility</span>
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Event 2: Slack Ping Sync */}
              <div className="rounded-xl bg-[#191b23] p-4 flex flex-col gap-2 shadow-sm border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-['Geist'] font-semibold bg-[#282a32] text-[#c0c1ff]">
                      <span className="material-symbols-outlined text-[13px]">tag</span>
                      <span>Slack</span>
                    </span>
                    <span className="font-['Geist'] text-xs text-[#bbcabf] font-mono">
                      #eng-hiring-leads
                    </span>
                  </div>
                  <span className="font-['Geist'] text-[11px] text-[#86948a] font-mono">
                    Yesterday 8:40 PM
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#282a32] shrink-0 mt-0.5 ring-1 ring-white/10">
                    <img
                      alt="Elena Vance"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMFZaEp2Y5afI_khed2P_jJjWQNyOlk6buZR9Y6h1tBqKMaFPY7lNxIb5K1EtGRQXIwdcvhu3O2Pb7dp4KvvFqi3M3ApYNeBrcoHFROTYAeq0WtdVJPnBb8BbzK7fvtH1VDhXNoTVd98ttNIcFQgR1UlWHkPgMejZEV1CbfWQMmRnRDoOqdUYiZdnDDPm9QnmmRm7WmAvBrlpCkOWY2ao_uTYzMS5pqDDc17X2uJENOHJvU88M73JKbg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-['Geist'] text-xs text-[#e1e1ed] font-medium">
                      Elena Vance
                    </span>
                    <p className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] leading-relaxed">
                      “Hey, nudging Jordan's counter-offer here as well in case inbox is swamped! We need to lock the proposal document tonight.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidate Overview Card */}
        <div className="rounded-xl bg-[#1d1f28] p-4 flex flex-col gap-2.5 border border-white/[0.04]">
          <div className="flex items-center justify-between">
            <span className="font-['Geist'] text-[10px] uppercase tracking-wider text-[#86948a] font-semibold">
              Target Profile Insight
            </span>
            <span className="font-['Geist'] text-[10px] px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-bold font-mono">
              {candidate.topScoreBadge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#282a32] shrink-0 ring-1 ring-white/10">
              <img
                alt={candidate.name}
                className="w-full h-full object-cover"
                src={candidate.avatarUrl}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-['Space_Grotesk'] text-sm sm:text-base text-[#e1e1ed] font-semibold truncate">
                {candidate.name}
              </span>
              <span className="font-['Geist'] text-xs text-[#bbcabf] truncate">
                {candidate.title}
              </span>
            </div>
          </div>

          {/* Sparkline / Architecture Metric Bar */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex justify-between font-['Geist'] text-[11px] text-[#86948a] font-mono">
              <span>Technical Architecture Evaluation</span>
              <span className="text-[#4edea3] font-medium">{candidate.archRating}</span>
            </div>
            <div className="h-1.5 w-full bg-[#0c0e16] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4edea3] rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(78,222,163,0.5)]"
                style={{ width: `${candidate.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Deep Links Row */}
        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          <button
            onClick={() => alert('Launching Google Workspace Gmail thread in new window...')}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1d1f28] hover:bg-[#282a32] text-[#e1e1ed] font-['Geist'] text-xs font-medium transition-colors cursor-pointer border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">open_in_new</span>
            <span className="truncate">Open in Gmail</span>
          </button>
          <button
            onClick={onOpenSlackThreadModal || (() => alert('Opening Slack thread in #eng-hiring-leads...'))}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1d1f28] hover:bg-[#282a32] text-[#e1e1ed] font-['Geist'] text-xs font-medium transition-colors cursor-pointer border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">forum</span>
            <span className="truncate">View Slack Thread</span>
          </button>
        </div>

        {/* Fast Response Note Input Form */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between font-['Geist'] text-[11px] uppercase tracking-wider text-[#86948a]">
            <span>Instant Note to Elena</span>
            <span className="text-[#4edea3] font-mono normal-case">AI Assisted Draft Ready</span>
          </div>

          <div className="relative">
            <textarea
              className="w-full bg-[#0c0e16] rounded-lg p-3 pb-8 text-[#e1e1ed] font-['Geist'] text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#4edea3]/70 border border-white/[0.06] resize-none"
              id="quickResponseInput"
              placeholder={context.suggestedDraft}
              value={responseNote}
              onChange={(e) => setResponseNote(e.target.value)}
              rows={2}
            ></textarea>
            <button
              aria-label="Use suggested draft"
              onClick={handleFillDraft}
              className="absolute right-2 bottom-2 px-2.5 py-1 rounded bg-[#282a32] hover:bg-[#33343d] text-[#c0c1ff] hover:text-white font-['Geist'] text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-white/[0.04]"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px] text-[#4edea3]">auto_fix_high</span>
              <span>Fill Draft</span>
            </button>
          </div>
        </div>

        {/* Bottom Action Execution Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={handleExecuteApproval}
            disabled={isResolved}
            className={`w-full min-h-[48px] px-4 py-3 rounded-lg font-['Space_Grotesk'] text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer ${
              isResolved
                ? 'bg-[#1d1f28] text-[#4edea3] border border-[#4edea3]/40'
                : 'bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] shadow-[0_0_24px_rgba(78,222,163,0.35)]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isResolved ? 'check_circle' : 'task_alt'}
            </span>
            <span>{isResolved ? 'Resolved & Intimated' : 'Mark Done & Intimate Elena'}</span>
          </button>

          <button
            onClick={() => {
              alert('Task rescheduled: Snoozed 24 hours and reassigned to People Ops.');
              onBackToQueue();
            }}
            className="w-full min-h-[40px] px-4 py-2 rounded-lg bg-[#1d1f28] hover:bg-[#282a32] text-[#bbcabf] hover:text-[#e1e1ed] font-['Geist'] text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/[0.04]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">alt_route</span>
            <span>Snooze or Reassign to People Ops</span>
          </button>
        </div>

        {/* Micro Confirmation Banner with Undo */}
        {toastMessage && (
          <div className="p-3 rounded-lg bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="font-['Geist'] text-xs font-medium">{toastMessage}</span>
            </div>
            <button
              onClick={handleUndo}
              className="text-[#e1e1ed] hover:text-white font-['Geist'] text-[11px] underline font-mono cursor-pointer"
              type="button"
            >
              UNDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
