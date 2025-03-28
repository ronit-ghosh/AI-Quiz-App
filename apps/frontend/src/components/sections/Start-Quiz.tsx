"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFetchQuizzesById } from "@/hooks/use-fetchQuizzesById"
import axios from "axios"
import { ParamValue } from "next/dist/server/request/params"
import { BACKEND_URL } from "@/lib/env"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function StartQuiz({ id }: { id: ParamValue }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, string | null>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  // const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const { quizData } = useFetchQuizzesById(String(id))

  if (!quizData) return <div></div>

  const currentQuestion = quizData.questions[currentQuestionIndex]

  // FIXME: 
  // useEffect(() => {
  //   if (quizCompleted) return

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer)
  //         setQuizCompleted(true)
  //         return 0
  //       }
  //       return prev - 1
  //     })
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [quizCompleted])

  // Format time as MM:SS
  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60)
  //   const secs = seconds % 60
  //   return `${mins}:${secs.toString().padStart(2, "0")}`
  // }

  // Calculate progress percentage

  const handleAnswerSelect = (optionId: string) => {
    if (!currentQuestion || !currentQuestion.id) return
    if (selectedAnswer) return

    setSelectedAnswer(optionId)
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: optionId, // { questionId : optionId }
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
      // @ts-ignore
      setSelectedAnswer(userAnswers[quizData.questions[currentQuestionIndex - 1].id] || null)
      // @ts-ignore
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

  const totalQuestions = quizData.questions.length
  const answeredQuestions = Object.keys(userAnswers).length
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const createStats = async () => {
    if (quizCompleted) {
      let correctAnswers = 0
      let incorrectAnswers = 0

      quizData.questions.forEach(q => {
        const userAns = userAnswers[Number(q.id)]
        if (userAns === undefined || userAns === null) return
        if (userAns === q.correct) {
          correctAnswers++
        } else {
          incorrectAnswers++
        }
      })

      const score = correctAnswers / answeredQuestions * 100
      console.log(incorrectAnswers)
      try {
        const response = await axios.post(`${BACKEND_URL}/api/stats/create`, {
          totalQuestions,
          answeredQuestions,
          correctAnswers,
          incorrectAnswers,
          score,
          categoryId: String(id)
        })
        toast(response.data.statsId)
        router.push(`/stats/${response.data.statsId}`)
      } catch (error) {
        toast("Something went wrong!")
        console.error(error)
      }
    }
  }

  if (quizCompleted) return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-card h-56 grid place-items-center rounded-lg shadow-sm overflow-hidden">
        <Button onClick={createStats}>Generate Stats</Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{quizData.name}</h1>
              <p className="text-primary/60">{quizData.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              {/*FIXME: <div className="flex items-center gap-1 dark:bg-blue-900/40 dark:text-blue-100 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div> */}
              <div className="text-gray-700 font-medium">
                {currentQuestionIndex + 1}/{totalQuestions}
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-6">{currentQuestion?.question}</h2>

            <div className="space-y-3">
              {currentQuestion?.options.map((option) => {
                const isSelected = selectedAnswer === option.optionId
                const isCorrect = option.optionId === currentQuestion?.correct

                let optionClass = "border rounded-lg p-4 flex items-center cursor-pointer hover:bg-primary/5 font-medium"

                if (isSelected) {
                  optionClass = isCorrect
                    ? "border-2 border-green-500 bg-green-50 dark:bg-green-200 rounded-lg p-4 flex items-center text-green-500 font-bold"
                    : "border-2 border-red-500 bg-red-50 dark:bg-red-200 rounded-lg p-4 flex items-center text-red-500 font-bold"
                }

                return (
                  <div
                    key={option.optionId}
                    className={optionClass}
                    onClick={() => handleAnswerSelect(option.optionId)}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium">{option.optionId}</span>
                    </div>
                    <span className="flex-grow">{option.option}</span>
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
                disabled={selectedAnswer === null && userAnswers[Number(currentQuestion!.id)] === undefined}
              >
                Next Question
              </Button>
            </div>
          </div>

          {showExplanation && (
            <div
              className={`p-4 rounded-lg mt-6 ${selectedAnswer === currentQuestion?.correct
                ? "bg-green-100 dark:bg-green-200 border border-green-200 text-green-500 font-bold"
                : "bg-red-100 dark:bg-red-200 border border-red-200 text-red-500 font-bold"
                }`}
            >
              <p className="font-medium mb-1">
                {selectedAnswer === currentQuestion?.correct ? "Correct!" : "Incorrect!"}
              </p>
              <p>{currentQuestion?.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

