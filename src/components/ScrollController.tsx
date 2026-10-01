"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollController() {
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // -------------------------------------------------------------------------
    // 1. INITIALIZE LENIS SMOOTH SCROLLING
    // -------------------------------------------------------------------------
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Synchronize Lenis scroll positions with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Bind Lenis animation frame to GSAP ticker for synchronous updates
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // -------------------------------------------------------------------------
    // 2. SCROLL TRIGGER ON BODY -> ANIMATION STATE MACHINE MATH
    // -------------------------------------------------------------------------
    /**
     * Scroll math breakdown:
     * - `self.getVelocity()` returns pixels/second from GSAP ScrollTrigger.
     * - We normalize this velocity: `normalizedVelocity = Math.abs(velocity) / 1200`.
     *   * Gentle scroll: ~150-600 px/s => normalized 0.12 - 0.50 => "Walking"
     *   * Fast flick:    ~1200+ px/s   => normalized > 0.80      => "Running"
     *   * At rest:       0 px/s        => normalized < 0.05      => "Idle"
     *
     * Section boundary crossing:
     * - We track `activeSectionIndex` across [Hero, About, Skills, Projects, Experience, Contact].
     * - When scroll progresses into a new sector, `spartan:slash` is triggered once.
     */
    let lastSectionIndex = 0;
    let attackCooldown = false;

    const mainTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const rawVelocity = self.getVelocity();
        // Normalize velocity: 1200 px/s is calibrated as 1.0 normalized velocity
        const normalizedVelocity = Math.min(Math.abs(rawVelocity) / 1100, 2.5);

        // Calculate current section index across 6 sections
        // Progress ranges from 0 to 1
        const sectionIndex = Math.min(
          Math.floor(self.progress * 5.99),
          5
        );

        let crossedBoundary = false;
        if (sectionIndex !== lastSectionIndex && !attackCooldown && self.progress > 0.04) {
          lastSectionIndex = sectionIndex;
          crossedBoundary = true;
          attackCooldown = true;
          setTimeout(() => {
            attackCooldown = false;
          }, 1200); // 1.2s cooldown to avoid multi-triggers on rapid flick
        }

        // Dispatch state event to Scene.tsx
        window.dispatchEvent(
          new CustomEvent("spartan:scroll", {
            detail: {
              velocity: normalizedVelocity,
              progress: self.progress,
              triggerSlash: crossedBoundary,
              sectionIndex,
            },
          })
        );
      },
    });

    // -------------------------------------------------------------------------
    // 3. SECTION PINNING & CHOREOGRAPHED ENTRANCES
    // Content sections rise from bottom (translateY 80px -> 0, opacity 0 -> 1, staggered)
    // and PIN while warrior walks
    // -------------------------------------------------------------------------
    const sectionElements = gsap.utils.toArray<HTMLElement>(".portfolio-section");

    // Don't pin on reduced-motion or extra small screens to maintain accessibility
    const shouldPin = !prefersReducedMotion && window.innerWidth >= 768;

    sectionElements.forEach((section, index) => {
      const innerContent = section.querySelector(".section-inner");
      const staggeredItems = section.querySelectorAll(".stagger-reveal");

      if (shouldPin && innerContent) {
        // Pin section so user can digest content while warrior walks
        // Skip pinning the last contact section so the footer settles naturally
        const isHero = index === 0;
        const isContact = index === sectionElements.length - 1;

        if (!isHero && !isContact) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=90%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          });
        }
      }

      // Entrance animation: translateY 80px -> 0, opacity 0 -> 1, staggered
      if (staggeredItems.length > 0 && !prefersReducedMotion) {
        gsap.fromTo(
          staggeredItems,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 35%",
              scrub: 0.8,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    // -------------------------------------------------------------------------
    // 4. CLEANUP ON UNMOUNT
    // -------------------------------------------------------------------------
    return () => {
      mainTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return null;
}
