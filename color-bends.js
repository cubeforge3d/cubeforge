/**
 * ColorBends - High-Performance WebGL Shader Background
 * Integrated from React Bits (<ColorBends />) for Cube Forge 3D
 * Palette: Official Brand Colors - Laranja Forja (#ff6a00), Azul Ciano (#00d2ff), Roxo Neon (#9d4edd)
 */

(function (window, document) {
  'use strict';

  const MAX_COLORS = 8;

  const VERTEX_SHADER = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;
    #define MAX_COLORS ${MAX_COLORS}
    uniform vec2 uCanvas;
    uniform float uTime;
    uniform float uSpeed;
    uniform vec2 uRot;
    uniform int uColorCount;
    uniform vec3 uColors[MAX_COLORS];
    uniform int uTransparent;
    uniform float uScale;
    uniform float uFrequency;
    uniform float uWarpStrength;
    uniform vec2 uPointer; // in NDC [-1,1]
    uniform float uMouseInfluence;
    uniform float uParallax;
    uniform float uNoise;
    uniform int uIterations;
    uniform float uIntensity;
    uniform float uBandWidth;
    varying vec2 vUv;

    void main() {
      float t = uTime * uSpeed;
      vec2 p = vUv * 2.0 - 1.0;
      p += uPointer * uParallax * 0.1;
      vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
      vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
      q /= max(uScale, 0.0001);
      q /= 0.5 + 0.2 * dot(q, q);
      q += 0.2 * cos(t) - 7.56;
      vec2 toward = (uPointer - rp);
      q += toward * uMouseInfluence * 0.2;

      for (int j = 0; j < 5; j++) {
        if (j >= uIterations - 1) break;
        vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
        q += (rr - q) * 0.15;
      }

      vec3 col = vec3(0.0);
      float a = 1.0;

      if (uColorCount > 0) {
        vec2 s = q;
        vec3 sumCol = vec3(0.0);
        float cover = 0.0;
        for (int i = 0; i < MAX_COLORS; ++i) {
          if (i >= uColorCount) break;
          s -= 0.01;
          vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
          float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
          float kBelow = clamp(uWarpStrength, 0.0, 1.0);
          float kMix = pow(kBelow, 0.3);
          float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
          vec2 disp = (r - s) * kBelow;
          vec2 warped = s + disp * gain;
          float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
          float m = mix(m0, m1, kMix);
          float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
          sumCol += uColors[i] * w;
          cover = max(cover, w);
        }
        col = clamp(sumCol, 0.0, 1.0);
        a = uTransparent > 0 ? cover : 1.0;
      } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
          s -= 0.01;
          vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
          float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
          float kBelow = clamp(uWarpStrength, 0.0, 1.0);
          float kMix = pow(kBelow, 0.3);
          float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
          vec2 disp = (r - s) * kBelow;
          vec2 warped = s + disp * gain;
          float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
          float m = mix(m0, m1, kMix);
          col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
      }

      col *= uIntensity;

      if (uNoise > 0.0001) {
        float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);
      }

      vec3 rgb = (uTransparent > 0) ? col * a : col;
      gl_FragColor = vec4(rgb, a);
    }
  `;

  function hexToRgb(hex) {
    const h = hex.replace('#', '').trim();
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16) / 255,
        parseInt(h[1] + h[1], 16) / 255,
        parseInt(h[2] + h[2], 16) / 255
      ];
    }
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255
    ];
  }

  function initColorBends(canvasElement, options = {}) {
    const canvas = canvasElement || document.querySelector('.color-bends-canvas') || document.querySelector('.ghost-fibers-canvas');
    if (!canvas) return null;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    }) || canvas.getContext('experimental-webgl');

    if (!gl) {
      console.warn('WebGL not supported for ColorBends.');
      return null;
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('ColorBends shader compilation failed: ' + info);
      }
      return shader;
    };

    let program;
    try {
      const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }
    } catch (e) {
      console.error(e);
      return null;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering -1 to 1)
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations cache
    const uLocs = {
      canvas: gl.getUniformLocation(program, 'uCanvas'),
      time: gl.getUniformLocation(program, 'uTime'),
      speed: gl.getUniformLocation(program, 'uSpeed'),
      rot: gl.getUniformLocation(program, 'uRot'),
      colorCount: gl.getUniformLocation(program, 'uColorCount'),
      colors: Array.from({ length: MAX_COLORS }, (_, i) => gl.getUniformLocation(program, `uColors[${i}]`)),
      transparent: gl.getUniformLocation(program, 'uTransparent'),
      scale: gl.getUniformLocation(program, 'uScale'),
      frequency: gl.getUniformLocation(program, 'uFrequency'),
      warpStrength: gl.getUniformLocation(program, 'uWarpStrength'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      mouseInfluence: gl.getUniformLocation(program, 'uMouseInfluence'),
      parallax: gl.getUniformLocation(program, 'uParallax'),
      noise: gl.getUniformLocation(program, 'uNoise'),
      iterations: gl.getUniformLocation(program, 'uIterations'),
      intensity: gl.getUniformLocation(program, 'uIntensity'),
      bandWidth: gl.getUniformLocation(program, 'uBandWidth')
    };

    // Cores Oficiais da Cube Forge: Laranja (#ff6a00), Azul (#00d2ff), Roxo (#9d4edd) e specular (#ffffff)
    const rawColors = options.colors || ['#ff6a00', '#9d4edd', '#00d2ff', '#ff8533', '#7b2cbf', '#0088ff'];
    const parsedColors = rawColors.map(hexToRgb);

    gl.uniform1i(uLocs.colorCount, Math.min(parsedColors.length, MAX_COLORS));
    for (let i = 0; i < MAX_COLORS; i++) {
      if (i < parsedColors.length) {
        gl.uniform3f(uLocs.colors[i], parsedColors[i][0], parsedColors[i][1], parsedColors[i][2]);
      } else {
        gl.uniform3f(uLocs.colors[i], 0, 0, 0);
      }
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    // Configurações e Props de Renderização
    const baseRotation = options.rotation ?? 45;
    const autoRotateSpeed = reduceMotion ? 0 : (options.autoRotate ?? 1.2);
    const speed = reduceMotion ? 0.05 : (options.speed ?? 0.22);
    const scale = options.scale ?? 1.05;
    const frequency = options.frequency ?? 1.0;
    const warpStrength = options.warpStrength ?? 1.0;
    const mouseInfluence = reduceMotion ? 0 : (options.mouseInfluence ?? 0.85);
    const parallax = reduceMotion ? 0 : (options.parallax ?? 0.45);
    const noise = options.noise ?? 0.08;
    const iterations = Math.min(5, Math.max(1, options.iterations ?? (window.innerWidth < 768 ? 1 : 2)));
    const intensity = options.intensity ?? 1.28;
    const bandWidth = options.bandWidth ?? 5.8;
    const transparent = options.transparent ?? true;

    gl.uniform1f(uLocs.speed, speed);
    gl.uniform1i(uLocs.transparent, transparent ? 1 : 0);
    gl.uniform1f(uLocs.scale, scale);
    gl.uniform1f(uLocs.frequency, frequency);
    gl.uniform1f(uLocs.warpStrength, warpStrength);
    gl.uniform1f(uLocs.mouseInfluence, mouseInfluence);
    gl.uniform1f(uLocs.parallax, parallax);
    gl.uniform1f(uLocs.noise, noise);
    gl.uniform1i(uLocs.iterations, iterations);
    gl.uniform1f(uLocs.intensity, intensity);
    gl.uniform1f(uLocs.bandWidth, bandWidth);

    const pointerCurrent = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    const pointerSmooth = 7.0;

    const handlePointerMove = (e) => {
      // Ignora se o ponteiro estiver sobre elementos de formulário para não interferir
      if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerTarget.x = (e.clientX / w) * 2 - 1;
      pointerTarget.y = -((e.clientY / h) * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let width = 0;
    let height = 0;
    const resize = () => {
      const container = canvas.parentElement || document.body;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2.0);
      const dw = Math.floor(w * dpr);
      const dh = Math.floor(h * dpr);

      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        width = dw;
        height = dh;
        gl.viewport(0, 0, dw, dh);
        gl.useProgram(program);
        gl.uniform2f(uLocs.canvas, dw, dh);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let rafId = 0;
    let startTime = performance.now();
    let lastTime = startTime;
    let isRunning = true;

    const render = (now) => {
      if (!isRunning) return;
      rafId = requestAnimationFrame(render);

      if (document.hidden) return; // Economia de bateria quando aba em segundo plano

      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      gl.useProgram(program);
      gl.uniform1f(uLocs.time, elapsed);

      // Rotação dinâmica
      const deg = (baseRotation % 360) + autoRotateSpeed * elapsed;
      const rad = (deg * Math.PI) / 180;
      gl.uniform2f(uLocs.rot, Math.cos(rad), Math.sin(rad));

      // Interpolação suave do cursor
      const amt = Math.min(1, dt * pointerSmooth);
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * amt;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * amt;
      gl.uniform2f(uLocs.pointer, pointerCurrent.x, pointerCurrent.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    rafId = requestAnimationFrame(render);

    const destroy = () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resize);
      if (gl) {
        gl.deleteBuffer(quadBuffer);
        gl.deleteProgram(program);
      }
    };

    return { destroy, resize };
  }

  // Inicialização Automática e Compatibilidade
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.color-bends-canvas') || document.querySelector('.ghost-fibers-canvas');
    if (canvas) {
      window._colorBendsInstance = initColorBends(canvas, {
        colors: ['#ff6a00', '#9d4edd', '#00d2ff', '#ff8533', '#7b2cbf', '#0088ff', '#ffffff'],
        rotation: 45,
        autoRotate: 1.2,
        speed: 0.22,
        scale: 1.08,
        frequency: 1.0,
        warpStrength: 1.0,
        mouseInfluence: 0.85,
        parallax: 0.45,
        noise: 0.08,
        iterations: window.innerWidth < 768 ? 1 : 2,
        intensity: 1.28,
        bandWidth: 5.8,
        transparent: true
      });
    }
  });

  window.ColorBends = { init: initColorBends };
  window.initColorBends = initColorBends;
  // Alias para retrocompatibilidade
  window.initGhostFibers = initColorBends;

})(window, document);
