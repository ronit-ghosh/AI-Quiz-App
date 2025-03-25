// "use client"
import Link from 'next/link'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/button'

export default function Navbar() {
    return (
        <div className="relative max-w-5xl h-16 grid place-items-center mx-auto">
            <div className="fixed z-10 top-3 h-16 max-w-5xl w-[96%] rounded-2xl xs:px-6 px-2 flex items-center justify-between border bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
                <Link href="/">
                    <h1 className="sm:text-3xl text-2xl font-bold text-blue-700 mb-2">Quiz AI</h1>
                </Link>
                <div className="flex items-center gap-2">
                    <Button>Signup</Button>
                    <Button>Signin</Button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
