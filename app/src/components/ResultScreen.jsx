export default function ResultScreen({ correctCount, total, onReset }) {
  const won = correctCount === total;
  const partial = correctCount > 0 && correctCount < total;

  const accentColor = won ? "#22c55e" : partial ? "#f97316" : "#ef4444";
  const accentGlow  = won ? "#22c55e44" : partial ? "#f9731644" : "#ef444444";

  const title   = won     ? "¡Premio completo!" : partial ? "¡Buen intento!" : "Sin premio";
  const subtitle = won    ? "Dominás la agricultura de precisión"
                 : partial ? "Necesitás las 3 para el premio completo"
                 :           "No te rindas, seguí aprendiendo";
  const emoji   = won ? "🏆" : partial ? "👍" : "😔";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      background: "rgba(0,0,0,0.9)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        width: "100%", maxWidth: "520px",
        borderRadius: "24px",
        overflow: "hidden",
        background: "linear-gradient(170deg, #0f2a45 0%, #071520 100%)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 60px ${accentGlow}`,
        textAlign: "center",
      }}>

        {/* ── Top accent bar ── */}
        <div style={{
          height: "6px",
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }} />

        <div style={{ padding: "40px 36px 36px" }}>

          {/* Emoji */}
          <div style={{ fontSize: "72px", lineHeight: 1, marginBottom: "20px" }}>
            {emoji}
          </div>

          {/* Título */}
          <h2 style={{
            fontSize: "32px", fontWeight: 900, color: accentColor,
            margin: "0 0 8px",
            textShadow: `0 0 30px ${accentGlow}`,
          }}>
            {title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", margin: "0 0 28px" }}>
            {subtitle}
          </p>

          {/* Score bubbles */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
            {Array.from({ length: total }).map((_, i) => {
              const ok = i < correctCount;
              return (
                <div key={i} style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px",
                  background: ok ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                  border: `2px solid ${ok ? "#22c55e" : "#ef4444"}`,
                  boxShadow: `0 0 16px ${ok ? "#22c55e33" : "#ef444433"}`,
                }}>
                  {ok ? "✓" : "✗"}
                </div>
              );
            })}
          </div>

          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "28px" }}>
            {correctCount} de {total} correctas
          </p>

          {/* CTA box */}
          <div style={{
            borderRadius: "16px",
            padding: "18px 20px",
            marginBottom: "24px",
            background: "linear-gradient(135deg, rgba(26,157,196,0.18), rgba(26,157,196,0.06))",
            border: "1px solid rgba(26,157,196,0.35)",
          }}>
            <p style={{ color: "#67e8f9", fontWeight: 600, fontSize: "15px", margin: "0 0 6px" }}>
              "Descubrí cómo mejorar tu lote con Agricultura de Precisión"
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
              Agronomy Tech — Agro Activa
            </p>
          </div>

          {/* Botón */}
          <button
            onClick={onReset}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #1a9dc4, #0e6b8a)",
              color: "white",
              fontSize: "17px",
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 0 24px rgba(26,157,196,0.4), 0 4px 16px rgba(0,0,0,0.3)",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            Jugar de nuevo
          </button>

        </div>
      </div>
    </div>
  );
}
