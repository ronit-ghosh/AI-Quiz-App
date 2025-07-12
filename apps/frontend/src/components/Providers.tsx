"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            signInFallbackRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
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