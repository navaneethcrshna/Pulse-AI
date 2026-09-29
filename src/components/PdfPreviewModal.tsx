import React from 'react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveDirectly?: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  onApproveDirectly,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#191b23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-[#1d1f28] border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#93000a]/30 flex items-center justify-center text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-sm font-semibold text-white">
                Jordan_Offer_Breakdown_v2.pdf
              </span>
              <span className="font-['Geist'] text-[10px] text-[#86948a] font-mono">
                Page 1 of 1 • 240 KB • Confidential Exec
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#282a32] hover:bg-[#33343d] flex items-center justify-center text-[#bbcabf] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* PDF Simulated Document Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#0c0e16]">
          <div className="p-4 rounded-xl bg-[#1d1f28] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
              <div>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#4edea3] uppercase tracking-wider block">
                  Compensation Committee Review
                </span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  Senior Staff Data Platform Engineer
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-mono font-bold">
                COMPETITIVE COUNTER
              </span>
            </div>

            {/* Candidate & Comp Table */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[#bbcabf]">
                <div>
                  <span className="text-[10px] text-[#86948a] block uppercase font-mono">Candidate</span>
                  <span className="text-white font-medium">Jordan M. Vance-Lee</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#86948a] block uppercase font-mono">Leveling</span>
                  <span className="text-white font-medium">IC6 / Staff+ Level</span>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="mt-3 rounded-lg overflow-hidden border border-white/[0.08]">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-[#282a32] text-[#86948a]">
                    <tr>
                      <th className="p-2">Component</th>
                      <th className="p-2">Original Offer</th>
                      <th className="p-2 text-[#ffb4ab]">Stripe Comp</th>
                      <th className="p-2 text-[#4edea3]">Proposed Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-white">
                    <tr>
                      <td className="p-2 text-[#bbcabf]">Base Salary</td>
                      <td className="p-2">$192,000</td>
                      <td className="p-2 text-[#ffb4ab]">$210,000</td>
                      <td className="p-2 text-[#4edea3] font-bold">$210,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-[#bbcabf]">Initial Equity</td>
                      <td className="p-2">$320,000 / 4yr</td>
                      <td className="p-2 text-[#ffb4ab]">$340,000</td>
                      <td className="p-2 text-[#4edea3] font-bold">$340,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-[#bbcabf]">Sign-on Bonus</td>
                      <td className="p-2">$20,000</td>
                      <td className="p-2 text-[#ffb4ab]">$25,000</td>
                      <td className="p-2 text-[#4edea3] font-bold">$25,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded-lg bg-[#282a32]/60 border border-[#4edea3]/20 text-[11px] text-[#bbcabf] space-y-1">
                <span className="text-[#4edea3] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Internal Equity &amp; Budget Feasibility Check
                </span>
                <p>
                  Within 94th percentile band for Staff Infra engineering. Compensation delta (+$18,000 base) is offset by unallocated Q2 hiring pool.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 bg-[#1d1f28] border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#282a32] hover:bg-[#33343d] text-xs text-[#bbcabf] font-medium transition-colors cursor-pointer"
          >
            Close Preview
          </button>
          {onApproveDirectly && (
            <button
              onClick={() => {
                onApproveDirectly();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_16px_rgba(78,222,163,0.4)] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Sign Off &amp; Approve ($210k Match)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
