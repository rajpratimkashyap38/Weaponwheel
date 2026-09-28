export const SEGMENT_COLORS: string[] = [
  '#ff2d3d',
  '#ff8c00',
  '#ffcc00',
  '#88ff00',
  '#00ff88',
  '#00ffcc',
  '#00d9ff',
  '#0088ff',
  '#ff00aa',
  '#ff4477',
  '#ffaa44',
  '#ff6633',
];

export function colorForIndex(index: number): string {
  return SEGMENT_COLORS[index % SEGMENT_COLORS.length];
}

export function nextColor(existingCount: number): string {
  return colorForIndex(existingCount);
}
