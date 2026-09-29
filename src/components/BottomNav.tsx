import React from 'react';

export type NavTab = 'tasks' | 'context' | 'notify' | 'integrations';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingTasksCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingTasksCount = 0,
}) => {
  const tabs: Array<{ id: NavTab; label: string; icon: string; count?: number }> = [
    { id: 'tasks', label: 'Tasks', icon: 'check_circle', count: pendingTasksCount },
    { id: 'context', label: 'Context', icon: 'chat_bubble' },
    { id: 'notify', label: 'Notify', icon: 'send' },
    { id: 'integrations', label: 'Integrate', icon: 'tune' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0c0e16]/85 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.6)] border-t border-white/[0.04]"
      aria-label="Bottom Navigation"
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative min-w-[56px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#4edea3] drop-shadow-[0_0_12px_rgba(78,222,163,0.4)]'
                  : 'text-[#bbcabf] hover:text-[#e1e1ed]'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>

                {/* Optional notification badge for Tasks */}
                {tab.count !== undefined && tab.count > 0 && tab.id === 'tasks' && (
                  <span className="absolute -top-1 -right-2.5 px-1 py-0.2 min-w-[14px] text-[9px] font-bold rounded-full bg-[#10b981] text-[#003824] leading-tight flex items-center justify-center shadow-[0_0_8px_rgba(78,222,163,0.6)]">
                    {tab.count}
                  </span>
                )}
              </div>

              <span className="font-['Geist'] text-[10px] uppercase tracking-wider font-semibold">
                {tab.label}
              </span>

              {/* Active neon dash */}
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 rounded-full bg-[#4edea3] shadow-[0_0_6px_#4edea3]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
