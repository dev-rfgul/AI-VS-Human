import React from "react";

const Dummy = () => {
    return (
        <div>
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

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                    <h1 className="text-5xl font-bold text-blue-500 mb-4 text-center">
                        Human Guess
                    </h1>
                    <p className="text-gray-600 mb-6  text-2xl text-center">
                        Guess a number between 1 and 100
                    </p>
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
                    {message && (
                        <p className="text-green-500 mt-4 text-2xl text-center">
                            {message}
                        </p>
                    )}
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Dummy;
// duummy content to just see the counter
// adding dummy content again 
// duummy content to just see the counter
