import { BACKEND_URL } from "@/lib/env";
import { QuizData } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useFetchQuizzesById(id: string) {
    const [quizData, setQuizData] = useState<QuizData>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.get(`${BACKEND_URL}/api/quiz/get/${id}`)
                setQuizData(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast((error as Error).message)
                console.error("Whole error: ", error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return {
        quizData,
        loading
    }
}