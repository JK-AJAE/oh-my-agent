import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { AIMessage, WorldObject, EnvironmentTheme } from '@/types/world';

interface WorldContext {
  objects: WorldObject[];
  environmentTheme: EnvironmentTheme;
  title: string;
}

interface AIState {
  messages: AIMessage[];
  isLoading: boolean;
  suggestions: string[];
}

interface AIActions {
  addMessage: (message: AIMessage) => void;
  setLoading: (isLoading: boolean) => void;
  setSuggestions: (suggestions: string[]) => void;
  clearMessages: () => void;
  sendPrompt: (worldContext: WorldContext, userMessage?: string) => Promise<void>;
}

type AIStore = AIState & AIActions;

export const useAIStore = create<AIStore>((set, get) => ({
  messages: [],
  isLoading: false,
  suggestions: [],

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setSuggestions: (suggestions) => {
    set({ suggestions });
  },

  clearMessages: () => {
    set({ messages: [], suggestions: [] });
  },

  sendPrompt: async (worldContext, userMessage) => {
    const { addMessage, setLoading, setSuggestions } = get();

    if (userMessage) {
      const userMsg: AIMessage = {
        id: nanoid(),
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
        type: 'prompt',
      };
      addMessage(userMsg);
    }

    setLoading(true);

    try {
      const response = await fetch('/api/ai/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worldContext, userMessage }),
      });

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }

      const data = (await response.json()) as {
        message: string;
        type?: AIMessage['type'];
        suggestions?: string[];
      };

      const assistantMsg: AIMessage = {
        id: nanoid(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
        type: data.type ?? 'suggestion',
      };

      addMessage(assistantMsg);

      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      const errorMsg: AIMessage = {
        id: nanoid(),
        role: 'assistant',
        content: "Oops! I couldn't connect right now. Try again in a moment!",
        timestamp: new Date().toISOString(),
        type: 'suggestion',
      };
      addMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  },
}));
