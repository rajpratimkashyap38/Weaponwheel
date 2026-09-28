import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Wheel } from '@/components/Wheel';
import { SpinButton } from '@/components/SpinButton';
import { ResultModal } from '@/components/ResultModal';
import { WeaponListPanel } from '@/components/WeaponListPanel';
import { SpinHistory } from '@/components/SpinHistory';
import { useWeapons } from '@/hooks/useWeapons';
import { useSpinHistory } from '@/hooks/useSpinHistory';
import { useAudio } from '@/hooks/useAudio';
import { useWheelSpin } from '@/hooks/useWheelSpin';
import { fireConfetti } from '@/utils/confetti';
import type { SpinResult } from '@/types';

export function App() {
  const { weapons, addWeapon, removeWeapon, editWeapon, resetWeapons } = useWeapons();
  const { history, addResult, clearHistory } = useSpinHistory();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playTick, playWin } = useAudio(soundEnabled);
  const { rotation, isSpinning, spin } = useWheelSpin();
  const [result, setResult] = useState<SpinResult | null>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);

  const handleSpin = useCallback(() => {
    if (isSpinning || weapons.length === 0) return;
    setResult(null);

    const targetIndex = Math.floor(Math.random() * weapons.length);

    spin({
      targetIndex,
      segmentCount: weapons.length,
      duration: 5000,
      onTick: playTick,
      onComplete: (finalIndex) => {
        const winner = weapons[finalIndex] ?? weapons[targetIndex];
        const finalResult: SpinResult = { name: winner.name, color: winner.color };
        setResult(finalResult);
        addResult(finalResult);
        playWin();
        if (confettiRef.current) {
          fireConfetti(confettiRef.current);
        }
      },
    });
  }, [isSpinning, weapons, spin, playTick, playWin, addResult]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpinning) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSpinning, handleSpin]);

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 50%, #050508 100%)',
      }}
    >
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,45,61,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,61,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((s) => !s)}
        />

        <main className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div className="flex flex-col items-center">
              <Wheel weapons={weapons} rotation={rotation} isSpinning={isSpinning} />
              <SpinButton onClick={handleSpin} disabled={isSpinning || weapons.length === 0} />
              <p className="mt-3 text-xs text-gray-600 uppercase tracking-widest">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400">Space</kbd> to spin
              </p>
            </div>

            <div className="space-y-4 lg:sticky lg:top-4">
              <WeaponListPanel
                weapons={weapons}
                onAdd={addWeapon}
                onRemove={removeWeapon}
                onEdit={editWeapon}
                onReset={resetWeapons}
              />
              <SpinHistory history={history} onClear={clearHistory} />
            </div>
          </div>
        </main>
      </div>

      <ResultModal
        result={result}
        onClose={() => setResult(null)}
        onSpinAgain={handleSpin}
      />
    </div>
  );
}

export default App;
