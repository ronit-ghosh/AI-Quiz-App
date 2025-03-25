"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizResults from "@/components/quiz-results"
import { useFetchQuizzesById } from "@/hooks/use-fetchQuizzesById"

interface Question {
  id: number
  text: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
  explanation: string
}

export default function StartQuiz({ id }: { id: string }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, string | null>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  // const { quizData, loading } = useFetchQuizzesById(id)

  // Sample quiz data - in a real app, this would come from an API or props
  const quizData = {
    title: "Biology Fundamentals Quiz",
    description: "10 multiple choice questions • Medium difficulty",
    questions: [
      {
        id: 1,
        text: "What is the main function of mitochondria in a cell?",
        options: [
          { id: "A", text: "Protein synthesis" },
          { id: "B", text: "Energy production" },
          { id: "C", text: "Cell division" },
          { id: "D", text: "Waste removal" },
        ],
        correctAnswer: "B",
        explanation:
          "Mitochondria are known as the powerhouse of the cell and are responsible for producing ATP through cellular respiration.",
      },
      {
        id: 2,
        text: "Which of the following is NOT a function of the cell membrane?",
        options: [
          { id: "A", text: "Protection" },
          { id: "B", text: "Transport of materials" },
          { id: "C", text: "Energy production" },
          { id: "D", text: "Cell recognition" },
        ],
        correctAnswer: "C",
        explanation:
          "The cell membrane provides protection, controls what enters and exits the cell, and helps with cell recognition. Energy production primarily occurs in the mitochondria.",
      },
      {
        id: 3,
        text: "Which organelle is responsible for protein synthesis?",
        options: [
          { id: "A", text: "Ribosomes" },
          { id: "B", text: "Golgi apparatus" },
          { id: "C", text: "Lysosomes" },
          { id: "D", text: "Peroxisomes" },
        ],
        correctAnswer: "A",
        explanation:
          "Ribosomes are the cellular structures responsible for protein synthesis. They can be found free in the cytoplasm or attached to the endoplasmic reticulum.",
      },
      {
        id: 4,
        text: "What is the primary role of DNA in a cell?",
        options: [
          { id: "A", text: "Energy storage" },
          { id: "B", text: "Structural support" },
          { id: "C", text: "Genetic information storage" },
          { id: "D", text: "Waste elimination" },
        ],
        correctAnswer: "C",
        explanation:
          "DNA (deoxyribonucleic acid) contains the genetic instructions used in the development and functioning of all known living organisms.",
      },
      {
        id: 5,
        text: "Which of the following is a function of the Golgi apparatus?",
        options: [
          { id: "A", text: "Protein synthesis" },
          { id: "B", text: "Lipid synthesis" },
          { id: "C", text: "Packaging and modification of proteins" },
          { id: "D", text: "Energy production" },
        ],
        correctAnswer: "C",
        explanation:
          "The Golgi apparatus is responsible for packaging proteins into vesicles, modifying proteins, and sending them to their final destination.",
      },
      {
        id: 6,
        text: "What is the process by which cells divide to form two identical daughter cells?",
        options: [
          { id: "A", text: "Meiosis" },
          { id: "B", text: "Mitosis" },
          { id: "C", text: "Cytokinesis" },
          { id: "D", text: "Binary fission" },
        ],
        correctAnswer: "B",
        explanation:
          "Mitosis is the process by which a cell duplicates its chromosomes and then divides to form two identical daughter cells.",
      },
      {
        id: 7,
        text: "Which of the following is NOT a component of the cell nucleus?",
        options: [
          { id: "A", text: "Nucleolus" },
          { id: "B", text: "Chromatin" },
          { id: "C", text: "Nuclear envelope" },
          { id: "D", text: "Ribosomes" },
        ],
        correctAnswer: "D",
        explanation:
          "Ribosomes are not components of the nucleus. They are found in the cytoplasm or attached to the endoplasmic reticulum.",
      },
      {
        id: 8,
        text: "What is the main function of chloroplasts in plant cells?",
        options: [
          { id: "A", text: "Cellular respiration" },
          { id: "B", text: "Photosynthesis" },
          { id: "C", text: "Protein synthesis" },
          { id: "D", text: "Waste removal" },
        ],
        correctAnswer: "B",
        explanation:
          "Chloroplasts are organelles found in plant cells that convert light energy into chemical energy through photosynthesis.",
      },
      {
        id: 9,
        text: "Which of the following is responsible for breaking down waste materials and cellular debris?",
        options: [
          { id: "A", text: "Lysosomes" },
          { id: "B", text: "Peroxisomes" },
          { id: "C", text: "Vacuoles" },
          { id: "D", text: "Endoplasmic reticulum" },
        ],
        correctAnswer: "A",
        explanation:
          "Lysosomes contain digestive enzymes that break down waste materials, cellular debris, and foreign invaders like bacteria.",
      },
      {
        id: 10,
        text: "What is the primary component of the cell wall in plants?",
        options: [
          { id: "A", text: "Protein" },
          { id: "B", text: "Lipid" },
          { id: "C", text: "Cellulose" },
          { id: "D", text: "Chitin" },
        ],
        correctAnswer: "C",
        explanation:
          "The cell wall in plants is primarily made of cellulose, a complex carbohydrate that provides structural support.",
      },
    ],
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const totalQuestions = quizData.questions.length
  const answeredQuestions = Object.keys(userAnswers).length

  // Timer effect
  useEffect(() => {
    if (quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setQuizCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizCompleted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswerSelect = (optionId: string) => {
    if (selectedAnswer) return // Prevent changing answer after selection

    setSelectedAnswer(optionId)
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: optionId,
    })
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(userAnswers[quizData.questions[currentQuestionIndex - 1].id] || null)
      setShowExplanation(userAnswers[quizData.questions[currentQuestionIndex - 1].id] !== null)
    }
  }

  const handleSkip = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  // Calculate quiz results
  const calculateResults = () => {
    let correctCount = 0
    let incorrectCount = 0

    quizData.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id]
      if (userAnswer === question.correctAnswer) {
        correctCount++
      } else if (userAnswer !== null && userAnswer !== undefined) {
        incorrectCount++
      }
    })

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      score: Math.round((correctCount / totalQuestions) * 100),
    }
  }

  if (quizCompleted) {
    return <QuizResults results={calculateResults()} quizTitle={quizData.title} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{quizData.title}</h1>
              <p className="text-primary/60">{quizData.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 dark:bg-blue-900/40 dark:text-blue-100 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-gray-700 font-medium">
                {currentQuestionIndex + 1}/{totalQuestions}
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-6">{currentQuestion?.text}</h2>

            <div className="space-y-3">
              {currentQuestion?.options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.id === currentQuestion?.correctAnswer

                let optionClass = "border rounded-lg p-4 flex items-center cursor-pointer hover:bg-primary/5 font-medium"

                if (isSelected) {
                  optionClass = isCorrect
                    ? "border-2 border-green-500 bg-green-50 dark:bg-green-200 rounded-lg p-4 flex items-center text-green-500 font-bold"
                    : "border-2 border-red-500 bg-red-50 dark:bg-red-200 rounded-lg p-4 flex items-center text-red-500 font-bold"
                }

                return (
                  <div key={option.id} className={optionClass} onClick={() => handleAnswerSelect(option.id)}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium">{option.id}</span>
                    </div>
                    <span className="flex-grow">{option.text}</span>
                    {isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-600 ml-2" />}
                    {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600 ml-2" />}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSkip} disabled={selectedAnswer !== null}>
                Skip
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null && userAnswers[currentQuestion!.id] === undefined}
              >
                Next Question
              </Button>
            </div>
          </div>

          {showExplanation && (
            <div
              className={`p-4 rounded-lg mt-6 ${selectedAnswer === currentQuestion?.correctAnswer
                ? "bg-green-100 dark:bg-green-200 border border-green-200 text-green-500 font-bold"
                : "bg-red-100 dark:bg-red-200 border border-red-200 text-red-500 font-bold"
                }`}
            >
              <p className="font-medium mb-1">
                {selectedAnswer === currentQuestion?.correctAnswer ? "Correct!" : "Incorrect!"}
              </p>
              <p>{currentQuestion?.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

