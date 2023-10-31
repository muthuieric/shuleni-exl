import React, { useState } from 'react';

// Define the quiz questions and answers
const quizData = [
  {
    question: 'What does AI stand for?',
    options: ['A. Artificial Ignition', 'B. Artificial Intelligence', 'C. Automated Interaction', 'D. All Inclusive'],
    correctAnswer: 'B. Artificial Intelligence',
  },
  {
    question: 'Which programming language is commonly used for AI?',
    options: ['A. Python', 'B. JavaScript', 'C. Java', 'D. C++'],
    correctAnswer: 'A. Python',
  },
  // Add more questions here
];

function AIQuiz() {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmitQuiz = () => {
    let userScore = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] === quizData[i].correctAnswer) {
        userScore++;
      }
    }
    setScore(userScore);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">AI Quiz</h1>
      {quizData.map((questionData, index) => (
        <div key={index} className="bg-white p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">{questionData.question}</h2>
          <div className="mt-2">
            {questionData.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmitQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {score > 0 && <p className="mt-4">Your Score: {score} / {quizData.length}</p>}
    </div>
  );
}

export default AIQuiz;
