interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative group mt-8 px-12 py-4 rounded-full text-white font-bold text-xl tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: disabled
          ? 'linear-gradient(135deg, #444, #333)'
          : 'linear-gradient(135deg, #ff2d3d, #ff8c00)',
        boxShadow: disabled
          ? 'none'
          : '0 0 30px rgba(255,45,61,0.5), 0 4px 20px rgba(255,140,0,0.3)',
        border: '2px solid rgba(255,255,255,0.15)',
      }}
    >
      <span className="relative z-10">
        {disabled ? 'Spinning…' : 'Spin'}
      </span>
      {!disabled && (
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #ff8c00, #ff2d3d)',
            boxShadow: '0 0 50px rgba(255,140,0,0.6)',
          }}
        />
      )}
    </button>
  );
}
