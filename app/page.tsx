'use client'

import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'

const MAP_ADDRESS =
  'Group DP, Eski Büyükdere Cad. Maslak İş Merkezi No: 37 Kat: 3 PK: 34398 Sarıyer İstanbul Türkiye'

const INSTAGRAM_URL = 'https://www.instagram.com/brandlift.groupdp/'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --black: #050507;
  --stage: #F5F3EF;
  --blue: #4A82C8;
  --orange: #E85D24;
  --white: #FFFFFF;
  --font-main: 'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'DM Mono', 'Courier New', monospace;
}

html { width: 100%; min-height: 100%; scroll-behavior: smooth; background: var(--black); }

body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--black);
  font-family: var(--font-main);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button, input, textarea, select { font: inherit; }

.page {
  width: 100%;
  overflow-x: hidden;
  background: var(--black);
}

/* FIXED NAV */
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 36px 0;
  pointer-events: none;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  pointer-events: all;
  animation: fadeDown .7s cubic-bezier(.16, 1, .3, 1) both .1s;
}

.logo-img-dark,
.logo-img-light {
  display: block;
  width: clamp(148px, 12vw, 210px);
  height: auto;
  object-fit: contain;
  transition: opacity .25s ease;
}

.logo-img-light {
  display: none;
}

body.logo-light .logo-img-dark {
  display: none;
}

body.logo-light .logo-img-light {
  display: block;
}

.nav-right {
  display: flex;
  align-items: center;
  animation: fadeDown .7s cubic-bezier(.16, 1, .3, 1) both .2s;
  pointer-events: all;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(5,5,10,.74);
  border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 18px 48px rgba(0,0,0,.14);
}

.nav-links a,
.nav-links button {
  text-decoration: none;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .035em;
  text-transform: uppercase;
  color: rgba(255,255,255,.70);
  transition: color .2s ease;
  background: transparent;
  border: 0;
  cursor: pointer;
  white-space: nowrap;
}

.nav-links a:hover,
.nav-links button:hover {
  color: rgba(255,255,255,.98);
}

/* HERO */
.shell {
  width: 100vw;
  min-height: 100vh;
  background: #f5f3ef;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
}

.stage {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f5f3ef;
}

.stage::before {
  content: '';
  position: absolute;
  inset: -6%;
  z-index: 0;
  pointer-events: none;
  background-image: url('/hero-abstract-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: scale(1.08) translate3d(0, 0, 0);
  animation: heroImageDrift 6s ease-in-out infinite;
  will-change: transform;
}

.stage::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: transparent;
}

.reel-field {
  display: none;
}

.hero-copy {
  position: absolute;
  z-index: 20;
  left: 50%;
  top: 49%;
  transform: translate(-50%, -50%);
  width: min(980px, 88vw);
  text-align: center;
  pointer-events: none;
}

.hero-copy::before {
  display: none;
}

.hl {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(44px, 5.15vw, 86px);
  line-height: .96;
  letter-spacing: -.066em;
  color: rgba(7,7,15,.92);
  text-shadow: 0 2px 46px rgba(255,255,255,.32);
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.hl span {
  display: block;
  white-space: nowrap;
  opacity: 0;
  will-change: transform, opacity;
}

.hl span:first-child {
  animation: wordInLeft .95s cubic-bezier(.16, 1, .3, 1) both .18s;
}

.hl span:nth-child(2) {
  transform: translateX(18px);
  color: rgba(7,7,15,.62);
  animation: wordInRight .95s cubic-bezier(.16, 1, .3, 1) both .34s;
}

.sub {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(7,7,15,.44);
  margin: 0 auto 24px;
  opacity: 0;
  animation: fadeUp .7s cubic-bezier(.16, 1, .3, 1) both .72s;
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(232,93,36,.92);
  border: 1px solid rgba(232,93,36,.42);
  border-radius: 100px;
  padding: 10px 22px;
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: -.01em;
  color: rgba(255,255,255,.96);
  text-decoration: none;
  cursor: pointer;
  transition: background .22s ease, border-color .22s ease, color .22s ease, transform .22s ease, box-shadow .22s ease;
  pointer-events: all;
  box-shadow: 0 14px 36px rgba(232,93,36,.22);
  opacity: 0;
  animation: fadeUp .7s cubic-bezier(.16, 1, .3, 1) both .88s;
}

.btn-start:hover {
  background: #ff7f45;
  border-color: rgba(232,93,36,.68);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 18px 46px rgba(232,93,36,.30);
}

/* ABSTRACT SECTIONS */
.abstract-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: clamp(72px, 9vh, 110px) clamp(44px, 8vw, 120px);
  scroll-margin-top: 0;
  background: #05050C;
}

.abstract-section::after {
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

.section-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: #07070F;
}

.section-field {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
  will-change: transform, opacity;
}

.section-field-a {
  width: 112vw;
  height: 92vh;
  left: 50%;
  top: 50%;
  transform: translate(-58%, -50%);
  filter: blur(92px);
  animation: sectionFloatA 22s ease-in-out infinite;
}

.section-field-b {
  width: 96vw;
  height: 84vh;
  left: 50%;
  top: 50%;
  transform: translate(-34%, -48%);
  filter: blur(88px);
  animation: sectionFloatB 26s ease-in-out infinite;
}

.section-field-c {
  width: 72vw;
  height: 64vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  filter: blur(72px);
  animation: sectionFloatC 19s ease-in-out infinite;
}

.section-field-d {
  width: 54vw;
  height: 46vh;
  left: 50%;
  top: 50%;
  transform: translate(-48%, -62%);
  filter: blur(58px);
  animation: sectionFloatD 16s ease-in-out infinite;
}

/* WORKS BACKGROUND */
.works .section-bg {
  background-image:
    linear-gradient(180deg, rgba(5, 5, 7, .42), rgba(5, 5, 7, .78)),
    url('/works-bg.jpeg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.works .section-field,
.works .section-liquid {
  display: none;
}

.works .section-soft-mask {
  background:
    radial-gradient(ellipse at 50% 52%,
      rgba(0,0,0,0) 0%,
      rgba(5,5,7,.18) 48%,
      rgba(5,5,7,.72) 100%);
}

.works .section-vignette {
  background:
    linear-gradient(180deg, rgba(5,5,7,.72) 0%, transparent 18%, transparent 78%, rgba(5,5,7,.82) 100%),
    radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,7,.48) 72%, #050507 100%);
}

/* SERVICES BACKGROUND */
.services .section-bg {
  background: #ebe9ff;
}

.services .section-bg::before {
  content: '';
  position: absolute;
  inset: -7%;
  z-index: 0;
  background-image: url('/services-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: scale(1.06) translate3d(0, 0, 0);
  animation: servicesBgDrift 7s ease-in-out infinite;
  will-change: transform;
}

.services .section-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(235,233,255,.10) 0%, rgba(235,233,255,.00) 48%, rgba(235,233,255,.08) 100%),
    radial-gradient(ellipse at 24% 50%, rgba(235,233,255,.44) 0%, rgba(235,233,255,.16) 42%, transparent 72%);
}

.services .section-field,
.services .section-liquid,
.services .section-soft-mask,
.services .section-vignette {
  display: none;
}

.about .section-field-a {
  background: radial-gradient(ellipse at 50% 50%, rgba(56,92,210,.44) 0%, rgba(42,68,170,.24) 38%, rgba(20,32,92,.12) 62%, transparent 80%);
}

.about .section-field-b {
  background: radial-gradient(ellipse at 50% 50%, rgba(255,126,47,.34) 0%, rgba(232,93,36,.18) 42%, transparent 78%);
}

.about .section-field-c {
  background: radial-gradient(ellipse at 50% 50%, rgba(168,205,255,.28) 0%, rgba(92,150,255,.12) 48%, transparent 80%);
}

.about .section-field-d {
  background: radial-gradient(ellipse at 50% 50%, rgba(226,55,140,.22) 0%, rgba(192,40,108,.09) 50%, transparent 76%);
}

.contact .section-field-a {
  background: radial-gradient(ellipse at 50% 50%, rgba(92,150,255,.50) 0%, rgba(56,90,245,.26) 38%, rgba(26,44,180,.10) 62%, transparent 80%);
}

.contact .section-field-b {
  background: radial-gradient(ellipse at 50% 50%, rgba(255,106,24,.40) 0%, rgba(232,93,36,.20) 42%, transparent 78%);
}

.contact .section-field-c {
  background: radial-gradient(ellipse at 50% 50%, rgba(194,78,255,.28) 0%, rgba(132,58,210,.12) 48%, transparent 80%);
}

.contact .section-field-d {
  background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.14) 0%, rgba(255,255,255,.05) 48%, transparent 74%);
}

.section-liquid {
  position: absolute;
  z-index: 4;
  width: 42vw;
  height: 42vw;
  min-width: 420px;
  min-height: 420px;
  max-width: 760px;
  max-height: 760px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 58% 42% 54% 46% / 46% 58% 42% 54%;
  background:
    radial-gradient(circle at 28% 22%, rgba(255,255,255,.42) 0%, rgba(255,255,255,.13) 14%, transparent 30%),
    radial-gradient(circle at 68% 64%, rgba(92,150,255,.42) 0%, rgba(92,150,255,.16) 34%, transparent 62%),
    radial-gradient(circle at 38% 72%, rgba(232,93,36,.28) 0%, rgba(232,93,36,.10) 38%, transparent 66%),
    linear-gradient(135deg, rgba(240,248,255,.28) 0%, rgba(168,205,255,.28) 28%, rgba(80,138,255,.24) 54%, rgba(232,93,36,.18) 82%, rgba(255,255,255,.12) 100%);
  filter: blur(10px);
  opacity: .34;
  mix-blend-mode: screen;
  animation: sectionLiquidFlow 18s ease-in-out infinite;
  box-shadow:
    inset 24px 24px 80px rgba(255,255,255,.10),
    inset -48px -42px 120px rgba(30,60,180,.16),
    0 0 120px rgba(95,150,255,.14);
}

.section-soft-mask {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%, transparent 0%, transparent 44%, rgba(7,7,15,.18) 66%, rgba(7,7,15,.64) 86%, #07070F 100%);
}

.section-vignette {
  position: absolute;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(7,7,15,.72) 0%, transparent 16%, transparent 82%, rgba(7,7,15,.72) 100%),
    radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(7,7,15,.42) 72%, #07070F 100%);
}

.svc-inner,
.about-inner,
.contact-inner,
.works-inner {
  position: relative;
  z-index: 12;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
}

/* WORKS */
.works-grid {
  display: grid;
  grid-template-columns: .88fr 1.12fr;
  gap: clamp(56px, 7vw, 96px);
  align-items: center;
}

.works-copy-block {
  border-top: 1px solid rgba(255,255,255,.07);
  padding-top: clamp(26px, 4vh, 38px);
}

.works-kicker {
  display: block;
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 30px;
}

.works-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(46px, 5vw, 78px);
  line-height: .94;
  letter-spacing: -.07em;
  color: #fff;
  margin-bottom: 28px;
}

.works-title span {
  display: block;
}

.works-title-muted {
  color: rgba(255,255,255,.36);
}

.works-copy {
  max-width: 520px;
  font-size: clamp(15px, 1.18vw, 18px);
  line-height: 1.5;
  letter-spacing: -.018em;
  color: rgba(255,255,255,.58);
}

.works-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.works-primary,
.works-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 999px;
  padding: 11px 22px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  cursor: pointer;
  transition: transform .22s ease, background .22s ease, border-color .22s ease, color .22s ease;
}

.works-primary {
  background: rgba(232,93,36,.92);
  border: 1px solid rgba(232,93,36,.54);
  color: #fff;
  box-shadow: 0 12px 34px rgba(232,93,36,.22);
}

.works-secondary {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.13);
  color: rgba(255,255,255,.68);
}

.works-primary:hover,
.works-secondary:hover {
  transform: translateY(-2px);
}

/* BRANDLIFT WORKS MOCKUP */
.works-mockup {
  position: relative;
  height: min(590px, 66vh);
  min-height: 520px;
  width: 100%;
  isolation: isolate;
  transform: translateX(16px);
}

.mock-glow {
  position: absolute;
  inset: 4% -6% 2% -6%;
  z-index: 0;
  border-radius: 42px;
  background:
    radial-gradient(ellipse at 62% 24%, rgba(112, 82, 255, .42) 0%, transparent 42%),
    radial-gradient(ellipse at 24% 78%, rgba(232, 93, 36, .26) 0%, transparent 44%),
    radial-gradient(ellipse at 74% 78%, rgba(74,130,200,.30) 0%, transparent 42%);
  filter: blur(38px);
  opacity: .84;
}

.mock-shadow {
  position: absolute;
  left: 50%;
  bottom: 22px;
  width: 74%;
  height: 70px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.48) 0%, rgba(0,0,0,.20) 46%, transparent 74%);
  filter: blur(24px);
  z-index: 0;
}

.bl-feed-card {
  position: absolute;
  z-index: 3;
  left: 10%;
  top: 9%;
  width: min(470px, 82%);
  height: 520px;
  transform: rotate(-8deg);
  border-radius: 34px;
  overflow: hidden;
  background: rgba(18, 15, 48, .92);
  border: 1px solid rgba(180,160,255,.24);
  box-shadow:
    0 42px 110px rgba(0,0,0,.52),
    0 0 0 1px rgba(255,255,255,.04) inset,
    0 0 80px rgba(102,80,255,.18);
}

.bl-feed-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 80% 10%, rgba(120,92,255,.42) 0%, transparent 38%),
    radial-gradient(ellipse at 14% 92%, rgba(232,93,36,.28) 0%, transparent 42%),
    linear-gradient(135deg, #090812 0%, #151340 52%, #080811 100%);
}

.bl-feed-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.045) 0px, rgba(255,255,255,.045) 1px, transparent 1px, transparent 4px);
  opacity: .24;
  mix-blend-mode: screen;
}

.feed-topbar {
  position: relative;
  z-index: 2;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background: rgba(10,9,26,.58);
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.feed-profile {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #fff;
}

.feed-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -.05em;
  color: #fff;
  background:
    radial-gradient(circle at 34% 30%, rgba(255,255,255,.34), transparent 28%),
    linear-gradient(135deg, #4A82C8 0%, #E85D24 52%, #ff4f8a 100%);
  box-shadow: 0 0 0 3px rgba(255,255,255,.10), 0 0 28px rgba(232,93,36,.28);
}

.feed-profile strong {
  font-size: 17px;
  letter-spacing: -.02em;
}

.feed-menu {
  color: rgba(255,255,255,.86);
  font-size: 28px;
  line-height: 1;
  transform: translateY(-3px);
}

.feed-visual {
  position: relative;
  z-index: 1;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 44px;
}

.feed-visual h3 {
  position: relative;
  z-index: 2;
  font-size: clamp(42px, 4.2vw, 62px);
  line-height: .94;
  letter-spacing: -.065em;
  text-align: center;
  color: rgba(255,255,255,.94);
  text-shadow: 0 0 42px rgba(126,82,255,.34);
}

.feed-visual h3 span {
  display: block;
  color: rgba(136,110,255,.88);
}

.feed-orbit {
  position: absolute;
  inset: 42px;
  border-radius: 34px;
  background:
    radial-gradient(ellipse at 78% 20%, rgba(126,82,255,.42), transparent 45%),
    radial-gradient(ellipse at 18% 85%, rgba(232,93,36,.30), transparent 45%),
    rgba(255,255,255,.035);
  border: 1px solid rgba(255,255,255,.06);
}

.feed-flare {
  position: absolute;
  width: 90px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.92), transparent);
  box-shadow: 0 0 22px rgba(126,82,255,.9), 0 0 42px rgba(126,82,255,.46);
  transform: rotate(-18deg);
}

.feed-flare-1 {
  left: -16px;
  top: 148px;
}

.feed-flare-2 {
  right: -16px;
  bottom: 120px;
}

.feed-actions {
  position: relative;
  z-index: 3;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  color: rgba(255,255,255,.88);
  background: rgba(255,255,255,.055);
  border-top: 1px solid rgba(255,255,255,.08);
}

.feed-actions-left {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 36px;
}

.feed-heart {
  color: #E85D24;
  text-shadow: 0 0 24px rgba(232,93,36,.55);
}

.feed-dots {
  display: flex;
  align-items: center;
  gap: 7px;
}

.feed-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.42);
}

.feed-dots span:first-child {
  background: rgba(126,82,255,.95);
}

.feed-save {
  font-size: 38px;
}

.side-card {
  position: absolute;
  z-index: 2;
  width: 250px;
  height: 270px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(20,18,45,.72);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: 0 32px 80px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.08);
  opacity: .72;
}

.side-card-left {
  left: -2%;
  top: 26%;
  transform: rotate(-13deg);
}

.side-card-right {
  right: 0;
  bottom: 12%;
  transform: rotate(13deg);
}

.side-card-inner {
  position: absolute;
  inset: 0;
  padding: 28px;
  background:
    radial-gradient(ellipse at 72% 18%, rgba(126,82,255,.28), transparent 46%),
    radial-gradient(ellipse at 14% 86%, rgba(232,93,36,.22), transparent 50%),
    linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
}

.side-card-inner h4 {
  font-size: 28px;
  line-height: .95;
  letter-spacing: -.06em;
  color: rgba(255,255,255,.80);
}

.side-card-ui {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,.62);
  font-size: 23px;
}

/* SERVICES */
.svc-head {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 34px;
  align-items: start;
  margin-bottom: clamp(42px, 6vh, 58px);
  padding-bottom: clamp(34px, 5vh, 46px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.svc-tag {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
}

.svc-tag-label,
.about-kicker,
.contact-kicker {
  display: block;
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--orange);
}

.svc-tag-index {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .10em;
  color: rgba(255,255,255,.18);
  margin-top: 6px;
}

.svc-statement {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(36px, 4.4vw, 64px);
  line-height: .94;
  letter-spacing: -.066em;
  color: #FFFFFF;
}

.svc-statement em {
  font-style: normal;
  color: rgba(255,255,255,.38);
}

.svc-rows {
  display: flex;
  flex-direction: column;
}

.svc-row {
  position: relative;
  display: grid;
  grid-template-columns: 180px 1fr 1.05fr;
  gap: 34px;
  align-items: center;
  padding: clamp(18px, 2.4vh, 26px) 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
}

.svc-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.svc-row:last-child {
  border-bottom: none;
}

.svc-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  bottom: 18px;
  width: 1px;
  background: var(--orange);
  opacity: 0;
  transition: opacity 300ms ease;
}

.svc-row:hover::before {
  opacity: .50;
}

.svc-num {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .10em;
  color: rgba(255,255,255,.20);
}

.svc-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(18px, 1.45vw, 23px);
  line-height: 1.08;
  letter-spacing: -.05em;
  color: rgba(255,255,255,.90);
}

.svc-body {
  font-family: var(--font-main);
  font-size: clamp(12px, .95vw, 14px);
  line-height: 1.52;
  color: rgba(255,255,255,.34);
  max-width: 390px;
}

/* SERVICES LIGHT TEXT */
.services .svc-head {
  border-bottom-color: rgba(7,7,15,.10);
}

.services .svc-statement {
  color: rgba(7,7,15,.92);
}

.services .svc-statement em {
  color: rgba(7,7,15,.42);
}

.services .svc-tag-index {
  color: rgba(7,7,15,.30);
}

.services .svc-row {
  border-bottom-color: rgba(7,7,15,.08);
}

.services .svc-num {
  color: rgba(7,7,15,.26);
}

.services .svc-title {
  color: rgba(7,7,15,.86);
}

.services .svc-body {
  color: rgba(7,7,15,.48);
}

/* ABOUT */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(52px, 7vw, 96px);
  align-items: start;
}

.about-block {
  border-top: 1px solid rgba(255,255,255,.07);
  padding-top: clamp(26px, 4vh, 38px);
}

.about-kicker {
  margin-bottom: 28px;
}

.about-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(42px, 5vw, 76px);
  line-height: .94;
  letter-spacing: -.068em;
  color: #fff;
  margin-bottom: 26px;
}

.about-title span {
  display: block;
}

.about-title-muted {
  color: rgba(255,255,255,.36);
}

.about-copy {
  font-family: var(--font-main);
  font-size: clamp(15px, 1.25vw, 18px);
  line-height: 1.55;
  letter-spacing: -.018em;
  color: rgba(255,255,255,.48);
  max-width: 480px;
}

.about-copy strong {
  font-weight: 500;
  color: rgba(255,255,255,.88);
}

.about-thinking {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 44px;
}

.about-thinking-line {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(28px, 3.2vw, 48px);
  line-height: .98;
  letter-spacing: -.058em;
  color: rgba(255,255,255,.92);
}

.about-thinking-line:nth-child(2) {
  transform: translateX(34px);
  color: rgba(255,255,255,.70);
}

.about-thinking-line:nth-child(3) {
  transform: translateX(72px);
  color: rgba(255,255,255,.48);
}

.about-system {
  font-family: var(--font-main);
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.5;
  letter-spacing: -.018em;
  color: rgba(255,255,255,.46);
  max-width: 440px;
  margin-left: 72px;
}

.about-services {
  margin-top: clamp(72px, 10vh, 108px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255,255,255,.07);
  border-bottom: 1px solid rgba(255,255,255,.07);
}

.about-service {
  min-height: 132px;
  padding: 26px 24px;
  border-right: 1px solid rgba(255,255,255,.06);
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
}

.about-service:last-child {
  border-right: none;
}

.about-service::before {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 1px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 360ms cubic-bezier(.16,1,.3,1);
}

.about-service:hover::before {
  transform: scaleX(1);
}

.about-service span {
  font-family: var(--font-mono);
  font-size: clamp(10px, .85vw, 12px);
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,.54);
  transition: color 260ms ease;
}

.about-service:hover span {
  color: rgba(255,255,255,.88);
}

/* CONTACT */
.contact-grid {
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: clamp(52px, 7vw, 96px);
  align-items: center;
}

.contact-copy-block {
  border-top: 1px solid rgba(255,255,255,.07);
  padding-top: clamp(26px, 4vh, 38px);
}

.contact-kicker {
  margin-bottom: 30px;
}

.contact-title {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: clamp(42px, 5vw, 78px);
  line-height: .94;
  letter-spacing: -.07em;
  color: #fff;
  margin-bottom: 30px;
}

.contact-title span {
  display: block;
}

.contact-title-muted {
  color: rgba(255,255,255,.36);
}

.contact-copy {
  max-width: 480px;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.55;
  letter-spacing: -.018em;
  color: rgba(255,255,255,.48);
}

.contact-copy strong {
  font-weight: 500;
  color: rgba(255,255,255,.88);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.contact-primary,
.contact-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 999px;
  padding: 11px 22px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  cursor: pointer;
  transition: transform .22s ease, background .22s ease, border-color .22s ease, color .22s ease;
}

.contact-primary {
  background: rgba(232,93,36,.86);
  border: 1px solid rgba(232,93,36,.54);
  color: #fff;
  box-shadow: 0 12px 34px rgba(232,93,36,.20);
}

.contact-secondary {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.13);
  color: rgba(255,255,255,.70);
}

.contact-primary:hover,
.contact-secondary:hover {
  transform: translateY(-2px);
}

/* MAP */
.contact-map-card {
  position: relative;
  min-height: clamp(420px, 52vh, 560px);
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  background:
    radial-gradient(ellipse at 18% 18%, rgba(255,255,255,.08) 0%, transparent 34%),
    radial-gradient(ellipse at 78% 70%, rgba(92,150,255,.18) 0%, transparent 48%),
    rgba(7,7,15,.72);
  box-shadow:
    0 34px 90px rgba(0,0,0,.42),
    inset 0 1px 0 rgba(255,255,255,.06);
}

.map-visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(118,138,255,.16) 0%, transparent 54%),
    linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,0));
}

.map-svg {
  position: absolute;
  inset: -5%;
  width: 110%;
  height: 110%;
  opacity: .92;
}

.map-road {
  fill: none;
  stroke: rgba(255,255,255,.13);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.map-road-main {
  stroke: url(#roadGlow);
  stroke-width: 15;
  opacity: .88;
}

.map-road.thin {
  stroke-width: 4;
  opacity: .56;
}

.map-node {
  fill: rgba(255,255,255,.22);
  stroke: rgba(255,255,255,.22);
  stroke-width: 8;
}

.map-pin circle:first-child {
  fill: rgba(232,93,36,.20);
  stroke: rgba(232,93,36,.72);
  stroke-width: 2;
}

.map-pin circle:last-child {
  fill: #E85D24;
  stroke: rgba(255,255,255,.76);
  stroke-width: 2;
}

.map-label {
  font-family: var(--font-mono);
  letter-spacing: .12em;
  text-transform: uppercase;
  fill: rgba(255,255,255,.50);
}

.map-label.main {
  font-size: 17px;
  fill: rgba(255,255,255,.82);
  font-weight: 500;
}

.map-label.sub {
  font-size: 8px;
  fill: rgba(255,255,255,.38);
}

.map-label.road {
  font-size: 10px;
  fill: rgba(255,255,255,.28);
}

.map-label.road.muted {
  fill: rgba(255,255,255,.18);
}

.map-grid {
  position: absolute;
  inset: 0;
  opacity: .10;
  background-image:
    linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 0%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 0%, transparent 72%);
}

.map-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 55%, transparent 0%, rgba(5,5,12,.12) 44%, rgba(5,5,12,.76) 100%),
    linear-gradient(180deg, rgba(5,5,12,.22), rgba(5,5,12,.70));
}

.map-topline {
  position: absolute;
  left: 28px;
  right: 28px;
  top: 24px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.map-topline span,
.map-topline a {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.map-topline span {
  color: var(--orange);
}

.map-topline a {
  color: rgba(255,255,255,.58);
  text-decoration: none;
  transition: color .22s ease;
}

.map-topline a:hover {
  color: rgba(255,255,255,.92);
}

.map-address-card {
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 28px;
  z-index: 3;
  padding: 24px 26px;
  border-radius: 18px;
  background: rgba(5,5,12,.72);
  border: 1px solid rgba(255,255,255,.10);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 22px 60px rgba(0,0,0,.34),
    inset 0 1px 0 rgba(255,255,255,.06);
}

.map-address-card span {
  display: block;
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 12px;
}

.map-address-card p {
  font-family: var(--font-main);
  font-size: clamp(15px, 1.15vw, 18px);
  line-height: 1.55;
  letter-spacing: -.018em;
  color: rgba(255,255,255,.76);
}

/* MODALS */
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
  padding: 18px;
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

/* CONTACT MODAL */
.cm-scrim {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(4, 4, 10, .76);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn .28s ease both;
}

.cm-panel {
  position: relative;
  width: min(760px, 96vw);
  max-height: 92vh;
  overflow-y: auto;
  background:
    radial-gradient(ellipse at 18% 0%, rgba(232,93,36,.24) 0%, transparent 34%),
    radial-gradient(ellipse at 86% 18%, rgba(92,150,255,.22) 0%, transparent 38%),
    radial-gradient(ellipse at 50% 105%, rgba(226,55,140,.11) 0%, transparent 48%),
    rgba(7, 7, 15, .92);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 22px;
  padding: 42px 42px 34px;
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
  border-radius: 22px;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: .04;
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
  margin-bottom: 30px;
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
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 10px;
  padding: 12px 14px;
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
  border-color: rgba(232,93,36,.52);
  background: rgba(255,255,255,.085);
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
  min-height: 108px;
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
  background: rgba(232,93,36,.92);
  border: 1px solid rgba(232,93,36,.44);
  border-radius: 999px;
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
  border-radius: 999px;
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

/* FIXED CONTROLS */
.showreel-btn {
  position: relative;
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

.floating-showreel {
  position: fixed;
  left: 28px;
  bottom: 28px;
  z-index: 80;
}

.back-top-btn {
  position: fixed;
  right: 34px;
  bottom: 34px;
  z-index: 80;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-family: var(--font-main);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform .22s ease, background .22s ease, border-color .22s ease, color .22s ease;
}

.back-top-btn:hover {
  transform: translateY(-3px);
  background: rgba(255,255,255,.12);
  border-color: rgba(255,255,255,.28);
  color: #fff;
}

/* ANIMATION */
@keyframes heroImageDrift {
  0% { transform: scale(1.08) translate3d(0, 0, 0); }
  25% { transform: scale(1.12) translate3d(-3.5%, 2.5%, 0); }
  50% { transform: scale(1.10) translate3d(3.5%, -2.5%, 0); }
  75% { transform: scale(1.13) translate3d(-2.5%, -3%, 0); }
  100% { transform: scale(1.08) translate3d(0, 0, 0); }
}

@keyframes servicesBgDrift {
  0% { transform: scale(1.06) translate3d(0, 0, 0); }
  25% { transform: scale(1.095) translate3d(-1.8%, 1.2%, 0); }
  50% { transform: scale(1.08) translate3d(1.6%, -1.5%, 0); }
  75% { transform: scale(1.105) translate3d(-1.2%, -1.1%, 0); }
  100% { transform: scale(1.06) translate3d(0, 0, 0); }
}

@keyframes wordInLeft {
  from {
    opacity: 0;
    transform: translate3d(-42px, 20px, 0) scale(.985);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

@keyframes wordInRight {
  from {
    opacity: 0;
    transform: translate3d(58px, 24px, 0) scale(.985);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translate3d(18px, 0, 0) scale(1);
    filter: blur(0);
  }
}

@keyframes sectionFloatA {
  0%, 100% { transform: translate(-58%, -50%) scale(1); opacity: .68; }
  38% { transform: translate(-52%, -56%) scale(1.10); opacity: .88; }
  72% { transform: translate(-64%, -44%) scale(.96); opacity: .58; }
}

@keyframes sectionFloatB {
  0%, 100% { transform: translate(-34%, -48%) scale(1); opacity: .64; }
  44% { transform: translate(-40%, -54%) scale(1.12); opacity: .86; }
  76% { transform: translate(-28%, -42%) scale(.94); opacity: .56; }
}

@keyframes sectionFloatC {
  0%, 100% { transform: translate(-50%, -30%) scale(1); opacity: .52; }
  50% { transform: translate(-44%, -36%) scale(1.16); opacity: .72; }
}

@keyframes sectionFloatD {
  0%, 100% { transform: translate(-48%, -62%) scale(1); opacity: .42; }
  50% { transform: translate(-42%, -66%) scale(1.20); opacity: .66; }
}

@keyframes sectionLiquidFlow {
  0%, 100% {
    border-radius: 58% 42% 54% 46% / 46% 58% 42% 54%;
    transform: translate(-50%, -50%) rotate(-4deg) scale(1);
  }
  25% {
    border-radius: 42% 58% 46% 54% / 60% 44% 56% 40%;
    transform: translate(-46%, -54%) rotate(7deg) scale(1.06);
  }
  50% {
    border-radius: 54% 46% 66% 34% / 38% 66% 34% 62%;
    transform: translate(-55%, -46%) rotate(-8deg) scale(.96);
  }
  75% {
    border-radius: 66% 34% 44% 56% / 54% 36% 64% 46%;
    transform: translate(-47%, -51%) rotate(5deg) scale(1.05);
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .works-grid {
    grid-template-columns: .9fr 1fr;
    gap: 48px;
  }

  .works-mockup {
    transform: translateX(8px) scale(.92);
    transform-origin: center right;
  }
}

@media (max-width: 900px) {
  .site-nav {
    padding: 22px 22px 0;
    align-items: flex-start;
  }

  .logo-img-dark,
  .logo-img-light {
    width: 150px;
  }

  .nav-links {
    gap: 16px;
    padding: 9px 12px;
  }

  .nav-links a,
  .nav-links button {
    font-size: 11px;
  }

  .works-grid,
  .svc-head,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .works-mockup {
    max-width: 620px;
    margin: 0 auto;
    transform: scale(.88);
    transform-origin: center center;
  }

  .svc-tag {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding-top: 0;
  }

  .svc-row {
    grid-template-columns: 60px 1fr;
    gap: 20px;
  }

  .svc-body {
    grid-column: 2;
    max-width: 100%;
  }

  .about-thinking-line:nth-child(2),
  .about-thinking-line:nth-child(3),
  .about-system {
    transform: none;
    margin-left: 0;
  }

  .about-services {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-service:nth-child(2) {
    border-right: none;
  }

  .about-service:nth-child(1),
  .about-service:nth-child(2) {
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
}

@media (max-width: 768px) {
  .site-nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 18px 18px 0;
  }

  .logo-img-dark,
  .logo-img-light {
    width: 142px;
  }

  .nav-right {
    width: 100%;
  }

  .nav-links {
    width: 100%;
    justify-content: space-between;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .nav-links a,
  .nav-links button {
    font-size: 10px;
    letter-spacing: .025em;
  }

  .hero-copy {
    width: min(620px, 88vw);
    top: 51%;
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

  @keyframes wordInRight {
    from {
      opacity: 0;
      transform: translate3d(42px, 24px, 0) scale(.985);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }
  }

  .works-mockup {
    height: 570px;
    min-height: 570px;
    transform: scale(.78);
  }

  .showreel-btn {
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

  .floating-showreel {
    left: 18px;
    bottom: 18px;
  }

  .back-top-btn {
    right: 22px;
    bottom: 22px;
    width: 38px;
    height: 38px;
  }

  .contact-map-card {
    min-height: 420px;
    border-radius: 22px;
  }

  .map-topline {
    left: 22px;
    right: 22px;
    top: 20px;
  }

  .map-address-card {
    left: 22px;
    right: 22px;
    bottom: 22px;
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .abstract-section {
    padding: 118px 24px 86px;
    align-items: flex-start;
  }

  .works-title,
  .about-title,
  .contact-title {
    font-size: clamp(38px, 12vw, 58px);
  }

  .works-mockup {
    height: 500px;
    min-height: 500px;
    transform: scale(.64);
    transform-origin: center top;
  }

  .services {
    padding-top: 126px;
  }

  .svc-head {
    margin-bottom: 42px;
    padding-bottom: 36px;
  }

  .svc-row {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 22px 0;
  }

  .svc-num {
    display: none;
  }

  .svc-body {
    padding-top: 0;
    grid-column: auto;
  }

  .about-services {
    grid-template-columns: 1fr;
  }

  .about-service {
    min-height: 96px;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }

  .about-service:last-child {
    border-bottom: none;
  }

  .contact-map-card {
    min-height: 400px;
    border-radius: 18px;
  }

  .map-address-card {
    left: 16px;
    right: 16px;
    bottom: 16px;
    padding: 16px;
  }

  .map-topline {
    left: 16px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .hero-copy {
    top: 52%;
  }

  .hl {
    font-size: clamp(38px, 12vw, 56px);
    letter-spacing: -.055em;
  }

  .sub {
    font-size: 8px;
  }

  .works-mockup {
    transform: scale(.54);
    height: 430px;
    min-height: 430px;
  }

  .showreel-btn {
    width: 74px;
    height: 74px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage::before,
  .services .section-bg::before,
  .section-field,
  .section-liquid,
  .showreel-svg,
  .hero-copy,
  .logo,
  .nav-right,
  .showreel-btn,
  .hl span,
  .sub,
  .btn-start {
    animation: none !important;
    opacity: 1 !important;
    filter: none !important;
  }
}
`

function SectionBackground() {
  return (
    <div className="section-bg" aria-hidden="true">
      <div className="section-field section-field-a" />
      <div className="section-field section-field-b" />
      <div className="section-field section-field-c" />
      <div className="section-field section-field-d" />
      <div className="section-liquid" />
      <div className="section-soft-mask" />
      <div className="section-vignette" />
    </div>
  )
}

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
      <div className="modal-box video-modal-box" onClick={(e) => e.stopPropagation()}>
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

        <button type="button" className="modal-close" onClick={onClose} aria-label="Close reel">
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="cm-scrim" onClick={onClose} role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="cm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cm-grain" aria-hidden="true" />

        <button type="button" className="cm-close" onClick={onClose} aria-label="Close">
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

              <div className="cm-field cm-field-full">
                <label className="cm-label" htmlFor="cm-type">Project type</label>
                <select className="cm-select" id="cm-type" name="type" defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option>Brand Strategy</option>
                  <option>Campaign</option>
                  <option>Film / Motion</option>
                  <option>Social Content</option>
                  <option>Digital Experience</option>
                  <option>Influencer Marketing</option>
                  <option>Other</option>
                </select>
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

function WorksSection() {
  return (
    <section id="works" className="abstract-section works">
      <SectionBackground />

      <div className="works-inner">
        <div className="works-grid">
          <div className="works-copy-block">
            <span className="works-kicker">Works</span>

            <h2 className="works-title">
              <span>Ideas built for feeds,</span>
              <span className="works-title-muted">not folders.</span>
            </h2>

            <p className="works-copy">
              Selected work, campaign thinking and social-first brand moments.
            </p>

            <div className="works-actions">
              <a className="works-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                View on Instagram →
              </a>

              <a className="works-secondary" href="#services">
                Explore services
              </a>
            </div>
          </div>

          <div className="works-mockup" aria-label="BrandLift Instagram work preview">
            <div className="mock-glow" />
            <div className="mock-shadow" />

            <div className="side-card side-card-left">
              <div className="side-card-inner">
                <h4>
                  Brand
                  <br /> systems
                </h4>
              </div>
              <div className="side-card-ui">
                <span>♡</span>
                <span>⌕</span>
                <span>↗</span>
                <span>□</span>
              </div>
            </div>

            <div className="bl-feed-card">
              <div className="feed-topbar">
                <div className="feed-profile">
                  <div className="feed-avatar">BL</div>
                  <strong>BrandLift - Social system</strong>
                </div>
                <div className="feed-menu">⋮</div>
              </div>

              <div className="feed-visual">
                <div className="feed-orbit" />
                <div className="feed-flare feed-flare-1" />
                <div className="feed-flare feed-flare-2" />
                <h3>
                  <span>Culture</span>
                  moves when
                  <br /> ideas do.
                </h3>
              </div>

              <div className="feed-actions">
                <div className="feed-actions-left">
                  <span className="feed-heart">♥</span>
                  <span>♡</span>
                  <span>↗</span>
                </div>
                <div className="feed-dots">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="feed-save">□</div>
              </div>
            </div>

            <div className="side-card side-card-right">
              <div className="side-card-inner">
                <h4>
                  Feed-first
                  <br /> campaigns
                </h4>
              </div>
              <div className="side-card-ui">
                <span>♡</span>
                <span>⌕</span>
                <span>↗</span>
                <span>□</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${i * 100}ms`
            el.classList.add('visible')
            observer.disconnect()
          }
        },
        { threshold: 0.15 }
      )

      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const rows = [
    { num: '01', title: 'We See What Others Miss.', body: 'We find the invisible truth in the space everyone is already looking at.' },
    { num: '02', title: 'We Build Systems, Not Campaigns.', body: 'Not short-term ads, but structures designed to grow with the brand.' },
    { num: '03', title: 'We Shape Perception, Not Media Plans.', body: 'We don’t just spend budgets. We make brands impossible to ignore.' },
    { num: '04', title: 'We Evolve Brands Through Data.', body: 'We don’t report numbers. We turn data into real-time brand evolution.' },
  ]

  return (
    <section id="services" className="abstract-section services">
      <SectionBackground />

      <div className="svc-inner">
        <div className="svc-head">
          <div className="svc-tag">
            <span className="svc-tag-label">Services</span>
            <span className="svc-tag-index">BRANDLIFT · 2025</span>
          </div>

          <h2 className="svc-statement">
            We don’t produce content.
            <br />
            <em>We design direction.</em>
          </h2>
        </div>

        <div className="svc-rows">
          {rows.map((row, i) => (
            <div
              key={row.num}
              className="svc-row"
              ref={(el) => {
                rowRefs.current[i] = el
              }}
            >
              <span className="svc-num">{row.num}</span>
              <h3 className="svc-title">{row.title}</h3>
              <p className="svc-body">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="abstract-section about">
      <SectionBackground />

      <div className="about-inner">
        <div className="about-grid">
          <div className="about-block">
            <span className="about-kicker">Who we are</span>

            <h2 className="about-title">
              <span>An idea without results</span>
              <span className="about-title-muted">is only half an idea.</span>
            </h2>

            <p className="about-copy">
              <strong>We build the whole thing.</strong>
            </p>
          </div>

          <div className="about-block">
            <span className="about-kicker">How we think</span>

            <div className="about-thinking">
              <span className="about-thinking-line">We speak strategy.</span>
              <span className="about-thinking-line">We prove it through creativity.</span>
              <span className="about-thinking-line">We grow it with data.</span>
            </div>

            <p className="about-system">
              We build the system that expands the brand’s core.
            </p>
          </div>
        </div>

        <div className="about-services" aria-label="Capabilities">
          <div className="about-service"><span>Creative</span></div>
          <div className="about-service"><span>Studio</span></div>
          <div className="about-service"><span>Production</span></div>
          <div className="about-service"><span>Influencer Marketing</span></div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ onStartProject }: { onStartProject: () => void }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_ADDRESS)}`

  return (
    <section id="contact" className="abstract-section contact">
      <SectionBackground />

      <div className="contact-inner">
        <div className="contact-grid">
          <div className="contact-copy-block">
            <span className="contact-kicker">Contact</span>

            <h2 className="contact-title">
              <span>If you’re looking for an agency,</span>
              <span className="contact-title-muted">there are many options.</span>
            </h2>

            <p className="contact-copy">
              <strong>If you’re looking for momentum, we’re here.</strong>
            </p>

            <div className="contact-actions">
              <button type="button" className="contact-primary" onClick={onStartProject}>
                Start a project →
              </button>

              <a className="contact-secondary" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open map
              </a>
            </div>
          </div>

          <div className="contact-map-card">
            <div className="map-visual" aria-hidden="true">
              <svg className="map-svg" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="roadGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,.14)" />
                    <stop offset="55%" stopColor="rgba(232,93,36,.42)" />
                    <stop offset="100%" stopColor="rgba(92,150,255,.28)" />
                  </linearGradient>

                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path className="map-road map-road-main" d="M-40 340 C120 310 210 318 330 292 C470 260 575 250 940 218" />
                <path className="map-road map-road-main" d="M-40 420 C150 388 275 372 410 350 C555 326 690 318 940 286" />
                <path className="map-road" d="M170 -20 C200 90 216 170 246 265 C274 354 308 438 350 600" />
                <path className="map-road" d="M520 -30 C492 92 488 176 520 272 C548 356 610 428 680 600" />
                <path className="map-road" d="M740 -30 C706 78 708 184 760 292 C802 380 844 468 872 600" />
                <path className="map-road thin" d="M42 128 C178 138 306 128 430 104 C540 82 638 78 860 96" />
                <path className="map-road thin" d="M68 220 C210 214 354 208 478 178 C596 150 710 158 890 172" />
                <path className="map-road thin" d="M110 512 C236 468 342 440 468 430 C596 418 704 432 884 402" />
                <circle className="map-node" cx="246" cy="265" r="6" />
                <circle className="map-node" cx="520" cy="272" r="6" />
                <circle className="map-node" cx="760" cy="292" r="6" />
                <circle className="map-node" cx="410" cy="350" r="5" />
                <circle className="map-node" cx="680" cy="600" r="5" />
                <g className="map-pin" filter="url(#softGlow)">
                  <circle cx="525" cy="314" r="42" />
                  <circle cx="525" cy="314" r="16" />
                </g>
                <text className="map-label main" x="578" y="306">GROUP DP</text>
                <text className="map-label sub" x="578" y="330">MASLAK / ISTANBUL</text>
                <text className="map-label road" x="452" y="395" transform="rotate(-8 452 395)">ESKI BUYUKDERE CAD.</text>
                <text className="map-label road muted" x="630" y="188" transform="rotate(66 630 188)">BUYUKDERE CAD.</text>
              </svg>

              <div className="map-grid" />
              <div className="map-glow" />
            </div>

            <div className="map-topline">
              <span>Location</span>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps ↗
              </a>
            </div>

            <div className="map-address-card">
              <span>Office</span>
              <p>
                Eski Büyükdere Cad. Maslak İş Merkezi No: 37<br />
                Kat: 3 PK: 34398 Sarıyer / İstanbul
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShowreelButton({ onClick, floating = false }: { onClick: () => void; floating?: boolean }) {
  const pathId = floating ? 'sr-path-floating' : 'sr-path'

  return (
    <button className={`showreel-btn${floating ? ' floating-showreel' : ''}`} onClick={onClick} aria-label="Play BrandLift showreel" type="button">
      <svg viewBox="0 0 92 92" className="showreel-svg" aria-hidden="true">
        <defs>
          <path id={pathId} d="M46,46 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>

        <circle cx="46" cy="46" r="44" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="0.8" />

        <text fill="rgba(255,255,255,.76)" style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', letterSpacing: '.15em' }}>
          <textPath href={`#${pathId}`} startOffset="0%">
            PLAY SHOWREEL · PLAY SHOWREEL ·
          </textPath>
        </text>
      </svg>

      <span className="showreel-core" aria-hidden="true">
        <span className="showreel-tri" />
      </span>
    </button>
  )
}

function SiteNav({ onContact }: { onContact: () => void }) {
  return (
    <nav className="site-nav">
      <a href="#top" className="logo" aria-label="BrandLift">
        <img
          src="/brandlift-logo.png"
          alt="BrandLift by Group DP"
          className="logo-img-dark"
        />

        <img
          src="/brandlift-logo-white.png"
          alt="BrandLift by Group DP"
          className="logo-img-light"
        />
      </a>

      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#works">Works</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button type="button" onClick={onContact}>Start</button></li>
        </ul>
      </div>
    </nav>
  )
}

export default function BrandLiftHero() {
  const [reel, setReel] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const updateLogoMode = () => {
      const works = document.getElementById('works')
      const services = document.getElementById('services')
      const about = document.getElementById('about')
      const contact = document.getElementById('contact')
  
      const y = window.scrollY + window.innerHeight * 0.22
  
      const worksTop = works?.offsetTop ?? 0
      const servicesTop = services?.offsetTop ?? 0
      const aboutTop = about?.offsetTop ?? 0
      const contactTop = contact?.offsetTop ?? 0
  
      const isWorks =
        y >= worksTop &&
        y < servicesTop
  
      const isServices =
        y >= servicesTop &&
        y < aboutTop
  
      const isAbout =
        y >= aboutTop &&
        y < contactTop
  
      const isContact =
        y >= contactTop
  
      if (isWorks || isAbout || isContact) {
        document.body.classList.add('logo-light')
      } else if (isServices) {
        document.body.classList.remove('logo-light')
      } else {
        document.body.classList.remove('logo-light')
      }
    }
  
    updateLogoMode()
  
    window.addEventListener('scroll', updateLogoMode, { passive: true })
    window.addEventListener('resize', updateLogoMode)
    window.addEventListener('hashchange', updateLogoMode)
  
    return () => {
      window.removeEventListener('scroll', updateLogoMode)
      window.removeEventListener('resize', updateLogoMode)
      window.removeEventListener('hashchange', updateLogoMode)
      document.body.classList.remove('logo-light')
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <SiteNav onContact={() => setContactOpen(true)} />

      <div className="page">
        <main id="top" className="shell">
          <section className="stage">
            <div className="reel-field" aria-hidden="true" />

            <div className="hero-copy">
              <h1 className="hl">
                <span>We don’t follow culture.</span>
                <span>We move it.</span>
              </h1>

              <p className="sub">Full-service creative agency</p>

              <button type="button" className="btn-start" onClick={() => setContactOpen(true)}>
                Start a project →
              </button>
            </div>
          </section>
        </main>

        <WorksSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection onStartProject={() => setContactOpen(true)} />
      </div>

      <ShowreelButton onClick={() => setReel(true)} floating />

      <button type="button" className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        ↑
      </button>

      {reel && <ReelModal onClose={() => setReel(false)} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  )
}