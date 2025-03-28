"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from 'date-fns'
import type { QuizCardProps } from "@/lib/types"

export default function QuizCard({ name, length, created, desc, id }: QuizCardProps) {
  const router = useRouter()
  const formattedTime = formatDistanceToNow(new Date(created), { addSuffix: true })

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-primary/60">{length} questions</span>
        <span className="text-sm text-primary/60">Created {formattedTime}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1  rounded-full dark:bg-blue-900/40 bg-blue-100 dark:text-blue-200 text-blue-600 line-clamp-1 mr-2`}>{desc}</span>
        <Button className="" onClick={() => router.push(`/start-quiz/${id}`)}>
          Start Quiz
        </Button>
      </div>
    </div>
  )
}
