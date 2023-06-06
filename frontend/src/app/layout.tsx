import { ThemeProvider } from "@/component/theme-provider"
import { Toaster } from "@/component/ui/toaster"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { Inter as FontSans } from 'next/font/google'
import localFont from "next/font/local"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-heading",
})
export const metadata = {
  title: 'Notezen',
  description: 'Приложение для трекинга задач',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
