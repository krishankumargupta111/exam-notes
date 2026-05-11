import React, { useState } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState("true");
  const [includeDiagram, setIncludeDiagram] = useState("true");
  const [includeChart, setIncludeChart] = useState("true");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });
      
      setResult(result.data);
      setLoading(false);
      setClassLevel("")
      setTopic("")
      setExamType("")
      setIncludeChart(false)
      setRevisionMode(false)
      setIncludeDiagram(false)
      
   
        dispatch(updateCredits(result.creditsLeft))
    
      
    } catch (error) {
      console.log(error);
      setError("failed to fetch notes from server");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 95) {
        value = 95;
        setProgressText("Almost done");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("finalizing notes");
      } else if (value > 40) {
        setProgressText("processing text");
      } else {
        setProgressText("generating notes");
      }

      setProgress(Math.floor(value));
    }, 700);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
    rounded-2xl 
    bg-gradient-to-br from-black/90 via-black/90 to-black/90
    backdrop-blur-2xl
    border border-white/10
    shadow-[0_25px_60px_rgba(0,0,0,0.75)] 
    p-8
    space-y-6
    text-white"
    >
      <input
        type="text"
        className="w-full p-3 rounded-xl
      bg-white/10 backdrop-blur-lg
      border border-white/20
      placeholder-gray-400
      text-white
      focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter topic (e.g Web Development)"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl
      bg-white/10 backdrop-blur-lg
      border border-white/20
      placeholder-gray-400
      text-white
      focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Class /Level (e.g.class 10)"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl
      bg-white/10 backdrop-blur-lg
      border border-white/20
      placeholder-gray-400
      text-white
      focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Exam Type (e.g CBSE,JEE,NEET)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />
      <div className="flex flex-col md:flex-row gap-6">
        <Toogle
          label="Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toogle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toogle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>
      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={`
  w-full mt-4
  py-3 rounded-xl
  font-semibold
  flex items-center justify-center gap-3
  transition
  ${loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
          }
  `}
      >
        {loading ? "Geneating Notes..." : "Generate Notes"}
      </motion.button>

      {loading && (
        <div className="mt-4 space-y-2">
          <div
            className="w-full h-2 rounded-full bg-white/10
        overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className="h-full bg-gradient-to-br from-green-400
          via-emerald-400 to-green-500"
            ></motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>{progressText}</span>
            <span>{progress}</span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            This may take up to 2-5 minutes please do not close or refresh page
          </p>
        </div>
      )}
    </motion.div>
  );
}
function Toogle({ label, checked, onChange }) {
  return (
    <div
      className="flex flex-center gap-4 cursor-pointer select-none"
      onClick={onChange}
    >
      <motion.div
        layout
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full
    border border-white/20
    backdrop-blur-lg"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full
      bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)"
          style={{
            left: checked ? "1.6rem" : "0.25rem",
          }}
        ></motion.div>
      </motion.div>
      <span
        className={`text-sm transition-colors
        ${checked ? "text-green-300" : "text-gray-300"}
        `}
      >
        {label}
      </span>
    </div>
  );
}

export default TopicForm;
