"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroCanvas.module.css";

/**
 * 首页「多视图聚类」粒子场：
 * 三组颜色代表三个视图，粒子被各自的簇心缓慢吸引并围绕簇心旋转，
 * 近邻粒子之间连线（跨视图连线 = 多视图一致性），鼠标靠近时排斥粒子并拉出聚光与连线。
 * 纯 Canvas 2D，无第三方依赖；跟随明暗主题；页面不可见时暂停；
 * 开启「减少动效」时只渲染一帧静态画面。
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: number; // 所属视图（簇）索引
  r: number;
};

const CLUSTERS = 3;
const FALLBACK_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4"];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let time = 0;
    let colors = FALLBACK_COLORS;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = ["--accent-1", "--accent-2", "--accent-3"].map(
        (name, i) => style.getPropertyValue(name).trim() || FALLBACK_COLORS[i]
      );
    };

    // 簇心：围绕画布中心缓慢公转的椭圆轨道
    const centerOf = (k: number) => {
      const a = (Math.PI * 2 * k) / CLUSTERS + time * 0.00018;
      return {
        x: w / 2 + Math.cos(a) * w * 0.3,
        y: h / 2 + Math.sin(a) * h * 0.27,
      };
    };

    const init = () => {
      const count = Math.round(Math.min(110, Math.max(36, (w * h) / 14000)));
      particles = Array.from({ length: count }, (_, i) => {
        const c = i % CLUSTERS;
        const center = centerOf(c);
        const spread = Math.min(w, h) * 0.22;
        return {
          x: center.x + (Math.random() - 0.5) * spread * 2,
          y: center.y + (Math.random() - 0.5) * spread * 2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          c,
          r: 1.1 + Math.random() * 1.6,
        };
      });
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (reduceMotion) {
        for (let i = 0; i < 160; i++) step();
        draw();
      }
    };

    const step = () => {
      time += 16;
      const centers = Array.from({ length: CLUSTERS }, (_, k) => centerOf(k));
      const mouseRadius = 130;

      for (const p of particles) {
        const center = centers[p.c];
        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;

        // 向簇心的弹性吸引 + 切向环绕，形成缓慢旋转的簇
        p.vx += dx * 0.000045 + (-dy / dist) * 0.012;
        p.vy += dy * 0.000045 + (dx / dist) * 0.012;

        // 鼠标排斥
        if (mouse.active) {
          const mx = p.x - mouse.x;
          const my = p.y - mouse.y;
          const md = Math.hypot(mx, my);
          if (md < mouseRadius && md > 0.01) {
            const force = (1 - md / mouseRadius) * 0.9;
            p.vx += (mx / md) * force;
            p.vy += (my / md) * force;
          }
        }

        p.vx *= 0.965;
        p.vy *= 0.965;
        p.x += p.vx;
        p.y += p.vy;

        // 软边界：越界后回弹
        if (p.x < 0 || p.x > w) p.vx *= -0.8;
        if (p.y < 0 || p.y > h) p.vy *= -0.8;
        p.x = Math.min(w, Math.max(0, p.x));
        p.y = Math.min(h, Math.max(0, p.y));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // 鼠标聚光
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, colors[0]);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
      }

      // 粒子之间的连线
      const link = Math.min(120, Math.max(80, w * 0.085));
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.globalAlpha = (1 - d / link) * (a.c === b.c ? 0.32 : 0.16);
            ctx.strokeStyle = colors[a.c];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // 靠近鼠标的粒子与光标相连
        if (mouse.active) {
          const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (md < 170) {
            ctx.globalAlpha = (1 - md / 170) * 0.55;
            ctx.strokeStyle = colors[a.c];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 粒子本体
      for (const p of particles) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = colors[p.c];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible && !document.hidden) {
        step();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(parent);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
