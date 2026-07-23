/**
 * Procedural ambience engine — generates rain, thunder, city hum and a soft
 * jazz-piano pad entirely with the Web Audio API. No external audio files.
 * Provides hooks the UI can toggle: Sound ON / OFF.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: { stop: () => void }[] = [];
let running = false;
let thunderTimer: number | null = null;
let jazzTimer: number | null = null;

function ensureCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  return ctx!;
}

function makeRain() {
  const c = ensureCtx();
  const bufferSize = 2 * c.sampleRate;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.4;
  const gain = c.createGain();
  gain.gain.value = 0.05;
  src.connect(filter).connect(gain).connect(master!);
  src.start();
  return { stop: () => src.stop() };
}

function makeCityHum() {
  const c = ensureCtx();
  const osc = c.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 55;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 180;
  const gain = c.createGain();
  gain.gain.value = 0.02;
  osc.connect(filter).connect(gain).connect(master!);
  osc.start();
  return { stop: () => osc.stop() };
}

function thunder() {
  if (!ctx || !running) return;
  const c = ctx;
  const dur = 1.6;
  const bufferSize = c.sampleRate * dur;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 220;
  const gain = c.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.28, c.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  src.connect(filter).connect(gain).connect(master!);
  src.start();
}

const PENTATONIC = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

function jazzNote() {
  if (!ctx || !running) return;
  const c = ctx;
  const freq = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
  const osc = c.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq / 2;
  const gain = c.createGain();
  gain.gain.value = 0;
  gain.gain.linearRampToValueAtTime(0.06, c.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2.4);
  osc.connect(gain).connect(master!);
  osc.start();
  osc.stop(c.currentTime + 2.6);
}

function scheduleLoops() {
  const nextThunder = () => {
    thunderTimer = window.setTimeout(() => {
      thunder();
      nextThunder();
    }, 12000 + Math.random() * 22000);
  };
  const nextJazz = () => {
    jazzTimer = window.setTimeout(() => {
      jazzNote();
      nextJazz();
    }, 1200 + Math.random() * 2600);
  };
  nextThunder();
  nextJazz();
}

export const audio = {
  start() {
    if (running) return;
    const c = ensureCtx();
    if (c.state === "suspended") c.resume();
    running = true;
    nodes = [makeRain(), makeCityHum()];
    master!.gain.cancelScheduledValues(c.currentTime);
    master!.gain.linearRampToValueAtTime(0.9, c.currentTime + 2.5);
    scheduleLoops();
  },
  stop() {
    if (!ctx || !master) return;
    running = false;
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    if (thunderTimer) clearTimeout(thunderTimer);
    if (jazzTimer) clearTimeout(jazzTimer);
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* noop */
        }
      });
      nodes = [];
    }, 900);
  },
};
