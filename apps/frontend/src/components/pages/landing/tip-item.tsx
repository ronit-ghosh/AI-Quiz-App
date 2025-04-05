import { Info } from "lucide-react"

interface TipItemProps {
  text: string
}

export default function TipItem({ text }: TipItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-blue-500">
        <Info className="h-5 w-5" />
      </div>
      <p className="text-primary/60">{text}</p>
    </div>
  )
}

