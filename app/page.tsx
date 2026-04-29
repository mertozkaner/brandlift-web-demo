'use client'

import { useState, useEffect, useRef } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --black: #050507;
  --stage: #07070F;
  --blue: #4A82C8;
  --orange: #E85D24;
  --white: #FFFFFF;
  --soft: rgba(255,255,255,.72);
  --muted: rgba(255,255,255,.38);
  --font-main: 'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'DM Mono', 'Courier New', monospace;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--black);
  font-family: var(--font-main);
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.shell {
  width: 100vw;
  height: 100vh;
  background: #040406;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
}

.stage {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--stage);
}

.stage::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 220px 220px;
  opacity: .045;
  mix-blend-mode: overlay;
}

.reel-field {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.rf-orange {
  position: absolute;
  width: 110vw;
  height: 96vh;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -47%);
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%,
    rgba(255, 106, 24, .56) 0%,
    rgba(240, 80, 14, .30) 27%,
    rgba(216, 62, 8, .12) 52%,
    rgba(216, 62, 8, .04) 64%,
    transparent 78%);
  filter: blur(92px);
  animation: floatOrange 18s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-blue {
  position: absolute;
  width: 104vw;
  height: 92vh;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -44%);
  border-radius: 50%;
  background: radial-gradient(ellipse at 48% 54%,
    rgba(92, 150, 255, .84) 0%,
    rgba(56, 90, 245, .58) 30%,
    rgba(26, 44, 180, .28) 56%,
    transparent 78%);
  filter: blur(88px);
  animation: floatBlue 23s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-pink {
  position: absolute;
  width: 70vw;
  height: 66vh;
  top: 50%;
  left: 50%;
  transform: translate(-20%, -53%);
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%,
    rgba(226, 55, 140, .55) 0%,
    rgba(192, 40, 108, .28) 38%,
    transparent 76%);
  filter: blur(82px);
  mix-blend-mode: screen;
  animation: floatPink 20s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-cream {
  position: absolute;
  width: 54vw;
  height: 46vh;
  top: 50%;
  left: 50%;
  transform: translate(-35%, -58%);
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%,
    rgba(255, 231, 176, .38) 0%,
    rgba(248, 205, 138, .16) 44%,
    transparent 72%);
  filter: blur(60px);
  mix-blend-mode: screen;
  animation: floatCream 15s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-band {
  position: absolute;
  left: 0;
  top: 48%;
  width: 100%;
  height: 44%;
  transform: translateY(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 106, 24, .08) 16%,
    rgba(255, 124, 48, .20) 34%,
    rgba(235, 70, 105, .18) 48%,
    rgba(45, 66, 220, .22) 60%,
    rgba(22, 34, 128, .10) 78%,
    transparent 100%
  );
  filter: blur(42px);
  mix-blend-mode: screen;
}

.rf-glass {
  position: absolute;
  inset: -18%;
  z-index: 5;
  overflow: hidden;
  opacity: .42;
  mix-blend-mode: screen;
  background:
    radial-gradient(ellipse at 20% 28%, rgba(255,255,255,.30) 0%, rgba(255,255,255,.10) 12%, transparent 30%),
    radial-gradient(ellipse at 70% 36%, rgba(168,205,255,.46) 0%, rgba(116,166,255,.26) 28%, transparent 58%),
    radial-gradient(ellipse at 42% 58%, rgba(210,90,255,.30) 0%, rgba(175,60,230,.16) 32%, transparent 64%),
    radial-gradient(ellipse at 58% 50%, rgba(255,255,255,.16) 0%, transparent 44%),
    linear-gradient(115deg,
      rgba(255,255,255,.16) 0%,
      rgba(226,236,255,.24) 16%,
      rgba(178,210,255,.36) 36%,
      rgba(112,156,255,.36) 56%,
      rgba(196,94,255,.24) 74%,
      rgba(255,255,255,.12) 100%);
  filter: blur(.3px);
  animation: glassDrift 18s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-glass::after {
  content: '';
  position: absolute;
  inset: -24%;
  background:
    radial-gradient(ellipse at 20% 34%, rgba(255,255,255,.38) 0%, transparent 24%),
    radial-gradient(ellipse at 46% 42%, rgba(190,82,255,.30) 0%, transparent 34%),
    radial-gradient(ellipse at 72% 50%, rgba(86,180,255,.42) 0%, transparent 38%),
    radial-gradient(ellipse at 82% 26%, rgba(220,238,255,.32) 0%, transparent 28%);
  filter: blur(24px);
  opacity: .92;
  animation: glassPulse 15s ease-in-out infinite;
  will-change: transform, opacity;
}

.rf-liquid {
  position: absolute;
  z-index: 6;
  width: 46vw;
  height: 46vw;
  min-width: 460px;
  min-height: 460px;
  max-width: 820px;
  max-height: 820px;
  left: 50%;
  top: 50%;
  transform: translate(-52%, -50%);
  border-radius: 58% 42% 54% 46% / 46% 58% 42% 54%;
  background:
    radial-gradient(circle at 28% 22%, rgba(255,255,255,.86) 0%, rgba(255,255,255,.30) 12%, transparent 28%),
    radial-gradient(circle at 68% 64%, rgba(64,132,255,.86) 0%, rgba(64,132,255,.34) 30%, transparent 58%),
    radial-gradient(circle at 38% 72%, rgba(194,78,255,.58) 0%, rgba(194,78,255,.26) 34%, transparent 64%),
    linear-gradient(135deg,
      rgba(240,248,255,.84) 0%,
      rgba(168,205,255,.82) 28%,
      rgba(80,138,255,.76) 54%,
      rgba(170,78,255,.54) 78%,
      rgba(255,255,255,.34) 100%);
  filter: blur(8px);
  opacity: .58;
  mix-blend-mode: screen;
  animation: liquidFlow 14s ease-in-out infinite;
  box-shadow:
    inset 28px 28px 90px rgba(255,255,255,.18),
    inset -54px -48px 130px rgba(30,60,180,.26),
    0 0 150px rgba(95,150,255,.26);
  will-change: transform, border-radius;
}

.rf-liquid::before {
  content: '';
  position: absolute;
  inset: 8%;
  border-radius: inherit;
  background:
    radial-gradient(circle at 30% 26%, rgba(255,255,255,.50) 0%, transparent 20%),
    radial-gradient(circle at 70% 70%, rgba(40,90,255,.42) 0%, transparent 42%);
  filter: blur(18px);
  opacity: .72;
}

.rf-glass-mask {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%,
    transparent 0%,
    transparent 42%,
    rgba(7,7,15,.22) 66%,
    rgba(7,7,15,.72) 86%,
    #07070F 100%);
}

.rf-grain {
  position: absolute;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: .065;
  mix-blend-mode: overlay;
  mask-image: radial-gradient(ellipse at 50% 50%,
    black 6%,
    rgba(0,0,0,.72) 42%,
    transparent 76%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%,
    black 6%,
    rgba(0,0,0,.72) 42%,
    transparent 76%);
}

.rf-vignette {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%,
    transparent 26%,
    rgba(7,7,15,.08) 46%,
    rgba(7,7,15,.46) 66%,
    rgba(7,7,15,.86) 82%,
    #07070F 100%);
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
.nav {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 36px 0;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  animation: fadeDown .7s cubic-bezier(.16, 1, .3, 1) both .1s;
}

.logo-img {
  display: block;
  width: clamp(148px, 12vw, 210px);
  height: auto;
  object-fit: contain;
}

.nav-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  animation: fadeDown .7s cubic-bezier(.16, 1, .3, 1) both .2s;
}

.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: .035em;
  text-transform: uppercase;
  color: rgba(255,255,255,.66);
  transition: color .2s ease;
}

.nav-links a:hover {
  color: rgba(255,255,255,.95);
}

.nav-meta {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .10em;
  color: rgba(255,255,255,.28);
  width: 260px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
  white-space: nowrap;
}

/* ─────────────────────────────────────────────
   CENTRED HERO TYPE
───────────────────────────────────────────── */
.hero-copy {
  position: absolute;
  z-index: 20;
  left: 50%;
  top: 49%;
  transform: translate(-50%, -50%);
  width: min(980px, 88vw);
  text-align: center;
  pointer-events: none;
  animation: heroCopyIn .9s cubic-bezier(.16, 1, .3, 1) both .42s;
}

.hero-copy::before {
  content: '';
  position: absolute;
  inset: -130px -90px;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%,
    rgba(7,7,15,.34) 0%,
    rgba(7,7,15,.14) 42%,
    transparent 70%);
}

.hl {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(44px, 5.15vw, 86px);
  line-height: .96;
  letter-spacing: -.066em;
  color: #fff;
  text-shadow: 0 2px 50px rgba(0,0,0,.36);
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.hl span {
  display: block;
  white-space: nowrap;
}

.hl span:nth-child(2) {
  transform: translateX(18px);
}

.sub {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(255,255,255,.42);
  margin: 0 auto 24px;
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 100px;
  padding: 10px 22px;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -.01em;
  color: rgba(255,255,255,.68);
  text-decoration: none;
  cursor: pointer;
  transition: background .22s ease, border-color .22s ease, color .22s ease, transform .22s ease;
  pointer-events: all;
}

.btn-start:hover {
  background: rgba(255,255,255,.14);
  border-color: rgba(255,255,255,.28);
  color: rgba(255,255,255,.92);
  transform: translateY(-1px);
}

/* ─────────────────────────────────────────────
   SERVICE STACK
───────────────────────────────────────────── */
.service-stack {
  position: absolute;
  z-index: 20;
  bottom: 38px;
  left: 38px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: fadeUp .8s cubic-bezier(.16, 1, .3, 1) both .9s;
}

.service-item {
  font-family: var(--font-main);
  font-size: 15px;
  line-height: 1.45;
  letter-spacing: -.015em;
  color: rgba(255,255,255,.68);
}

.service-item-muted {
  color: rgba(255,255,255,.42);
}

/* ─────────────────────────────────────────────
   CIRCULAR SHOWREEL
───────────────────────────────────────────── */
.showreel-btn {
  position: absolute;
  right: 34px;
  bottom: 28px;
  z-index: 20;
  width: 96px;
  height: 96px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  animation: fadeUp .8s cubic-bezier(.16, 1, .3, 1) both 1s;
  transition: transform .26s ease;
}

.showreel-btn:hover {
  transform: scale(1.06);
}

.showreel-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  opacity: .72;
  animation: spinSlow 18s linear infinite;
  transition: opacity .26s ease;
}

.showreel-btn:hover .showreel-svg {
  opacity: .96;
}

.showreel-core {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.26);
  background: rgba(255,255,255,.10);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  transition: background .26s ease, border-color .26s ease;
}

.showreel-btn:hover .showreel-core {
  background: rgba(255,255,255,.22);
  border-color: rgba(255,255,255,.52);
}

.showreel-tri {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 9px;
  border-color: transparent transparent transparent rgba(255,255,255,.86);
  margin-left: 3px;
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(4,4,7,.92);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn .3s ease both;
  cursor: pointer;
}

.modal-box {
  position: relative;
  width: min(88vw, 1020px);
  aspect-ratio: 16 / 9;
  background: #04070C;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.08);
  overflow: hidden;
  cursor: default;
  box-shadow:
    0 0 0 1px rgba(232,93,36,.06),
    0 64px 120px rgba(0,0,0,.80),
    0 0 80px rgba(232,93,36,.08);
  animation: modalIn .4s cubic-bezier(.16,1,.3,1) both;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.54);
  font-family: monospace;
  font-size: 15px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .2s ease;
}

.modal-close:hover {
  background: rgba(255,255,255,.12);
  color: rgba(255,255,255,.88);
}

.video-modal-box {
  background: #02040A;
  padding: 0;
  overflow: hidden;
}

.reel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #02040A;
}

.video-overlay-top {
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 4;
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .14em;
  color: rgba(255,255,255,.54);
  text-transform: uppercase;
  pointer-events: none;
}

.video-overlay-top span:first-child::after {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  margin-left: 10px;
  border-radius: 50%;
  background: var(--orange);
  vertical-align: middle;
  box-shadow: 0 0 18px rgba(232,93,36,.65);
}

/* ─────────────────────────────────────────────
   CONTACT MODAL
───────────────────────────────────────────── */
.cm-scrim {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(4, 4, 10, .72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn .28s ease both;
}

.cm-panel {
  position: relative;
  width: min(780px, 96vw);
  max-height: 92vh;
  overflow-y: auto;
  background:
    radial-gradient(ellipse at 18% 0%, rgba(232,93,36,.14) 0%, transparent 34%),
    radial-gradient(ellipse at 86% 18%, rgba(92,150,255,.16) 0%, transparent 38%),
    rgba(14, 16, 28, .88);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 18px;
  padding: 44px 44px 36px;
  box-shadow:
    0 0 0 1px rgba(232,93,36,.06),
    0 48px 96px rgba(0,0,0,.72),
    inset 0 1px 0 rgba(255,255,255,.06);
  animation: modalIn .38s cubic-bezier(.16,1,.3,1) both;
  scrollbar-width: none;
}

.cm-panel::-webkit-scrollbar {
  display: none;
}

.cm-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 18px;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: .034;
  mix-blend-mode: overlay;
}

.cm-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 7px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  color: rgba(255,255,255,.42);
  font-family: monospace;
  font-size: 13px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
}

.cm-close:hover {
  background: rgba(255,255,255,.12);
  color: rgba(255,255,255,.82);
}

.cm-header,
.cm-form,
.cm-success {
  position: relative;
  z-index: 1;
}

.cm-header {
  margin-bottom: 32px;
}

.cm-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 10px;
}

.cm-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(30px, 4vw, 48px);
  letter-spacing: -.055em;
  line-height: .96;
  color: #fff;
}

.cm-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.cm-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.cm-field-full {
  margin-bottom: 14px;
}

.cm-label {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: rgba(255,255,255,.38);
}

.cm-optional {
  color: rgba(255,255,255,.20);
}

.cm-input,
.cm-select,
.cm-textarea {
  width: 100%;
  outline: none;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 8px;
  padding: 11px 14px;
  font-family: var(--font-main);
  font-size: 13px;
  color: rgba(255,255,255,.82);
  transition: border-color 200ms ease, background 200ms ease;
}

.cm-input::placeholder,
.cm-textarea::placeholder {
  color: rgba(255,255,255,.22);
}

.cm-input:focus,
.cm-select:focus,
.cm-textarea:focus {
  border-color: rgba(232,93,36,.50);
  background: rgba(255,255,255,.075);
}

.cm-select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6' fill='none' stroke='rgba(255,255,255,.32)' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 10px 6px;
}

.cm-select option {
  background: #0E1020;
  color: rgba(255,255,255,.82);
}

.cm-textarea {
  resize: vertical;
  min-height: 96px;
}

.cm-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.cm-footnote {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .08em;
  color: rgba(255,255,255,.24);
}

.cm-submit {
  background: var(--orange);
  border: none;
  border-radius: 8px;
  padding: 12px 26px;
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .02em;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  box-shadow: 0 4px 20px rgba(232,93,36,.28);
}

.cm-submit:hover {
  background: #ff7f45;
  transform: translateY(-1px);
  box-shadow: 0 6px 28px rgba(232,93,36,.40);
}

.cm-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 52px 24px 40px;
  gap: 16px;
  animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both;
}

.cm-success-ring {
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}

.cm-success-ring svg {
  width: 100%;
  height: 100%;
}

.cm-success-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(28px, 3.4vw, 42px);
  letter-spacing: -.05em;
  color: #fff;
}

.cm-success-sub {
  font-family: var(--font-main);
  font-size: 14px;
  color: rgba(255,255,255,.46);
  line-height: 1.5;
}

.cm-success-close {
  margin-top: 12px;
  background: transparent;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 8px;
  padding: 10px 24px;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 12px;
  color: rgba(255,255,255,.50);
  cursor: pointer;
  letter-spacing: .02em;
  transition: all 200ms ease;
}

.cm-success-close:hover {
  border-color: rgba(255,255,255,.26);
  color: rgba(255,255,255,.78);
}

/* ─────────────────────────────────────────────
   ANIMATION
───────────────────────────────────────────── */
@keyframes floatOrange {
  0%, 100% {
    transform: translate(-48%, -47%) scale(1);
    opacity: .95;
  }
  35% {
    transform: translate(-44%, -52%) scale(1.08);
    opacity: 1;
  }
  70% {
    transform: translate(-54%, -43%) scale(.94);
    opacity: .82;
  }
}

@keyframes floatBlue {
  0%, 100% {
    transform: translate(-60%, -44%) scale(1);
    opacity: .88;
  }
  45% {
    transform: translate(-64%, -48%) scale(1.10);
    opacity: 1;
  }
  74% {
    transform: translate(-54%, -40%) scale(.92);
    opacity: .76;
  }
}

@keyframes floatPink {
  0%, 100% {
    transform: translate(-20%, -53%) scale(1);
    opacity: .78;
  }
  50% {
    transform: translate(-12%, -58%) scale(1.16);
    opacity: .95;
  }
}

@keyframes floatCream {
  0%, 100% {
    transform: translate(-35%, -58%) scale(1);
    opacity: .72;
  }
  50% {
    transform: translate(-30%, -62%) scale(1.18);
    opacity: .95;
  }
}

@keyframes glassDrift {
  0%, 100% {
    transform: translate3d(-1.5%, 1%, 0) scale(1.02);
    opacity: .42;
  }
  45% {
    transform: translate3d(2%, -1.5%, 0) scale(1.06);
    opacity: .58;
  }
  72% {
    transform: translate3d(0%, 2%, 0) scale(.99);
    opacity: .50;
  }
}

@keyframes glassPulse {
  0%, 100% {
    transform: translate3d(-2%, 0, 0) scale(1);
    opacity: .68;
  }
  50% {
    transform: translate3d(3%, -2%, 0) scale(1.08);
    opacity: .96;
  }
}

@keyframes liquidFlow {
  0%, 100% {
    transform: translate(-52%, -50%) rotate(-5deg) scale(1);
    border-radius: 58% 42% 54% 46% / 46% 58% 42% 54%;
  }
  25% {
    transform: translate(-45%, -57%) rotate(8deg) scale(1.10);
    border-radius: 40% 60% 46% 54% / 62% 42% 58% 38%;
  }
  50% {
    transform: translate(-58%, -44%) rotate(-10deg) scale(.94);
    border-radius: 54% 46% 66% 34% / 38% 66% 34% 62%;
  }
  75% {
    transform: translate(-47%, -51%) rotate(6deg) scale(1.08);
    border-radius: 66% 34% 44% 56% / 54% 36% 64% 46%;
  }
}

@keyframes heroCopyIn {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 14px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ─────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav {
    padding: 22px 22px 0;
  }

  .logo-img {
    width: 150px;
  }

  .nav-links {
    display: none;
  }

  .nav-meta {
    width: auto;
    font-size: 7px;
  }

  .hero-copy {
    width: min(620px, 88vw);
    top: 48%;
  }

  .hl {
    font-size: clamp(42px, 10.5vw, 72px);
  }

  .hl span {
    white-space: normal;
  }

  .hl span:nth-child(2) {
    transform: none;
  }

  .service-stack {
    left: 24px;
    bottom: 28px;
  }

  .service-item {
    font-size: 13px;
  }

  .showreel-btn {
    right: 22px;
    bottom: 22px;
    width: 82px;
    height: 82px;
  }

  .showreel-core {
    width: 30px;
    height: 30px;
  }

  .cm-panel {
    padding: 32px 22px 28px;
  }

  .cm-row {
    grid-template-columns: 1fr;
  }

  .cm-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .cm-submit {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .nav-meta {
    display: none;
  }

  .service-stack {
    display: none;
  }

  .hero-copy {
    top: 49%;
  }

  .hl {
    font-size: clamp(38px, 12vw, 56px);
    letter-spacing: -.055em;
  }

  .sub {
    font-size: 8px;
  }

  .showreel-btn {
    width: 74px;
    height: 74px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rf-orange,
  .rf-blue,
  .rf-pink,
  .rf-cream,
  .rf-glass,
  .rf-glass::after,
  .rf-liquid,
  .showreel-svg,
  .hero-copy,
  .logo,
  .nav-right,
  .service-stack,
  .showreel-btn {
    animation: none !important;
  }
}
`

function ReelModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', h)

    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div
      className="modal-bg"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="BrandLift showreel"
    >
      <div
        className="modal-box video-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="reel-video"
          src="/brandlift-reel-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
        />

        <div className="video-overlay-top">
          <span>BRANDLIFT REEL</span>
          <span>2025</span>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close reel"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="cm-scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
    >
      <div className="cm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cm-grain" aria-hidden="true" />

        <button
          type="button"
          className="cm-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="cm-header">
              <span className="cm-eyebrow">New project</span>
              <h2 className="cm-title">Let’s build something.</h2>
            </div>

            <form className="cm-form" onSubmit={handleSubmit}>
              <div className="cm-row">
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-name">Name</label>
                  <input className="cm-input" id="cm-name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
                </div>

                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-company">Company / Brand</label>
                  <input className="cm-input" id="cm-company" name="company" type="text" placeholder="Company or brand" autoComplete="organization" />
                </div>
              </div>

              <div className="cm-row">
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-email">Email</label>
                  <input className="cm-input" id="cm-email" name="email" type="email" placeholder="you@brand.com" required autoComplete="email" />
                </div>

                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-phone">
                    Phone <span className="cm-optional">(optional)</span>
                  </label>
                  <input className="cm-input" id="cm-phone" name="phone" type="tel" placeholder="+90 000 000 0000" autoComplete="tel" />
                </div>
              </div>

              <div className="cm-row">
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-type">Project type</label>
                  <select className="cm-select" id="cm-type" name="type" defaultValue="">
                    <option value="" disabled>Select type</option>
                    <option>Brand Strategy</option>
                    <option>Campaign</option>
                    <option>Film / Motion</option>
                    <option>Social Content</option>
                    <option>Digital Experience</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-budget">Budget range</label>
                  <select className="cm-select" id="cm-budget" name="budget" defaultValue="">
                    <option value="" disabled>Select range</option>
                    <option>Under $5K</option>
                    <option>$5K – $15K</option>
                    <option>$15K – $50K</option>
                    <option>$50K+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="cm-field cm-field-full">
                <label className="cm-label" htmlFor="cm-message">Message</label>
                <textarea
                  className="cm-input cm-textarea"
                  id="cm-message"
                  name="message"
                  placeholder="Tell us about your project, timeline, goals..."
                  rows={4}
                />
              </div>

              <div className="cm-footer">
                <span className="cm-footnote">We respond within 24 hours.</span>
                <button type="submit" className="cm-submit">
                  Send request →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="cm-success">
            <div className="cm-success-ring" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="23" stroke="rgba(232,93,36,.35)" strokeWidth="1" />
                <path d="M14 24.5l7 7 13-14" stroke="#E85D24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="cm-success-title">Request received.</h2>
            <p className="cm-success-sub">We’ll get back to you shortly.</p>

            <button type="button" className="cm-success-close" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BrandLiftHero() {
  const [reel, setReel] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const metaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const date = now
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .toUpperCase()

      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      if (metaRef.current) {
        metaRef.current.textContent = `ISTANBUL · ${date} · ${time}`
      }
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="shell">
        <section className="stage">
          <div className="reel-field" aria-hidden="true">
            <div className="rf-blue" />
            <div className="rf-orange" />
            <div className="rf-pink" />
            <div className="rf-cream" />
            <div className="rf-band" />
            <div className="rf-glass" />
            <div className="rf-liquid" />
            <div className="rf-glass-mask" />
            <div className="rf-grain" />
            <div className="rf-vignette" />
          </div>

          <nav className="nav">
            <a href="/" className="logo" aria-label="BrandLift">
              <img
                src="/brandlift-logo.png"
                alt="BrandLift by Group DP"
                className="logo-img"
              />
            </a>

            <div className="nav-right">
              <ul className="nav-links">
                <li>
                  <a
                    href="https://www.instagram.com/brandlift.groupdp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>

              <span ref={metaRef} className="nav-meta" suppressHydrationWarning>
                ISTANBUL
              </span>
            </div>
          </nav>

          <div className="hero-copy">
            <h1 className="hl">
              <span>We don’t follow culture.</span>
              <span>We move it.</span>
            </h1>

            <p className="sub">Full-service creative agency</p>

            <button
              type="button"
              className="btn-start"
              onClick={() => setContactOpen(true)}
            >
              Start a project →
            </button>
          </div>

          <div className="service-stack" aria-label="Services">
            <span className="service-item">Art Direction</span>
            <span className="service-item">Development</span>
            <span className="service-item">Design</span>
            <span className="service-item service-item-muted">Strategy</span>
            <span className="service-item service-item-muted">Production</span>
          </div>

          <button
            className="showreel-btn"
            onClick={() => setReel(true)}
            aria-label="Play BrandLift showreel"
          >
            <svg viewBox="0 0 92 92" className="showreel-svg" aria-hidden="true">
              <defs>
                <path
                  id="sr-path"
                  d="M46,46 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                />
              </defs>

              <circle
                cx="46"
                cy="46"
                r="44"
                fill="none"
                stroke="rgba(255,255,255,.18)"
                strokeWidth="0.8"
              />

              <text
                fill="rgba(255,255,255,.76)"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5px',
                  letterSpacing: '.15em',
                }}
              >
                <textPath href="#sr-path" startOffset="0%">
                  PLAY SHOWREEL · PLAY SHOWREEL ·
                </textPath>
              </text>
            </svg>

            <span className="showreel-core" aria-hidden="true">
              <span className="showreel-tri" />
            </span>
          </button>
        </section>
      </main>

      {reel && <ReelModal onClose={() => setReel(false)} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  )
}