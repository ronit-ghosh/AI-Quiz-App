"use client"

import Link from 'next/link'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { Github } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar({ isLanding }: { isLanding?: boolean }) {
    return (
        <div className="relative max-w-5xl h-16 grid place-items-center mx-auto">
            <div className="fixed z-10 top-3 h-16 max-w-5xl w-[96%] rounded-2xl xs:px-6 px-2 flex items-center justify-between border bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
                <Link href={`${isLanding ? "/" : "/app"}`}>
                    <h1 className="sm:text-3xl text-2xl font-bold bg-gradient-to-bl from-blue-500 to-blue-700 bg-clip-text text-transparent">Quiz AI</h1>
                </Link>
                <div className="flex items-center gap-2">
                    <SignedIn>
                        <div className="p-1 rounded-lg grid place-items-center">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/app">
                            <Button className="bg-gradient-to-bl from-blue-500 to-blue-700">Login</Button>
                        </Link>
                    </SignedOut>
                    <Button className='hidden' onClick={() => toast("yo")}>Signup</Button>
                    <Button className='hidden'>Signin</Button>
                    <ThemeToggle />
                    <Link href="https://github.com/ronit-ghosh/AI-Quiz-App">
                        <Button><Github size={26} /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
