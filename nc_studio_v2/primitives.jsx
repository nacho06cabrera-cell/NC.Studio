// Primitives & reusable bits for NC Studio
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// --- Logo: NC monogram, custom-drawn ---
function Logo({ size = 18, color = "currentColor" }) {
  // Stylized "NC" — N as two verticals + diagonal, C as open arc
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 26 V6 L17 26 V6" stroke={color} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M27 9.5 A8 8 0 1 0 27 22.5" stroke={color} strokeWidth="2.2" strokeLinecap="square" fill="none"/>
    </svg>
  );
}

// --- Wordmark for footer ---
function Wordmark({ className = "" }) {
  return (
    <div className={className} style={{ fontFamily: "var(--sans)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
      <span style={{ fontFamily: "var(--mono)", fontWeight: 500, color: "var(--text-3)", fontSize: "0.55em", verticalAlign: "0.6em", marginRight: "0.4em" }}>©</span>
      NC Studio
    </div>
  );
}

// --- Eyebrow (section label) ---
function Eyebrow({ children }) {
  return <div className="eyebrow-line">{children}</div>;
}

// --- Section wrapper ---
function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "120px 0", position: "relative", ...style }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {children}
      </div>
    </section>
  );
}

// --- Browser mockup for project previews ---
function BrowserMockup({ project, accent = "#4b8dff", compact = false }) {
  // Deterministic visual variant based on project name
  const variant = useMemo(() => {
    const h = (project.name || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return h % 4;
  }, [project.name]);

  return (
    <div style={{
      width: "100%", height: "100%",
      borderRadius: 14,
      overflow: "hidden",
      background: "#0e0e12",
      border: "1px solid var(--border)",
      boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02) inset",
      display: "flex", flexDirection: "column",
    }}>
      {/* browser bar */}
      <div className="browser-bar" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", flexShrink: 0 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#3a3a40" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#3a3a40" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#3a3a40" }}></span>
        <div className="mono" style={{ flex: 1, textAlign: "center", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.04em" }}>
          {project.url
            ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : (project.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "project") + ".com"}
        </div>
      </div>
      {/* preview content — abstract layout that varies per project */}
      <div style={{ flex: 1, position: "relative", padding: compact ? 14 : 22, display: "flex", flexDirection: "column", gap: 12, background: "linear-gradient(180deg, #0e0e12, #0a0a0d)" }}>
        {variant === 0 && <PreviewVariantHero project={project} accent={accent} />}
        {variant === 1 && <PreviewVariantGallery project={project} accent={accent} />}
        {variant === 2 && <PreviewVariantSplit project={project} accent={accent} />}
        {variant === 3 && <PreviewVariantList project={project} accent={accent} />}
      </div>
    </div>
  );
}

function PreviewVariantHero({ project, accent }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{project.cat}</div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Work","About","Contact"].map(x => <div key={x} className="mono" style={{ fontSize: 8, color: "var(--text-3)" }}>{x}</div>)}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 4%" }}>
        <div style={{ width: "70%" }}>
          <div style={{ fontSize: "clamp(18px, 3.4vw, 30px)", lineHeight: 1.05, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.02em" }}>{project.name}</div>
          <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 10 }}>{project.desc.slice(0, 60)}…</div>
          <div style={{ display: "inline-block", marginTop: 16, padding: "6px 12px", borderRadius: 999, background: accent, color: "#fff", fontSize: 10, fontWeight: 500 }}>Get started →</div>
        </div>
      </div>
    </>
  );
}

function PreviewVariantGallery({ project, accent }) {
  return (
    <>
      <div className="mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{project.name}</div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 6 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ background: `linear-gradient(${135 + i * 30}deg, rgba(255,255,255,0.04), rgba(${i % 2 ? "75,141,255" : "255,255,255"},${0.04 + (i % 3) * 0.04}))`, borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)" }}></div>
        ))}
      </div>
    </>
  );
}

function PreviewVariantSplit({ project, accent }) {
  return (
    <>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--text-3)" }}>{project.cat.toUpperCase()}</div>
          <div>
            <div style={{ fontSize: "clamp(16px, 2.6vw, 24px)", lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.02em" }}>{project.name}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              {project.tags.slice(0,2).map(t => <span key={t} className="mono" style={{ fontSize: 8, padding: "3px 7px", borderRadius: 999, border: "1px solid var(--border-2)", color: "var(--text-2)" }}>{t}</span>)}
            </div>
          </div>
        </div>
        <div style={{ background: `radial-gradient(circle at 30% 30%, rgba(75,141,255,0.25), transparent 65%), linear-gradient(160deg, #1a1a22, #0c0c10)`, borderRadius: 10, border: "1px solid var(--border)" }}></div>
      </div>
    </>
  );
}

function PreviewVariantList({ project, accent }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="mono" style={{ fontSize: 9, color: "var(--text-3)" }}>{project.name.toUpperCase()}</div>
        <div className="mono" style={{ fontSize: 9, color: "var(--text-3)" }}>{project.year}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="mono" style={{ fontSize: 8, color: "var(--text-3)" }}>{String(i+1).padStart(2,"0")}</div>
              <div style={{ fontSize: 11, color: "var(--text)" }}>{["Item alpha","Item beta","Item gamma","Item delta"][i]}</div>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? accent : "var(--text-3)" }}></div>
          </div>
        ))}
      </div>
    </>
  );
}

// --- Arrow icon used in CTAs ---
function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

// --- Arrow icon (left) ---
function ArrowLeft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

// --- Reusable nav arrow button used by hero animations ---
function NavArrow({ direction = "right", onClick, ariaLabel, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (direction === "left" ? "Previous" : "Next")}
      className="nav-arrow"
      style={{
        width: 40, height: 40, borderRadius: 999,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "rgba(20,20,26,0.55)",
        border: "1px solid var(--border-2)",
        color: "var(--text)",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(20,20,26,0.55)";
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.color = "var(--text)";
      }}
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}

// --- Status dot ---
function StatusDot({ color = "#22c55e" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ position: "relative", width: 8, height: 8 }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }}></span>
        <span style={{ position: "absolute", inset: -3, borderRadius: "50%", background: color, opacity: 0.35, animation: "blink 1.6s ease-in-out infinite" }}></span>
      </span>
    </span>
  );
}

// --- Scroll-linked reveal: opacity + translateY tied to element's viewport position
// One global listener fans out to every Reveal element so we never miss a scroll event.
const _revealEls = new Set();
function _updateAllReveals() {
  const vh = window.innerHeight || document.documentElement.clientHeight || 800;
  const enterStart = vh;
  const enterEnd   = vh * 0.7;
  const exitStart  = vh * 0.3;
  _revealEls.forEach((el) => {
    if (!el.isConnected) { _revealEls.delete(el); return; }
    const r = el.getBoundingClientRect();
    let ratio = 1, dir = 0;
    if (r.top > enterEnd) {
      ratio = Math.max(0, Math.min(1, (enterStart - r.top) / (enterStart - enterEnd)));
      dir = 1;
    } else if (r.bottom < exitStart) {
      ratio = Math.max(0, Math.min(1, r.bottom / exitStart));
      dir = -1;
    }
    el.style.setProperty("--r", ratio.toFixed(3));
    el.style.setProperty("--d", String(dir));
  });
}
let _revealRaf = 0;
function _scheduleReveal() {
  if (_revealRaf) return;
  _revealRaf = requestAnimationFrame(() => { _revealRaf = 0; _updateAllReveals(); });
}
if (typeof window !== "undefined" && !window.__ncRevealBound) {
  window.__ncRevealBound = true;
  // Cover every reasonable event source so we don't miss a scroll
  window.addEventListener("scroll", _scheduleReveal, { passive: true, capture: true });
  document.addEventListener("scroll", _scheduleReveal, { passive: true, capture: true });
  window.addEventListener("resize", _scheduleReveal);
  window.addEventListener("load", _scheduleReveal);
  // Continuous rAF poll as a safety net — cheap, ~20 getBoundingClientRect calls
  (function loop() {
    _updateAllReveals();
    requestAnimationFrame(loop);
  })();
}
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    _revealEls.add(el);
    _scheduleReveal();
    return () => { _revealEls.delete(el); };
  }, []);
  return ref;
}

function Reveal({ children, className = "", style, as: As = "div" }) {
  const ref = useScrollReveal();
  return (
    <As ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </As>
  );
}

// --- Interactive stack: cards drift continuously and react to mouse ---
function InteractiveStack({ projects, onOpen }) {
  const [idx, setIdx] = useState(0);
  const n = projects.length;
  const prev = useCallback(() => setIdx((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);
  const [hovering, setHovering] = useState(false);
  const stageRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setIdx(i => (i + 1) % projects.length), 3400);
    return () => clearInterval(id);
  }, [projects.length, hovering]);

  const onMove = useCallback((e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1..1
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;  // -1..1
    setMouse({ x, y });
  }, []);
  const onLeave = useCallback(() => {
    setHovering(false);
    setMouse({ x: 0, y: 0 });
  }, []);

  // Order projects so the active one is on top.
  const ordered = projects.map((_, i) => (i + idx) % projects.length);
  const visible = 4;

  return (
    <div
      ref={stageRef}
      className="stack-stage"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={{ position: "relative", width: "100%", aspectRatio: "5/4", maxWidth: 560, margin: "0 auto" }}
    >
      {ordered.map((projIdx, depth) => {
        const p = projects[projIdx];
        const isFront = depth === 0;
        const hidden = depth >= visible;
        if (hidden) return null;

        // Base stack offsets
        const baseY = depth * 16;
        const baseScale = 1 - depth * 0.055;

        // Drift (only when not hovering) — each card drifts on its own phase
        // We pulse based on Date.now to keep it lively, but apply via CSS animation for perf
        const driftIntensity = hovering ? 0 : 1;

        // When NOT hovering, cards spread out a little and rotate gently
        const spreadX = !hovering ? (depth % 2 === 0 ? -1 : 1) * depth * 10 : 0;
        const spreadRot = !hovering ? (depth % 2 === 0 ? -1 : 1) * (depth * 1.4 + 1.5) : 0;

        // Front card follows mouse (parallax tilt) when hovering
        const tiltX = isFront && hovering ? mouse.y * -6 : 0;
        const tiltY = isFront && hovering ? mouse.x * 8 : 0;
        const followX = isFront && hovering ? mouse.x * 6 : 0;
        const followY = isFront && hovering ? mouse.y * 4 : 0;

        // Slight back-shift on hover so non-front cards move out of the way
        const backDepthBoost = hovering && !isFront ? depth * 4 : 0;

        const tx = spreadX + followX;
        const ty = baseY + followY + backDepthBoost;
        const opacity = 1 - depth * 0.18;
        const blur = depth * 1.0;
        const z = visible - depth;

        return (
          <div
            key={p.name}
            onClick={() => isFront && onOpen(p)}
            className={driftIntensity ? `drift-${depth % 3}` : ""}
            style={{
              position: "absolute", inset: 0,
              transform: `translate3d(${tx}px, ${ty}px, 0) scale(${baseScale}) rotate(${spreadRot}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
              opacity, zIndex: z,
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease",
              filter: `blur(${blur}px)`,
              cursor: isFront ? "pointer" : "default",
              pointerEvents: isFront ? "auto" : "none",
            }}
          >
            <BrowserMockup project={p} />
          </div>
        );
      })}
      {/* indicator */}
      <div style={{ position: "absolute", bottom: -42, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {projects.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 24 : 6, height: 6, borderRadius: 999,
            background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.16)",
            border: 0, cursor: "pointer", padding: 0,
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>
      {/* prev / next arrows */}
      <div style={{ position: "absolute", top: "50%", left: -8, transform: "translateY(-50%)", zIndex: 20 }}>
        <NavArrow direction="left" onClick={prev} />
      </div>
      <div style={{ position: "absolute", top: "50%", right: -8, transform: "translateY(-50%)", zIndex: 20 }}>
        <NavArrow direction="right" onClick={next} />
      </div>
    </div>
  );
}

Object.assign(window, { useScrollReveal, Reveal, InteractiveStack });

Object.assign(window, { Logo, Wordmark, Eyebrow, Section, BrowserMockup, ArrowRight, ArrowLeft, NavArrow, StatusDot });
