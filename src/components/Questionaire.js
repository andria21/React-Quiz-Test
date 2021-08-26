import React, { useState } from 'react';

const Questionaire = ({ 
    showAnswers, 
    handleAnswer, 
    handleNextQuestion,
    data: {question, correct_answer, answers}}) => {

    return (
        <div>
          <div className="bg-white text-green-800 p-10 rounded-lg shadow-md">
            <h2 className="text-2xl" dangerouslySetInnerHTML={{ __html: question}} />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {answers.map((answer, id) => {
                const textColor = showAnswers ? answer === correct_answer ? "text-green-500" : "text-red-500" : "text-green-700";
                return (
                <button key={id} className={`bg-white p-4 ${textColor} font-semibold rounded shadow`} 
                onClick={() => handleAnswer(answer)} 
                dangerouslySetInnerHTML={{ __html: answer}} />
            )})}
            
          </div>
          <div className="flex justify-center items-center mt-10">
            {showAnswers && (
                <button 
                onClick={handleNextQuestion}
                className={`bg-green-700 p-4 text-white font-semibold rounded shadow`}>
                    Next Question
                </button>
            )}
          </div>
        </div>
    );
}


export default Questionaire;