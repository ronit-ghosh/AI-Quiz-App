"use client"

import ReviewAnswers from "@/components/ReviewAnswers"
import { BACKEND_URL } from "@/lib/env"
import { StatTypes } from "@/lib/types"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
    const { id } = useParams()
    const [data, setData] = useState<StatTypes | null>(null)

    useEffect(() => {
        (async function fetchStats() {
            const response = await axios.get(`${BACKEND_URL}/api/stats/get/${id}`)
            setData(response.data.stats)
        })()
    }, [id])

    return (
        <div>
            {data && < ReviewAnswers data={data} />}
        </div>
    )
}
