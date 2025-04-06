"use client"

import ReviewAnswers from "@/components/pages/stats/ReviewAnswers"
import { BACKEND_URL } from "@/lib/env"
import { StatTypes } from "@/lib/types"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
    const { getToken } = useAuth()
    const { id } = useParams()
    const [data, setData] = useState<StatTypes | null>(null)

    useEffect(() => {
        (async function fetchStats() {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/stats/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data.stats)
        })()
    }, [id])

    return (
        <div>
            {data && <ReviewAnswers data={data} />}
        </div>
    )
}
