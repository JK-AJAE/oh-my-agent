'use client';

import { useState } from 'react';
import { useAIStore } from '@/stores/aiStore';
import { useWorldStore } from '@/stores/worldStore';
import { ChatBubble } from './ChatBubble';

export function SparkPanel() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendToSpark, interactionCount, maxInteractions } = useAIStore();
  const { objects, environment } = useWorldStore();

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const worldContext = {
      environment,
      objectCount: objects.length,
      recentObjects: objects.slice(-3).map((o) => o.type).join(', ') || 'none',
    };
    sendToSpark(input.trim(), worldContext);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-gradient-to-r from-spark-50 to-magic-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-[bounce-gentle_2s_ease-in-out_infinite]">✨</span>
          <div>
            <h2 className="font-bold text-lg">Spark</h2>
            <p className="text-xs text-gray-500">Your creative friend</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">✨</p>
            <p className="text-gray-600 font-semibold">Hi there! I&apos;m Spark!</p>
            <p className="text-gray-500 text-sm mt-1">Ask me anything about your world!</p>
            <div className="mt-4 space-y-2">
              {['What should I build?', 'Give me a challenge!', 'Help me with colors'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="block w-full px-3 py-2 text-sm bg-spark-50 rounded-lg hover:bg-spark-100 transition text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400">
            <span className="animate-[sparkle_1.5s_ease-in-out_infinite]">✨</span>
            <span className="text-sm">Spark is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="text-xs text-gray-400 mb-1 text-right">
          {interactionCount}/{maxInteractions} chats
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Talk to Spark..."
            className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-spark-300 text-sm"
            aria-label="Message to Spark"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-spark-400 text-white rounded-xl font-bold text-sm disabled:opacity-50 hover:bg-spark-500 transition active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
