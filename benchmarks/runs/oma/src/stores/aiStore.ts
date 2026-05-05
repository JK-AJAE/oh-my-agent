import { create } from 'zustand';
import type { AIMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type ConversationState = 'greeting' | 'exploring' | 'building' | 'suggesting' | 'reflecting' | 'celebrating';

interface AIStoreState {
  messages: AIMessage[];
  isLoading: boolean;
  conversationState: ConversationState;
  interactionCount: number;
  maxInteractions: number;
}

interface AIStoreActions {
  addMessage: (role: AIMessage['role'], content: string, suggestions?: string[]) => void;
  setLoading: (loading: boolean) => void;
  setConversationState: (state: ConversationState) => void;
  incrementInteraction: () => void;
  canInteract: () => boolean;
  clearMessages: () => void;
  sendToSpark: (message: string, worldContext: Record<string, unknown>) => Promise<void>;
}

export const useAIStore = create<AIStoreState & AIStoreActions>()((set, get) => ({
  messages: [],
  isLoading: false,
  conversationState: 'greeting',
  interactionCount: 0,
  maxInteractions: 20,

  addMessage: (role, content, suggestions) => {
    const message: AIMessage = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
      suggestions,
    };
    set((state) => ({ messages: [...state.messages, message] }));
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setConversationState: (conversationState) => set({ conversationState }),
  incrementInteraction: () => set((state) => ({ interactionCount: state.interactionCount + 1 })),
  canInteract: () => get().interactionCount < get().maxInteractions,

  clearMessages: () => set({ messages: [], interactionCount: 0, conversationState: 'greeting' }),

  sendToSpark: async (message, worldContext) => {
    const { addMessage, setLoading, incrementInteraction, canInteract } = get();
    if (!canInteract()) {
      addMessage('spark', "We've been chatting a lot! How about you keep building and show me what you make? 🌟");
      return;
    }

    addMessage('child', message);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          worldContext,
          history: get().messages.slice(-10),
        }),
      });

      const data = await response.json();
      addMessage('spark', data.content, data.suggestions);
      incrementInteraction();
    } catch {
      addMessage('spark', "Hmm, I got a little dizzy! Can you try asking me again? ✨");
    } finally {
      setLoading(false);
    }
  },
}));
