import CreateQuizModal from "./create-quiz-modal"
import CreateQuiz from "./CreateQuiz"
import RecentQuiz from "./RecentQuiz"
import Stats from "./Stats"

export default function Landing() {
  return (
    <main className="pb-12">
      <div className="container mx-auto px-4 py-8">
        <CreateQuiz />
        <RecentQuiz />
        <Stats />
      </div>
      <CreateQuizModal />
    </main>
  )
}

