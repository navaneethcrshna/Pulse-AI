import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ConfettiCanvasRef {
  triggerBurst: (x: number, y: number) => void;
}

export const ConfettiCanvas = forwardRef<ConfettiCanvasRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    life: number;
    decay: number;
    shape: 'rect' | 'circle';
  }>>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.vx *= 0.96; // air resistance
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.length > 0) {
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrameRef.current = null;
    }
  };

  useImperativeHandle(ref, () => ({
    triggerBurst: (originX: number, originY: number) => {
      const colors = ['#10b981', '#4edea3', '#8b5cf6', '#6366f1', '#fbbf24', '#7bd0ff', '#ffffff'];
      const count = 42;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3.5 + Math.random() * 5.5;
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 16,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
        });
      }

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
});

ConfettiCanvas.displayName = 'ConfettiCanvas';
