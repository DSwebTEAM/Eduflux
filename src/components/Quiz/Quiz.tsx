import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { Quiz as QuizType } from '../../types';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function Quiz({ quiz, onComplete, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const points = correctAnswers * 10;
    
    setShowResults(true);
    onComplete(points);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
  };

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {passed ? <Award className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            You scored {correctAnswers} out of {quiz.questions.length} questions correctly
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1">{score}%</div>
            <div className="text-sm text-gray-600">
              {passed ? `Passed! (Required: ${quiz.passingScore}%)` : `Failed (Required: ${quiz.passingScore}%)`}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
            
            <button
              onClick={onBack}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Topic</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Topic</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = 'w-full p-4 text-left border rounded-lg transition-colors ';
              
              if (isAnswered) {
                if (index === question.correctAnswer) {
                  buttonClass += 'border-green-500 bg-green-50 text-green-700';
                } else if (index === selectedAnswers[currentQuestion]) {
                  buttonClass += 'border-red-500 bg-red-50 text-red-700';
                } else {
                  buttonClass += 'border-gray-200 text-gray-500';
                }
              } else {
                buttonClass += 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700';
              }

              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {isAnswered && index === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {isAnswered && index === selectedAnswers[currentQuestion] && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}