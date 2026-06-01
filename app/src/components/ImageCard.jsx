export default function ImageCard({ image, segmentLabel, onStart }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="fade-in w-full max-w-xl rounded-[30px] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d2137, #081525)",
          border: "1px solid rgba(26,157,196,0.35)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div className="px-10 pt-8 text-center">
          <p className="text-cyan-400 text-xs font-bold tracking-[0.35em] uppercase mb-2">
            {segmentLabel}
          </p>

          <h3 className="text-white font-black text-[2rem] leading-tight">
            {image.nombre}
          </h3>
        </div>

        {/* Imagen */}
        <div
          className="relative mt-8 rounded-3xl overflow-hidden grid place-items-center"
          style={{
            marginLeft: "48px",
            marginRight: "48px",
            height: "360px",
            background:
              "linear-gradient(165deg, #7fdcfb 0%, #54bfe6 55%, #2c93bf 100%)",
            border: "1px solid rgba(34,211,238,0.55)",
            boxShadow:
              "0 0 0 4px rgba(13,33,55,0.55), " +
              "0 0 22px rgba(34,211,238,0.45), " +
              "inset 0 2px 0 rgba(255,255,255,0.55), " +
              "inset 0 -22px 40px rgba(8,21,37,0.28)",
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/${image.imageName}.png`}
            alt={image.nombre}
            className="relative z-[2] w-full h-full object-contain p-8"
            style={{
              filter: "drop-shadow(0 5px 12px rgba(8,21,37,0.28))",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `
                <div style="
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  height:100%;
                  color:rgba(255,255,255,0.3);
                  font-size:16px;
                  padding:24px;
                ">
                  ${image.nombre}
                </div>
              `;
            }}
          />
        </div>

        {/* Separador */}
        <div
          className="mt-8 border-t border-white/10"
          style={{
            marginLeft: "48px",
            marginRight: "48px",
          }}
        />

        {/* Footer */}
        <div className="px-10 py-8 text-center">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Respondé 3 preguntas sobre este proceso
          </p>

          <button
            onClick={onStart}
            className="
              w-full
              h-14
              rounded-2xl
              font-black
              text-xl
              text-white
              tracking-wide
              transition-all
              hover:scale-[1.02]
              active:scale-[0.98]
            "
            style={{
              background:
                "linear-gradient(135deg, #ff7b1c 0%, #ef4444 100%)",
              boxShadow:
                "0 0 30px rgba(249,115,22,0.35), 0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            ¡Empezar!
          </button>
        </div>
      </div>
    </div>
  );
}