export interface Task {
  id: string;
  title: string;
  source: string;
  channelName?: string;
  type: ('slack' | 'email' | 'today')[];
  isHighPriority: boolean;
  timeDue: string;
  timeDueColor?: string;
  quoteSnippet: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
    initials?: string;
  };
  actionFooter: {
    type: 'auto-reply' | 'draft-ready' | 'approve-btn' | 'redlines';
    label: string;
    icon: string;
  };
  completed: boolean;
  completedAt?: string;
  contextData?: {
    dueBadge: string;
    extractedAgo: string;
    readingTime: string;
    touchpoints: number;
    confidence: string;
    decisionDelta: string;
    competitiveRisk: string;
    synthesisText: string;
    candidate?: {
      name: string;
      title: string;
      avatarUrl: string;
      topScoreBadge: string;
      archRating: string;
      percentage: number;
    };
    events: Array<{
      id: string;
      type: 'gmail' | 'slack';
      sourceLabel: string;
      author: string;
      time: string;
      recipient?: string;
      body: string;
      avatarUrl?: string;
      attachment?: {
        name: string;
        size: string;
        badge: string;
      };
    }>;
    suggestedDraft: string;
  };
  notifyData?: {
    dueTime: string;
    triggeredBy: string;
    triggerChannel: string;
    confidence: string;
    author: {
      name: string;
      role: string;
      avatarUrl: string;
    };
    defaultMessage: string;
  };
}

export interface CompletedLog {
  id: string;
  title: string;
  completedAgo: string;
  source: string;
}

export interface StreamSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
