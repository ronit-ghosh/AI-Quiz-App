"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParamValue } from "next/dist/server/request/params"
import { useQuizStore, useStatStore } from "@repo/store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export default function StartQuiz({ id }: { id: ParamValue }) {
  const router = useRouter()
  const { getToken } = useAuth()
  const [creatingStat, setCreatingStat] = useState(false)
  const {
    fetchQuizData,
    quizData,
    currentQuestionIndex,
    handleAnswerSelect,
    handleNext,
    handlePrev,
    handleSkip,
    handleReset,
    selectedAnswer,
    showExplanation,
    userAnswers,
    quizCompleted
  } = useQuizStore()
  const { calculateStats, createStats } = useStatStore()

  useEffect(() => {
    (async function fetchData() {
      const token = await getToken()
      fetchQuizData(String(id), token!)
    })()
  }, [fetchQuizData, id, getToken])

  if (!quizData) return <div />

  const createStatsAsync = async () => {
    if (!quizCompleted) return
    setCreatingStat(true)
    const token = await getToken()

    const {
      answeredQuestions,
      correctAnswers,
      incorrectAnswers,
      score
    } = calculateStats()

    if (
      !answeredQuestions ||
      !correctAnswers ||
      !incorrectAnswers ||
      !score
    ) return
    const statsId = await createStats(
      answeredQuestions,
      correctAnswers,
      incorrectAnswers,
      score,
      String(id),
      token!
    )
    setCreatingStat(false)
    if (statsId) {
      toast(statsId)
      router.push(`/app/stats/${statsId}`)
    }
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const totalQuestions = quizData.questions.length
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden bg-gradient-to-b border dark:border-neutral-900 border-neutral-50 dark:from-neutral-900 dark:to-neutral-950 from-neutral-50 to-neutral-100">

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{quizData.name}</h1>
              <p className="text-primary/60">{quizData.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 dark:bg-blue-900/40 dark:text-blue-100 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{"600"}</span>
              </div>
              <div className="text-gray-700 font-medium">
                {currentQuestionIndex + 1}/{totalQuestions}
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-full bg-gray-200 rounded-full h-2 flex gap-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}>
              Reset
            </Button>
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
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.optionId)}>
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
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}>
              Previous Question
            </Button>
            {creatingStat ?
              <Button
                disabled
                variant="ghost">
                Generating Stats...
              </Button> :
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1
                    handleNext()
                    if (isLastQuestion) {
                      createStatsAsync()
                    }
                  }}
                  disabled={selectedAnswer !== null || creatingStat}>
                  Skip
                </Button>
                <Button
                  onClick={() => {
                    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1
                    handleSkip()
                    if (isLastQuestion) {
                      createStatsAsync()
                    }
                  }}
                  disabled={selectedAnswer === null && userAnswers[Number(currentQuestion!.id)] === undefined || creatingStat}
                >
                  Next Question
                </Button>
              </div>
            }
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

