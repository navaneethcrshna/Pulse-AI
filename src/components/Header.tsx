import React from 'react';

interface HeaderProps {
  activeScreenTitle?: string;
  isWideMode?: boolean;
  onToggleWideMode?: () => void;
  onQuickSimulate?: () => void;
  syncTimestamp?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isWideMode,
  onToggleWideMode,
  onQuickSimulate,
  syncTimestamp = 'Synced 2m ago',
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0c0e16]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] pt-safe border-b border-white/[0.04]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Sync Telemetry */}
        <div className="flex items-center gap-3">
          <img
            alt="Pulse AI Logo"
            className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(78,222,163,0.3)]"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XPQOxqw2f0v1C7JiPj_rRXwpCHqJnGzEZkAG8o-h0KCt1sEUZ9Ufz7xJuTebvsCUX71lpxDDn2XddNv_OR_GdyAPHItBkOigfGQjPjHaGCYJ-yxqd1J2tBYWxMr2w3IzUkP-ggdBkTGyWp5fIsEFuBdePWL4REr624lkiiTumNtu6ZtkjefBGoG95wJk7n2RtlG01pMjWIIvRhGbQ8471t75ybnc5TwiM3FjLGt-F7QHoTBTYS1_eEdwoe"
            onError={(e) => {
              // Fallback logo icon if blocked
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] text-base text-[#e1e1ed] tracking-tight font-semibold">
                Pulse AI
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a] px-1.5 py-0.5 rounded bg-[#282a32] font-mono leading-none">
                v2.4
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4edea3]"></span>
              </span>
              <span className="font-['Geist'] text-[11px] text-[#4edea3] tracking-normal font-mono">
                {syncTimestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: View Mode Switcher + Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Simulate Inbound Ingestion */}
          {onQuickSimulate && (
            <button
              onClick={onQuickSimulate}
              title="Simulate Inbound Executive Signal"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1d1f28] hover:bg-[#282a32] text-xs text-[#c0c1ff] border border-white/[0.08] transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-[#4edea3]">bolt</span>
              <span className="font-mono text-[11px] font-medium">+ Ingest Task</span>
            </button>
          )}

          {/* Desktop Dual Mode Toggle (Mobile Shell vs Split Command Console) */}
          {onToggleWideMode && (
            <button
              onClick={onToggleWideMode}
              title={isWideMode ? 'Switch to Compact Mobile View' : 'Switch to Executive Wide Console'}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1d1f28] hover:bg-[#282a32] text-xs text-[#bbcabf] hover:text-[#e1e1ed] border border-white/[0.08] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">
                {isWideMode ? 'smartphone' : 'dashboard'}
              </span>
              <span className="font-mono text-[11px]">
                {isWideMode ? 'Mobile View' : 'Wide Console'}
              </span>
            </button>
          )}

          {/* Profile Avatar */}
          <div className="relative group">
            <button
              aria-label="Profile and Session Info"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer ring-1 ring-[#4edea3]/30 hover:ring-[#4edea3]/70"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-[0_0_12px_rgba(78,222,163,0.2)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_LSMVfzreOToGSfDEW2ewyo4kqwd3cJhk4PXyzsxgC18iJrCHVC9fsAKww38rv56gkbWoGqPleBYx644PKNkHqe_PyTzcRk7wEUGAull6zqZQhyr3Z2XKVsC6BhhmuiVobEnntcpJmQFM-CfkJ2fcwnUwByQXTtGIsltNssv5aEGk9zRon9E4e59o061rvbY3YoBf3jo7DpJsm93vQ2N2LYzSPPHLNc75wQx662knHMG7xUDI7tfKhA"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </button>

            {/* Hover Tooltip / Status Card */}
            <div className="absolute right-0 top-12 w-56 p-3 rounded-xl bg-[#1d1f28] border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="text-xs font-semibold text-white">Alex Mercer (VP Eng)</span>
              </div>
              <p className="text-[11px] text-[#bbcabf] leading-snug">
                Signed in with Executive Pulse credentials. Telemetry enclaves active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
