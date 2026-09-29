import React, { useState } from 'react';
import { Task } from '../types';

interface NotifyScreenProps {
  task: Task;
  onConfirmSend: (taskId: string, message: string, deliveryMode: string) => void;
  onCompleteSilently: (taskId: string) => void;
}

export const NotifyScreen: React.FC<NotifyScreenProps> = ({
  task,
  onConfirmSend,
  onCompleteSilently,
}) => {
  const [autoIntimateEnabled, setAutoIntimateEnabled] = useState(true);
  const [activeChannel, setActiveChannel] = useState<'slack' | 'email'>('slack');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftMessage, setDraftMessage] = useState(
    task.notifyData?.defaultMessage ||
      'Hey @Sarah Chen, I’ve reviewed and approved the Q3 hiring roadmap spreadsheet. All allocations for Engineering and Design look solid. Ready for the exec sync!'
  );
  const [deliveryMode, setDeliveryMode] = useState<'channel' | 'dm' | 'silent'>('channel');
  const [isDispatching, setIsDispatching] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [attachedLoom, setAttachedLoom] = useState(false);
  const [attachedPdf, setAttachedPdf] = useState(false);
  const [requestedSync, setRequestedSync] = useState(false);

  const notifyInfo = task.notifyData || {
    dueTime: 'Due in 42m',
    triggeredBy: task.author.name,
    triggerChannel: task.channelName || '#product-growth',
    confidence: '99.4%',
    author: {
      name: 'Alex Mercer (You)',
      role: 'VP Engineering',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYI6vEQAQkTRlqHeepCKN3xOuGT8QasnT7bYjbyAI741vW1bLWYT3h7iL0hXjtzB1cyRO-UO5eJ8KRQf1aKV_61H3SIKX3Gnspl5s6xCQWbbA2bb0udSBnsWq40vx47I0q6suqSO06WAJ-QEXhQlOW3I9Isa5c7AbTLCzL6JyIvjnTDgXVfKY_sBa9PodX7ros41Sq_A-hkIQ5jEBFdwb-pfrhEP4bLQcC5AwMB9dj_KYIEInxG9GRAQ',
    },
    defaultMessage: draftMessage,
  };

  const handleConfirmSend = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatched(true);
      onConfirmSend(task.id, draftMessage, deliveryMode);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-3 gap-4 relative pb-28 max-w-xl mx-auto">
      {/* Top Grab Handle */}
      <div className="w-12 h-1 bg-[#33343d] rounded-full mx-auto my-0.5"></div>

      {/* Resolving Task Header Card */}
      <div className="flex flex-col gap-2 bg-[#191b23] p-4 sm:p-5 rounded-xl shadow-md border border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="font-['Geist'] text-[11px] text-[#4edea3] uppercase tracking-wider font-semibold font-mono">
              Resolving Task
            </span>
          </div>

          <span className="font-['Geist'] text-[11px] text-[#bbcabf] font-mono flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#7bd0ff]">schedule</span>
            {notifyInfo.dueTime}
          </span>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg text-[#e1e1ed] font-semibold tracking-tight leading-snug">
            {task.title}
          </h2>

          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-4 h-4 rounded-full bg-[#3131c0] flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-[#c0c1ff]">tag</span>
            </div>
            <p className="font-['Geist'] text-xs text-[#bbcabf]">
              Triggered by <span className="text-[#e1e1ed] font-medium">{notifyInfo.triggeredBy}</span> in{' '}
              <span className="text-[#7bd0ff] font-mono">{notifyInfo.triggerChannel}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Auto-Intimate Upon Completion Card */}
      <div className="flex flex-col gap-3 bg-[#1d1f28] p-4 sm:p-5 rounded-xl shadow-md border border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-sm sm:text-base text-[#e1e1ed] font-semibold">
              Auto-intimate upon completion
            </span>
            <span className="font-['Geist'] text-xs text-[#bbcabf]">
              Broadcast execution status via synthesized telemetry
            </span>
          </div>

          <button
            onClick={() => setAutoIntimateEnabled(!autoIntimateEnabled)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative flex items-center cursor-pointer shrink-0 ${
              autoIntimateEnabled ? 'bg-[#10b981]' : 'bg-[#33343d]'
            }`}
            type="button"
          >
            <span
              className={`w-5 h-5 bg-[#002113] rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
                autoIntimateEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div
            onClick={() => setActiveChannel('slack')}
            className={`cursor-pointer p-3 rounded-lg flex flex-col gap-1.5 transition-all shadow-sm border ${
              activeChannel === 'slack'
                ? 'bg-[#282a32] border-[#4edea3]/40'
                : 'bg-[#0c0e16] border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#4edea3]">chat</span>
                <span className="font-['Geist'] text-[11px] font-bold text-[#e1e1ed] uppercase tracking-wider">
                  Slack Broadcast
                </span>
              </div>
              <span
                className="material-symbols-outlined text-[16px] text-[#4edea3]"
                style={{ fontVariationSettings: activeChannel === 'slack' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {activeChannel === 'slack' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <span className="font-['Geist'] text-[10px] text-[#bbcabf] font-mono truncate">
              {notifyInfo.triggerChannel} • @{notifyInfo.triggeredBy.split(' ')[0]}
            </span>
          </div>

          <div
            onClick={() => setActiveChannel('email')}
            className={`cursor-pointer p-3 rounded-lg flex flex-col gap-1.5 transition-all shadow-sm border ${
              activeChannel === 'email'
                ? 'bg-[#282a32] border-[#4edea3]/40'
                : 'bg-[#0c0e16] border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#bbcabf]">mail</span>
                <span className="font-['Geist'] text-[11px] font-bold text-[#bbcabf] uppercase tracking-wider">
                  Email Chain
                </span>
              </div>
              <span
                className="material-symbols-outlined text-[16px] text-[#86948a]"
                style={{ fontVariationSettings: activeChannel === 'email' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {activeChannel === 'email' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono truncate">
              Thread reply + bcc vault
            </span>
          </div>
        </div>
      </div>

      {/* AI Dispatch Synthesis Card */}
      <div className="flex flex-col gap-2.5 bg-[#1d1f28] p-4 sm:p-5 rounded-xl shadow-md border border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-['Geist'] text-[11px] uppercase tracking-wider font-semibold text-[#c0c1ff]">
              AI Dispatch Synthesis
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#3131c0]/40 text-[#c0c1ff] border border-[#c0c1ff]/20">
              {notifyInfo.confidence} confidence
            </span>
          </div>

          <button
            onClick={() => setIsEditingDraft(!isEditingDraft)}
            className="flex items-center gap-1 font-['Geist'] text-xs text-[#4edea3] hover:text-[#6ffbbe] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">
              {isEditingDraft ? 'check' : 'edit'}
            </span>
            <span>{isEditingDraft ? 'Done editing' : 'Edit draft'}</span>
          </button>
        </div>

        {/* Message preview bubble */}
        <div className="bg-[#0c0e16] p-3.5 rounded-lg flex flex-col gap-2.5 shadow-inner border border-white/[0.04]">
          <div className="flex items-center gap-2">
            <img
              alt="Alex Mercer"
              className="w-6 h-6 rounded-full object-cover shadow-sm ring-1 ring-white/10"
              src={notifyInfo.author.avatarUrl}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1.5">
              <span className="font-['Geist'] text-xs font-semibold text-[#e1e1ed]">
                {notifyInfo.author.name}
              </span>
              <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                via Pulse Agent
              </span>
            </div>
          </div>

          {isEditingDraft ? (
            <textarea
              className="w-full bg-[#191b23] rounded p-2 text-xs text-[#e1e1ed] focus:outline-none focus:ring-1 focus:ring-[#4edea3] resize-none"
              rows={3}
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
            />
          ) : (
            <p className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] leading-relaxed">
              {draftMessage.includes('@') ? (
                <>
                  Hey{' '}
                  <span className="text-[#7bd0ff] bg-[#19aee8]/20 px-1 py-0.5 rounded font-medium">
                    @{notifyInfo.triggeredBy}
                  </span>
                  {draftMessage.replace(/^Hey @[a-zA-Z\s]+,/, ',')}
                </>
              ) : (
                draftMessage
              )}
            </p>
          )}

          {/* Action Attachment Chips */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setAttachedLoom(!attachedLoom)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-['Geist'] text-[11px] whitespace-nowrap active:scale-95 transition-all cursor-pointer border ${
                attachedLoom
                  ? 'bg-[#10b981]/20 border-[#10b981] text-[#4edea3]'
                  : 'bg-[#282a32] border-white/[0.04] text-[#e1e1ed] hover:bg-[#33343d]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-xs text-[#4edea3]">
                {attachedLoom ? 'check' : 'add_link'}
              </span>
              <span>{attachedLoom ? 'Loom linked (0:45)' : 'Add Loom link'}</span>
            </button>

            <button
              onClick={() => setAttachedPdf(!attachedPdf)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-['Geist'] text-[11px] whitespace-nowrap active:scale-95 transition-all cursor-pointer border ${
                attachedPdf
                  ? 'bg-[#10b981]/20 border-[#10b981] text-[#4edea3]'
                  : 'bg-[#282a32] border-white/[0.04] text-[#e1e1ed] hover:bg-[#33343d]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-xs text-[#4edea3]">
                {attachedPdf ? 'check' : 'attach_file'}
              </span>
              <span>{attachedPdf ? 'Q3_Roadmap.pdf' : 'Attach PDF'}</span>
            </button>

            <button
              onClick={() => setRequestedSync(!requestedSync)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-['Geist'] text-[11px] whitespace-nowrap active:scale-95 transition-all cursor-pointer border ${
                requestedSync
                  ? 'bg-[#10b981]/20 border-[#10b981] text-[#4edea3]'
                  : 'bg-[#282a32] border-white/[0.04] text-[#e1e1ed] hover:bg-[#33343d]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-xs text-[#4edea3]">
                {requestedSync ? 'check' : 'flag'}
              </span>
              <span>{requestedSync ? 'Sync scheduled' : 'Request sync'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Mode Radios */}
      <div className="flex flex-col gap-1.5 bg-[#191b23] p-3 sm:p-4 rounded-xl shadow-md border border-white/[0.04]">
        {/* Option 1: Channel immediately */}
        <label
          onClick={() => setDeliveryMode('channel')}
          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
            deliveryMode === 'channel' ? 'bg-[#1d1f28]' : 'bg-transparent hover:bg-[#1d1f28]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-[20px] ${
                deliveryMode === 'channel' ? 'text-[#4edea3]' : 'text-[#86948a]'
              }`}
              style={{ fontVariationSettings: deliveryMode === 'channel' ? "'FILL' 1" : "'FILL' 0" }}
            >
              {deliveryMode === 'channel' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <div className="flex flex-col">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Send to channel immediately
              </span>
              <span className="font-['Geist'] text-[11px] text-[#bbcabf]">
                Post visible update in {notifyInfo.triggerChannel}
              </span>
            </div>
          </div>
          <span className="font-['Geist'] text-[10px] text-[#4edea3] uppercase font-bold tracking-widest font-mono">
            Default
          </span>
        </label>

        {/* Option 2: DM only */}
        <label
          onClick={() => setDeliveryMode('dm')}
          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
            deliveryMode === 'dm' ? 'bg-[#1d1f28]' : 'bg-transparent hover:bg-[#1d1f28]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-[20px] ${
                deliveryMode === 'dm' ? 'text-[#4edea3]' : 'text-[#86948a]'
              }`}
              style={{ fontVariationSettings: deliveryMode === 'dm' ? "'FILL' 1" : "'FILL' 0" }}
            >
              {deliveryMode === 'dm' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <div className="flex flex-col">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Send as DM to {notifyInfo.triggeredBy} only
              </span>
              <span className="font-['Geist'] text-[11px] text-[#bbcabf]">
                Keep workspace public feed quiet
              </span>
            </div>
          </div>
        </label>

        {/* Option 3: Mark done silently */}
        <label
          onClick={() => setDeliveryMode('silent')}
          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
            deliveryMode === 'silent' ? 'bg-[#1d1f28]' : 'bg-transparent hover:bg-[#1d1f28]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-[20px] ${
                deliveryMode === 'silent' ? 'text-[#4edea3]' : 'text-[#86948a]'
              }`}
              style={{ fontVariationSettings: deliveryMode === 'silent' ? "'FILL' 1" : "'FILL' 0" }}
            >
              {deliveryMode === 'silent' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <div className="flex flex-col">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Mark done silently
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Resolve without external alerts
              </span>
            </div>
          </div>
        </label>
      </div>

      {/* Confirmation Actions */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={handleConfirmSend}
          disabled={isDispatching || isDispatched}
          className={`w-full h-12 py-3 px-5 rounded-lg font-['Space_Grotesk'] text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isDispatched
              ? 'bg-[#1d1f28] text-[#4edea3] border border-[#4edea3]/40'
              : 'bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] shadow-[0_0_24px_rgba(78,222,163,0.4)] active:scale-[0.98]'
          }`}
          type="button"
        >
          {isDispatching ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Dispatching Telemetry...</span>
            </>
          ) : isDispatched ? (
            <>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Task Resolved &amp; Intimated</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>
                Confirm &amp; Send to {activeChannel === 'slack' ? 'Slack' : 'Email'}
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => onCompleteSilently(task.id)}
          className="w-full py-2.5 px-4 rounded-lg text-[#bbcabf] hover:text-[#e1e1ed] font-['Geist'] text-xs sm:text-sm text-center transition-colors cursor-pointer"
          type="button"
        >
          Complete Silently
        </button>
      </div>
    </div>
  );
};
