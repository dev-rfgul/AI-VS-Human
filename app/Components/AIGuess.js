import React, { useState, useEffect } from "react";
import Sound from "react-sound";
import axios from "axios";

const AIGuess = ({ onGameEnd }) => {
  const [number, setNumber] = useState("");
  const [AIGuess, setAIGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAIScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);

  const getNumberFromUser = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 100) {
      setNumber(value);
    }
  };

  const playAudio = () => {
    setAudioPlaying(true);
  };

  const getCompletionFromAI = () => {
    const GROQ_API_KEY = "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";
    const requestData = {
      messages: [
        {
          role: "system",
          content: `Generate a random integer between ${minRange} and ${maxRange} without any extra text.`,
        },
      ],
      model: "llama3-8b-8192",
    };

    axios
      .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data.choices[0].message.content;
        const extractedNumber = extractIntegerFromParagraph(data);
        if (extractedNumber !== null) {
          setAIGuess(extractedNumber);
          setAttempts(1);
        } else {
          console.error("Failed to extract a valid integer from AI response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generateNextNumber = (greaterThan) => {
    if (attempts < 15) {
      const newMin = greaterThan ? AIGuess + 1 : minRange;
      const newMax = greaterThan ? maxRange : AIGuess - 1;

      setMinRange(newMin);
      setMaxRange(newMax);

      const GROQ_API_KEY = "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";
      const requestData = {
        messages: [
          {
            role: "system",
            content: `Generate a random integer between ${newMin} and ${newMax} without any extra text.`,
          },
        ],
        model: "llama3-8b-8192",
      };

      axios
        .post("https://api.groq.com/openai/v1/chat/completions", requestData, {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data.choices[0].message.content;
          const extractedNumber = extractIntegerFromParagraph(data);
          if (extractedNumber !== null) {
            setAIGuess(extractedNumber);
            setAttempts((prev) => prev + 1);
            if (extractedNumber === parseInt(number)) {
              handleGameWon();
            }
          } else {
            console.error("Failed to extract a valid integer from AI response");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    setUserScore((prev) => prev + 1);
  };

  const handleGameWon = () => {
    setGameWon(true);
    setAIScore((prev) => prev + 1);
  };

  const extractIntegerFromParagraph = (paragraph) => {
    const pattern = /\b\d+\b/;
    const match = paragraph.match(pattern);
    return match ? parseInt(match[0]) : null;
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      <div>
        <Sound
          url="/sound.mp3"
          playStatus={
            audioPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          volume={100}
        />
      </div>
      <div className="text-center bg-white p-10 rounded-lg shadow-2xl max-w-lg mx-auto">
        <h1 className="text-6xl font-extrabold mb-8 text-blue-800">
          AI VS HUMAN
        </h1>
        <div className="flex flex-col justify-center text-center">
          <input
            onChange={getNumberFromUser}
            placeholder="Enter the Number from 1 - 100"
            type="number"
            value={number}
            className="border-2 border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
          />
          <button
            onClick={() => {
              getCompletionFromAI();
              playAudio();
            }}
            className="mt-5 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
          >
            Start Game
          </button>
          <button
            onClick={() => onGameEnd()}

            className="bg-red-500 mt-3   text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Change Mode
          </button>
          {attempts > 0 && !gameOver && !gameWon && (
            <div className="text-center mt-8">
              <h2 className="text-2xl text-black font-bold mb-4">
                AI Generated Number: {AIGuess}
              </h2>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => generateNextNumber(true)}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 mr-2 transition duration-300"
                >
                  Greater
                </button>
                <button
                  onClick={() => generateNextNumber(false)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Smaller
                </button>

              </div>
            </div>
          )}

          {gameOver && (
            <div className="text-center mt-8">
              <h2 className="text-2xl text-black font-bold mb-4">AI Lose</h2>
              <button
                onClick={() => {
                  setGameOver(false);
                  setAttempts(0);
                  setAIGuess("");
                  setMinRange(1);
                  setMaxRange(100);
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Reset Game
              </button>
            </div>
          )}

          {gameWon && (
            <div className="text-center mt-8">
              <h2 className="text-2xl text-black font-bold mb-4">AI Wins</h2>
              <button
                onClick={() => {
                  setGameWon(false);
                  setAttempts(0);
                  setAIGuess("");
                  setMinRange(1);
                  setMaxRange(100);
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Reset Game
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="fixed top-4 right-4 bg-white border border-gray-300 p-4 rounded shadow-md text-black font-bold">
        Your Score: {userScore}
      </div>
      <div className="fixed top-20 right-4 bg-white border border-gray-300 p-4 rounded shadow-md text-black font-bold">
        AI Score: {aiScore}
      </div>


    </div>
  );
};

export default AIGuess;
