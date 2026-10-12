import React, { useEffect, useRef, useState } from 'react';

interface HoneyVideoBackgroundProps {
  variant?: 'hero' | 'calm' | 'farm' | 'ambient';
  className?: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
}

export const HoneyVideoBackground: React.FC<HoneyVideoBackgroundProps> = ({
  variant = 'hero',
  className = '',
  overlayOpacity = 'medium',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check which video file to attempt: hero.mp4, farm.mp4, or honey.mp4
  useEffect(() => {
    let candidateSrc = '/videos/hero.mp4';
    if (variant === 'farm') candidateSrc = '/videos/farm.mp4';
    else if (variant === 'calm') candidateSrc = '/videos/honey.mp4';

    const testVideo = document.createElement('video');
    testVideo.src = candidateSrc;
    testVideo.oncanplay = () => {
      setVideoSrc(candidateSrc);
      setVideoAvailable(true);
    };
    testVideo.onerror = () => {
      setVideoAvailable(false);
    };
  }, [variant]);

  // Canvas Simulation: Farm Apiary, Sunrise Landscape, Flying Bees & Dripping Honey
  useEffect(() => {
    if (videoAvailable || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Bees simulation
    interface Bee {
      x: number;
      y: number;
      baseY: number;
      speedX: number;
      frequency: number;
      amplitude: number;
      scale: number;
      wingAngle: number;
    }

    const bees: Bee[] = [];
    const beeCount = variant === 'hero' ? 8 : 4;
    for (let i = 0; i < beeCount; i++) {
      const baseY = height * (0.35 + Math.random() * 0.45);
      bees.push({
        x: Math.random() * width,
        y: baseY,
        baseY,
        speedX: (Math.random() * 0.8 + 0.6) * (Math.random() > 0.3 ? 1 : -1),
        frequency: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 25 + 15,
        scale: Math.random() * 0.4 + 0.6,
        wingAngle: 0,
      });
    }

    // Golden dust particles (bokeh pollen in sunlight)
    interface DustParticle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulse: number;
    }

    const dust: DustParticle[] = [];
    const dustCount = variant === 'hero' ? 40 : 20;
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 1.5,
        speedY: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;

      // 1. Sunrise Moroccan Mountain Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#301807'); // Deep espresso dawn
      skyGrad.addColorStop(0.35, '#85470F'); // Warm amber morning
      skyGrad.addColorStop(0.65, '#D98918'); // Golden sunrise horizon
      skyGrad.addColorStop(1, '#1A0E05'); // Earthy base ground

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Golden Sunbeams
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const sunbeamCount = 4;
      for (let s = 0; s < sunbeamCount; s++) {
        const beamAngle = 0.55 + s * 0.25;
        const beamX = width * (0.2 + s * 0.2) + Math.sin(time * 0.4 + s) * 20;
        const beamGrad = ctx.createLinearGradient(beamX, 0, beamX + Math.cos(beamAngle) * height, height);
        const beamAlpha = 0.08 + Math.sin(time * 0.5 + s * 1.5) * 0.04;
        beamGrad.addColorStop(0, `rgba(255, 230, 160, ${beamAlpha})`);
        beamGrad.addColorStop(0.6, `rgba(217, 154, 30, ${beamAlpha * 0.4})`);
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(beamX - 40, 0);
        ctx.lineTo(beamX + 40, 0);
        ctx.lineTo(beamX + 180, height);
        ctx.lineTo(beamX + 60, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 3. Atlas Mountain Silhouettes (Back Layer)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);
      for (let x = 0; x <= width; x += 30) {
        const my = height * 0.55 + Math.sin(x * 0.003 + 1) * 35 + Math.cos(x * 0.008) * 20;
        ctx.lineTo(x, my);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(74, 38, 14, 0.4)';
      ctx.fill();

      // 4. Moroccan Foothills & Rolling Apiary Meadow (Mid Layer)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.68);
      for (let x = 0; x <= width; x += 25) {
        const hy = height * 0.68 + Math.sin(x * 0.004) * 25 + Math.cos(x * 0.007) * 15;
        ctx.lineTo(x, hy);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(46, 23, 8, 0.65)';
      ctx.fill();

      // 5. Wooden Beehives (Ruches en bois alignées)
      const hivePositions = [0.15, 0.28, 0.72, 0.85];
      hivePositions.forEach((ratio, i) => {
        const hx = width * ratio;
        const hy = height * 0.72 + (i % 2 === 0 ? -12 : 8);
        const hw = 34;
        const hh = 30;

        // Hive body
        ctx.fillStyle = 'rgba(38, 18, 6, 0.85)';
        ctx.fillRect(hx, hy, hw, hh);

        // Hive slats / grooves
        ctx.strokeStyle = 'rgba(217, 154, 30, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hx, hy + 10);
        ctx.lineTo(hx + hw, hy + 10);
        ctx.moveTo(hx, hy + 20);
        ctx.lineTo(hx + hw, hy + 20);
        ctx.stroke();

        // Hive slanted protective roof
        ctx.beginPath();
        ctx.moveTo(hx - 5, hy);
        ctx.lineTo(hx + hw / 2, hy - 7);
        ctx.lineTo(hx + hw + 5, hy);
        ctx.closePath();
        ctx.fillStyle = 'rgba(26, 12, 4, 0.9)';
        ctx.fill();

        // Flight entrance notch
        ctx.fillStyle = '#D99A1E';
        ctx.fillRect(hx + hw / 2 - 4, hy + hh - 4, 8, 2.5);
      });

      // 6. Swaying Lavender & Wild Desert Flora (Foreground Edge)
      ctx.strokeStyle = 'rgba(92, 107, 58, 0.5)'; // Olive green stems
      ctx.lineWidth = 1.5;
      const flowerCount = Math.floor(width / 45);
      for (let f = 0; f < flowerCount; f++) {
        const fx = f * 45 + 15;
        const fHeight = 45 + Math.sin(f * 2) * 15;
        const sway = Math.sin(time * 1.5 + f) * 8;
        const fy = height - 5;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(fx + sway * 0.5, fy - fHeight * 0.5, fx + sway, fy - fHeight);
        ctx.stroke();

        // Flower tip (warm lavender / honey blossom dot)
        ctx.fillStyle = f % 2 === 0 ? 'rgba(180, 140, 220, 0.6)' : 'rgba(243, 193, 93, 0.7)';
        ctx.beginPath();
        ctx.arc(fx + sway, fy - fHeight, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Organic Flying Honeybees with Fluttering Wings
      bees.forEach((b) => {
        b.x += b.speedX;
        b.y = b.baseY + Math.sin(b.x * b.frequency + time) * b.amplitude;

        // Wrap around horizontally
        if (b.speedX > 0 && b.x > width + 30) b.x = -30;
        if (b.speedX < 0 && b.x < -30) b.x = width + 30;

        b.wingAngle += 0.8;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.speedX > 0 ? b.scale : -b.scale, b.scale);

        // Bee abdomen (striped yellow-amber and dark brown)
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#E6A728';
        ctx.fill();

        // Stripes
        ctx.strokeStyle = '#2B1A0E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-1, -3.5);
        ctx.lineTo(-1, 3.5);
        ctx.moveTo(2, -3.5);
        ctx.lineTo(2, 3.5);
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(6, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2B1A0E';
        ctx.fill();

        // Translucent fluttering wings
        const wingFlap = Math.sin(b.wingAngle) * 5;
        ctx.beginPath();
        ctx.ellipse(-1, -6 + wingFlap * 0.2, 5, 2.5, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        ctx.restore();
      });

      // 8. Viscous Honey Dripping Waves (Slow Macro Flow)
      const waveGrad = ctx.createLinearGradient(0, height * 0.85, 0, height);
      waveGrad.addColorStop(0, 'rgba(217, 154, 30, 0.15)');
      waveGrad.addColorStop(0.5, 'rgba(197, 126, 17, 0.35)');
      waveGrad.addColorStop(1, 'rgba(43, 26, 14, 0.7)');

      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let wx = 0; wx <= width; wx += 20) {
        const honeyWaveY = height * 0.88 + Math.sin(wx * 0.003 + time * 0.5) * 18 + Math.cos(wx * 0.006 - time * 0.3) * 10;
        ctx.lineTo(wx, honeyWaveY);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = waveGrad;
      ctx.fill();

      // 9. Floating Golden Sun Dust / Bokeh Pollen
      dust.forEach((d) => {
        d.y -= d.speedY;
        d.x += Math.sin(time + d.pulse) * 0.3 + d.speedX;

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }

        const currentOpacity = d.opacity * (0.8 + Math.sin(time * 2 + d.pulse) * 0.3);
        const pGrad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        pGrad.addColorStop(0, `rgba(255, 240, 180, ${currentOpacity})`);
        pGrad.addColorStop(0.6, `rgba(217, 154, 30, ${currentOpacity * 0.6})`);
        pGrad.addColorStop(1, 'rgba(217, 154, 30, 0)');

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [videoAvailable, reducedMotion, variant]);

  const overlayClasses = {
    light: 'bg-gradient-to-t from-[#201207]/75 via-[#201207]/35 to-black/45',
    medium: 'bg-gradient-to-t from-[#201207]/88 via-[#201207]/48 to-black/60',
    dark: 'bg-gradient-to-t from-[#150B04]/95 via-[#201207]/72 to-black/80',
  }[overlayOpacity];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {videoAvailable ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/ferme-apicole.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : reducedMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6A728] via-[#A66C15] to-[#201207]" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}

      {/* Protective contrast scrim for WCAG AA readability */}
      <div className={`absolute inset-0 ${overlayClasses}`} />
    </div>
  );
};
