"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/lib/env"
import { ParamValue } from "next/dist/server/request/params"
import { useAuth } from "@clerk/nextjs"
import { Award, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface StatsDataTypes {
  stats: {
    score: number
    totalQuestions: number
    answeredQuestions: number
    correctAnswers: number
    incorrectAnswers: number
  }
  categoryName: string
}

export default function QuizResults({ id }: { id: ParamValue }) {
  const router = useRouter()
  const { getToken } = useAuth()
  const [data, setData] = useState<StatsDataTypes>()

  useEffect(() => {
    (async function getStats() {
      const token = await getToken()
      try {
        const response = await axios.get(`${BACKEND_URL}/api/stats/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [getToken, id])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You've mastered this topic."
    if (score >= 80) return "Great job! You have a strong understanding."
    if (score >= 70) return "Good work! You know the material well."
    if (score >= 60) return "Not bad! You have a decent grasp of the material."
    if (score >= 50) return "You passed, but there's room for improvement."
    return "You might need to review this topic more thoroughly."
  }

  if (!data) return

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
          <p className="text-primary/60 mb-6">{data.categoryName}</p>

          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 relative flex items-center justify-center rounded-full bg-secondary">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(data.stats.score)}`}>{data.stats.score}%</div>
                <div className="text-primary mt-1">Your Score</div>
              </div>
            </div>
          </div>

          <p className="text-center text-lg mb-8">{getScoreMessage(data.stats.score)}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-secondary p-4 rounded-lg flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-primary">Total Questions</div>
                <div className="text-xl font-bold">{data.stats.totalQuestions}</div>
              </div>
            </div>

            <div className="bg-secondary p-4 rounded-lg flex items-center">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-primary">Answered</div>
                <div className="text-xl font-bold">{data.stats.answeredQuestions}</div>
              </div>
            </div>

            <div className="bg-secondary p-4 rounded-lg flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-primary">Correct</div>
                <div className="text-xl font-bold">{data.stats.correctAnswers}</div>
              </div>
            </div>

            <div className="bg-secondary p-4 rounded-lg flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-primary">Incorrect</div>
                <div className="text-xl font-bold">{data.stats.incorrectAnswers}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/app")}>
              Back to Home
            </Button>
            <Button className="flex-1">
              Review Answers
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

