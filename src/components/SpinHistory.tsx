import { History } from 'lucide-react';
import type { SpinResult } from '@/types';

interface SpinHistoryProps {
  history: SpinResult[];
  onClear: () => void;
}

export function SpinHistory({ history, onClear }: SpinHistoryProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'linear-gradient(145deg, #14141c, #0d0d14)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
          <History size={16} />
          Spin History
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-gray-600 text-center py-4">
          No spins yet. Hit Spin to start!
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((result, i) => (
            <div
              key={`${result.name}-${i}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30"
            >
              <span
                className="text-xs font-mono text-gray-600 w-5 text-center"
              >
                {i + 1}
              </span>
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: result.color, boxShadow: `0 0 4px ${result.color}` }}
              />
              <span className="text-sm text-gray-300 truncate">{result.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
