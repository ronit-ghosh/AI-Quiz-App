"use client"

import QuizResults from "@/components/quiz-results"
import { useParams } from "next/navigation"

export default function page() {
    const { id } = useParams()

    return (
        <div>
            <QuizResults id={id} />
        </div>
    )
}
