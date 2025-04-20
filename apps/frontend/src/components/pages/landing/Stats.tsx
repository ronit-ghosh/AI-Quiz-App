"use client"

import React, { useEffect, useState } from 'react'
import StatCard from './landing-stat-card'
import { CheckCircle, ClipboardList, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/env'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export default function Stats() {
    const { getToken } = useAuth()
    const [avgScore, setAvgScore] = useState(0)
    const [quizLen, setQuizLen] = useState(0)
    const [statsLen, setStatsLen] = useState(0)
    const router = useRouter()

    useEffect(() => {
        (async function fetchQuizLen() {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/quiz/get/length`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setQuizLen(response.data.quizLength)
        })()
    }, [getToken])

    useEffect(() => {
        (async function fetchAvgScore() {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/stats/get/average`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAvgScore(response.data.average)
        })()
    }, [getToken])

    useEffect(() => {
        (async function fetchStatsLen() {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/stats/get/length`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setStatsLen(response.data.statsLength)
        })()
    }, [getToken])

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-8">Your Quiz Statistics</h2>
            <div className="bg-card rounded-lg shadow-sm p-8 mb-12 border dark:border-neutral-900 border-neutral-50 bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-950 from-neutral-50 to-neutral-100">
                {
                    !avgScore || !quizLen || !statsLen ?
                        <div className="text-xl text-center underline">
                            You haven&apos;t participated in any quiz yet
                        </div> :
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
                }
                <div className="flex">
                    <Button
                        onClick={() => router.push("/app/stats")}
                        disabled={!avgScore || !quizLen || !statsLen}
                        className='mt-10 mx-auto'>
                        View all stats
                    </Button>
                </div>
            </div>
        </>
    )
}
