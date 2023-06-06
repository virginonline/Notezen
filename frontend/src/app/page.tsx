"use client"
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/component/ui/button";

export default function HomePage() {
    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Notezen - менеджер задач
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Notezen предназначенное для профессиональных управленцев, командных лидеров и тех, кто стремится к повышению производительности и эффективности в работе. Этот мощный инструмент позволяет создавать, организовывать и отслеживать задачи, а также управлять проектами и сроками выполнения.
                    </p>
                    <div className="space-x-4">
                        <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                            Попробовать сейчас
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}