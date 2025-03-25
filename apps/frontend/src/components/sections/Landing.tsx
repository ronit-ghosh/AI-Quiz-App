import CreateQuizModal from "@/components/create-quiz-modal"
import CreateQuiz from "./Create-Quiz"
import RecentQuiz from "./Recent-Quiz"
import Stats from "./Stats"
import CreateQuizTips from "./Create-Quiz-Tips"

export default function Landing() {
  return (
    <main className="pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search for quizzes..."
            className="w-full py-3 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <CreateQuiz />
        <RecentQuiz />
        <Stats />
        <CreateQuizTips />
      </div>
      <CreateQuizModal />
    </main>
  )
}

