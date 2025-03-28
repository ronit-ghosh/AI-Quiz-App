import { BACKEND_URL } from "@/lib/env";
import type { QuizCardProps } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useFetchCategoriesBulk() {
    const [categories, setCategories] = useState<QuizCardProps[]>()
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(0)

    async function fetchData() {
        try {
            setLoading(true)
            const response = await axios.get(`${BACKEND_URL}/api/quiz/get/category`)
            setCategories(response.data.categories)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast((error as Error).message)
            console.error("Whole error: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [reload])

    const reloadData = () => setReload(prev => prev + 1)

    return {
        categories,
        loading,
        reloadData
    }
}