import React from "react";

interface ProjectLayoutProps {
    children : React.ReactNode
}

export default function ProjectLayout({children} : ProjectLayoutProps) {
    return(
        <div className="container mx-auto grid items-start gap-10 py-8">
            {children}
        </div>
    )
}