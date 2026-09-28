import { useCallback, useEffect, useRef, useState } from 'react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

interface SpinOptions {
  targetIndex: number;
  segmentCount: number;
  duration: number;
  onComplete: (finalIndex: number) => void;
  onTick?: () => void;
}

export function useWheelSpin() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const startTimeRef = useRef(0);
  const durationRef = useRef(5000);
  const segmentCountRef = useRef(1);
  const lastTickSegmentRef = useRef(-1);
  const onCompleteRef = useRef<((index: number) => void) | null>(null);
  const onTickRef = useRef<(() => void) | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const t = Math.min(elapsed / durationRef.current, 1);
    const eased = easeOutQuart(t);
    const current =
      startRotationRef.current +
      (targetRotationRef.current - startRotationRef.current) * eased;
    setRotation(current);

    const segmentAngle = 360 / segmentCountRef.current;
    const pointerAngle = ((360 - (current % 360)) + 360) % 360;
    const currentSegment = Math.floor(pointerAngle / segmentAngle);
    if (currentSegment !== lastTickSegmentRef.current && t < 1) {
      lastTickSegmentRef.current = currentSegment;
      onTickRef.current?.();
    }

    if (t < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setIsSpinning(false);
      const finalPointerAngle = ((360 - (targetRotationRef.current % 360)) + 360) % 360;
      const finalIndex = Math.floor(finalPointerAngle / segmentAngle) % segmentCountRef.current;
      onCompleteRef.current?.(finalIndex);
    }
  }, []);

  const spin = useCallback(
    (opts: SpinOptions) => {
      if (isSpinning) return;
      setIsSpinning(true);

      const { targetIndex, segmentCount, duration, onComplete, onTick } = opts;
      const segmentAngle = 360 / segmentCount;
      const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.6;
      const targetCenter = targetIndex * segmentAngle + segmentAngle / 2 + randomOffset;
      const targetAngle = (360 - targetCenter + 360) % 360;

      const currentMod = ((startRotationRef.current % 360) + 360) % 360;
      const delta = ((targetAngle - currentMod) + 360) % 360;
      const numRotations = 5 + Math.floor(Math.random() * 3);

      targetRotationRef.current = startRotationRef.current + 360 * numRotations + delta;
      startTimeRef.current = 0;
      durationRef.current = duration;
      segmentCountRef.current = segmentCount;
      onCompleteRef.current = onComplete;
      onTickRef.current = onTick ?? null;
      lastTickSegmentRef.current = -1;

      rafRef.current = requestAnimationFrame(animate);
    },
    [isSpinning, animate],
  );

  useEffect(() => {
    if (!isSpinning) {
      startRotationRef.current = rotation;
    }
  }, [rotation, isSpinning]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { rotation, isSpinning, spin };
}
