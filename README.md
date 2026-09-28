# Weapon Roulette — Randomizer Wheel

A dark, neon-themed spinning wheel that randomly selects a weapon from a customizable list. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Spinning wheel** with smooth easing animation and a pointer indicating the selected segment
- **Large SPIN button** with glow effects and hover states
- **Result modal** displaying the winning weapon prominently with a "Spin Again" button
- **Customizable weapon list** — add, remove, edit, and reset weapons; changes persist in local storage
- **Spin history** showing the last 5 results
- **Sound effects** — ticking during spin and a victory chime on landing (toggleable)
- **Confetti effect** when a weapon is selected
- **Keyboard support** — press Spacebar to spin
- **Responsive design** for mobile and desktop
- **Prevents spinning** while the wheel is already in motion

## Default Weapons

Plasma Rifle, Laser Pistol, Energy Sword, Rocket Launcher, Railgun, Gravity Gun, Plasma Cannon, Pulse Rifle, Shock Blaster, Photon Bow, EMP Blaster, Flame Cannon

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal to view the app in your browser.

## Build

```bash
npm run build
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Web Audio API (sound effects)
- Canvas API (confetti)
- LocalStorage (persistence)
