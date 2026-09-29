import React, { useState } from 'react';

interface SlackThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostReply?: (text: string) => void;
}

export const SlackThreadModal: React.FC<SlackThreadModalProps> = ({
  isOpen,
  onClose,
  onPostReply,
}) => {
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!replyText.trim()) return;
    if (onPostReply) onPostReply(replyText);
    setReplyText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#191b23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#1d1f28] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
            <span className="font-['Space_Grotesk'] text-sm font-semibold text-white">
              #eng-hiring-leads
            </span>
            <span className="font-['Geist'] text-xs text-[#86948a] font-mono">
              Thread (3 messages)
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#282a32] hover:bg-[#33343d] flex items-center justify-center text-[#bbcabf] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="p-4 overflow-y-auto space-y-3.5 bg-[#0c0e16]">
          {/* Msg 1 */}
          <div className="flex items-start gap-3">
            <img
              alt="Elena Vance"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 mt-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbsIKg9Sy0p4nz1mJRvHrNuLzadgou5yXs3T3LtJ2w3rJbIUqONboBtK7oCNcWtvgisPE0rRJemRxB0RVp7H7HijqThNdoxQkxPQ0W6RRNkzQqN_9N0Nj_M_Y-JLJXJCtiochJ9aWnknG8X7Buq8XoiPlyMRzjKQmY9JH3WOi0jwDvo4gPsWhcdmrBY1Pek3LD0xozSsJU3uE47L1a6MjMI0uthelpTbCwjV926RlZVqP9qVzCf_kRKw"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-xs font-semibold text-white">
                  Elena Vance
                </span>
                <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                  Yesterday 4:18 PM
                </span>
              </div>
              <p className="font-['Geist'] text-xs text-[#bbcabf] leading-relaxed">
                Jordan just let us know Stripe's team increased their equity grant. We have until tomorrow morning to match the base compensation at $210k.
              </p>
            </div>
          </div>

          {/* Msg 2 */}
          <div className="flex items-start gap-3">
            <img
              alt="Sarah Chen"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 mt-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrCDaW7I9xCZY9FtFhvS0KIsQD3596qko83QlKKmv6Ely30id-Y-uH4aTTHFfD_eE-fNWUboM9S3OwOFwGk79IV9LBZACPCb0WWhiKFqyXt42mPx7DSHgJYL_PZ4aJqSsGrO_DW3yIqpR3w2JavFpbDFpnBGvuoRRAqxPw028FVmIVw-JIFK3utx0YveYvwmw66xDa2A8F5l0LGFp5Wy1zJIGfqS6sAgEY0Q02fylSyslukjX2QTg6nw"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-xs font-semibold text-white">
                  Sarah Chen (VP Prod)
                </span>
                <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                  Yesterday 6:02 PM
                </span>
              </div>
              <p className="font-['Geist'] text-xs text-[#bbcabf] leading-relaxed">
                +1 on matching. Jordan was phenomenal in the distributed systems interview. Product roadmap depends heavily on this data pipeline hire.
              </p>
            </div>
          </div>

          {/* Msg 3 */}
          <div className="flex items-start gap-3">
            <img
              alt="Elena Vance"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 mt-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMFZaEp2Y5afI_khed2P_jJjWQNyOlk6buZR9Y6h1tBqKMaFPY7lNxIb5K1EtGRQXIwdcvhu3O2Pb7dp4KvvFqi3M3ApYNeBrcoHFROTYAeq0WtdVJPnBb8BbzK7fvtH1VDhXNoTVd98ttNIcFQgR1UlWHkPgMejZEV1CbfWQMmRnRDoOqdUYiZdnDDPm9QnmmRm7WmAvBrlpCkOWY2ao_uTYzMS5pqDDc17X2uJENOHJvU88M73JKbg"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-xs font-semibold text-white">
                  Elena Vance
                </span>
                <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                  Yesterday 8:40 PM
                </span>
              </div>
              <p className="font-['Geist'] text-xs text-[#bbcabf] leading-relaxed">
                Hey <span className="text-[#4edea3]">@Alex Mercer</span> nudging Jordan's counter-offer here as well in case inbox is swamped! We need to lock the proposal document tonight.
              </p>
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="p-3 bg-[#1d1f28] border-t border-white/[0.06] flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-[#0c0e16] rounded-lg px-3 py-2 text-xs text-white placeholder-[#86948a] focus:outline-none focus:ring-1 focus:ring-[#4edea3] border border-white/[0.04]"
            placeholder="Reply in #eng-hiring-leads as Alex Mercer..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 rounded-lg bg-[#4edea3] text-[#002113] text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
