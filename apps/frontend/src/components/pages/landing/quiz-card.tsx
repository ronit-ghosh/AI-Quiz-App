"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from 'date-fns'
import type { QuizCardProps } from "@/lib/types"
import { Trash2 } from "lucide-react"
import axios from "axios"
import { BACKEND_URL } from "@/lib/env"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export default function QuizCard({ name, length, created, desc, id }: QuizCardProps) {
  const router = useRouter()
  const { getToken } = useAuth()
  const formattedTime = formatDistanceToNow(new Date(created), { addSuffix: true })

  async function deleteQuiz() {
    const token = await getToken()
    try {
      await axios.delete(`${BACKEND_URL}/api/quiz/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast(`${name} Quiz Deleted`)
    } catch (error) {
      toast("Error occured, please try again!")
      console.error(error)
    }
  }

  return (
    <div className="group bg-card rounded-lg shadow-sm p-6">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <Trash2
          onClick={deleteQuiz}
          size={17}
          className="text-red-400 cursor-pointer group-hover:block hidden transition-all" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-primary/60">{length} questions</span>
        <span className="text-sm text-primary/60">Created {formattedTime}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1  rounded-full dark:bg-blue-900/40 bg-blue-100 dark:text-blue-200 text-blue-600 line-clamp-1 mr-2`}>{desc}</span>
        <Button className="" onClick={() => router.push(`/app/start-quiz/${id}`)}>
          Start Quiz
        </Button>
      </div>
    </div>
  )
}
