import React from 'react'
import StatCard from '../stat-card'
import { CheckCircle, ClipboardList, Clock } from 'lucide-react'

export default function Stats() {
    return (
        <div className="bg-card rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Your Quiz Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<ClipboardList className="h-6 w-6 text-blue-600" />}
                    value="12"
                    label="Quizzes Created"
                />

                <StatCard
                    icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
                    value="85%"
                    label="Average Score"
                />

                <StatCard
                    icon={<Clock className="h-6 w-6 text-blue-600" />}
                    value="8.2"
                    label="Hours Studied"
                />
            </div>
        </div>
    )
}
