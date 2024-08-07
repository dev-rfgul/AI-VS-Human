import React, { useState, useEffect } from "react";
import axios from "axios";

const HumanGuess = ({ onGameEnd }) => {
    const [userGuess, setUserGuess] = useState("");
    const [message, setMessage] = useState("");
    const [aiGuess, setAIGuess] = useState(null);
    const [error, setError] = useState("");

    const minRange = 1;
    const maxRange = 100;

    const GROQ_API_KEY = "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";

    useEffect(() => {
        aiGeneratedNumber();
    }, []);

    const aiGeneratedNumber = () => {
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
                } else {
                    setError("Failed to extract a valid integer from AI response");
                }
            })
            .catch((error) => {
                setError("Error fetching AI-generated number. Please try again.");
            });
    };

    const extractIntegerFromParagraph = (paragraph) => {
        const pattern = /\b\d+\b/;
        const match = paragraph.match(pattern);
        return match ? parseInt(match[0]) : null;
    };

    const handleSubmit = () => {
        if (userGuess < minRange || userGuess > maxRange) {
            setMessage(`Please enter a number between ${minRange} and ${maxRange}.`);
            return;
        }

        if (aiGuess !== null) {
            if (parseInt(userGuess) === aiGuess) {
                setMessage("You won!");
            } else if (parseInt(userGuess) > aiGuess) {
                setMessage("The Number is Greater than the Generated Number.");
            } else if (parseInt(userGuess) < aiGuess) {
                setMessage("The Number is Less than the Generated Number.");
            } else {
                setMessage("You lost.");
            }
        } else {
            setMessage("AI number not generated yet.");
        }
    };

    const handleReset = () => {
        setUserGuess("");
        setMessage("");
        setError("");
        aiGeneratedNumber();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-5xl font-bold text-blue-500 mb-4 text-center">Human Guess</h1>
                <p className="text-gray-600 mb-6  text-2xl text-center">Guess a number between 1 and 100</p>
                <input
                    type="number"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Reset
                    </button>
                    <button
                        onClick={onGameEnd}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Change Mode
                    </button>
                </div>
                {message && <p className="text-green-500 mt-4 text-2xl text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};
// adding text to check wether the github stats counter increases or not

export default HumanGuess;
