"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type AnimationState = "idle" | "walk" | "run" | "slash";

interface SceneProps {
  onLoaded?: () => void;
}

export default function Scene({ onLoaded }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // -------------------------------------------------------------------------
    // 1. RENDERER SETUP (God of War Visual Grading)
    // -------------------------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------------------
    // 2. SCENE & CAMERA (Cinematic 3/4 Framing, Focus on Warrior)
    // -------------------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0A0B");
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.022);

    const baseCameraPos = new THREE.Vector3(3.2, 1.8, 4.4);
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.copy(baseCameraPos);
    camera.lookAt(0, 1.2, 0);

    // -------------------------------------------------------------------------
    // 3. CINEMATIC GOD OF WAR LIGHTING
    // -------------------------------------------------------------------------
    const keyLight = new THREE.DirectionalLight(0xffeedd, 4.2);
    keyLight.position.set(4.5, 7.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Blazing Molten Spartan Rim Light (#FF2200)
    const rimLight = new THREE.DirectionalLight(0xff2200, 7.5);
    rimLight.position.set(-4.0, 3.5, -4.0);
    scene.add(rimLight);

    // Norse Frost Rim Light (#7799CC)
    const frostRimLight = new THREE.DirectionalLight(0x7799cc, 3.5);
    frostRimLight.position.set(4.0, 2.5, -4.5);
    scene.add(frostRimLight);

    // Campfire / Magma Point Light
    const frontFireLight = new THREE.PointLight(0xff3300, 4.5, 12);
    frontFireLight.position.set(1.2, 1.6, 2.4);
    scene.add(frontFireLight);

    // Dynamic Slash Impact Flash Light
    const slashFlashLight = new THREE.PointLight(0xff6600, 0, 15);
    slashFlashLight.position.set(0.8, 0.8, 1.5);
    scene.add(slashFlashLight);

    const ambientLight = new THREE.AmbientLight(0x1a1e28, 1.4);
    scene.add(ambientLight);

    // -------------------------------------------------------------------------
    // 4. INFINITE RUNIC FLOOR & PROCEDURAL STONE TILES
    // -------------------------------------------------------------------------
    const createNordicFloorTexture = (): THREE.CanvasTexture => {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#0c0d11";
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = "rgba(232, 226, 214, 0.08)";
      ctx.lineWidth = 4;
      const step = 128;
      for (let x = 0; x <= size; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size);
        ctx.stroke();
      }
      for (let y = 0; y <= size; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }

      // Molten fissures in stone
      ctx.strokeStyle = "rgba(255, 68, 14, 0.4)";
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 45; i++) {
        const sx = Math.random() * size;
        const sy = Math.random() * size;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (Math.random() - 0.5) * 90, sy + (Math.random() - 0.5) * 90);
        ctx.stroke();
      }

      // Etched Norse runes
      const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"];
      ctx.fillStyle = "rgba(255, 80, 20, 0.35)";
      ctx.font = "26px serif";
      for (let i = 0; i < 35; i++) {
        const rx = Math.random() * size;
        const ry = Math.random() * size;
        ctx.fillText(runes[i % runes.length], rx, ry);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(24, 24);
      return texture;
    };

    const floorTexture = createNordicFloorTexture();
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.8,
      metalness: 0.25,
      color: 0x181a20,
    });

    const floorGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // -------------------------------------------------------------------------
    // 5. ANCIENT MONOLITHS & PILLARS IN MIST (Parallax Depth)
    // -------------------------------------------------------------------------
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x1e212b,
      roughness: 0.85,
      metalness: 0.2,
    });
    const runeGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff3300,
      emissiveIntensity: 1.4,
      roughness: 0.3,
    });

    const pillarGroup = new THREE.Group();
    const pillarPositions = [
      [-4.0, 0, -3.0, 0.9, 5.2, 0.8],
      [-5.0, 0, 2.0, 0.8, 4.0, 0.8],
      [-6.0, 0, 7.0, 1.1, 6.0, 1.0],
      [5.0, 0, -4.0, 1.0, 5.5, 0.9],
      [6.0, 0, 1.5, 0.8, 4.5, 0.8],
      [6.8, 0, 6.5, 1.2, 6.2, 1.1],
    ];

    pillarPositions.forEach(([x, y, z, w, h, d]) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), pillarMat);
      p.position.set(x, h / 2, z);
      p.rotation.y = (Math.random() - 0.5) * 0.4;
      p.castShadow = true;
      p.receiveShadow = true;

      const runeBand = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.16, d + 0.02), runeGlowMat);
      runeBand.position.y = h * 0.6;
      p.add(runeBand);

      pillarGroup.add(p);
    });
    scene.add(pillarGroup);

    // -------------------------------------------------------------------------
    // 6. ATMOSPHERIC PARTICLES: RISING EMBERS + BLIZZARD SNOW + SPARK BURST
    // -------------------------------------------------------------------------
    const emberCount = 180;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      emberPositions[i * 3 + 1] = Math.random() * 5.0;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      emberSpeeds[i] = 0.35 + Math.random() * 0.85;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xff4400,
      size: 0.065,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // Blizzard Snow Particles
    const snowCount = 220;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowSpeeds = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      snowPositions[i * 3 + 1] = Math.random() * 6.5;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      snowSpeeds[i] = 0.5 + Math.random() * 0.75;
    }
    snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xaaccee,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const snow = new THREE.Points(snowGeo, snowMat);
    scene.add(snow);

    // Dynamic Combat Slash Sparks
    const sparkCount = 80;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i++) {
      sparkPositions[i] = 0;
      sparkVelocities[i] = (Math.random() - 0.5) * 4.0;
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffaa22,
      size: 0.09,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const slashSparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(slashSparks);

    // -------------------------------------------------------------------------
    // 7. THE DUAL BLADES OF CHAOS (SPARTAN WAR SWORDS)
    // -------------------------------------------------------------------------
    const createBladeOfChaos = (isLeft = false): THREE.Group => {
      const sword = new THREE.Group();
      sword.name = isLeft ? "BladeOfChaos_Left" : "BladeOfChaos_Right";

      const steelMat = new THREE.MeshStandardMaterial({
        color: 0x6e7682,
        metalness: 0.95,
        roughness: 0.18,
      });

      const bronzeMat = new THREE.MeshStandardMaterial({
        color: 0xb57335,
        metalness: 0.88,
        roughness: 0.28,
      });

      const darkGripMat = new THREE.MeshStandardMaterial({
        color: 0x1f1713,
        roughness: 0.8,
        metalness: 0.2,
      });

      const runeMat = new THREE.MeshStandardMaterial({
        color: 0xff3300,
        emissive: 0xff2200,
        emissiveIntensity: 3.5,
        roughness: 0.15,
      });

      // Wrapped Grip Handle
      const hilt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.024, 0.022, 0.42, 12),
        darkGripMat
      );
      hilt.position.y = -0.15;
      hilt.castShadow = true;
      sword.add(hilt);

      // Skull Pommel at bottom
      const pommel = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        bronzeMat
      );
      pommel.position.y = -0.36;
      sword.add(pommel);

      // Hanging Chains from pommel
      for (let i = 0; i < 4; i++) {
        const link = new THREE.Mesh(
          new THREE.TorusGeometry(0.025, 0.008, 8, 12),
          bronzeMat
        );
        link.position.set(0, -0.42 - i * 0.04, 0);
        link.rotation.x = i % 2 === 0 ? 0 : Math.PI / 2;
        sword.add(link);
      }

      // Spiked Spartan Crossguard
      const guard = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.045, 0.06),
        bronzeMat
      );
      guard.position.y = 0.06;
      guard.castShadow = true;
      sword.add(guard);

      // Curved Broad Blade
      const bladeLength = 0.88;
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.038, bladeLength, 0.16),
        steelMat
      );
      blade.position.set(0, 0.06 + bladeLength / 2, 0.02);
      blade.castShadow = true;

      // Curved Sharp Edge with Recurve
      const cuttingEdge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, bladeLength, 12, 1, false, 0, Math.PI),
        steelMat
      );
      cuttingEdge.rotation.z = Math.PI / 2;
      cuttingEdge.position.set(0, 0, 0.08);
      cuttingEdge.scale.set(0.18, 1.0, 0.5);
      blade.add(cuttingEdge);

      // Blazing Magma Rune Inscription on Blade Spine
      const runeStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.042, bladeLength * 0.75, 0.035),
        runeMat
      );
      runeStrip.position.set(0, 0, 0.03);
      blade.add(runeStrip);

      // Jagged Barbs on Back of Blade
      for (let b = 0; b < 3; b++) {
        const barb = new THREE.Mesh(
          new THREE.ConeGeometry(0.035, 0.09, 8),
          steelMat
        );
        barb.rotation.z = isLeft ? 1.2 : -1.2;
        barb.position.set(0, (b - 1) * 0.22, -0.09);
        blade.add(barb);
      }

      // Pointed Blade Tip
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.18, 12),
        steelMat
      );
      tip.position.set(0, bladeLength / 2 + 0.09, 0.02);
      blade.add(tip);

      sword.add(blade);

      sword.scale.set(1.2, 1.2, 1.2);
      return sword;
    };

    // -------------------------------------------------------------------------
    // 8. GLTF LOADER: LOADS /model/warrior.glb DIRECTLY
    // -------------------------------------------------------------------------
    let mixer: THREE.AnimationMixer | null = null;
    const actions: Record<string, THREE.AnimationAction> = {};
    let activeAction: THREE.AnimationAction | null = null;
    let rightSwordRef: THREE.Group | null = null;
    let leftSwordRef: THREE.Group | null = null;
    let rightArmBoneRef: THREE.Object3D | null = null;
    let leftArmBoneRef: THREE.Object3D | null = null;

    let isAttacking = false;
    let attackPhase = 0;
    let attackComboIndex = 0;
    let attackTimer = 0;
    let cameraShake = 0;

    const loader = new GLTFLoader();
    const modelPath = "/model/warrior.glb";

    loader.load(
      modelPath,
      (gltf) => {
        console.log(`=== SPARTAN WARRIOR LOADED FROM ${modelPath} ===`);
        const clipNames = gltf.animations.map((a) => a.name);
        console.log("GLB Animation clips:", clipNames);

        // Character scale and position on the right side of the screen
        const isMobile = window.innerWidth < 768;
        const s = isMobile ? 1.45 : 1.75;
        gltf.scene.scale.set(s, s, s);
        gltf.scene.position.set(isMobile ? 0 : 1.1, 0, 0);
        gltf.scene.rotation.y = Math.PI + 0.4; // 3/4 front camera facing

        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Bone Attachment for Dual Swords
        const rHand =
          gltf.scene.getObjectByName("mixamorig:RightHand") ||
          gltf.scene.getObjectByName("mixamorigRightHand") ||
          gltf.scene.getObjectByName("RightHand");

        const lHand =
          gltf.scene.getObjectByName("mixamorig:LeftHand") ||
          gltf.scene.getObjectByName("mixamorigLeftHand") ||
          gltf.scene.getObjectByName("LeftHand");

        rightArmBoneRef =
          gltf.scene.getObjectByName("mixamorig:RightArm") ||
          gltf.scene.getObjectByName("mixamorigRightArm") ||
          null;
        leftArmBoneRef =
          gltf.scene.getObjectByName("mixamorig:LeftArm") ||
          gltf.scene.getObjectByName("mixamorigLeftArm") ||
          null;

        const swordR = createBladeOfChaos(false);
        const swordL = createBladeOfChaos(true);

        rightSwordRef = swordR;
        leftSwordRef = swordL;

        // Position sword firmly in grip
        swordR.position.set(0, 0, 0.05);
        swordR.rotation.set(0.4, 0, -0.2);

        swordL.position.set(0, 0, 0.05);
        swordL.rotation.set(0.4, 0, 0.2);

        if (rHand) {
          rHand.add(swordR);
        } else {
          gltf.scene.add(swordR);
          swordR.position.set(0.45, 0.85, 0.2);
        }

        if (lHand) {
          lHand.add(swordL);
        } else {
          gltf.scene.add(swordL);
          swordL.position.set(-0.45, 0.85, 0.2);
        }

        scene.add(gltf.scene);

        // AnimationMixer Setup
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(gltf.scene);

          gltf.animations.forEach((clip) => {
            const action = mixer!.clipAction(clip);
            actions[clip.name.toLowerCase()] = action;
          });

          const idleAction =
            actions["idle"] ||
            actions["mixamo.com"] ||
            actions[gltf.animations[0].name.toLowerCase()];
          if (idleAction) {
            idleAction.play();
            activeAction = idleAction;
          }
        }

        // Contact Shadow Disc on ground
        const contactShadow = new THREE.Mesh(
          new THREE.CircleGeometry(1.0, 24),
          new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.65 })
        );
        contactShadow.rotation.x = -Math.PI / 2;
        contactShadow.position.y = 0.015;
        scene.add(contactShadow);

        if (onLoaded) onLoaded();
      },
      undefined,
      (err) => {
        console.error("Error loading warrior GLB:", err);
      }
    );

    // Cross-fade animation action helper
    const switchAction = (toName: string, duration = 0.35) => {
      const target =
        actions[toName.toLowerCase()] ||
        actions["walk"] ||
        actions["idle"] ||
        activeAction;
      if (!target || target === activeAction) return;

      target.reset();
      target.fadeIn(duration);
      target.play();
      if (activeAction) {
        activeAction.fadeOut(duration);
      }
      activeAction = target;
    };

    // -------------------------------------------------------------------------
    // 9. SWORD COMBAT & SOUND SYNTHESIS (Web Audio)
    // -------------------------------------------------------------------------
    const playSwordSound = (type: "whoosh" | "clash") => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === "whoosh") {
          // Dynamic air-slice whoosh
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(450, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.22);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.26);
        } else {
          // Heavy steel blade clash / ground slam
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = "sawtooth";
          osc1.frequency.setValueAtTime(180, ctx.currentTime);
          osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);

          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(320, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.35);

          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 0.46);
          osc2.stop(ctx.currentTime + 0.46);
        }
      } catch {
        // Non-fatal if audio context blocked
      }
    };

    const triggerSwordSlash = () => {
      isAttacking = true;
      attackTimer = 0;
      attackPhase = 0;
      attackComboIndex = (attackComboIndex + 1) % 3;
      playSwordSound("whoosh");
      setTimeout(() => playSwordSound("clash"), 180);
    };

    // -------------------------------------------------------------------------
    // 10. SCROLL STATE MACHINE & EVENT LISTENERS
    // -------------------------------------------------------------------------
    let targetVelocity = 0;
    let smoothVelocity = 0;
    let currentAnimState: AnimationState = "idle";

    const handleScrollEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      targetVelocity = Math.abs(detail.velocity || 0);

      if (detail.triggerSlash) {
        triggerSwordSlash();
      }
    };

    window.addEventListener("spartan:scroll", handleScrollEvent as EventListener);
    window.addEventListener("spartan:slash", triggerSwordSlash as EventListener);

    // Spacebar to execute Spartan slash
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isAttacking) {
        e.preventDefault();
        triggerSwordSlash();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Click canvas to trigger slash
    const handleClick = () => {
      if (!isAttacking) triggerSwordSlash();
    };
    window.addEventListener("pointerdown", handleClick);

    // -------------------------------------------------------------------------
    // 11. RESIZE
    // -------------------------------------------------------------------------
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;

      if (width < 768) {
        camera.position.set(3.8, 2.1, 5.2);
      } else {
        camera.position.set(3.2, 1.8, 4.4);
      }
      camera.lookAt(0, 1.2, 0);
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };

    window.addEventListener("resize", handleResize);

    // -------------------------------------------------------------------------
    // 12. ANIMATION TICKER & RENDER LOOP
    // -------------------------------------------------------------------------
    let lastTime = performance.now();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth velocity interpolation
      smoothVelocity += (targetVelocity - smoothVelocity) * 0.12;
      targetVelocity *= 0.91;
      if (targetVelocity < 0.001) targetVelocity = 0;

      // Infinite Floor UV Scrolling
      if (!prefersReducedMotion) {
        const uvScrollSpeed = Math.max(smoothVelocity, currentAnimState === "idle" ? 0.025 : 0.32);
        floorTexture.offset.y -= uvScrollSpeed * delta * 0.82;
      }

      // Rising Embers
      const emberArr = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberArr[i * 3 + 1] += emberSpeeds[i] * delta * 0.95;
        if (emberArr[i * 3 + 1] > 5.0) {
          emberArr[i * 3 + 1] = 0;
          emberArr[i * 3 + 0] = (Math.random() - 0.5) * 16;
          emberArr[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Snow Blizzard
      const snowArr = snowGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        snowArr[i * 3 + 1] -= snowSpeeds[i] * delta * 0.88;
        snowArr[i * 3 + 0] += 0.45 * delta;
        if (snowArr[i * 3 + 1] < 0) {
          snowArr[i * 3 + 1] = 6.5;
          snowArr[i * 3 + 0] = (Math.random() - 0.5) * 20;
          snowArr[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      snowGeo.attributes.position.needsUpdate = true;

      // Animation State Machine (SKILL.md)
      if (smoothVelocity > 0.8) {
        if (currentAnimState !== "run") {
          currentAnimState = "run";
          switchAction("run");
        }
        if (activeAction) activeAction.timeScale = 1.4;
      } else if (smoothVelocity > 0.05) {
        if (currentAnimState !== "walk") {
          currentAnimState = "walk";
          switchAction("walk");
        }
        if (activeAction) {
          activeAction.timeScale = THREE.MathUtils.clamp(smoothVelocity * 1.6, 0.8, 1.8);
        }
      } else {
        if (currentAnimState !== "idle") {
          currentAnimState = "idle";
          switchAction("idle");
        }
        if (activeAction) activeAction.timeScale = 1.0;
      }

      // Update AnimationMixer
      if (mixer) {
        mixer.update(delta);
      }

      // -----------------------------------------------------------------------
      // DYNAMIC DUAL SWORD COMBAT SYSTEM (Talwaro wala Animation)
      // -----------------------------------------------------------------------
      if (isAttacking) {
        attackTimer += delta * 3.4;

        if (attackTimer < 1.0) {
          const t = attackTimer;
          // Phase 1: High-speed Cross Slash & Ground Slam
          const swing = Math.sin(t * Math.PI);
          const powerSwing = Math.sin(Math.pow(t, 0.6) * Math.PI);

          if (rightSwordRef) {
            // Right blade cross-slash
            rightSwordRef.rotation.x = 0.4 + swing * 2.8;
            rightSwordRef.rotation.y = swing * 1.4;
            rightSwordRef.rotation.z = -swing * 0.9;
          }

          if (leftSwordRef) {
            // Left blade cross-slash
            leftSwordRef.rotation.x = 0.4 - swing * 2.4;
            leftSwordRef.rotation.y = -swing * 1.2;
            leftSwordRef.rotation.z = swing * 0.8;
          }

          if (rightArmBoneRef) {
            rightArmBoneRef.rotation.x = -powerSwing * 1.2;
          }
          if (leftArmBoneRef) {
            leftArmBoneRef.rotation.x = powerSwing * 1.0;
          }

          // Trigger Spark Burst on mid-swing impact
          if (t > 0.4 && t < 0.65) {
            slashFlashLight.intensity = (0.65 - Math.abs(t - 0.5)) * 14.0;
            cameraShake = 0.06;
            sparkMat.opacity = 1.0;

            const spArr = sparkGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < sparkCount; i++) {
              spArr[i * 3 + 0] += sparkVelocities[i * 3 + 0] * delta * 2.5;
              spArr[i * 3 + 1] += sparkVelocities[i * 3 + 1] * delta * 2.5;
              spArr[i * 3 + 2] += sparkVelocities[i * 3 + 2] * delta * 2.5;
            }
            sparkGeo.attributes.position.needsUpdate = true;
          }
        } else {
          // Attack Complete: Reset to combat stance
          isAttacking = false;
          slashFlashLight.intensity = 0;
          sparkMat.opacity = 0;
          cameraShake = 0;

          if (rightSwordRef) rightSwordRef.rotation.set(0.4, 0, -0.2);
          if (leftSwordRef) leftSwordRef.rotation.set(0.4, 0, 0.2);
          if (rightArmBoneRef) rightArmBoneRef.rotation.set(0, 0, 0);
          if (leftArmBoneRef) leftArmBoneRef.rotation.set(0, 0, 0);
        }
      } else {
        // Idle Combat Breathing: Subtle pulsing sword sway
        const swordBreath = Math.sin(now * 0.003) * 0.06;
        if (rightSwordRef) rightSwordRef.rotation.x = 0.4 + swordBreath;
        if (leftSwordRef) leftSwordRef.rotation.x = 0.4 - swordBreath;
      }

      // Camera Shake Recoil Effect during heavy strikes
      if (cameraShake > 0) {
        camera.position.x = baseCameraPos.x + (Math.random() - 0.5) * cameraShake;
        camera.position.y = baseCameraPos.y + (Math.random() - 0.5) * cameraShake;
        cameraShake *= 0.88;
      } else {
        camera.position.x = baseCameraPos.x;
        camera.position.y = baseCameraPos.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------------------
    // 13. CLEANUP
    // -------------------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handleClick);
      window.removeEventListener("spartan:scroll", handleScrollEvent as EventListener);
      window.removeEventListener("spartan:slash", triggerSwordSlash as EventListener);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      floorGeometry.dispose();
      floorMaterial.dispose();
      floorTexture.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      snowGeo.dispose();
      snowMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 w-screen h-screen overflow-hidden bg-transparent cursor-crosshair"
      aria-hidden="true"
    />
  );
}
