import React, { useState } from 'react';

interface IntegrateScreenProps {
  onTriggerSync?: () => void;
}

export const IntegrateScreen: React.FC<IntegrateScreenProps> = ({ onTriggerSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToastVisible, setSyncToastVisible] = useState(false);
  const [lookbackDays, setLookbackDays] = useState<'3' | '7' | '14'>('7');
  const [voicePersona, setVoicePersona] = useState<'concise' | 'collaborative'>('concise');

  // Stream toggles state
  const [gmailToggles, setGmailToggles] = useState({
    scanUnopened: true,
    autoDetectDeliverables: true,
    autoReplyDrafts: true,
  });

  const [slackToggles, setSlackToggles] = useState({
    trackMentions: true,
    scanAssignedThreads: true,
    autoPostDone: true,
  });

  const [requireConfirmation, setRequireConfirmation] = useState(true);

  const handleSyncClick = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToastVisible(true);
      if (onTriggerSync) onTriggerSync();
      setTimeout(() => {
        setSyncToastVisible(false);
      }, 2600);
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-3 px-4 sm:px-6 gap-4 max-w-xl mx-auto">
      {/* Floating Delight Feedback Toast Notification */}
      {syncToastVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#282a32] text-[#e1e1ed] px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 border border-[#4edea3]/40 transition-all duration-300">
          <span className="material-symbols-outlined text-[#4edea3] text-[20px]">cloud_done</span>
          <span className="font-['Geist'] text-xs font-mono font-medium">
            Neural cache synchronized (24ms)
          </span>
        </div>
      )}

      {/* Engine Status Module */}
      <section className="bg-[#191b23] rounded-xl p-5 shadow-xl relative overflow-hidden border border-white/[0.04]">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#4edea3]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </div>
            <span className="font-['Geist'] text-[11px] uppercase tracking-wider text-[#4edea3] font-semibold font-mono">
              Ingestion Engine Live
            </span>
          </div>
          <span className="font-['Geist'] text-[11px] text-[#86948a] tracking-wider font-mono">
            LATENCY 48ms
          </span>
        </div>

        <p className="font-['Space_Grotesk'] text-base sm:text-lg text-[#e1e1ed] font-semibold tracking-tight leading-snug mb-3">
          Monitoring 2 email accounts &amp; 1 Slack workspace in real-time
        </p>

        <div className="flex items-center justify-between gap-3 bg-[#1d1f28] rounded-lg p-3 shadow-sm border border-white/[0.04]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px] shrink-0">speed</span>
            <div className="flex flex-col min-w-0">
              <span className="font-['Geist'] text-xs text-[#e1e1ed] font-mono truncate">
                99.98% Parsing Fidelity
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a] truncate">
                Zero pipeline blockage
              </span>
            </div>
          </div>

          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            className="bg-[#4edea3] hover:bg-[#6ffbbe] text-[#002113] font-['Space_Grotesk'] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-95 transition-all shrink-0 cursor-pointer"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[17px] ${isSyncing ? 'animate-spin' : ''}`}
            >
              sync
            </span>
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </section>

      {/* Visual Telemetry Anchor Card */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden shadow-lg bg-[#0c0e16] border border-white/[0.04]">
        <div
          className="bg-cover bg-center w-full h-full opacity-40 transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAL7ZzwqlSut85LEsmUhesLLoOUoILgp1bUotc1kmGQ9RkL4xg5fFeqT6XKIGLBevX13B2PWj_7uyd5qAUWOyr9g9Rg9W1CGOGhKMG8w0PshWBAdpiIPSLECWdCaHHNKpq1nqNXztVSRSKQzEemvHfEqtxxHQdydo0C9ccU3D-9rBwWiiLwVQ4euZiMWlvChQKxHacNKkztDsqMHmAQReSN1Scw58FMgxVvfuUQIJkx5SgMqr88ujnCug')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e16] via-[#0c0e16]/80 to-transparent flex items-center px-5">
          <div className="flex flex-col max-w-[75%]">
            <span className="font-['Geist'] text-[10px] uppercase tracking-widest text-[#4edea3] mb-0.5 font-bold font-mono">
              Autonomous Feeds
            </span>
            <span className="font-['Space_Grotesk'] text-base text-[#e1e1ed] font-semibold leading-tight">
              Adaptive Neural Filters
            </span>
            <span className="font-['Geist'] text-xs text-[#bbcabf] mt-1">
              Signals parsed before workspace distraction
            </span>
          </div>
        </div>
      </div>

      {/* Section Header: Connected Feeds */}
      <div className="flex items-center gap-2 pt-1">
        <span className="font-['Geist'] text-[11px] uppercase tracking-wider text-[#86948a] font-semibold font-mono">
          Connected Streams
        </span>
        <div className="h-[1px] flex-1 bg-[#33343d]"></div>
        <span className="font-['Geist'] text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded font-mono font-bold">
          2 ACTIVE
        </span>
      </div>

      {/* Integration 1: Google Workspace */}
      <div className="bg-[#1d1f28] rounded-xl p-4 sm:p-5 shadow-md flex flex-col gap-3 relative overflow-hidden border border-white/[0.04]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#EA4335]/15 flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[22px]">mail</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#e1e1ed] truncate">
                  Google Workspace
                </span>
                <span className="font-['Geist'] text-[10px] bg-[#EA4335]/20 text-[#ffb4ab] px-1.5 py-0.5 rounded font-mono">
                  Gmail API
                </span>
              </div>
              <span className="font-['Geist'] text-xs text-[#bbcabf] font-mono truncate">
                alex.morgan@company.com
              </span>
            </div>
          </div>
          <span
            className="material-symbols-outlined text-[#4edea3] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#282a32] rounded text-[#bbcabf]">
          <span className="material-symbols-outlined text-[#86948a] text-[16px]">query_stats</span>
          <span className="font-['Geist'] text-xs truncate">
            Scanned 42 priority threads in past 7 days
          </span>
        </div>

        {/* Toggles List */}
        <div className="flex flex-col gap-2 mt-1">
          {/* Toggle 1 */}
          <label
            onClick={() =>
              setGmailToggles({ ...gmailToggles, scanUnopened: !gmailToggles.scanUnopened })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Scan unopened incoming mail
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Extract deadlines directly to priority queues
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                gmailToggles.scanUnopened ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  gmailToggles.scanUnopened ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>

          {/* Toggle 2 */}
          <label
            onClick={() =>
              setGmailToggles({
                ...gmailToggles,
                autoDetectDeliverables: !gmailToggles.autoDetectDeliverables,
              })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Auto-detect deliverables
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Identifies deliverables, dates &amp; assignees
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                gmailToggles.autoDetectDeliverables ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  gmailToggles.autoDetectDeliverables ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>

          {/* Toggle 3 */}
          <label
            onClick={() =>
              setGmailToggles({
                ...gmailToggles,
                autoReplyDrafts: !gmailToggles.autoReplyDrafts,
              })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Auto-reply intimation drafts
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Pre-composes context-aware replies for review
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                gmailToggles.autoReplyDrafts ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  gmailToggles.autoReplyDrafts ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {/* Integration 2: Slack Enterprise */}
      <div className="bg-[#1d1f28] rounded-xl p-4 sm:p-5 shadow-md flex flex-col gap-3 relative overflow-hidden border border-white/[0.04]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#EC4899]/15 flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[#EC4899] text-[22px]">forum</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#e1e1ed] truncate">
                  Slack Enterprise
                </span>
                <span className="font-['Geist'] text-[10px] bg-[#EC4899]/20 text-[#EC4899] px-1.5 py-0.5 rounded font-mono">
                  OAuth v2
                </span>
              </div>
              <span className="font-['Geist'] text-xs text-[#bbcabf] font-mono truncate">
                Acme Global (#eng, #prod, DMs)
              </span>
            </div>
          </div>
          <span
            className="material-symbols-outlined text-[#4edea3] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#282a32] rounded text-[#bbcabf]">
          <span className="material-symbols-outlined text-[#86948a] text-[16px]">hub</span>
          <span className="font-['Geist'] text-xs truncate">
            Actively monitoring 8 synchronized channels
          </span>
        </div>

        {/* Toggles List */}
        <div className="flex flex-col gap-2 mt-1">
          <label
            onClick={() =>
              setSlackToggles({ ...slackToggles, trackMentions: !slackToggles.trackMentions })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Track direct @mentions
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                High-priority alerts converted into tasks
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                slackToggles.trackMentions ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  slackToggles.trackMentions ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>

          <label
            onClick={() =>
              setSlackToggles({
                ...slackToggles,
                scanAssignedThreads: !slackToggles.scanAssignedThreads,
              })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Scan assigned threads
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Ingests subthreads where Alex is tagged
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                slackToggles.scanAssignedThreads ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  slackToggles.scanAssignedThreads ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>

          <label
            onClick={() =>
              setSlackToggles({ ...slackToggles, autoPostDone: !slackToggles.autoPostDone })
            }
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
          >
            <div className="flex flex-col pr-3">
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Auto-post "Done" updates
              </span>
              <span className="font-['Geist'] text-[11px] text-[#86948a]">
                Notifies originating channel when task completes
              </span>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                slackToggles.autoPostDone ? 'bg-[#10b981]' : 'bg-[#33343d]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                  slackToggles.autoPostDone ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {/* Telemetry Parameters */}
      <div className="flex items-center gap-2 pt-1">
        <span className="font-['Geist'] text-[11px] uppercase tracking-wider text-[#86948a] font-semibold font-mono">
          Telemetry Parameters
        </span>
        <div className="h-[1px] flex-1 bg-[#33343d]"></div>
      </div>

      {/* Lookback Window Card */}
      <div className="bg-[#1d1f28] rounded-xl p-4 sm:p-5 shadow-md flex flex-col gap-3 border border-white/[0.04]">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#e1e1ed]">
              Lookback Window
            </span>
            <span className="font-['Geist'] text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded font-mono font-bold">
              PAST {lookbackDays} DAYS
            </span>
          </div>
          <span className="font-['Geist'] text-xs text-[#bbcabf]">
            Depth of semantic parsing across archives
          </span>
        </div>

        {/* Segmented Button Array */}
        <div className="grid grid-cols-3 gap-1 bg-[#191b23] p-1 rounded-lg border border-white/[0.04]">
          {(['3', '7', '14'] as const).map((days) => (
            <button
              key={days}
              onClick={() => setLookbackDays(days)}
              className={`py-2 text-center rounded font-['Geist'] text-xs font-mono transition-all cursor-pointer ${
                lookbackDays === days
                  ? 'bg-[#10b981] text-[#002113] font-bold shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#e1e1ed]'
              }`}
              type="button"
            >
              {days} Days
            </button>
          ))}
        </div>

        {/* Priority Threshold Selector */}
        <div className="mt-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#e1e1ed]">
              Priority Threshold
            </span>
            <span className="font-['Geist'] text-xs text-[#c0c1ff] font-mono">
              High &amp; Medium Only
            </span>
          </div>

          <div className="bg-[#191b23] p-3 rounded-lg flex items-center justify-between border border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">
                filter_alt
              </span>
              <div className="flex flex-col">
                <span className="font-['Geist'] text-xs text-[#e1e1ed] font-medium">
                  Bypass Low Confidence
                </span>
                <span className="font-['Geist'] text-[10px] text-[#86948a]">
                  Ignores newsletters, fyi pings &amp; automated alerts
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">verified</span>
          </div>
        </div>
      </div>

      {/* Outbound Intimations Rules */}
      <div className="bg-[#1d1f28] rounded-xl p-4 sm:p-5 shadow-md flex flex-col gap-3 border border-white/[0.04]">
        <div className="flex flex-col gap-0.5">
          <span className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#e1e1ed]">
            Outbound Intimations
          </span>
          <span className="font-['Geist'] text-xs text-[#bbcabf]">
            Automated updates dispatched on your behalf
          </span>
        </div>

        {/* Confirmation Guardrail Toggle */}
        <label
          onClick={() => setRequireConfirmation(!requireConfirmation)}
          className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b23] cursor-pointer hover:bg-[#282a32] transition-colors"
        >
          <div className="flex flex-col pr-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[16px]">shield</span>
              <span className="font-['Geist'] text-xs sm:text-sm text-[#e1e1ed] font-medium">
                Always require confirmation
              </span>
            </div>
            <span className="font-['Geist'] text-[11px] text-[#86948a]">
              Presents approval prompt before any dispatch
            </span>
          </div>

          <div
            className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
              requireConfirmation ? 'bg-[#10b981]' : 'bg-[#33343d]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#002113] absolute top-[2px] left-[2px] transition-transform ${
                requireConfirmation ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </label>

        {/* Synthesized Voice Persona */}
        <div className="flex flex-col gap-2">
          <span className="font-['Geist'] text-[10px] text-[#86948a] uppercase font-semibold tracking-wider font-mono">
            Synthesized Voice Persona
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setVoicePersona('concise')}
              className={`flex flex-col gap-1 p-3 rounded-lg text-left transition-all cursor-pointer border ${
                voicePersona === 'concise'
                  ? 'bg-[#282a32] border-[#4edea3]/50'
                  : 'bg-[#191b23] border-transparent opacity-70 hover:opacity-100'
              }`}
              type="button"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-['Geist'] text-xs font-semibold text-[#4edea3]">
                  Executive Brief
                </span>
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                  {voicePersona === 'concise' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="font-['Geist'] text-[11px] text-[#bbcabf] leading-snug">
                Professional, concise &amp; action-first bullet points
              </span>
            </button>

            <button
              onClick={() => setVoicePersona('collaborative')}
              className={`flex flex-col gap-1 p-3 rounded-lg text-left transition-all cursor-pointer border ${
                voicePersona === 'collaborative'
                  ? 'bg-[#282a32] border-[#4edea3]/50'
                  : 'bg-[#191b23] border-transparent opacity-70 hover:opacity-100'
              }`}
              type="button"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-['Geist'] text-xs font-semibold text-[#e1e1ed]">
                  Collaborative
                </span>
                <span className="material-symbols-outlined text-[#86948a] text-[18px]">
                  {voicePersona === 'collaborative'
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="font-['Geist'] text-[11px] text-[#86948a] leading-snug">
                Warm conversational tone tailored for Slack banter
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Privacy & Cryptographic Enclave Badge */}
      <div className="bg-[#0c0e16] rounded-xl p-4 sm:p-5 flex items-center gap-3.5 shadow-inner border border-white/[0.04]">
        <div className="w-10 h-10 rounded-full bg-[#4edea3]/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#4edea3] text-[22px]">lock</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-[#e1e1ed]">
              Zero Data Retention
            </span>
            <span className="font-['Geist'] text-[10px] text-[#4edea3] bg-[#4edea3]/15 px-1.5 py-0.2 rounded font-mono font-bold">
              SOC2 TYPE-II
            </span>
          </div>
          <p className="font-['Geist'] text-[11px] text-[#86948a] mt-0.5 leading-relaxed">
            Zero raw email contents stored on server. Ephemeral vectors processed via end-to-end
            encrypted enclaves.
          </p>
        </div>
      </div>
    </div>
  );
};
