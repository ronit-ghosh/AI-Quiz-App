import CreateQuizModal from "@/components/create-quiz-modal"
import CreateQuiz from "./Create-Quiz"
import RecentQuiz from "./Recent-Quiz"
import Stats from "./Stats"
import CreateQuizTips from "./Create-Quiz-Tips"

export default function Landing() {
  return (
    <main className="pb-12">
      <div className="container mx-auto px-4 py-8">
        <CreateQuiz />
        <RecentQuiz />
        <Stats />
        <CreateQuizTips />
      </div>
      <CreateQuizModal />
    </main>
  )
}

