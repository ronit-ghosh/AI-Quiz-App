"use client"

import StartQuiz from '@/components/sections/Start-Quiz'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const { id } = useParams()
    return (
        <>
            <StartQuiz id={id} />
        </>
    )
}
