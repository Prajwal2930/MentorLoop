import confetti from 'canvas-confetti';

/** A restrained success burst for meaningful completed milestones. */
export const celebrate = () => {
  confetti({ particleCount: 70, spread: 62, startVelocity: 30, origin: { y: 0.72 }, colors: ['#4f46e5', '#818cf8', '#22c55e', '#f8fafc'] });
};
