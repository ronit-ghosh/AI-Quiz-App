"use client"

import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useStatStore } from "@repo/store";
import SingleStats from "./SingleStats";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function StatsPage() {
  const {
    fetchStats,
    statsData,
    loading,
    fetchStatsLen,
    statsLength
  } = useStatStore()
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchStatsLen()
  }, [])

  useEffect(() => {
    if (statsLength === 0) return;
    fetchStats(page)
  }, [page, statsLength])

  if (statsData.length == 0) return (
    <div className="grid place-items-center h-[80vh] text-xl">
      You have not yet attemped any quiz
    </div>
  )

  return (
    <div className="min-h-screen p-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-4">Your Quiz Statistics</h2>
      {
        statsData.map((stat, i) => {
          const time = formatDistanceToNow(new Date(stat.createdAt), { addSuffix: true })
          return (
            <SingleStats
              key={i}
              id={stat.id}
              answeredQuestions={stat.answeredQuestions}
              correctAnswers={stat.correctAnswers}
              incorrectAnswers={stat.incorrectAnswers}
              score={stat.score}
              totalQuestions={stat.totalQuestions}
              time={time}
              name={stat.category.name}
            />
          )
        })
      }
      <div className="flex gap-2 items-center mx-auto">
        <Button
          disabled={page === 1}
          className={`mx-auto`}
          onClick={() => setPage(page - 1)}
        >
          {
            loading ?
              "..." :
              <ArrowLeft />
          }
        </Button>

        <Button
          disabled={page > Math.floor(statsLength / 5)}
          className={`mx-auto`}
          onClick={() => setPage(page + 1)}
        >
          {
            loading ?
              "..." :
              <ArrowRight />
          }
        </Button>
      </div>
    </div>
  )
}


