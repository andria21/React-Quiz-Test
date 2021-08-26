import React, { useEffect, useState } from 'react';
import './App.css';
import Questionaire from './components/Questionaire';
import Button from './components/Button';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("")
  const [start, setStart] = useState(false);

  useEffect(async () => {
    const url = `https://opentdb.com/api.php?amount=10${category}${difficulty}`; // ase ar mushaobs, ubralod vcade...
    const response = await fetch(url);
    const data = await response.json();
    console.log(url);
    const questions = data.results.map((question) => ({
      ...question,
      answers: [
        question.correct_answer,
        ...question.incorrect_answers
      ].sort(() => Math.random() - 0.5),
    }));
    setQuestions(questions);

  }, [])

  const handlePlay = () => {
    setCurrentIndex(0);
    setScore(0);
    setCategory("");
    setDifficulty("");
    setStart(false);
  }

  const handleAnswer = (answer) => {
    // const newIndex = currentIndex + 1;
    // setCurrentIndex(newIndex);
    if(!showAnswers) {
      if(answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  }

  const handleCategory = () => {
    setCategory("&category=21");
  }
  const handleDifficulty = () => {
    setDifficulty("&difficulty=hard");
  }
  const handleStart = () => {
    setStart(true);
  }

  return start ? questions.length ? (
    <div className="container">
      { currentIndex >= questions.length ? (
          <h1 className="text-3xl text-white font-bold">
          Game ended! Your score is <span className="text-blue-800">{score}</span>. <br /> <br />
          <span className="text-blue-800 flex justify-center hover: cursor-pointer" onClick={handlePlay}>Try again!</span>
          </h1>
        ) : (
          <Questionaire 
            data={questions[currentIndex]} 
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            handleAnswer={handleAnswer}
            />
        )}
    </div>
  ) : <h2 className="text-2xl text-white font-bold">loading...</h2> : (
    <div>
        <h1 className="flex justify-center items-center mb-10 text-2xl text-white font-bold">Categories</h1>
        {/* es ubralod asarchevi tvalsachinoebistvis */}
        <Button text="Art" function={handleCategory} />
        <Button text="Sports" function={handleCategory} />
        <Button text="Animals" function={handleCategory} />
        <br /> <br />
        <h1 className="flex justify-center items-center mb-10 text-2xl text-white font-bold">Difficulty</h1>
        <Button text="Easy" function={handleDifficulty} />
        <Button text="Normal" function={handleDifficulty} />
        <Button text="Hard" function={handleDifficulty} />
        <button 
          onClick={handleStart}
          className={`mt-10 bg-black p-4 text-white font-bold rounded shadow min-w-full`}>
              Start
        </button>
    </div>
  );
}

export default App;
