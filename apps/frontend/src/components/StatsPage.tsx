"use client"

import StatsPageCard from "./StatsPageCard"
import { ClipboardList, CheckCircle, XCircle, Award, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function StatsPage(props: {
  id?: string
  answeredQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  totalQuestions: number
  time: string
  name: string
  isReviewPage?: Boolean
}) {
  const {
    id,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    score,
    totalQuestions,
    time,
    name,
    isReviewPage
  } = props
  const router = useRouter()

  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="bg-card backdrop-blur-lg rounded-2xl p-6 border border-secondary-700/50">
        <div className="mb-4 flex gap-2 items-center">
          <span className="text-lg font-bold uppercase">
            {name}
          </span>
          <span className="text-primary/70 capitalize text-sm">
            {time}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <StatsPageCard
            icon={ClipboardList}
            label="Answered Questions"
            value={answeredQuestions}
            bgColor="dark:bg-cyan-900/40 bg-cyan-100"
            iconColor="text-cyan-500"
          />
          <StatsPageCard
            icon={CheckCircle}
            label="Correct Answers"
            value={correctAnswers}
            bgColor="dark:bg-green-900/40 bg-green-100"
            iconColor="text-green-500"
          />
          <StatsPageCard
            icon={XCircle}
            label="Incorrect Answers"
            value={incorrectAnswers}
            bgColor="dark:bg-red-900/40 bg-red-100"
            iconColor="text-red-500"
          />
          <StatsPageCard
            icon={Award}
            label="Score"
            value={score}
            bgColor="dark:bg-yellow-900/40 bg-yellow-100"
            iconColor="text-yellow-500"
          />
          <StatsPageCard
            icon={BarChart3}
            label="Total Questions"
            value={totalQuestions}
            bgColor="dark:bg-violet-900/40 bg-violet-100"
            iconColor="text-violet-500"
          />
        </div>

        <div className={`grid place-items-end ${isReviewPage ? "hidden" : "block"}`}>
          <Button onClick={
            () => router.push(`/stats/${id}`)
          }>
            Review Answers
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
