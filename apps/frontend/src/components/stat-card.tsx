import type { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  value: string
  label: string
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-full dark:bg-blue-900/40 bg-blue-100 flex items-center justify-center mb-4`}>{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-primary/60 text-sm">{label}</div>
    </div>
  )
}

