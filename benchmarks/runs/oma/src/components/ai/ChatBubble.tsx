import type { AIMessage } from '@/types';

interface ChatBubbleProps {
  message: AIMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isSpark = message.role === 'spark';

  return (
    <div className={`flex ${isSpark ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
          isSpark
            ? 'bg-gradient-to-r from-spark-50 to-magic-50 text-gray-800 rounded-tl-sm'
            : 'bg-ocean-400 text-white rounded-tr-sm'
        }`}
      >
        {isSpark && <span className="text-xs font-bold text-spark-500 block mb-0.5">Spark</span>}
        <p>{message.content}</p>
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.suggestions.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/60 rounded-full text-xs text-gray-600">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
