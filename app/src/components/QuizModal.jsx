import { useState, useEffect, useCallback } from "react";

const TIMER_SEC = 20;
const LETTERS = ["A", "B", "C"];

export default function QuizModal({ image, onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SEC);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState([]);

  const question = image.preguntas[qIndex];

  const advance = useCallback(
    (chosenIndex) => {
      const isCorrect = chosenIndex !== null && chosenIndex === question.correcta;
      const newCount = correctCount + (isCorrect ? 1 : 0);
      const newResults = [...results, { correct: isCorrect, chosen: chosenIndex }];
      setCorrectCount(newCount);
      setResults(newResults);
      setAnswered(true);
      setSelected(chosenIndex);
      setTimeout(() => {
        if (qIndex + 1 < image.preguntas.length) {
          setQIndex(qIndex + 1);
          setSelected(null);
          setAnswered(false);
          setTimeLeft(TIMER_SEC);
        } else {
          onFinish(newCount, newResults);
        }
      }, 1800);
    },
    [question, correctCount, results, qIndex, image, onFinish]
  );

  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) { advance(null); return; }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered, advance]);

  const timerPct = (timeLeft / TIMER_SEC) * 100;
  const timerColor = timeLeft > 5 ? "#22c55e" : timeLeft > 2 ? "#f97316" : "#ef4444";

  function optionBg(i) {
    if (!answered) return "rgba(255,255,255,0.07)";
    if (i === question.correcta) return "rgba(34,197,94,0.2)";
    if (i === selected) return "rgba(239,68,68,0.2)";
    return "rgba(255,255,255,0.03)";
  }
  function optionBorder(i) {
    if (!answered) return "rgba(255,255,255,0.15)";
    if (i === question.correcta) return "#22c55e";
    if (i === selected) return "#ef4444";
    return "rgba(255,255,255,0.06)";
  }
  function optionColor(i) {
    if (!answered) return "rgba(255,255,255,0.9)";
    if (i === question.correcta) return "#86efac";
    if (i === selected) return "#fca5a5";
    return "rgba(255,255,255,0.3)";
  }
  function badgeBg(i) {
    if (!answered) return "linear-gradient(135deg,#1a9dc4,#0e7490)";
    if (i === question.correcta) return "linear-gradient(135deg,#22c55e,#16a34a)";
    if (i === selected) return "linear-gradient(135deg,#ef4444,#dc2626)";
    return "rgba(255,255,255,0.08)";
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      background: "rgba(0,0,0,0.9)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        width: "100%", maxWidth: "680px",
        borderRadius: "24px",
        overflow: "hidden",
        background: "linear-gradient(170deg, #0f2a45 0%, #071520 100%)",
        border: "1px solid rgba(26,157,196,0.4)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(26,157,196,0.06)",
      }}>

        {/* ── Header con timer ── */}
        <div style={{
          padding: "24px 32px 20px",
          background: "linear-gradient(135deg, rgba(26,157,196,0.15), rgba(26,157,196,0.05))",
          borderBottom: "1px solid rgba(26,157,196,0.2)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <div style={{
                display: "inline-block",
                background: "rgba(26,157,196,0.25)",
                border: "1px solid rgba(26,157,196,0.5)",
                borderRadius: "20px",
                padding: "4px 14px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#67e8f9",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                {image.nombre}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                Pregunta {qIndex + 1} de {image.preguntas.length}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: "48px", fontWeight: 900, lineHeight: 1,
                color: timerColor,
                fontVariantNumeric: "tabular-nums",
                textShadow: `0 0 20px ${timerColor}55`,
              }}>
                {timeLeft}
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginTop: "2px" }}>seg</div>
            </div>
          </div>

          {/* Timer bar */}
          <div style={{ height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "999px",
              width: `${timerPct}%`,
              background: `linear-gradient(90deg, ${timerColor}, ${timerColor}aa)`,
              transition: "width 1s linear",
              boxShadow: `0 0 8px ${timerColor}88`,
            }} />
          </div>
        </div>

        {/* ── Pregunta ── */}
        <div style={{ padding: "28px 32px 8px" }}>
          <p style={{
            color: "white",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {question.texto}
          </p>
        </div>

        {/* ── Opciones ── */}
        <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {question.opciones.map((op, i) => (
            <button
              key={i}
              disabled={answered}
              onClick={() => !answered && advance(i)}
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "16px 20px",
                borderRadius: "14px",
                border: `1.5px solid ${optionBorder(i)}`,
                background: optionBg(i),
                color: optionColor(i),
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                outline: "none",
              }}
            >
              <span style={{
                width: "36px", height: "36px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: badgeBg(i),
                fontSize: "14px", fontWeight: 900,
                color: "white",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}>
                {LETTERS[i]}
              </span>
              <span style={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
                {op}
              </span>
              {answered && i === question.correcta && (
                <span style={{ color: "#22c55e", fontSize: "22px", flexShrink: 0 }}>✓</span>
              )}
              {answered && i === selected && i !== question.correcta && (
                <span style={{ color: "#ef4444", fontSize: "22px", flexShrink: 0 }}>✗</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Progress ── */}
        <div style={{ padding: "16px 32px 28px", display: "flex", gap: "8px", justifyContent: "center" }}>
          {image.preguntas.map((_, i) => (
            <div key={i} style={{
              height: "6px",
              width: i === qIndex ? "36px" : "24px",
              borderRadius: "999px",
              transition: "all 0.3s",
              background: i < qIndex
                ? results[i]?.correct ? "#22c55e" : "#ef4444"
                : i === qIndex ? "#1a9dc4" : "rgba(255,255,255,0.12)",
            }} />
          ))}
        </div>

      </div>
    </div>
  );
}
