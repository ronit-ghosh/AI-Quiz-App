import StatsPage from "@/components/StatsPage";
import { BACKEND_URL } from "@/lib/env";
import { BulkStatsTypes } from "@/lib/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

async function fetchStats() {
    const response = await axios.get(`${BACKEND_URL}/api/stats/get`)
    return response.data.stats
}

export default async function page() {
    const stats: BulkStatsTypes[] = await fetchStats()
    console.log(stats)
    return (
        <div className="min-h-screen p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center mb-4">Your Quiz Statistics</h2>
            {
                stats.map((stat, i) => {
                    const time = formatDistanceToNow(new Date(stat.createdAt), { addSuffix: true })
                    return (
                        <StatsPage
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
        </div>
    )
}
