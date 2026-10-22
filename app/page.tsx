"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Menu,
  MousePointer2,
  Palette,
  PenTool,
  Search,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

/* -------------------------------------------------------
   DATA
------------------------------------------------------- */

const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Selected Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    number: "01",
    category: "DIGITAL EXPERIENCES",
    title: "Web Design",
    highlight: "& Development.",
    description:
      "High-performance websites designed to turn first impressions into meaningful customer experiences.",
    tags: ["Web Design", "Development", "Responsive"],
    icon: Code2,
    enquiry: "Web Design & Development",
    color: "#A78BFA",
  },
  {
    number: "02",
    category: "EXPERIENCE DESIGN",
    title: "UI/UX",
    highlight: "Design.",
    description:
      "Thoughtful interfaces and intuitive user journeys that make every interaction feel effortless.",
    tags: ["Interface Design", "UX", "Prototyping"],
    icon: Layers3,
    enquiry: "UI/UX Design",
    color: "#67E8F9",
  },
  {
    number: "03",
    category: "BRAND STRATEGY",
    title: "Brand",
    highlight: "Identity.",
    description:
      "Distinctive visual identities that give your business a recognizable and consistent presence.",
    tags: ["Art Direction", "Visual Identity", "Guidelines"],
    icon: Palette,
    enquiry: "Brand Identity",
    color: "#FB7185",
  },
  {
    number: "04",
    category: "SOCIAL & COMMUNITY",
    title: "Social Media",
    highlight: "Management.",
    description:
      "Strategic content and consistent social media management to build awareness and community.",
    tags: ["Content Strategy", "Social Media", "Growth"],
    icon: Share2,
    enquiry: "Social Media Management",
    color: "#C4B5FD",
  },
  {
    number: "05",
    category: "CONTENT & STORYTELLING",
    title: "Content",
    highlight: "Creation.",
    description:
      "Creative visuals and compelling copy that communicate your value and give your brand a voice.",
    tags: ["Creative Content", "Copywriting", "Campaigns"],
    icon: PenTool,
    enquiry: "Content Creation & Writing",
    color: "#FDBA74",
  },
  {
    number: "06",
    category: "ORGANIC DISCOVERY",
    title: "Search",
    highlight: "Optimisation.",
    description:
      "Search-friendly foundations and useful content that help the right audience find your business.",
    tags: ["SEO", "On-Page SEO", "Content"],
    icon: Search,
    enquiry: "Search Engine Optimisation (SEO)",
    color: "#86EFAC",
  },
];

type ProjectCategory = "All" | "Web" | "Branding" | "Social";

const projectCategories: ProjectCategory[] = [
  "All",
  "Web",
  "Branding",
  "Social",
];

const projects = [
  {
    number: "01",
    title: "Digital experiences",
    subtitle: "A better way to show up online.",
    category: "Web" as const,
    type: "WEBSITE DESIGN",
    visual: "project-visual-web",
    tags: ["Strategy", "Design", "Development"],
  },
  {
    number: "02",
    title: "A brand of its own",
    subtitle: "Visual identity with a point of view.",
    category: "Branding" as const,
    type: "BRAND IDENTITY",
    visual: "project-visual-brand",
    tags: ["Art Direction", "Identity", "Design"],
  },
  {
    number: "03",
    title: "Made for the feed",
    subtitle: "Creative that earns attention.",
    category: "Social" as const,
    type: "SOCIAL CAMPAIGN",
    visual: "project-visual-social",
    tags: ["Content", "Social", "Campaign"],
  },
  {
    number: "04",
    title: "Built to convert",
    subtitle: "Clarity at every click.",
    category: "Web" as const,
    type: "WEB EXPERIENCE",
    visual: "project-visual-experience",
    tags: ["UX", "Development", "Performance"],
  },
];

const enquiryServices = [
  "Web Design & Development",
  "UI/UX Design",
  "Brand Identity",
  "Graphic Design",
  "Social Media Management",
  "Content Creation & Writing",
  "Search Engine Optimisation (SEO)",
];

const WEB3FORMS_ACCESS_KEY = "2d0ffaac-7513-486c-b1ea-b36f5beb4643";

/* -------------------------------------------------------
   ANIMATION SETTINGS
------------------------------------------------------- */

const easing = [0.22, 1, 0.36, 1] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easing },
  },
};

/* -------------------------------------------------------
   CINEMATIC INTRO
------------------------------------------------------- */

function CinematicIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      onComplete,
      reduceMotion ? 250 : 1450
    );

    return () => window.clearTimeout(timeout);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="cinematic-intro"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: "-3%",
        transition: {
          duration: reduceMotion ? 0.15 : 0.65,
          ease: easing,
        },
      }}
      aria-label="Introducing Westbridge Solution"
    >
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />

      <motion.div
        className="intro-content"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easing }}
      >
        <div className="intro-mark">
          <Sparkles size={19} />
          <span>INDEPENDENT DIGITAL STUDIO</span>
        </div>

        <div className="intro-wordmark">
          WESTBRIDGE
          <span>SOLUTION.</span>
        </div>

        <div className="intro-bottom">
          <span>DESIGN. DEVELOP. ELEVATE.</span>
          <motion.div
            className="intro-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduceMotion ? 0.2 : 1.05,
              ease: "easeInOut",
            }}
          />
          <span>CREATING WHAT&apos;S NEXT</span>
        </div>
      </motion.div>

      <button
        type="button"
        className="intro-skip"
        onClick={onComplete}
      >
        SKIP INTRO <ArrowUpRight size={14} />
      </button>
    </motion.div>
  );
}

/* -------------------------------------------------------
   FLUID CURSOR
   Smooth chain-ribbon trail, glowing orb head, magnetic
   ring that grows over links/buttons, sparks and click
   bursts. Fine-pointer (mouse) devices only.
------------------------------------------------------- */

function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (
      !canvas ||
      reduceMotion ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) return;

    const ctx = context;

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      size: number;
      hue: number;
    };

    const SEGMENTS = 34;
    const IDLE_FADE_START = 1800;
    const IDLE_STOP = 2600;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let lastMove = 0;
    let hue = 245;
    let seen = false;
    let hovering = false;
    let sparks: Spark[] = [];

    const mouse = { x: -200, y: -200 };
    const head = { x: -200, y: -200 };
    const ring = { x: -200, y: -200, r: 16, targetR: 16 };
    const chain = Array.from({ length: SEGMENTS }, () => ({
      x: -200,
      y: -200,
    }));

    // Frame-rate independent easing factor
    const ease = (amount: number, dt: number) =>
      1 - Math.pow(1 - amount, dt);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const spawnSpark = (
      x: number,
      y: number,
      speed: number,
      angle: number,
      size: number
    ) => {
      if (sparks.length > 90) return;

      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 32 + Math.random() * 30,
        size,
        hue: hue + (Math.random() - 0.5) * 80,
      });
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const previousX = mouse.x;
      const previousY = mouse.y;

      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (!seen) {
        seen = true;
        head.x = ring.x = mouse.x;
        head.y = ring.y = mouse.y;

        chain.forEach((point) => {
          point.x = mouse.x;
          point.y = mouse.y;
        });
      } else if (
        Math.hypot(mouse.x - previousX, mouse.y - previousY) > 16 &&
        Math.random() < 0.55
      ) {
        spawnSpark(
          mouse.x,
          mouse.y,
          0.3 + Math.random() * 1.1,
          Math.random() * Math.PI * 2,
          1 + Math.random() * 2.2
        );
      }

      lastMove = performance.now();
      start();
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;

      hovering = Boolean(
        target?.closest?.(
          "a, button, label, input, textarea, [role='button']"
        )
      );

      ring.targetR = hovering ? 34 : 16;
    };

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      ring.targetR = 9;

      for (let i = 0; i < 18; i++) {
        spawnSpark(
          mouse.x,
          mouse.y,
          1.6 + Math.random() * 3.2,
          (Math.PI * 2 * i) / 18 + Math.random() * 0.3,
          1.4 + Math.random() * 2.4
        );
      }

      lastMove = performance.now();
      start();
    };

    const handleUp = () => {
      ring.targetR = hovering ? 34 : 16;
    };

    const handleLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        lastMove = performance.now() - IDLE_FADE_START;
      }
    };

    const render = (time: number) => {
      const dt = Math.min(last ? (time - last) / 16.667 : 1, 3);
      last = time;

      // Colour drifts smoothly between cyan, violet and magenta
      hue = 245 + Math.sin(time * 0.0009) * 65;

      head.x += (mouse.x - head.x) * ease(0.3, dt);
      head.y += (mouse.y - head.y) * ease(0.3, dt);

      chain[0].x = head.x;
      chain[0].y = head.y;

      for (let i = 1; i < SEGMENTS; i++) {
        chain[i].x += (chain[i - 1].x - chain[i].x) * ease(0.34, dt);
        chain[i].y += (chain[i - 1].y - chain[i].y) * ease(0.34, dt);
      }

      ring.x += (mouse.x - ring.x) * ease(0.14, dt);
      ring.y += (mouse.y - ring.y) * ease(0.14, dt);
      ring.r += (ring.targetR - ring.r) * ease(0.18, dt);

      const idle = performance.now() - lastMove;
      const fade =
        idle > IDLE_FADE_START
          ? Math.max(0, 1 - (idle - IDLE_FADE_START) / 700)
          : 1;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Ribbon trail, drawn as smooth curves through segment midpoints
      for (let i = 1; i < SEGMENTS - 1; i++) {
        const t = 1 - i / (SEGMENTS - 1);
        const taper = Math.pow(t, 1.5);
        const segmentHue = hue + i * 2.4;

        const startX = (chain[i - 1].x + chain[i].x) / 2;
        const startY = (chain[i - 1].y + chain[i].y) / 2;
        const endX = (chain[i].x + chain[i + 1].x) / 2;
        const endY = (chain[i].y + chain[i + 1].y) / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(chain[i].x, chain[i].y, endX, endY);

        ctx.lineWidth = 4 + 26 * taper;
        ctx.strokeStyle = `hsla(${segmentHue}, 100%, 60%, ${0.07 * taper * fade})`;
        ctx.stroke();

        ctx.lineWidth = 1.2 + 7 * taper;
        ctx.strokeStyle = `hsla(${segmentHue - 15}, 100%, 68%, ${0.5 * taper * fade})`;
        ctx.stroke();

        ctx.lineWidth = 0.6 + 2 * taper;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.55 * taper * fade})`;
        ctx.stroke();
      }

      // Glowing orb at the head
      const glow = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        28
      );

      glow.addColorStop(0, `hsla(${hue}, 100%, 88%, ${0.85 * fade})`);
      glow.addColorStop(0.25, `hsla(${hue}, 100%, 65%, ${0.35 * fade})`);
      glow.addColorStop(1, `hsla(${hue + 40}, 100%, 55%, 0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Magnetic ring
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);

      if (hovering) {
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${0.08 * fade})`;
        ctx.fill();
      }

      ctx.lineWidth = 1.25;
      ctx.strokeStyle = `hsla(${hue + 30}, 100%, 80%, ${0.55 * fade})`;
      ctx.stroke();

      // Sparks
      sparks = sparks.filter((spark) => spark.life < spark.max);

      for (const spark of sparks) {
        spark.life += dt;
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.vx *= Math.pow(0.96, dt);
        spark.vy = spark.vy * Math.pow(0.96, dt) + 0.012 * dt;

        const remaining = Math.max(0, 1 - spark.life / spark.max);

        ctx.fillStyle = `hsla(${spark.hue}, 100%, 75%, ${0.9 * remaining})`;
        ctx.beginPath();
        ctx.arc(
          spark.x,
          spark.y,
          Math.max(0.1, spark.size * remaining),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      if (idle < IDLE_STOP || sparks.length > 0) {
        frame = window.requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        frame = 0;
      }
    };

    function start() {
      if (!frame) {
        last = 0;
        frame = window.requestAnimationFrame(render);
      }
    }

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseout", handleLeave);
      window.cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-cursor"
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------
   REVEAL COMPONENT
------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------
   ANIMATED HEADLINE
------------------------------------------------------- */

function AnimatedHeadline() {
  const reduceMotion = useReducedMotion();

  const lines = [
    <>We make brands</>,
    <>
      <span className="gradient-text">impossible</span> to ignore.
    </>,
  ];

  return (
    <h1 className="hero-title">
      {lines.map((line, index) => (
        <span className="headline-line" key={index}>
          <motion.span
            className="headline-line-inner"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.35 + index * 0.18,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* -------------------------------------------------------
   CURRENT YEAR (client-safe, avoids build-time Date)
------------------------------------------------------- */

function CurrentYear() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026
  );

  return <>{year}</>;
}

/* -------------------------------------------------------
   MAIN HOMEPAGE
------------------------------------------------------- */

export default function Home() {
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");
  const [selectedServices, setSelectedServices] =
    useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectMessage, setProjectMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  const completeIntro = useCallback(() => {
    setIntroVisible(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("intro-active", introVisible);

    return () => {
      document.body.classList.remove("intro-active");
    };
  }, [introVisible]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );

    setFormError("");
    setFormStatus("idle");
  }

  function chooseService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current
        : [...current, service]
    );
  }

  async function handleEnquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Hidden spam trap: real visitors never fill this in
    if (new FormData(event.currentTarget).get("botcheck")) return;

    if (selectedServices.length === 0) {
      setFormError("Please select at least one service.");
      return;
    }

    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${clientName}`,
          from_name: "Westbridge Solution website",
          name: clientName,
          email: clientEmail,
          services: selectedServices.join(", "),
          message: projectMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setClientName("");
        setClientEmail("");
        setProjectMessage("");
        setSelectedServices([]);
        setFormStatus("sent");
      } else {
        setFormStatus("idle");
        setFormError(
          "Something went wrong. Please email us at westbridgesolutionagency@gmail.com."
        );
      }
    } catch {
      setFormStatus("idle");
      setFormError(
        "Network error. Please check your connection and try again."
      );
    }
  }

  return (
    <main className="corporate-site" id="top">
      {/* CINEMATIC INTRO */}

      <AnimatePresence>
        {introVisible && (
          <CinematicIntro onComplete={completeIntro} />
        )}
      </AnimatePresence>

      {/* GLOBAL EFFECTS */}

      <FluidCursor />

      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-orb ambient-orb-three" />
      </div>

      {/* NAVIGATION */}

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Westbridge Solution home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/westbridge-logo-white.png"
            alt="Westbridge Solution"
            width={440}
            height={128}
            priority
            sizes="(max-width: 700px) 180px, 230px"
            className="brand-logo"
          />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
                {navigation.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
          ))}
        </nav>

        <a className="button button-primary header-cta" href="#contact">
          Let&apos;s Talk <ArrowUpRight size={17} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item, index) => (
              <a
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
                <ArrowUpRight size={18} />
              </a>
            ))}

            <a
              className="mobile-menu-cta"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Start a project <ArrowRight size={18} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-copy">
            <motion.div
              className="eyebrow hero-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="status-dot" />
              INDEPENDENT DIGITAL STUDIO
            </motion.div>

            <div id="hero-title">
              <AnimatedHeadline />
            </div>

            <motion.p
              className="hero-description"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.65 }}
            >
              We build standout websites and create social experiences
              that help ambitious businesses get noticed, connect with
              people, and grow.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.55 }}
            >
              <a className="button button-primary" href="#work">
                Explore our work <ArrowUpRight size={17} />
              </a>

              <a className="button button-ghost" href="#services">
                What we do <ArrowDownRight size={17} />
              </a>
            </motion.div>

            <motion.div
              className="hero-proof"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="proof-icon">
                <Sparkles size={17} />
              </div>
              <p>
                <strong>Strategy meets creativity.</strong>
                <span>Thoughtful work, built around your goals.</span>
              </p>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: 3 }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: easing }}
          >
            <div className="art-topline">
              <span>WS / CREATIVE SYSTEMS</span>
              <span className="art-live">
                <span className="status-dot" /> AVAILABLE FOR PROJECTS
              </span>
            </div>

            <div className="hero-art-stage">
              <div className="art-grid" aria-hidden="true" />

              <motion.div
                className="art-ring art-ring-one"
                animate={
                  reduceMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 32,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="art-ring art-ring-two"
                animate={
                  reduceMotion ? undefined : { rotate: -360 }
                }
                transition={{
                  duration: 24,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="art-core"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -10, 0],
                        scale: [1, 1.035, 1],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="core-glow" />
                <div className="core-shape">
                  <span />
                  <span />
                  <span />
                </div>
              </motion.div>

              <div className="art-floating-label art-label-one">
                <Code2 size={15} />
                <span>DEVELOP</span>
              </div>

              <div className="art-floating-label art-label-two">
                <Palette size={15} />
                <span>CREATE</span>
              </div>

              <div className="art-floating-label art-label-three">
                <Share2 size={15} />
                <span>CONNECT</span>
              </div>

              <span className="art-coordinate art-coordinate-one">
                19° N / 72° E
              </span>
              <span className="art-coordinate art-coordinate-two">
                CREATIVE FREQUENCY 001
              </span>
            </div>

            <div className="art-footer">
              <div>
                <span className="art-footer-number">01</span>
                <p>
                  Digital with
                  <br />
                  <strong>purpose.</strong>
                </p>
              </div>

              <a href="#about" aria-label="Discover our approach">
                <ArrowDownRight size={23} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>GOOD DESIGN. SMART STRATEGY. REAL GROWTH.</span>
          <a href="#about">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </section>

      {/* MOVING MARQUEE */}

      <div className="marquee-section" aria-label="Our capabilities">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {[
                "DESIGN",
                "DEVELOPMENT",
                "SOCIAL MEDIA",
                "CREATIVE STRATEGY",
              ].map((item) => (
                <span key={item}>
                  {item}
                  <Sparkles size={17} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}

      <section id="about" className="about-section section-shell">
        <Reveal className="about-kicker">
          <span className="eyebrow">01 / WHO WE ARE</span>
          <span className="section-side-note">
            INDEPENDENT THINKING. DIGITAL IMPACT.
          </span>
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-heading">
            <h2>
              We believe good
              <br />
              digital experiences
              <br />
              <span className="gradient-text">change everything.</span>
            </h2>
          </Reveal>

          <Reveal className="about-description" delay={0.12}>
            <span className="about-symbol">
              <Sparkles size={23} />
            </span>
            <p>
              Westbridge Solution brings web development, design, and
              social media together to help businesses build a more
              confident digital presence.
            </p>
            <p>
              Every project starts with understanding your goals.
              From there, we create purposeful digital experiences
              designed around your audience and your business.
            </p>
            <a className="text-link" href="#services">
              EXPLORE OUR APPROACH <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <div className="about-principles">
          {[
            {
              number: "01",
              title: "Think clearly.",
              text: "Start with the problem, audience, and goal.",
            },
            {
              number: "02",
              title: "Create boldly.",
              text: "Build distinctive experiences with intention.",
            },
            {
              number: "03",
              title: "Build thoughtfully.",
              text: "Prioritise usability, speed, and accessibility.",
            },
          ].map((item, index) => (
            <Reveal
              key={item.number}
              className="principle-card"
              delay={index * 0.1}
            >
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section id="services" className="services-section section-shell">
        <Reveal className="services-heading">
          <div>
            <span className="eyebrow">02 / WHAT WE DO</span>
            <h2>
              Your vision.
              <br />
              <span className="gradient-text">Our creative energy.</span>
            </h2>
          </div>

          <p>
            Everything your brand needs to make a stronger impression
            online, brought together under one roof.
          </p>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                key={service.number}
                className="service-reveal"
                delay={(index % 2) * 0.08}
              >
                <article
                  className="service-card"
                  style={
                    { "--service-accent": service.color } as React.CSSProperties
                  }
                >
                  <div className="service-card-top">
                    <span className="service-number">
                      / {service.number}
                    </span>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <span className="service-category">
                    {service.category}
                  </span>

                  <h3>
                    {service.title}
                    <span>{service.highlight}</span>
                  </h3>

                  <p>{service.description}</p>

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button
                    className="service-card-link"
                    type="button"
                    onClick={() => {
                      chooseService(service.enquiry);
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({
                          behavior: reduceMotion ? "auto" : "smooth",
                        });
                    }}
                    aria-label={`Enquire about ${service.enquiry}`}
                  >
                    <span>LET&apos;S DISCUSS THIS</span>
                    <span className="service-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="services-bottom">
          <p>
            HAVE SOMETHING DIFFERENT IN MIND?
            <span>Let&apos;s figure it out together.</span>
          </p>
          <a className="button button-primary" href="#contact">
            Tell us about it <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </section>

      {/* SELECTED WORK / INTERACTIVE TABS */}

      <section id="work" className="work-section section-shell">
        <Reveal className="work-heading">
          <div>
            <span className="eyebrow">03 / WORK</span>
            <h2>
              Ideas made
              <br />
              <span className="gradient-text">visible.</span>
            </h2>
          </div>

          <p>
            Explore the kinds of digital experiences and creative work
            we can bring to life for your business.
          </p>
        </Reveal>

        <div className="project-toolbar">
          <div
            className="project-tabs"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category
                    ? "project-tab active"
                    : "project-tab"
                }
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                {activeCategory === category && (
                  <motion.span
                    className="tab-indicator"
                    layoutId="project-tab-indicator"
                    transition={{ duration: 0.25, ease: easing }}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="project-count">
            {String(filteredProjects.length).padStart(2, "0")} PROJECT
            {filteredProjects.length === 1 ? "" : "S"}
          </span>
        </div>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.number}
                className={`project-card ${index === 0 ? "project-card-featured" : ""}`}
                layout
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 18, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 12, scale: 0.98 }
                }
                transition={{ duration: 0.35, ease: easing }}
              >
                <div className={`project-art ${project.visual}`}>
                  <div className="project-art-grid" aria-hidden="true" />

                  {project.category === "Web" && (
                    <div className="project-window">
                      <div className="project-window-bar">
                        <span />
                        <span />
                        <span />
                        <small>YOUR NEXT BIG IDEA</small>
                      </div>
                      <div className="project-window-content">
                        <span>DESIGN WITH INTENT.</span>
                        <strong>
                          Digital
                          <br />
                          done differently.
                        </strong>
                        <div className="project-window-lines">
                          <i />
                          <i />
                        </div>
                        <div className="project-window-button">
                          EXPLORE <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>
                  )}

                  {project.category === "Branding" && (
                    <div className="project-brand-art">
                      <span className="brand-art-orbit" />
                      <span className="brand-art-orbit orbit-two" />
                      <strong>MAKE</strong>
                      <strong>YOUR MARK.</strong>
                      <span className="brand-art-caption">
                        BRAND / IDENTITY / CULTURE
                      </span>
                    </div>
                  )}

                  {project.category === "Social" && (
                    <div className="social-art">
                      <div className="social-tile social-tile-one">
                        <span>SCROLL</span>
                        <strong>STOP.</strong>
                      </div>
                      <div className="social-tile social-tile-two">
                        <Sparkles size={24} />
                        <strong>CREATE<br />CULTURE.</strong>
                      </div>
                      <div className="social-tile social-tile-three">
                        <span>YOUR BRAND</span>
                        <strong>YOUR<br />STORY.</strong>
                      </div>
                    </div>
                  )}

                  {project.category === "Web" &&
                    project.number === "04" && (
                      <div className="experience-orb">
                        <span />
                        <span />
                        <span />
                        <strong>BUILT<br />TO MOVE.</strong>
                      </div>
                    )}

                  <span className="project-index">
                    {project.number} / {project.type}
                  </span>
                  <span className="project-art-note">
                    CONCEPT STUDY
                  </span>
                </div>

                <div className="project-info">
                  <div>
                    <span className="project-category-label">
                      {project.category}
                    </span>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => {
                      const mappedService =
                        project.category === "Web"
                          ? "Web Design & Development"
                          : project.category === "Branding"
                            ? "Brand Identity"
                            : "Social Media Management";

                      chooseService(mappedService);
                    }}
                    aria-label={`Discuss a project like ${project.title}`}
                  >
                    <ArrowUpRight size={21} />
                  </a>
                </div>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="portfolio-disclaimer">
          These are illustrative concept studies, not completed client
          projects. We&apos;ll replace them with real work and case studies
          as our portfolio grows.
        </p>
      </section>

      {/* PROCESS */}

      <section className="process-section section-shell">
        <Reveal className="process-heading">
          <span className="eyebrow">04 / HOW WE WORK</span>
          <h2>
            Good work.
            <br />
            <span className="gradient-text">No guesswork.</span>
          </h2>
          <p>
            A straightforward process keeps every project moving with
            clarity, communication, and purpose.
          </p>
        </Reveal>

        <div className="process-list">
          {[
            {
              number: "01",
              title: "Discover",
              description:
                "We learn about your business, audience, challenges, and goals.",
              icon: Search,
            },
            {
              number: "02",
              title: "Design",
              description:
                "We shape the direction, user experience, and creative system.",
              icon: Palette,
            },
            {
              number: "03",
              title: "Build",
              description:
                "We bring the experience to life with careful development and testing.",
              icon: Code2,
            },
            {
              number: "04",
              title: "Launch & grow",
              description:
                "We help you go live and plan the next steps for your digital presence.",
              icon: ArrowUpRight,
            },
          ].map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal
                key={step.number}
                className="process-item"
                delay={index * 0.06}
              >
                <span className="process-number">{step.number}</span>
                <div className="process-item-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <Icon size={23} strokeWidth={1.5} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}

      <section id="contact" className="contact-section section-shell">
        <Reveal className="contact-intro">
          <span className="eyebrow">05 / YOUR NEXT MOVE</span>
          <h2>
            Let&apos;s make
            <br />
            <span className="gradient-text">something matter.</span>
          </h2>
          <p>
            Have a project in mind, a business to grow, or an idea you
            want to bring to life? Tell us about it.
          </p>

          <div className="contact-note">
            <span className="contact-note-icon">
              <MousePointer2 size={18} />
            </span>
            <span>
              GOOD PROJECTS START WITH A CONVERSATION.
            </span>
          </div>
        </Reveal>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
            <div className="form-heading">
              <span>PROJECT ENQUIRY / 001</span>
              <Sparkles size={19} />
            </div>

            <fieldset className="service-selector">
              <legend>What can we help you with?</legend>
              <p className="form-hint">Select all that apply.</p>

              <div className="service-options">
                {enquiryServices.map((service) => {
                  const selected = selectedServices.includes(service);

                  return (
                    <label
                      className={`service-option ${selected ? "selected" : ""}`}
                      key={service}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleService(service)}
                      />
                      <span>{service}</span>
                      <span className="service-option-check">
                        {selected && <Check size={14} />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="form-fields">
              <label>
                Your name
                <input
                  type="text"
                  name="name"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="What should we call you?"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={clientEmail}
                  onChange={(event) => setClientEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="project-message">
              Tell us about your project
              <textarea
                name="message"
                value={projectMessage}
                onChange={(event) => setProjectMessage(event.target.value)}
                placeholder="A little about your business, your goals, and what you have in mind..."
                rows={5}
                required
              />
            </label>

            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
            />

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            {formStatus === "sent" && (
              <p className="form-success" role="status">
                Thank you! We&apos;ve received your enquiry and will get
                back to you at the email address you provided.
              </p>
            )}

            <button
              className="button button-primary enquiry-submit"
              type="submit"
              disabled={
                selectedServices.length === 0 || formStatus === "sending"
              }
            >
              {formStatus === "sending" ? (
                "Sending..."
              ) : (
                <>
                  Send enquiry <ArrowUpRight size={18} />
                </>
              )}
            </button>

            <p className="form-hint form-footnote">
              Your details are only used to reply to your enquiry.
            </p>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}

      <footer className="site-footer">
        <div className="footer-top">
          <a href="#top" className="footer-wordmark">
            WESTBRIDGE<span>®</span>
          </a>

          <p>
            Digital experiences
            <br />
            with a little more imagination.
          </p>

          <a className="footer-top-link" href="#top">
            BACK TO TOP <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© <CurrentYear /> WESTBRIDGE SOLUTION</span>
          <span>DESIGNED WITH INTENTION.</span>
          <a href="#contact">
            HAVE A PROJECT? LET&apos;S TALK <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}
