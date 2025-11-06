<!--
  Vue Starfall - ThemeBackground Component
  @author 李飞恒
  @copyright Copyright © 2025 李飞恒. All rights reserved.
  @license Apache-2.0
-->
<template>
  <div class="theme-bg">
    <div class="decor decor-1" :style="decorStyles[0]" />
    <div class="decor decor-2" :style="decorStyles[1]" />
    <div class="decor decor-3" :style="decorStyles[2]" />
    <div class="space">
      <div class="milkyway" :style="milkyWay" />
      <div class="milkyway mw2" :style="milkyWay2" />
      <i v-for="(s,i) in stars" :key="i" class="star" :style="s" />
      <div v-for="(n,i) in nebulae" :key="`n-${i}`" class="nebula" :class="{ rev: n.rev }" :style="n" />
      <div v-for="(p,i) in planets" :key="`p-${i}`" class="planet" :class="{ rev: p.rev }" :style="p" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface StarStyle {
  '--sx': string;
  '--sy': string;
  '--ss': string;
  '--sdel': string;
  '--sdur': string;
  '--sglow': string;
  '--sblur': string;
}

interface NebulaStyle {
  '--nw': string;
  '--nh': string;
  '--nx': string;
  '--ny': string;
  '--nblur': string;
  '--nopa': string;
  '--ndur': string;
  '--nclr': string;
  rev: boolean;
}

interface PlanetStyle {
  '--pw': string;
  '--ph': string;
  '--px': string;
  '--py': string;
  '--pclr': string;
  '--pblur': string;
  '--popa': string;
  '--pdur': string;
  rev: boolean;
}

interface DecorStyle {
  '--dur': string;
  '--delay': string;
}

const decorStyles = ref<DecorStyle[]>([
  { '--dur': '12s', '--delay': '0s' },
  { '--dur': '12s', '--delay': '0s' },
  { '--dur': '12s', '--delay': '0s' }
])
const stars = ref<StarStyle[]>([])
const nebulae = ref<NebulaStyle[]>([])
const planets = ref<PlanetStyle[]>([])
const milkyWay = ref<Record<string, string>>({})
const milkyWay2 = ref<Record<string, string>>({})

const rand = (min: number, max: number): string => (Math.random() * (max - min) + min).toFixed(2)

onMounted(() => {
  const isMobile: boolean =
    !!(typeof window !== 'undefined' && (window.matchMedia && window.matchMedia('(max-width: 768px)').matches)) ||
    !!(typeof window !== 'undefined' && window.devicePixelRatio && window.devicePixelRatio > 2);

  decorStyles.value = [0, 1, 2].map(() => ({
    '--dur': `${rand(10, 18)}s`,
    '--delay': `${rand(0, 4)}s`
  }));

  const starCount: number = isMobile ? 240 : 480;
  stars.value = Array.from({ length: starCount }, (): StarStyle => {
    const left: string = `${rand(1, 99)}%`;
    const top: string = `${rand(1, 99)}%`;
    const depth: number = Math.random();
    const size: string = `${(0.6 + depth * 1.6).toFixed(2)}px`;
    const delay: string = `${rand(0, 4)}s`;
    const dur: string = `${(6 - depth * 3).toFixed(2)}s`;
    const glow: string = (0.25 + depth * 0.6).toFixed(2);
    const blur: string = `${(isMobile ? 1.2 : 1.5 - depth * 1.2).toFixed(2)}px`;
    return {
      '--sx': left,
      '--sy': top,
      '--ss': size,
      '--sdel': delay,
      '--sdur': dur,
      '--sglow': glow,
      '--sblur': blur
    };
  });

  const nebCount: number = isMobile ? 5 : 7;
  const palette: string[] = [
    'rgba(150,100,255,.34)',
    'rgba(80,160,255,.32)',
    'rgba(255,110,190,.26)',
    'rgba(110,200,255,.24)',
    'rgba(255,200,110,.20)',
    'rgba(120,255,190,.22)',
    'rgba(200,120,255,.24)'
  ];
  nebulae.value = Array.from({ length: nebCount }, (): NebulaStyle => {
    const vw: string = `${rand(40, 70)}vmax`;
    const vh: string = `${rand(40, 70)}vmax`;
    const left: string = `${rand(-15, 80)}vmax`;
    const top: string = `${rand(-15, 80)}vmax`;
    const blur: string = `${rand(50, 85)}px`;
    const opacity: string = (
      isMobile ? (Math.random() * 0.10 + 0.10) : (Math.random() * 0.16 + 0.12)
    ).toFixed(2);
    const dur: string = `${rand(80, 140)}s`;
    const rev: boolean = Math.random() > 0.5;
    const color: string = palette[Math.floor(Math.random() * palette.length)];
    return {
      '--nw': vw,
      '--nh': vh,
      '--nx': left,
      '--ny': top,
      '--nblur': blur,
      '--nopa': opacity,
      '--ndur': dur,
      '--nclr': color,
      rev
    };
  });

  const planetColors: string[] = [
    '#ffc857',
    '#7cffcb',
    '#7ea1ff',
    '#ff7ab6',
    '#6ef3ff'
  ];
  const planetCount: number = isMobile ? 2 : 3;
  planets.value = Array.from({ length: planetCount }, (): PlanetStyle => {
    const size: string = `${rand(16, 28)}vmax`;
    const left: string = `${rand(-10, 85)}vmax`;
    const top: string = `${rand(-10, 85)}vmax`;
    const hue: string = planetColors[Math.floor(Math.random() * planetColors.length)];
    const blur: string = `${rand(20, 40)}px`;
    const opa: string = (Math.random()*0.20 + 0.30).toFixed(2);
    const dur: string = `${rand(140, 220)}s`;
    const rev: boolean = Math.random() > 0.5;
    return {
      '--pw': size,
      '--ph': size,
      '--px': left,
      '--py': top,
      '--pclr': hue,
      '--pblur': blur,
      '--popa': opa,
      '--pdur': dur,
      rev
    };
  });

  milkyWay.value = (() => {
    const angle: string = `${rand(12, 28)}deg`;
    const op: string = (Math.random() * 0.24 + 0.32).toFixed(2);
    const blur: string = `${rand(80, 120)}px`;
    const dur: string = `${rand(140, 220)}s`;
    return {
      '--mw-rot': angle,
      '--mw-op': op,
      '--mw-blur': blur,
      '--mw-dur': dur
    };
  })();

  milkyWay2.value = (() => {
    const angle: string = `${rand(32, 48)}deg`;
    const op: string = (Math.random() * 0.18 + 0.24).toFixed(2);
    const blur: string = `${rand(60, 100)}px`;
    const dur: string = `${rand(160, 260)}s`;
    return {
      '--mw-rot': angle,
      '--mw-op': op,
      '--mw-blur': blur,
      '--mw-dur': dur
    };
  })();
})
</script>

<style scoped>
.theme-bg {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(1400px 700px at 8% 12%, rgba(98,71,201,.28), transparent 60%),
    radial-gradient(1200px 600px at 92% 88%, rgba(70,140,220,.24), transparent 60%),
    radial-gradient(1000px 500px at 70% 20%, rgba(255,120,200,.12), transparent 60%),
    linear-gradient(135deg, #090b1a 0%, #0a0d21 40%, #050711 100%);
  overflow: hidden;
}
.content { width: 100%; display: grid; place-items: center; position: relative; z-index: 3; }
.space { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.milkyway {
  position: absolute;
  inset: -30vmax;
  z-index: 0;
  background:
    linear-gradient(
      var(--mw-rot, 20deg),
      rgba(255,255,255,0) 0%,
      rgba(200,220,255,.10) 28%,
      rgba(255,255,255,.22) 50%,
      rgba(200,220,255,.10) 72%,
      rgba(255,255,255,0) 100%
    );
  filter: blur(var(--mw-blur, 90px));
  opacity: var(--mw-op, .28);
  mix-blend-mode: screen;
  animation: drift-mw var(--mw-dur, 180s) ease-in-out infinite alternate;
}
.milkyway.mw2 {
  opacity: calc(var(--mw-op, .28) * .8);
  filter: blur(calc(var(--mw-blur, 90px) * .9));
}
.star {
  position: absolute;
  left: var(--sx, 50%);
  top: var(--sy, 50%);
  width: var(--ss, 1px);
  height: var(--ss, 1px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255, .95), rgba(255,255,255, .05) 70%);
  box-shadow: 0 0 6px rgba(160,200,255, calc(var(--sglow, .5))), 0 0 10px rgba(160,200,255, calc(var(--sglow, .5) * .7));
  opacity: .9;
  animation: twinkle var(--sdur, 4s) ease-in-out infinite;
  animation-delay: var(--sdel, 0s);
  filter: blur(var(--sblur, 1px));
  z-index: 1;
}
.nebula {
  position: absolute;
  width: var(--nw, 60vmax);
  height: var(--nh, 60vmax);
  left: var(--nx, -10vmax);
  top: var(--ny, -10vmax);
  background: radial-gradient(closest-side, var(--nclr, rgba(150,100,255,.32)), rgba(0,0,0,0) 70%);
  filter: blur(var(--nblur, 60px));
  mix-blend-mode: screen;
  opacity: var(--nopa, .35);
  animation: swirl var(--ndur, 100s) linear infinite;
  z-index: 2;
}
.nebula.rev { animation-direction: reverse; }
.planet {
  position: absolute;
  width: var(--pw, 20vmax);
  height: var(--ph, 20vmax);
  left: var(--px, 0);
  top: var(--py, 0);
  background: radial-gradient(circle at 30% 30%, var(--pclr, #ffc857), rgba(0,0,0,0) 70%);
  filter: blur(var(--pblur, 30px));
  opacity: var(--popa, .4);
  animation: drift-planet var(--pdur, 180s) ease-in-out infinite alternate;
  z-index: 1;
}
.planet.rev { animation-direction: reverse; }
.decor {
  position: absolute;
  filter: blur(50px);
  opacity: .5;
  animation: float var(--dur, 12s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  z-index: 1;
}
.decor-1 { width: 360px; height: 360px; border-radius: 50%; background: #7c4dff; top: -120px; left: -120px; }
.decor-2 { width: 300px; height: 300px; border-radius: 50%; background: #6ea8fe; bottom: -100px; right: -80px; }
.decor-3 { width: 220px; height: 220px; border-radius: 50%; background: #00d1ff; top: 20%; right: 10%; }
@keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-16px) } }
@keyframes twinkle { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes swirl { 0% { transform: rotate(0deg) translate3d(0,0,0) } 100% { transform: rotate(360deg) translate3d(0,0,0) } }
@keyframes drift-mw { 0% { transform: translate(0,0) } 50% { transform: translate(4vmax, -3vmax) } 100% { transform: translate(0,0) } }
@keyframes drift-planet { 0% { transform: translate(0,0) } 50% { transform: translate(4vmax, -3vmax) } 100% { transform: translate(0,0) } }
</style>
