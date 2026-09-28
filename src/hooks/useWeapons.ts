import { useCallback, useEffect, useState } from 'react';
import type { Weapon } from '@/types';
import { nextColor } from '@/utils/colors';

const STORAGE_KEY = 'weapon-randomizer:weapons';

const DEFAULT_WEAPONS: Weapon[] = [
  'Plasma Rifle',
  'Laser Pistol',
  'Energy Sword',
  'Rocket Launcher',
  'Railgun',
  'Gravity Gun',
  'Plasma Cannon',
  'Pulse Rifle',
  'Shock Blaster',
  'Photon Bow',
  'EMP Blaster',
  'Flame Cannon',
].map((name, i) => ({
  id: `default-${i}`,
  name,
  color: nextColor(i),
}));

function loadWeapons(): Weapon[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Weapon[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_WEAPONS;
}

export function useWeapons() {
  const [weapons, setWeapons] = useState<Weapon[]>(loadWeapons);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weapons));
  }, [weapons]);

  const addWeapon = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setWeapons((prev) => [
      ...prev,
      { id: `weapon-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: trimmed, color: nextColor(prev.length) },
    ]);
  }, []);

  const removeWeapon = useCallback((id: string) => {
    setWeapons((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const editWeapon = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setWeapons((prev) => prev.map((w) => (w.id === id ? { ...w, name: trimmed } : w)));
  }, []);

  const resetWeapons = useCallback(() => {
    setWeapons(DEFAULT_WEAPONS);
  }, []);

  return { weapons, addWeapon, removeWeapon, editWeapon, resetWeapons };
}
