"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange>
                {children}
                <Toaster />
            </ThemeProvider>
        </ClerkProvider>
    )
}