import { useEffect } from 'react';
import { RotateCw, X } from 'lucide-react';
import type { SpinResult } from '@/types';

interface ResultModalProps {
  result: SpinResult | null;
  onClose: () => void;
  onSpinAgain: () => void;
}

export function ResultModal({ result, onClose, onSpinAgain }: ResultModalProps) {
  useEffect(() => {
    if (!result) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [result, onClose]);

  if (!result) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full rounded-2xl p-8 text-center animate-[modalIn_0.3s_ease-out]"
        style={{
          background: 'linear-gradient(145deg, #1a1a24, #0d0d14)',
          border: `2px solid ${result.color}`,
          boxShadow: `0 0 60px ${result.color}44, 0 0 120px ${result.color}22`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
          Selected Weapon
        </p>

        <div
          className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: `${result.color}22`,
            border: `2px solid ${result.color}`,
            boxShadow: `0 0 30px ${result.color}66`,
          }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{ background: result.color, boxShadow: `0 0 20px ${result.color}` }}
          />
        </div>

        <h2
          className="text-3xl font-black mb-6"
          style={{ color: result.color, textShadow: `0 0 20px ${result.color}66` }}
        >
          {result.name}
        </h2>

        <button
          onClick={onSpinAgain}
          className="w-full py-3 rounded-xl font-bold text-white uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #ff2d3d, #ff8c00)',
            boxShadow: '0 0 20px rgba(255,45,61,0.4)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <RotateCw size={18} />
            Spin Again
          </span>
        </button>
      </div>
    </div>
  );
}
