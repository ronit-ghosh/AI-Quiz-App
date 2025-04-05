"use client"

import React, { useEffect, useState } from 'react'
import StatCard from './landing-stat-card'
import { CheckCircle, ClipboardList, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/env'

export default function Stats() {
    const [avgScore, setAvgScore] = useState(0)
    const [quizLen, setQuizLen] = useState(0)
    const [statsLen, setStatsLen] = useState(0)

    const fetchQuizLen = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/quiz/get/length`)
        setQuizLen(response.data.quizLength)
    }

    const fetchAvgScore = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/stats/get/average`)
        setAvgScore(response.data.average)
    }

    const fetchStatsLen = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/stats/get/length`)
        setStatsLen(response.data.statsLength)
    }

    useEffect(() => {
        fetchQuizLen()
        fetchAvgScore()
        fetchStatsLen()
    }, [])

    if (!avgScore || !quizLen || !statsLen) return (
        <div />
    )

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-8">Your Quiz Statistics</h2>
            <div className="bg-card rounded-lg shadow-sm p-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
                        value={avgScore + "%"}
                        label="Average Score"
                    />

                    <StatCard
                        icon={<ClipboardList className="h-6 w-6 text-blue-600" />}
                        value={String(quizLen)}
                        label="Quizzes Created"
                    />

                    <StatCard
                        icon={<Clock className="h-6 w-6 text-blue-600" />}
                        value={String(statsLen)}
                        label="Quizzes Attempted"
                    />
                </div>
                <Link className="flex" href="/app/stats">
                    <Button className='mt-10 mx-auto'>
                        View all stats
                    </Button>
                </Link>
            </div>
        </>
    )
}
