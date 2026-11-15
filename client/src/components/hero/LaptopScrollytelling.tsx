import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Cpu,
  Layers,
  Recycle,
  ShieldCheck,
  Sparkles,
  Volume2,
  Wind,
} from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { Button } from '../common/Button';

const TOTAL_FRAMES = 118;
const FRAME_PATH = (index: number) =>
  `/sequence/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

export function LaptopScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const reducedMotion = useReducedMotionPreference();

  // Helper to find the nearest loaded frame if current target isn't loaded yet
  const getAvailableFrame = useCallback((desired: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[desired]?.complete && images[desired].naturalWidth > 0) {
      return images[desired];
    }
    // Search outward
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = desired - offset;
      if (left >= 1 && images[left]?.complete && images[left].naturalWidth > 0) {
        return images[left];
      }
      const right = desired + offset;
      if (right <= TOTAL_FRAMES && images[right]?.complete && images[right].naturalWidth > 0) {
        return images[right];
      }
    }
    return null;
  }, []);

  // Draw a frame onto the canvas with high-DPI scaling and centered contain framing
  const drawFrame = useCallback(
    (frameNumber: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = getAvailableFrame(frameNumber);
      if (!img) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear with exact dark background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // 16:9 aspect ratio of source frames
      const imgWidth = 1920;
      const imgHeight = 1080;
      const scale = Math.min(width / imgWidth, height / imgHeight) * (width < 768 ? 1.0 : 1.05);

      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const drawX = (width - drawWidth) / 2;
      const drawY = (height - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      ctx.restore();
    },
    [getAvailableFrame],
  );

  // Preloading sequence: Frame 1 immediately, then the rest concurrently
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);
    imagesRef.current = images;

    // Load Frame 1 first with high priority
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(1);
    images[1] = firstImg;

    firstImg.onload = () => {
      if (isCancelled) return;
      loadedSetRef.current.add(1);
      setIsInitialReady(true);
      drawFrame(1);
    };

    // Load rest in batches to avoid network congestion while ensuring smooth scroll
    let loadedCount = 1;
    const loadNext = (index: number) => {
      if (index > TOTAL_FRAMES || isCancelled) return;
      const img = new Image();
      img.src = FRAME_PATH(index);
      images[index] = img;

      const onDone = () => {
        if (isCancelled) return;
        loadedSetRef.current.add(index);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      };

      img.onload = onDone;
      img.onerror = onDone;
    };

    // Preload remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      loadNext(i);
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Animation render loop with buttery lerp interpolation
  useEffect(() => {
    let lastRendered = -1;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Smooth lerp factor (0.16 gives instant yet silky Apple-like inertia)
      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.max(
        1,
        Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)),
      );

      if (frameToDraw !== lastRendered) {
        drawFrame(frameToDraw);
        lastRendered = frameToDraw;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Scroll listener tracking scroll percentage through the 420vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const target = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute story beat opacities and transforms with easing curves
  const getBeatStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    const p = scrollProgress;
    let opacity = 0;
    let translateY = 0;

    if (p >= start && p <= end) {
      if (p < peakStart) {
        const factor = (p - start) / (peakStart - start);
        opacity = factor;
        translateY = (1 - factor) * 16;
      } else if (p <= peakEnd) {
        opacity = 1;
        translateY = 0;
      } else {
        const factor = (end - p) / (end - peakEnd);
        opacity = factor;
        translateY = (1 - factor) * -16;
      }
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
    };
  };

  const beat1Style = getBeatStyle(0.0, 0.0, 0.12, 0.18);
  const beat2Style = getBeatStyle(0.18, 0.24, 0.36, 0.42);
  const beat3Style = getBeatStyle(0.42, 0.48, 0.61, 0.67);
  const beat4Style = getBeatStyle(0.67, 0.73, 0.82, 0.88);
  const beat5Style = getBeatStyle(0.88, 0.94, 1.0, 1.0);

  const scrollToNextSection = () => {
    const el = document.getElementById('specs');
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const scrollToMarketplace = () => {
    const el = document.getElementById('marketplace');
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[440vh] w-full bg-[#050505] text-white"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Subtle Ambient Sony Blue / Cyan Radial Glow behind the hardware */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,80,255,0.08),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(0,214,255,0.04),transparent_50%)]" />

        {/* High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
            isInitialReady ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Sony-inspired cinematic exploded sequence of EcoBook Precision Laptop"
          role="img"
        />

        {/* Seamless Edge Blending Vignette — makes image boundaries 100% invisible */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050505_92%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

        {/* Preload Progress Indicator (Apple-style minimal telemetry) */}
        {loadProgress < 100 && (
          <div className="pointer-events-none absolute bottom-5 right-6 z-30 flex items-center gap-2.5 rounded-full border border-white/10 bg-[#050505]/80 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D6FF]" />
            <span className="text-[11px] font-mono tracking-wider text-white/50">
              CACHING 3D SEQUENCE {loadProgress}%
            </span>
          </div>
        )}

        {/* STORYTELLING OVERLAYS (Synchronized with Exploded Sequence) */}

        {/* BEAT 1: 0% - 18% | HERO BEAUTY SHOT */}
        <div
          style={beat1Style}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between px-6 pb-12 pt-28 sm:px-8 sm:pt-32"
        >
          <div className="flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D6FF]/30 bg-[#0A0A0C]/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00D6FF] backdrop-blur-md shadow-[0_0_20px_-3px_rgba(0,214,255,0.3)]">
              <Sparkles className="h-3.5 w-3.5 text-[#00D6FF]" />
              EcoLoop Hardware Labs · Flagship Circular Series
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.2rem] lg:leading-[1.05]">
              Don&apos;t discard it.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Reimagine it.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/70 sm:text-lg">
              The world&apos;s flagship modular laptop engineered for infinite circularity.
              Turn obsolete electronics into studio-grade performance.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                onClick={scrollToNextSection}
                variant="glow"
                size="md"
                className="pointer-events-auto shadow-[0_0_30px_rgba(0,80,255,0.4)]"
              >
                Explore Architecture
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/sell"
                variant="glass"
                size="md"
                className="pointer-events-auto"
              >
                Sell Your Old Device
              </Button>
            </div>
          </div>

          {/* Scroll Down Prompt */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
              Scroll to dismantle &amp; inspect
            </span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <span className="h-2 w-1 animate-bounce rounded-full bg-[#00D6FF]" />
            </div>
          </div>
        </div>

        {/* BEAT 2: 18% - 42% | STRUCTURAL DISASSEMBLY */}
        <div
          style={beat2Style}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-start px-6 sm:px-12 lg:px-20"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0C]/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF] backdrop-blur-md">
              <Layers className="h-3.5 w-3.5" />
              01 / Precision Architecture
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Precision-engineered for silence &amp; circularity.
            </h2>

            <p className="mt-4 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
              CNC-machined from 100% reclaimed aerospace-grade alloy. Sealed acoustic
              resonance chambers and frictionless mechanical fasteners allow the complete chassis
              to separate cleanly without destructive glue or toxic solvents.
            </p>

            {/* Spec Highlights Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="glass-dark rounded-xl p-3.5 border border-white/8">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                  Alloy Chassis
                </span>
                <p className="mt-1 text-sm font-bold text-white">100% Reclaimed</p>
              </div>
              <div className="glass-dark rounded-xl p-3.5 border border-white/8">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                  Fasteners
                </span>
                <p className="mt-1 text-sm font-bold text-[#00D6FF]">Zero Adhesives</p>
              </div>
              <div className="glass-dark rounded-xl p-3.5 border border-white/8 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                  Tolerances
                </span>
                <p className="mt-1 text-sm font-bold text-[#20C878]">&plusmn;0.02 mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* BEAT 3: 42% - 67% | MODULAR SILICON & RECLAMATION */}
        <div
          style={beat3Style}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end px-6 sm:px-12 lg:px-20 text-right"
        >
          <div className="flex max-w-xl flex-col items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0C]/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF] backdrop-blur-md">
              <Cpu className="h-3.5 w-3.5" />
              02 / Silicon &amp; Logic
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Every trace accounted for. Zero compromises.
            </h2>

            <p className="mt-4 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
              A high-density modular motherboard layout with swappable memory and solid-state
              modules. Heavy rare-earth magnetic arrays and gold-plated bus connectors endure
              over 10,000 service cycles without impedance degradation.
            </p>

            <ul className="mt-6 flex flex-col items-end gap-2.5 text-xs text-white/75 sm:text-sm">
              <li className="glass-dark inline-flex items-center gap-2.5 rounded-xl px-4 py-2 border border-white/8">
                <span>96.5% Closed-loop precious metal recovery</span>
                <Recycle className="h-4 w-4 text-[#20C878]" />
              </li>
              <li className="glass-dark inline-flex items-center gap-2.5 rounded-xl px-4 py-2 border border-white/8">
                <span>Micro-sensor telemetry monitors battery impedance</span>
                <ShieldCheck className="h-4 w-4 text-[#00D6FF]" />
              </li>
              <li className="glass-dark inline-flex items-center gap-2.5 rounded-xl px-4 py-2 border border-white/8">
                <span>Modular socket enables generational silicon swaps</span>
                <Cpu className="h-4 w-4 text-[#E8C46A]" />
              </li>
            </ul>
          </div>
        </div>

        {/* BEAT 4: 67% - 88% | ACOUSTIC & THERMAL DYNAMICS */}
        <div
          style={beat4Style}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-start px-6 sm:px-12 lg:px-20"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0C]/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF] backdrop-blur-md">
              <Wind className="h-3.5 w-3.5" />
              03 / Thermal &amp; Acoustic
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Pure velocity under total acoustic silence.
            </h2>

            <p className="mt-4 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
              Dual ultra-thin vapor dissipation loops silently evacuate heat away from
              high-performance silicon dies. Custom neodymium drivers reproduce full-spectrum
              studio sound with breathtaking space and texture.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="glass-dark flex items-center gap-2.5 rounded-xl px-4 py-2.5 border border-white/8">
                <Wind className="h-4 w-4 text-[#00D6FF]" />
                <span className="text-xs font-semibold text-white">0dB Fanless Idling</span>
              </div>
              <div className="glass-dark flex items-center gap-2.5 rounded-xl px-4 py-2.5 border border-white/8">
                <Volume2 className="h-4 w-4 text-[#20C878]" />
                <span className="text-xs font-semibold text-white">Studio-Grade Soundstage</span>
              </div>
            </div>
          </div>
        </div>

        {/* BEAT 5: 88% - 100% | COMPLETE REASSEMBLY & CTA */}
        <div
          style={beat5Style}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="flex max-w-2xl flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#20C878]/35 bg-[#0A0A0C]/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#20C878] backdrop-blur-md shadow-[0_0_20px_-3px_rgba(32,200,120,0.3)]">
              04 / Complete System Lock
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hear everything.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Feel nothing else.
              </span>
            </h2>

            <p className="mt-4 text-base font-normal leading-relaxed text-white/70 sm:text-lg">
              EcoBook Precision. Designed for focus, crafted for circular eternity.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Button
                type="button"
                onClick={scrollToNextSection}
                variant="glow"
                size="lg"
                className="pointer-events-auto"
              >
                Experience EcoBook
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/sell"
                variant="glowEco"
                size="lg"
                className="pointer-events-auto"
              >
                Sell Your E-Waste
              </Button>
              <Button
                type="button"
                onClick={scrollToMarketplace}
                variant="glass"
                size="lg"
                className="pointer-events-auto"
              >
                Explore Marketplace
              </Button>
            </div>

            <p className="mt-6 text-xs text-white/40">
              Engineered for airports, creative studios, and everything in between.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaptopScrollytelling;
