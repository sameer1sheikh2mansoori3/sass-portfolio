---
name: spartan-portfolio-generator
description: Generates a complete cinematic personal portfolio website built around a scroll-driven Spartan warrior character — an AI-generated warrior film (Higgsfield stills + Kling clips scrubbed frame-by-frame) where the warrior walks/runs/swings his axe as you scroll, with the owner's portfolio content (hero, about, skills, projects, experience, contact) rising up from the bottom as the warrior keeps moving. Optionally blends a real 3D GLB warrior (Three.js) for interactive sections. Hosted locally with optional GitHub Pages deploy. Use this whenever the user asks for a scroll animation portfolio, a "Kratos/God-of-War-style" personal site, a warrior-driven scroll story, or says "make another one like the spartan site".
---

# Spartan Portfolio Generator

Turn a developer/designer's personal brief into a cinematic scroll-driven
portfolio: an AI-generated Spartan warrior film scrubbed by scroll position,
where the warrior walks forward through the world as the user scrolls down,
and every section of the portfolio (name, bio, skills, projects, experience,
contact) rises up from the bottom of the viewport — like a cinematic title
card — while the warrior keeps moving behind it. Dark, ember-lit, Awwwards-grade.

Optionally hybrid: swap a chapter or two for a real 3D GLB warrior (Three.js
+ AnimationMixer) for interactive walk/run/attack driven by scroll velocity.

## What the user gives you

The user's name, role (e.g. "Full-Stack Developer"), and optionally: real
projects, skills, experience, contact links, a color vibe ("ember orange +
bone white"), or specific scroll beats ("warrior walks through snow → fire →
final axe slam on the logo"). Everything missing, you invent tastefully.

Default aesthetic (if nothing given): near-black background (#0A0A0B),
bone-white display type (#E8E2D6), ember-orange accent (#C1440E), frost-blue
secondary (#6B7A8F). Display font: Cinzel or Playfair. Body: Inter.
Film grain, vignette, floating embers, snow particles.

**Legal guardrail:** never use the name "Kratos", Sony/Santa Monica logos,
or exported God-of-War game assets. Always call it "Spartan warrior" or
"warrior". The look can be inspired (bald, bearded, red war-paint stripe,
leather pauldron, battle axe) — the IP cannot.

## Choose the architecture

- **Vanilla scroll-film** (default): one continuous AI-generated warrior film
  sliced into ~400 WebP frames, scrubbed on a canvas. The warrior walks
  forward; content sections are HTML overlays that rise up. Zero build step,
  deploys anywhere.
  → read `references/vanilla-film.md`
- **GSAP/Next.js hybrid**: pinned sections mixing frame-scrubbed warrior
  canvases with a real Three.js GLB warrior (`.glb` provided by user or
  generated from Mixamo), plus GSAP-animated content reveals (stat counters,
  skill bars, project cards, timeline). Choose when the user wants actual
  3D interactivity, axes-swing on section boundaries, or gives a GLB.
  → read `references/gsap-nextjs.md`

## Pipeline (both architectures)

1. **Storyboard the journey.** Map the portfolio onto 5-8 chapters, each one
   a location/state for the warrior + one piece of portfolio content. Example:
   1. Hero — warrior stands, name reveals ("ARYAN SHARMA — Full-Stack Developer")
   2. About — warrior walks through fog, bio + stat counters rise
   3. Skills — warrior walks through ember-lit cave, skill bars rise
   4. Projects — warrior walks through ruined temple, project cards rise
   5. Experience — warrior runs, timeline rises
   6. Contact — warrior reaches summit, axe-slam, contact card rises
   Decide per chapter: video clip (warrior), still + GSAP trick (environment),
   or pure CSS/GSAP (content overlays).

2. **Hero still first.** Generate 1-3 candidates of the warrior with
   `scripts/hf.py` (default model: Soul). The hero anchors every subsequent
   clip — consistency is everything here. Iterate cheaply on the still.
   Show the user and let them pick if they're around; otherwise pick the
   most symmetrical/consistent one and say so. Patch text artifacts with
   Pillow (AI stills love fake logos and gibberish runes).
   **Prompt recipe for hero:** see `references/prompts.md` — "cinematic
   full-body Spartan warrior, bald, thick beard, red war-paint stripe across
   torso, leather pauldron, battle axe strapped to back, three-quarter view,
   dramatic rim light, ember-lit environment, photoreal, 4K, dark moody
   atmosphere".

3. **Chapter clips** via Kling v2.1 pro image-to-video, anchored for
   character consistency (this is the anti-morphing system):
   - **Every clip that shows the warrior starts from the hero still** or from
     another clip's extracted last frame (`ffmpeg -sseof -0.1 ... -frames:v 1`),
     uploaded via `hf.py upload`. This is non-negotiable — the warrior's
     face, armor, and axe must not change between chapters.
   - **Walk cycle across chapters:** generate the hero walking in each
     environment ("same Spartan warrior, walking forward through fog, camera
     tracking at his side, cinematic dolly"). Chain environments by
     extracting the last frame of chapter N and using it as the anchor for
     chapter N+1.
   - **Run + attack states:** for chapters where the user wants faster motion
     (Experience = run, Contact = axe slam), generate those as separate clips
     anchored on the hero. Scroll velocity drives which chapter's clip is
     active, so this is a natural state change.
   - **No camera movement in warrior clips.** Lock the camera so the warrior
     appears to walk forward and the background parallaxes left — this sells
     the "he's walking, page is scrolling" illusion.
   - Run clips as background tasks in parallel; QC each with an ffmpeg
     contact sheet (first/quarter/mid/three-quarter/last frames) before
     using it. Regenerate individual failures — never the whole set.
   - Prompt recipes + failure modes: `references/prompts.md`.

4. **Build frames.** `scripts/build_master.py` xfade-concats the chapters,
   slices ~12fps 1400px WebP frames (~15-25 MB total) and prints per-chapter
   scroll fractions — use those to place the portfolio content sections and
   their rise-up triggers. For standalone sequences (e.g. a 360° warrior
   rotation for the About section) use `scripts/extract.py`.

5. **Site.** Copy the engine from `assets/` (see the architecture reference),
   rebrand colors/copy. Calibrate:
   - Warrior frame scrub to global scroll progress
   - Content section rise triggers to the printed chapter fractions
   - Cursor lag, grain, ember particles, vignette

6. **The portfolio content.** The film is only the opening act — a run that
   ends at the film has built a fancy header, not a portfolio. Continue the
   scroll below (or overlay on top) with the full personal brand:
   - **Hero:** name in huge Cinzel, role subtitle, "scroll to begin" pulse
   - **About:** 4-line bio + 4 animated stat counters (Years, Projects,
     Clients, Awards)
   - **Skills:** animated skill bars or grid (React, Next.js, TypeScript,
     Node, Three.js, GSAP, Tailwind, etc.)
   - **Projects:** 4-5 case-study cards with title, year, tags, one-liner,
     placeholder or real imagery — each card rises from bottom with stagger
   - **Experience:** vertical timeline with role, company, duration, 2 bullets
   - **Contact:** email, GitHub, LinkedIn, X, Dribbble, custom ember cursor
   - **Sticky nav** appears after the film, real footer at bottom
   Every section uses the same "rise from bottom" motion language (translateY
   80px → 0, opacity 0 → 1, stagger 0.1s, ease power3.out).
   This normally costs zero extra generations — it reuses warrior clip crops
   and environment rejects. → read `references/brand-page.md` and use
   `assets/brand-sections.html` as the starting template.

7. **Verify in a real browser** — scrub to every chapter, check:
   - Warrior walks smoothly, no frame stutter
   - Content rises at the right scroll position for each section
   - Captions and name reveal timing
   - Mobile viewport (warrior scales to ~45vh, particle count halved)
   - Below-film sections (nav appears, reveals fire, footer present)
   - Console clean, no WebGL warnings
   See "Verification gotchas".

8. **Host.** Add a launch.json config (next free port: check existing ones),
   serve with `python3 -m http.server` (vanilla) or `next dev` (hybrid),
   `open` it in the browser. Offer GitHub Pages deploy → `references/deploy.md`.

## Optional: 3D GLB warrior hybrid

If the user provides a `.glb` warrior (from Mixamo, Sketchfab, or Spline),
use it in 1-2 pinned chapters instead of AI video:

- Load with `GLTFLoader`, render on a separate `<canvas>` inside a
  ScrollTrigger-pinned section
- AnimationMixer with crossFadeTo between `Idle` / `Walking` / `Running` /
  `Attack` clips (clip names vary — log them all on load and map)
- Scroll velocity → `timeScale` (0 = idle, 1 = walk, 2.5 = run)
- Section boundary crossed → trigger `Attack` once, blend back to Walk
- Floor UV offset scrolls to fake forward motion
- Camera locked at cinematic 3/4 angle: `(3.2, 1.8, 4.5)` → look at `(0, 1.2, 0)`
- Fallback if GLB fails: procedural box warrior, console warning — never crash

This gives the user "real 3D walk/run/attack" without burning video credits.

## API + costs

`scripts/hf.py` (image | upload | video) reads HF_KEY from env or the `.env`
sitting next to this SKILL.md — already configured with the user's
Higgsfield key. Platform facts that will save you an hour:
- Text-to-image: `higgsfield-ai/soul/standard` (the script's default).
  `reve/text-to-image` and `bytedance/seedream/v4` are both dead — model
  availability shifts, so if the default 404s, probe alternatives with one
  cheap submission before giving up.
- Upload: SDK flow via `higgsfield_client` pip package
  (`/files/generate-upload-url` presigned PUT). The old `/upload` is dead.
- Kling's output size FOLLOWS the input still's aspect (16:9 hero →
  1920×1080 on pro, 1280×720 on standard; 4:3 hero → 1656×1248). Keep every
  anchor still the same aspect so clips match — build_master normalizes
  mismatches, but matched inputs look better. Design the site for
  contain-fit + vignette/mask, never cover-crop.
- Each clip costs real credits (~1-2 min render). A typical portfolio is
  1-2 stills + 5-8 clips including retries. Mention the spend before starting;
  get the hero warrior approved before burning video credits when practical.
- **Credits can run out mid-build** (`not_enough_credits`, HTTP 403).
  Failed/rejected submissions don't charge. There's no balance endpoint.
  When pro-tier is rejected, `kling-video/v2.1/standard/image-to-video`
  may still succeed (cheaper). If a planned clip is unaffordable, salvage:
  reverse/slow/retrim clips you already have (`-vf reverse`, `setpts`), split
  one clip across two chapters with different content overlays, or use
  still+GSAP chapters — then tell the user which chapters deserve a
  regenerate once credits are topped up.

## Failure modes (learned the hard way)

- **Kling morphs the warrior's face/armor between clips.** This is the #1
  issue with character-driven scroll films. Fix: ALWAYS anchor each clip
  on the previous clip's extracted last frame, keep prompts identical for
  the warrior description, never let the AI invent new armor details.
  If morphing persists after 2 tries, fall back to a still+GSAP chapter
  (warrior frozen, environment animates) for that chapter.
- **Kling duplicates the axe or adds a second weapon.** Same fix as above —
  anchor on hero still, explicitly state "single battle axe strapped to back"
  in every prompt, check contact sheets before shipping.
- **Chapter cuts reset warrior state** (walking → standing still). Mask with
  the 0.4s crossfades build_master adds, and land content-section transitions
  near cuts so the rise-up hides the reset.
- **Content sections feel disconnected from the film.** Fix: pull the same
  ember-orange accent into the content overlays, add a subtle vertical
  gradient at the top edge of each section so it "bleeds" into the film
  behind it.
- Local ffmpeg has **no WebP encoder** — extract PNG, convert with Pillow
  (the bundled scripts already do this).
- Warrior frames sit in visible rectangles on the page. Blend with a radial
  `mask-image` (`.img-blend` pattern) and fade strip edges horizontally.
  Or just make the warrior film full-bleed background so no rectangle shows.
- Caption with `data-in="0.00"` is invisible at exactly scroll 0 — give the
  opening name reveal a negative data-in.
- **Never autoplay warrior clips.** Always scrub. Autoplay breaks the
  "scroll = movement" illusion and kills performance on mobile.

## Verification gotchas

The Launch preview panel's tab is `hidden`: rAF suspends, GSAP tickers stall,
and screenshots can desync from canvas compositing. For vanilla sites,
screenshot twice and trust element/pixel probes (`preview_eval` reading
canvas pixels). For Next/GSAP sites, verify in the user's real Chrome via the
claude-in-chrome tools — scroll with `javascript_tool`, screenshot, and
remember GitHub Pages caches HTML for ~10 min (cache-bust with `?fresh=1`).

Test scroll velocity → animation state mapping carefully. Fast scroll on
trackpads and mouse wheels produce very different velocity curves — clamp
the mapping so idle/walk/run transitions feel natural on both.

## Finishing

Save/update a project memory file (ports, warrior prompt used, brand colors,
quirks). Report: local URL, what each chapter shows, credits used, rough
edges worth a retake. Every individual clip is independently regenerable —
say so. If a GLB was used, note the path and clip names.