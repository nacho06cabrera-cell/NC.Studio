// Sections for NC Studio
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS, useCallback: useCallbackS } = React;

// =====================================================
// NAVBAR — fixed pill with language toggle
// =====================================================
function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
  { id: "about", label: t.nav.about },
  { id: "work", label: t.nav.work },
  { id: "services", label: t.nav.services },
  { id: "pricing", label: t.nav.pricing },
  { id: "contact", label: t.nav.contact }];


  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "12px 24px" : "20px 24px",
      transition: "padding 0.3s ease",
      pointerEvents: "none"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, pointerEvents: "auto" }}>
        <a href="#top" className="nav-pill" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", borderRadius: 999, textDecoration: "none"
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 24, height: 24, borderRadius: 6,
            background: "var(--accent)", color: "white"
          }}>
            <Logo size={14} color="white" />
          </span>
          <span style={{ fontFamily: "var(--sans)", fontWeight: 500, fontSize: 13, color: "var(--text)", letterSpacing: "-0.01em" }}>
            NC Studio
          </span>
        </a>

        <nav className="nav-pill nav-links" style={{
          display: "flex", alignItems: "center", gap: 24,
          padding: "10px 22px", borderRadius: 999
        }}>
          {links.map((l) =>
          <a key={l.id} href={`#${l.id}`}
          style={{ fontFamily: "var(--sans)", fontWeight: 400, fontSize: 13, color: "var(--text-2)", textDecoration: "none", letterSpacing: "-0.005em", transition: "color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-2)"}>
            
              {l.label}
            </a>
          )}
        </nav>

        <div className="nav-pill" style={{
          display: "flex", alignItems: "center",
          padding: 4, borderRadius: 999
        }}>
          {["es", "en"].map((code) =>
          <button key={code} onClick={() => setLang(code)}
          style={{
            appearance: "none", border: 0, cursor: "pointer",
            fontFamily: "var(--mono)", fontWeight: 500, fontSize: 11,
            padding: "6px 12px", borderRadius: 999,
            background: lang === code ? "var(--accent)" : "transparent",
            color: lang === code ? "white" : "var(--text-2)",
            textTransform: "uppercase", letterSpacing: "0.08em",
            transition: "all 0.2s ease"
          }}>
              {code}
            </button>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </div>);

}

// =====================================================
// HERO — three animation variants
// =====================================================
function Hero({ t, projects, animMode, onOpenProject }) {
  return (
    <section id="top" data-screen-label="Hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 0 80px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 60, alignItems: "center" }} className="hero-grid">
          {/* LEFT — copy */}
          <Reveal className="fade-up" style={{ animationDelay: "0.05s" }}>
            <div className="glass" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "6px 12px 6px 10px", borderRadius: 999,
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-2)", letterSpacing: "0.03em",
              marginBottom: 28
            }}>
              <StatusDot />
              {t.hero.status}
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5.6vw, 76px)",
              lineHeight: 0.98,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              margin: 0,
              color: "var(--text)"
            }}>
              {t.hero.headlineA}
              <em style={{
                fontStyle: "normal",
                background: "linear-gradient(180deg, #9fc1ff 0%, var(--accent) 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                color: "transparent"
              }}>{t.hero.headlineB}</em>
              <span style={{ color: "var(--text-3)" }}>{t.hero.headlineC}</span>
            </h1>

            <p style={{
              marginTop: 28, maxWidth: 540,
              fontSize: 17, lineHeight: 1.5, color: "var(--text-2)", fontWeight: 400
            }}>
              {t.hero.sub}
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <a href="#contact" className="btn-primary" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 22px", borderRadius: 999, textDecoration: "none",
                fontFamily: "var(--sans)", fontWeight: 500, fontSize: 14
              }}>
                {t.hero.ctaPrimary}
                <ArrowRight />
              </a>
              <a href="#work" className="btn-ghost" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 22px", borderRadius: 999, textDecoration: "none",
                fontFamily: "var(--sans)", fontWeight: 500, fontSize: 14
              }}>
                {t.hero.ctaGhost}
              </a>
            </div>
          </Reveal>

          {/* RIGHT — animation */}
          <div className="fade-up" style={{ animationDelay: "0.2s", position: "relative", minHeight: 500 }}>
            {animMode === "stack" && <InteractiveStack projects={projects} onOpen={onOpenProject} />}
            {animMode === "marquee" && <MarqueeAnim projects={projects} onOpen={onOpenProject} />}
            {animMode === "carousel" && <CarouselAnim projects={projects} onOpen={onOpenProject} />}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>);

}

// --- Marquee horizontal ---
function MarqueeAnim({ projects, onOpen }) {
  const items = [...projects, ...projects];
  return (
    <div className="marquee-stage" style={{ width: "100%", overflow: "hidden", padding: "20px 0", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div className="marquee-track" style={{ display: "flex", gap: 24, width: "max-content" }}>
        {items.map((p, i) =>
        <div key={i} onClick={() => onOpen(p)} style={{ width: 360, aspectRatio: "5/4", flexShrink: 0, cursor: "pointer", transition: "transform 0.3s ease" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = ""}>
          
            <BrowserMockup project={p} />
          </div>
        )}
      </div>
    </div>);

}

// --- 3D carousel ---
function CarouselAnim({ projects, onOpen }) {
  const [idx, setIdx] = useStateS(0);
  const [paused, setPaused] = useStateS(false);
  const n = projects.length;
  useEffectS(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % n), 3500);
    return () => clearInterval(id);
  }, [n, paused]);

  const radius = 320;
  const prev = () => setIdx((i) => (i - 1 + n) % n);
  const next = () => setIdx((i) => (i + 1) % n);
  return (
    <div className="carousel-stage" style={{ position: "relative", width: "100%", aspectRatio: "5/4", maxWidth: 560, margin: "0 auto" }}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="carousel-track" style={{
        position: "absolute", inset: 0,
        transform: `rotateY(${-(360 / n) * idx}deg)`
      }}>
        {projects.map((p, i) => {
          const angle = 360 / n * i;
          return (
            <div key={p.name} style={{
              position: "absolute", inset: "8%",
              transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden"
            }} onClick={() => i === idx && onOpen(p)}>
              <BrowserMockup project={p} />
            </div>);

        })}
      </div>
      <div style={{ position: "absolute", bottom: -42, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {projects.map((_, i) =>
        <button key={i} onClick={() => setIdx(i)} style={{
          width: i === idx ? 24 : 6, height: 6, borderRadius: 999,
          background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.16)",
          border: 0, cursor: "pointer", padding: 0,
          transition: "all 0.4s ease"
        }} />
        )}
      </div>
      <div style={{ position: "absolute", top: "50%", left: -8, transform: "translateY(-50%)", zIndex: 20 }}>
        <NavArrow direction="left" onClick={prev} />
      </div>
      <div style={{ position: "absolute", top: "50%", right: -8, transform: "translateY(-50%)", zIndex: 20 }}>
        <NavArrow direction="right" onClick={next} />
      </div>
    </div>);

}

// =====================================================
// ABOUT — simplified
// =====================================================
function About({ t }) {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(32px, 4.6vw, 60px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.035em", margin: "28px 0 0", color: "var(--text)", maxWidth: 880 }}>
          {t.about.title}
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 56 }} className="about-grid">
        <Reveal>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-2)", margin: 0 }}>
            {t.about.bodyA}
          </p>
        </Reveal>
        <Reveal>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-2)", margin: 0 }}>
            {t.about.bodyB}
          </p>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </Section>);

}

// =====================================================
// SERVICES — 3 items
// =====================================================
function Services({ t }) {
  return (
    <Section id="services">
      <Reveal>
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.03em", margin: "20px 0 0", color: "var(--text)" }}>
          {t.services.title}
        </h2>
      </Reveal>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, marginTop: 56, border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--surface)" }} className="services-grid">
          {t.services.items.map((s, i) =>
          <div key={s.n} style={{
            padding: "44px 32px",
            borderRight: i < t.services.items.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex", flexDirection: "column", gap: 16,
            transition: "background 0.3s ease",
            position: "relative",
            minHeight: 220
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(75,141,255,0.05)"}
          onMouseLeave={(e) => e.currentTarget.style.background = ""}>
            
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.08em" }}>{s.n}</span>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}></span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", margin: 0, color: "var(--text)" }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-2)", margin: 0 }}>{s.d}</p>
            </div>
          )}
        </div>
      </Reveal>
      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-grid > div { border-right: none !important; border-bottom: 1px solid var(--border) !important; }
          .services-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </Section>);

}

// =====================================================
// WORK — Portfolio grid (no subtitle)
// =====================================================
function Work({ t, projects, onOpen }) {
  return (
    <Section id="work">
      <Reveal>
        <Eyebrow>{t.work.eyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.03em", margin: "20px 0 0", color: "var(--text)" }}>
          {t.work.title}
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginTop: 56 }}>
        {projects.map((p, i) =>
        <Reveal key={p.name}>
            <button onClick={() => onOpen(p)}
          style={{
            appearance: "none", border: "1px solid var(--border)", borderRadius: 18,
            background: "var(--surface)", padding: 16, cursor: "pointer", textAlign: "left",
            transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            display: "flex", flexDirection: "column", gap: 16,
            color: "inherit", fontFamily: "inherit",
            width: "100%"
          }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-4px)";e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";e.currentTarget.style.boxShadow = "0 20px 60px -20px rgba(0,0,0,0.6)";}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = "";e.currentTarget.style.borderColor = "";e.currentTarget.style.boxShadow = "";}}>
            
              <div style={{ aspectRatio: "5/4", width: "100%", position: "relative" }}>
                <BrowserMockup project={p} />
                {p.live &&
              <div style={{
                position: "absolute", top: 12, right: 12,
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 10px", borderRadius: 999,
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                fontFamily: "var(--mono)", fontSize: 10, color: "#86efac",
                letterSpacing: "0.08em",
                backdropFilter: "blur(8px)"
              }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}></span>
                    {t.work.placeholderTag}
                  </div>
              }
              </div>
              <div style={{ padding: "6px 4px 4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.cat}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-3)" }}>{p.year}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                  {p.tags.map((tag) =>
                <span key={tag} className="mono" style={{ fontSize: 10, padding: "3px 8px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--text-3)" }}>{tag}</span>
                )}
                </div>
              </div>
            </button>
          </Reveal>
        )}
      </div>
    </Section>);

}

// =====================================================
// PROJECT MODAL
// =====================================================
function ProjectModal({ project, onClose, t }) {
  useEffectS(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.removeEventListener("keydown", onKey);document.body.style.overflow = prev;};
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeUp 0.3s ease forwards"
    }}>
      <div className="glass" onClick={(e) => e.stopPropagation()} style={{
        position: "relative", width: "100%", maxWidth: 980, maxHeight: "88vh",
        borderRadius: 20, overflow: "hidden",
        display: "flex", flexDirection: "column",
        background: "rgba(15,15,20,0.95)",
        animation: "fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards"
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 18, right: 18, zIndex: 2,
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(0,0,0,0.5)", border: "1px solid var(--border)",
          color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>

        <div style={{ aspectRatio: "16/9", padding: 24, background: "linear-gradient(135deg, rgba(75,141,255,0.10), rgba(0,0,0,0))" }}>
          {project.url ?
          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%", textDecoration: "none" }}>
              <BrowserMockup project={project} />
            </a> :

          <BrowserMockup project={project} />
          }
        </div>

        <div style={{ padding: "24px 36px 36px", overflow: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{project.cat} · {project.year}</span>
            <span className="mono" style={{
              fontSize: 11,
              color: project.live ? "#86efac" : "var(--accent-2)",
              padding: "4px 10px", borderRadius: 999,
              border: `1px solid ${project.live ? "rgba(34,197,94,0.4)" : "rgba(var(--accent-glow), 0.4)"}`,
              display: "inline-flex", alignItems: "center", gap: 6
            }}>
              {project.live && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></span>}
              {project.live ? t.work.placeholderTag : t.work.placeholderTagSoon}
            </span>
          </div>
          <h3 style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.03em", margin: "0 0 16px", color: "var(--text)" }}>{project.name}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-2)", margin: 0, maxWidth: 640 }}>{project.desc}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
            {project.tags.map((tag) =>
            <span key={tag} className="mono" style={{ fontSize: 11, padding: "5px 10px", borderRadius: 999, border: "1px solid var(--border-2)", color: "var(--text-2)" }}>{tag}</span>
            )}
            {project.url &&
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              marginLeft: "auto",
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 999, textDecoration: "none",
              fontFamily: "var(--sans)", fontWeight: 500, fontSize: 13
            }}>
                {t.work.visit}
                <ArrowRight size={12} />
              </a>
            }
          </div>
        </div>
      </div>
    </div>);

}

// =====================================================
// PRICING
// =====================================================
function Pricing({ t }) {
  const plans = [
  { ...t.pricing.monthly, featured: true },
  { ...t.pricing.flexible, featured: false }];

  return (
    <Section id="pricing">
      <Reveal>
        <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginTop: 20 }}>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.03em", margin: 0, color: "var(--text)" }}>{t.pricing.title}</h2>
          <p style={{ fontSize: 14, color: "var(--text-3)", maxWidth: 320, margin: 0 }}>{t.pricing.sub}</p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 56 }} className="pricing-grid">
        {plans.map((p) =>
        <Reveal key={p.name}>
            <div className={p.featured ? "" : "glass"} style={{
            position: "relative",
            padding: "44px 36px",
            borderRadius: 20,
            border: p.featured ? "1px solid rgba(var(--accent-glow), 0.45)" : "1px solid var(--border)",
            background: p.featured ?
            "linear-gradient(180deg, rgba(75,141,255,0.12), rgba(75,141,255,0.02))" :
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
            boxShadow: p.featured ? "0 30px 80px -30px rgba(75,141,255,0.3)" : "none",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            height: "100%"
          }}>
              {p.featured &&
            <div style={{
              position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
              padding: "5px 14px", borderRadius: "0 0 12px 12px",
              background: "var(--accent)", color: "white",
              fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500
            }}>
                  {p.tag}
                </div>
            }
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.tag}</span>
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--text)" }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55, margin: "0 0 24px" }}>{p.desc}</p>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text)" }}>{p.price}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{p.pricesub}</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                {p.feats.map((f) =>
              <li key={f} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 3, color: "var(--accent-2)" }}>
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="square" />
                    </svg>
                    <span>{f}</span>
                  </li>
              )}
              </ul>

              <a href="#contact" className={p.featured ? "btn-primary" : "btn-ghost"} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "13px 22px", borderRadius: 999, textDecoration: "none",
              fontFamily: "var(--sans)", fontWeight: 500, fontSize: 14,
              marginTop: "auto"
            }}>
                {p.cta}
                <ArrowRight />
              </a>
            </div>
          </Reveal>
        )}
      </div>
      <style>{`
        @media (max-width: 800px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>);

}

// =====================================================
// CONTACT
// =====================================================
function Contact({ t }) {
  const [form, setForm] = useStateS({ name: "", email: "", type: t.contact.typeOpts[0], msg: "" });
  const [state, setState] = useStateS("idle");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");
    const text = `Hola Nacho! Te escribo desde tu portfolio.\n\n*Nombre:* ${form.name}\n*Email:* ${form.email}\n*Tipo:* ${form.type}\n\n*Mensaje:*\n${form.msg}`;
    const waUrl = `https://wa.me/5491156651564?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      setState("sent");
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  return (
    <Section id="contact">
      <Reveal>
        <Eyebrow>{t.contact.eyebrow}</Eyebrow>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, marginTop: 24 }} className="contact-grid">
        <Reveal>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.03em", margin: 0, color: "var(--text)", maxWidth: 480 }}>{t.contact.title}</h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", marginTop: 20, maxWidth: 440 }}>{t.contact.sub}</p>

          <div style={{ marginTop: 56 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
              {t.contact.direct}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="mailto:nacho@ncstudio.dev" className="link-u" style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--text)", textDecoration: "none", width: "fit-content" }}>
                nacho@ncstudio.dev
              </a>
              <a href="https://instagram.com/ncstudio.dev" target="_blank" rel="noopener" className="link-u" style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--text)", textDecoration: "none", width: "fit-content" }}>
                @ncstudio.dev
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="glass" style={{
            padding: 28, borderRadius: 20,
            display: "flex", flexDirection: "column", gap: 14,
            position: "relative",
            minHeight: 480
          }}>
            {state === "sent" ?
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
                <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(75,141,255,0.12)",
                border: "1px solid rgba(var(--accent-glow), 0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                color: "var(--accent-2)"
              }}>
                  <svg width="28" height="28" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                </div>
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text)" }}>{t.contact.sent}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>{t.contact.sentSub}</div>
              </div> :

            <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label={t.contact.name}>
                    <input className="input" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t.contact.namePh} />
                  </Field>
                  <Field label={t.contact.email}>
                    <input className="input" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="vos@dominio.com" />
                  </Field>
                </div>
                <Field label={t.contact.type}>
                  <select className="input" value={form.type} onChange={(e) => update("type", e.target.value)} style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'><path d='M1 1l5 5 5-5' stroke='%23a8a8af' stroke-width='1.4'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                    {t.contact.typeOpts.map((o) => <option key={o} value={o} style={{ background: "#0e0e12", color: "var(--text)" }}>{o}</option>)}
                  </select>
                </Field>
                <Field label={t.contact.msg}>
                  <textarea className="input" rows="5" required value={form.msg} onChange={(e) => update("msg", e.target.value)} placeholder={t.contact.msgPh} style={{ resize: "vertical", fontFamily: "var(--sans)" }} />
                </Field>
                <button type="submit" disabled={state === "sending"} className="btn-primary" style={{
                marginTop: 8, padding: "14px 22px", borderRadius: 12, border: 0, cursor: "pointer",
                fontFamily: "var(--sans)", fontWeight: 500, fontSize: 14,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                opacity: state === "sending" ? 0.7 : 1
              }}>
                  {state === "sending" ? t.contact.sending : t.contact.send}
                  {state === "idle" && <ArrowRight />}
                </button>
              </>
            }
          </form>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </Section>);

}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
      {children}
    </label>);

}

// =====================================================
// FOOTER — NC Studio wordmark
// =====================================================
function Footer({ t }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "80px 0 40px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontSize: "clamp(56px, 14vw, 200px)",
              fontWeight: 500, lineHeight: 0.85,
              letterSpacing: "-0.045em", color: "var(--text)",
              display: "flex", alignItems: "baseline", gap: "0.04em",
              whiteSpace: "nowrap"
            }}>
              <span>NC</span>
              <span style={{
                fontSize: "0.45em",
                color: "var(--text-3)",
                fontWeight: 400,
                letterSpacing: "-0.02em"
              }}>Studio</span>
              <span style={{ color: "var(--accent)" }}>.</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.04em", lineHeight: 1.6 }}>{t.footer.line}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 8 }}>{t.footer.based}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", textAlign: "right" }}>
              <div style={{ display: "flex", gap: 18 }}>
                <a href="mailto:nacho@ncstudio.dev" className="link-u" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-2)", textDecoration: "none" }}>Email</a>
                <a href="https://instagram.com/ncstudio.dev" target="_blank" rel="noopener" className="link-u" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-2)", textDecoration: "none" }}>Instagram</a>
                <a href="#top" className="link-u" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-2)", textDecoration: "none" }}>↑ Top</a>
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)" }}>© 2026 · {t.footer.rights}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>);

}

Object.assign(window, { Navbar, Hero, About, Services, Work, ProjectModal, Pricing, Contact, Footer });