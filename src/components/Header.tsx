import { Crosshair, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function Header({ soundEnabled, onToggleSound }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ff2d3d, #ff8c00)',
            boxShadow: '0 0 20px rgba(255,45,61,0.4)',
          }}
        >
          <Crosshair size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-white leading-none">
            WEAPON ROULETTE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mt-0.5">
            Randomizer Wheel
          </p>
        </div>
      </div>

      <button
        onClick={onToggleSound}
        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </header>
  );
}
