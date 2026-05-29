import { useState, useCallback } from "react";
import Ruleta from "./components/Ruleta";
import ImageCard from "./components/ImageCard";
import QuizModal from "./components/QuizModal";
import ResultScreen from "./components/ResultScreen";
import { SEGMENTS } from "./data/questions";
import "./index.css";

export default function App() {
  const [gameState, setGameState] = useState("idle");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  // Ruleta now calls back with the exact icon the pointer landed on
  const handleIconSelected = useCallback((segIdx, image) => {
    setSelectedSegment(SEGMENTS[segIdx]);
    setSelectedImage(image);
    setGameState("segment-selected");
  }, []);

  const handleStartQuiz = useCallback(() => setGameState("quiz"), []);

  const handleFinishQuiz = useCallback(
    (correctCount, results) => {
      setQuizResult({ correctCount, results, total: selectedImage.preguntas.length });
      setGameState("result");
    },
    [selectedImage]
  );

  const handleReset = useCallback(() => {
    setGameState("idle");
    setSelectedSegment(null);
    setSelectedImage(null);
    setQuizResult(null);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-10 px-6"
      style={{ background: "#ffffff" }}
    >
      <div className="text-center mb-4">
        <h1 className="text-3xl font-black tracking-tight" style={{ color: "#0a1628" }}>
          Desafío <span style={{ color: "#1a9dc4" }}>Agronomy Tech</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8a9baa" }}>Agro Activa · Agricultura de Precisión</p>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <Ruleta
          onIconSelected={handleIconSelected}
          disabled={gameState !== "idle"}
        />
      </div>

      {gameState === "idle" && (
        <p className="text-xs text-center mt-4" style={{ color: "#aaa" }}>
          Girá la ruleta · Respondé 3 preguntas · Ganá el premio
        </p>
      )}

      {gameState === "segment-selected" && selectedImage && (
        <ImageCard
          image={selectedImage}
          segmentLabel={selectedSegment.label.replace(/\n/g, " ")}
          onStart={handleStartQuiz}
        />
      )}

      {gameState === "quiz" && selectedImage && (
        <QuizModal image={selectedImage} onFinish={handleFinishQuiz} />
      )}

      {gameState === "result" && quizResult && (
        <ResultScreen
          correctCount={quizResult.correctCount}
          total={quizResult.total}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
