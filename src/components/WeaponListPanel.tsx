import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X, RotateCcw } from 'lucide-react';
import type { Weapon } from '@/types';

interface WeaponListPanelProps {
  weapons: Weapon[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onReset: () => void;
}

export function WeaponListPanel({
  weapons,
  onAdd,
  onRemove,
  onEdit,
  onReset,
}: WeaponListPanelProps) {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(newName);
      setNewName('');
    }
  };

  const startEdit = (weapon: Weapon) => {
    setEditingId(weapon.id);
    setEditName(weapon.name);
  };

  const confirmEdit = () => {
    if (editingId && editName.trim()) {
      onEdit(editingId, editName);
    }
    setEditingId(null);
    setEditName('');
  };

  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col"
      style={{
        background: 'linear-gradient(145deg, #14141c, #0d0d14)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
          Weapon List
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-400 transition-colors"
          title="Reset to default weapons"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
          placeholder="Add weapon…"
          maxLength={30}
          className="flex-1 px-3 py-2 rounded-lg text-sm text-white bg-black/40 border border-white/10 focus:border-orange-500/50 focus:outline-none transition-colors placeholder:text-gray-600"
        />
        <button
          onClick={handleAdd}
          className="p-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[360px]">
        {weapons.length === 0 && (
          <p className="text-sm text-gray-600 text-center py-8">
            No weapons. Add one to get started.
          </p>
        )}
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors group"
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: weapon.color, boxShadow: `0 0 6px ${weapon.color}` }}
            />
            {editingId === weapon.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmEdit();
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  autoFocus
                  maxLength={30}
                  className="flex-1 px-2 py-1 rounded text-sm text-white bg-black/60 border border-orange-500/50 focus:outline-none"
                />
                <button
                  onClick={confirmEdit}
                  className="text-green-400 hover:text-green-300"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-200 truncate">
                  {weapon.name}
                </span>
                <button
                  onClick={() => startEdit(weapon)}
                  className="text-gray-600 hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onRemove(weapon.id)}
                  className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-600 text-center">
        {weapons.length} weapon{weapons.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
