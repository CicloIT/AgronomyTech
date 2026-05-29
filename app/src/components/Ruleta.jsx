import { useRef, useState, useMemo } from "react";
import { SEGMENTS } from "../data/questions";

const SIZE = 600;
const CENTER = SIZE / 2;

// Radii (outer → inner)
const R_BORDER_OUTER  = 295;
const R_BORDER_INNER  = 275;
const R_ICON_OUTER    = 272;
const R_ICON_INNER    = 197;
const R_IBORDER_OUTER = 192;
const R_IBORDER_INNER = 172;
const R_LABEL_OUTER   = 170;
const R_SEG_INNER     = 107;
const R_ICON_CENTER   = (R_ICON_OUTER + R_ICON_INNER) / 2;

const ICON_SIZE = 38;

// Inner segments: alternating cyan / gray
const SEG_COLORS = ["#1a9dc4", "#8a9baa", "#1a9dc4", "#8a9baa"];

// Outer border: same alternating pattern
const BORDER_COLORS = ["#1a9dc4", "#8a9baa", "#1a9dc4", "#8a9baa"];

// 24°/icon: top/right/left=72°(3 icons), bottom=144°(6 icons). Top & bottom centered at cardinals.
const SEGMENT_STARTS = [-126, -54, 18, 162];
const SEGMENT_SPANS  = [72, 72, 144, 72];

const SEGMENT_LABELS = [
  "Identificación y\ncaracterización\nde ambientes",
  "Estrategias de\nManejo por\nAmbientes",
  "Implementación",
  "Gestión | Análisis\nde campaña",
];

function polar(r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

function donutPath(startDeg, endDeg, rOuter, rInner) {
  const s  = polar(rOuter, startDeg);
  const e  = polar(rOuter, endDeg);
  const si = polar(rInner, endDeg);
  const ei = polar(rInner, startDeg);
  return `M ${s.x} ${s.y} A ${rOuter} ${rOuter} 0 0 1 ${e.x} ${e.y} L ${si.x} ${si.y} A ${rInner} ${rInner} 0 0 0 ${ei.x} ${ei.y} Z`;
}

function iconAngleDeg(sIdx, iIdx, total) {
  const segStart = SEGMENT_STARTS[sIdx];
  const span     = SEGMENT_SPANS[sIdx];
  const spacing  = span / (total + 1);
  return segStart + spacing * (iIdx + 1);
}

function buildIconList() {
  const list = [];
  SEGMENTS.forEach((seg, sIdx) => {
    const total = seg.images.length;
    seg.images.forEach((img, iIdx) => {
      list.push({
        segIdx: sIdx, image: img,
        angleDeg: iconAngleDeg(sIdx, iIdx, total),
      });
    });
  });
  return list;
}

function targetRotation(iconAngle) {
  return ((-90 - iconAngle) % 360 + 360) % 360;
}

function SegmentLabel({ sIdx }) {
  const label = SEGMENT_LABELS[sIdx];
  const lines = label.split("\n");
  const midDeg = SEGMENT_STARTS[sIdx] + SEGMENT_SPANS[sIdx] / 2;
  const lineH  = 14;
  const totalH = (lines.length - 1) * lineH;

  // left/right: stack radially + tangential rotation so text hugs the arc and never enters center circle
  if (sIdx === 1 || sIdx === 3) {
    const rot = midDeg + 90;
    return (
      <>
        {lines.map((line, i) => {
          const r = 138 + (totalH / 2 - i * lineH);
          const { x, y } = polar(r, midDeg);
          return (
            <text key={i} x={x} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fill="black" fontSize="11" fontWeight="700" fontFamily="system-ui"
              transform={`rotate(${rot},${x},${y})`}>
              {line}
            </text>
          );
        })}
      </>
    );
  }

  // top/bottom: horizontal, stack tangentially
  return (
    <>
      {lines.map((line, i) => {
        const { x, y } = polar(138, midDeg);
        const offset = -totalH / 2 + i * lineH;
        return (
          <text key={i} x={x} y={y + offset}
            textAnchor="middle" dominantBaseline="middle"
            fill="black" fontSize="11" fontWeight="700" fontFamily="system-ui">
            {line}
          </text>
        );
      })}
    </>
  );
}

export default function Ruleta({ onIconSelected, disabled }) {
  const [rotation, setRotation]   = useState(0);
  const [spinning, setSpinning]   = useState(false);
  const wheelRef = useRef(null);
  const iconList = useMemo(buildIconList, []);

  function spin() {
    if (spinning || disabled) return;
    setSpinning(true);

    const chosen = iconList[Math.floor(Math.random() * iconList.length)];
    const target = targetRotation(chosen.angleDeg);

    const extraSpins  = (5 + Math.floor(Math.random() * 3)) * 360;
    const currentMod  = ((rotation % 360) + 360) % 360;
    let delta = target - currentMod;
    if (delta < 0) delta += 360;
    const finalRotation = rotation + extraSpins + delta;

    const el = wheelRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.transform  = `rotate(${rotation}deg)`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = "transform 4s cubic-bezier(0.17,0.67,0.12,1)";
          el.style.transform  = `rotate(${finalRotation}deg)`;
        })
      );
    }

    setRotation(finalRotation);
    setTimeout(() => {
      setSpinning(false);
      onIconSelected(chosen.segIdx, chosen.image);
    }, 4300);
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative">

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1">
          <svg width="35" height="45" viewBox="0 0 35 45">
            <polygon points="17.5,43 1,3 34,3" fill="#f97316" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Wheel — no wrapper color, border is inside SVG */}
        <svg ref={wheelRef} width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ display: "block", willChange: "transform" }}>


          {/* ── Dual-color outer border ring ── */}
          {BORDER_COLORS.map((color, i) => {
            const start = SEGMENT_STARTS[i];
            return <path key={i}
              d={donutPath(start, start + SEGMENT_SPANS[i], R_BORDER_OUTER, R_BORDER_INNER)}
              fill={color} />;
          })}
          {/* border dividers */}
          {[0,1,2,3].map(i => {
            const deg   = SEGMENT_STARTS[i];
            const inner = polar(R_BORDER_INNER, deg);
            const outer = polar(R_BORDER_OUTER, deg);
            return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="white" strokeWidth="2" />;
          })}

          {/* ── White icon ring ── */}
          <circle cx={CENTER} cy={CENTER} r={R_ICON_OUTER} fill="white" />
          <circle cx={CENTER} cy={CENTER} r={R_ICON_INNER} fill="white" />

          {/* icon ring dividers */}
          {[0,1,2,3].map(i => {
            const deg   = SEGMENT_STARTS[i];
            const inner = polar(R_ICON_INNER, deg);
            const outer = polar(R_ICON_OUTER, deg);
            return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="#e0e0e0" strokeWidth="1.5" />;
          })}

          {/* ── Icons (dark on white) ── */}
          {iconList.map(({ image, angleDeg }, idx) => {
            const { x, y } = polar(R_ICON_CENTER, angleDeg);
            return (
              <image key={idx}
                href={`/images/${image.imageName}.png`}
                x={x - ICON_SIZE / 2}
                y={y - ICON_SIZE / 2}
                width={ICON_SIZE}
                height={ICON_SIZE}
                preserveAspectRatio="xMidYMid meet"
              />
            );
          })}

          {/* ── Label area ── */}
          <circle cx={CENTER} cy={CENTER} r={R_LABEL_OUTER} fill="white" />

          {/* ── Inner dual-color border ring (mirrors outer) ── */}
          {BORDER_COLORS.map((color, i) => {
            const start = SEGMENT_STARTS[i];
            return <path key={i}
              d={donutPath(start, start + SEGMENT_SPANS[i], R_IBORDER_OUTER, R_IBORDER_INNER)}
              fill={color} />;
          })}
          {/* inner border dividers */}
          {[0,1,2,3].map(i => {
            const deg   = SEGMENT_STARTS[i];
            const inner = polar(R_IBORDER_INNER, deg);
            const outer = polar(R_IBORDER_OUTER, deg);
            return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="white" strokeWidth="2" />;
          })}

          {/* numbers on inner border ring */}
          {SEGMENTS.map((_, i) => {
            const midDeg = SEGMENT_STARTS[i] + SEGMENT_SPANS[i] / 2;
            const { x, y } = polar((R_IBORDER_OUTER + R_IBORDER_INNER) / 2, midDeg);
            return (
              <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="14" fontWeight="900"
                fontFamily="system-ui">{i + 1}</text>
            );
          })}

          {/* labels in label area */}
          {SEGMENTS.map((_, i) => <SegmentLabel key={i} sIdx={i} />)}

          {/* ── Center circle ── */}
          <circle cx={CENTER} cy={CENTER} r={R_SEG_INNER}     fill="white" />
          <circle cx={CENTER} cy={CENTER} r={R_SEG_INNER - 4} fill="white" />

        </svg>

        {/* Logo fijo — fuera del SVG que gira */}
        <img
          src="/Logo.png"
          alt="Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 144, height: 144, objectFit: "contain", zIndex: 5 }}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || disabled}
        style={{
          padding: "18px 64px",
          borderRadius: "999px",
          border: "none",
          background: spinning || disabled
            ? "linear-gradient(135deg,#1e293b,#0f172a)"
            : "linear-gradient(135deg,#f97316,#dc2626)",
          color: "white",
          fontSize: "22px",
          fontWeight: 900,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: spinning || disabled ? "not-allowed" : "pointer",
          opacity: spinning || disabled ? 0.5 : 1,
          boxShadow: spinning || disabled
            ? "none"
            : "0 0 48px rgba(249,115,22,0.65), 0 6px 24px rgba(0,0,0,0.5)",
          transform: spinning || disabled ? "scale(0.96)" : "scale(1)",
          transition: "all 0.25s ease",
          userSelect: "none",
          outline: "none",
        }}
        onMouseOver={e => { if (!spinning && !disabled) e.currentTarget.style.transform = "scale(1.04)"; }}
        onMouseOut={e => { if (!spinning && !disabled) e.currentTarget.style.transform = "scale(1)"; }}
      >
        {spinning ? "Girando…" : "⟳  GIRAR"}
      </button>
    </div>
  );
}
