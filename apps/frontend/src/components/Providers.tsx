"use client"

import { Toaster } from "sonner"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
                {children}
            <Toaster />
        </ThemeProvider>
    )
}
