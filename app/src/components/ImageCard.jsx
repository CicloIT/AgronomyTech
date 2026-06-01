export default function ImageCard({ image, segmentLabel, onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}>
      <div className="fade-in w-full max-w-md rounded-3xl overflow-hidden text-center"
        style={{
          background: "linear-gradient(160deg, #0d2137, #081525)",
          border: "1px solid rgba(26,157,196,0.35)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
        }}>

        <div className="px-8 pt-8 pb-4">
          <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
            {segmentLabel}
          </p>
          <h3 className="text-white font-black text-xl leading-snug">{image.nombre}</h3>
        </div>

        <div className="mx-8 rounded-2xl overflow-hidden my-6"
          style={{ aspectRatio: "4/3", background: "#00A8E2", border: "1px solid rgba(26,157,196,0.2)" }}>
          <img
            src={`${import.meta.env.BASE_URL}images/${image.imageName}.png`}
            alt={image.nombre}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.3);font-size:13px;padding:24px">${image.nombre}</div>`;
            }}
          />
        </div>

        <div className="px-8 pb-8">
          <p className="text-white/50 text-sm mb-6">
            Respondé 3 preguntas sobre este proceso
          </p>
          <button
            onClick={onStart}
            className="w-full py-4 rounded-2xl font-black text-white text-lg tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #f97316, #dc2626)",
              boxShadow: "0 0 30px rgba(249,115,22,0.5), 0 4px 16px rgba(0,0,0,0.3)",
            }}>
            ¡Empezar!
          </button>
        </div>
      </div>
    </div>
  );
}
