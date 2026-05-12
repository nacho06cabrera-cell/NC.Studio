// NC Studio — main app
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA, useCallback: useCallbackA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "animMode": "stack"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useStateA("es");
  const [openProject, setOpenProject] = useStateA(null);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const content = window.NC_CONTENT[lang];
  const projects = content.work.projects;

  // Update lang attr on html for accessibility
  useEffectA(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // If the project has a live URL, open it directly in a new tab.
  // Otherwise fall back to the case-study modal.
  const onOpen = useCallbackA((p) => {
    if (p && p.url) {
      window.open(p.url, "_blank", "noopener,noreferrer");
      return;
    }
    setOpenProject(p);
  }, []);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={content} />
      <Hero t={content} projects={projects} animMode={tweaks.animMode} onOpenProject={onOpen} />
      <About t={content} />
      <Services t={content} />
      <Work t={content} projects={projects} onOpen={onOpen} />
      <Pricing t={content} />
      <Contact t={content} />
      <Footer t={content} />

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} t={content} />

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection label={lang === "es" ? "Animación de proyectos" : "Project animation"}>
          <TweakRadio
            label={lang === "es" ? "Estilo" : "Style"}
            value={tweaks.animMode}
            onChange={v => setTweak("animMode", v)}
            options={[
              { value: "stack", label: "Stack" },
              { value: "marquee", label: "Marquee" },
              { value: "carousel", label: "3D" },
            ]}
          />
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-3)", lineHeight: 1.5, marginTop: 8 }}>
            {tweaks.animMode === "stack" && (lang === "es" ? "Cards apiladas que rotan automáticamente (estilo Apple)." : "Auto-rotating stacked cards (Apple-style).")}
            {tweaks.animMode === "marquee" && (lang === "es" ? "Desplazamiento horizontal infinito." : "Infinite horizontal scroll.")}
            {tweaks.animMode === "carousel" && (lang === "es" ? "Carrusel 3D con rotación en torno a un eje." : "3D carousel rotating around an axis.")}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
