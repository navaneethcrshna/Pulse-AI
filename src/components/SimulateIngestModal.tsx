import React, { useState } from 'react';
import { Task } from '../types';

interface SimulateIngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

export const SimulateIngestModal: React.FC<SimulateIngestModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'slack' | 'gmail' | 'urgent'>('slack');

  if (!isOpen) return null;

  const presets = [
    {
      id: 'slack',
      title: 'Sign off on Q3 Cloud Run budget variance allocation',
      source: '#cloud-infra via Slack',
      channel: '#cloud-infra',
      sender: 'Marcus Brody (Infra)',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDA6DErn8XGU2XHMcuofgxekaXRAnNwO3tacRmrUtn6mVJrOG3wZ6_tcb5NDXShFg2zROorPxnXEQIHv6ZAEQxPbgbJV5J4NHrzpZp3UpqDHX2UBmbszANbiT0yC82cNbE361r3M_fdO7EzIQDDUJA8hIC71ozgsEgp1JhEFpDhRuH_4wq6ZxYZbaqRa77W2kM8c2Eoe29pT6t_oDbO94vM_f12jZjxQaxoTT-NFEPpeQ6YohAb6SLN-w',
      due: 'Due in 2h',
      quote: '“GCP cluster autoscale spikes need VP signoff to clear Finance hold.”',
      confidence: '99.2%',
    },
    {
      id: 'gmail',
      title: 'Review Series-B investor board meeting executive deck',
      source: 'Elena Vance via Gmail',
      channel: 'Gmail',
      sender: 'Elena Vance (Talent)',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBwNZTMsz2LuQtrYi_-O-NRMIEdS-5v_wQIRV0QjZx0lqZ27_nzulkPgl6zUaTGqvx6wwx31_VdZ6iHLSl1r8w6vNiKK7B2Ram3W8yPzxSkyKHfqTWAl5SoDmbS5bSLetk_wgNRGiAHlF-I59p3dyUK5OKbQMDWjakzsOVdaJGeyiSGaO6tuxBR8N6JibYOcuh9a8xhOrfVZh-Deh4OPSnfXL6dHDnjfxfVOdgtKvU1cy9A8oh9NIbjtQ',
      due: 'Due Today',
      quote: '“Attached the draft slides covering hiring targets and AI infrastructure expansion.”',
      confidence: '98.7%',
    },
    {
      id: 'urgent',
      title: 'Approve expedited SOC2 penetration test findings report',
      source: 'Sarah Chen via Slack',
      channel: '#security-ops',
      sender: 'Sarah Chen (VP Prod)',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCrCDaW7I9xCZY9FtFhvS0KIsQD3596qko83QlKKmv6Ely30id-Y-uH4aTTHFfD_eE-fNWUboM9S3OwOFwGk79IV9LBZACPCb0WWhiKFqyXt42mPx7DSHgJYL_PZ4aJqSsGrO_DW3yIqpR3w2JavFpbDFpnBGvuoRRAqxPw028FVmIVw-JIFK3utx0YveYvwmw66xDa2A8F5l0LGFp5Wy1zJIGfqS6sAgEY0Q02fylSyslukjX2QTg6nw',
      due: '3:30 PM',
      quote: '“All high-priority remediations validated. Ready for auditor distribution.”',
      confidence: '99.6%',
    },
  ];

  const handleIngest = () => {
    const selected = presets.find((p) => p.id === selectedPreset) || presets[0];
    const newTask: Task = {
      id: 'task-' + Date.now(),
      title: selected.title,
      source: selected.source,
      channelName: selected.channel,
      type: selected.id === 'gmail' ? ['email'] : ['slack', 'today'],
      isHighPriority: true,
      timeDue: selected.due,
      timeDueColor: 'text-[#4edea3]',
      quoteSnippet: selected.quote,
      author: {
        name: selected.sender,
        role: 'Executive Member',
        avatarUrl: selected.avatar,
      },
      actionFooter: {
        type: 'auto-reply',
        label: 'Auto-reply queued',
        icon: 'send',
      },
      completed: false,
      notifyData: {
        dueTime: selected.due,
        triggeredBy: selected.sender.split(' ')[0],
        triggerChannel: selected.channel,
        confidence: selected.confidence,
        author: {
          name: 'Alex Mercer (You)',
          role: 'VP Engineering',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDYI6vEQAQkTRlqHeepCKN3xOuGT8QasnT7bYjbyAI741vW1bLWYT3h7iL0hXjtzB1cyRO-UO5eJ8KRQf1aKV_61H3SIKX3Gnspl5s6xCQWbbA2bb0udSBnsWq40vx47I0q6suqSO06WAJ-QEXhQlOW3I9Isa5c7AbTLCzL6JyIvjnTDgXVfKY_sBa9PodX7ros41Sq_A-hkIQ5jEBFdwb-pfrhEP4bLQcC5AwMB9dj_KYIEInxG9GRAQ',
        },
        defaultMessage: `Confirmed and signed off on ${selected.title}. Telemetry logs archived.`,
      },
      contextData: {
        dueBadge: selected.due,
        extractedAgo: 'Extracted via AI just now',
        readingTime: 'Est. reading time: 1 min',
        touchpoints: 2,
        confidence: selected.confidence,
        decisionDelta: 'Action Required',
        competitiveRisk: 'High Priority',
        synthesisText: `Pulse AI synthesized this new directive from real-time monitoring streams. Direct prompt detected from ${selected.sender}.`,
        events: [
          {
            id: 'ev-new',
            type: selected.id === 'gmail' ? 'gmail' : 'slack',
            sourceLabel: selected.channel,
            author: selected.sender,
            time: 'Just now',
            body: selected.quote,
          },
        ],
        suggestedDraft: `Approved. Good to execute immediately.`,
      },
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#191b23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">
              auto_awesome
            </span>
            <span className="font-['Space_Grotesk'] text-base font-semibold text-white">
              Simulate Autonomous Stream Ingestion
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#282a32] flex items-center justify-center text-[#bbcabf] hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#bbcabf]">
          Pulse AI listens continuously to Slack and Gmail enclaves. Pick an inbound message to simulate autonomous extraction into your Priority Feed:
        </p>

        <div className="space-y-2">
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => setSelectedPreset(preset.id as any)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedPreset === preset.id
                  ? 'bg-[#1d1f28] border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.2)]'
                  : 'bg-[#0c0e16] border-white/[0.04] hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-[#c0c1ff]">{preset.source}</span>
                <span className="text-[10px] text-[#4edea3] font-mono font-bold">
                  {preset.confidence}
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-semibold text-white leading-snug">
                {preset.title}
              </h4>
              <p className="text-[11px] text-[#bbcabf] italic mt-1 truncate">{preset.quote}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#282a32] text-xs text-[#bbcabf] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleIngest}
            className="px-4 py-1.5 rounded-lg bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] text-xs font-bold shadow-[0_0_12px_rgba(78,222,163,0.4)]"
          >
            Ingest &amp; Synthesize Directive
          </button>
        </div>
      </div>
    </div>
  );
};
