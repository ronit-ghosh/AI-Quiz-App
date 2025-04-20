"use client"

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Image, Upload } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import Navbar from "@/components/pages/Navbar";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";

const CardItem = [{
  title: "Text Prompt",
  desc: "Generate quizzes from simple text descriptions",
  btnText: "Try now",
  Icon: Brain
}, {
  title: "Large PDF",
  desc: "Process extensive documents efficiently",
  btnText: "Upload PDF",
  Icon: FileText
}, {
  title: "Small PDF",
  desc: "Upload small PDFs for targeted quizzes",
  btnText: "Upload PDF",
  Icon: Upload
}, {
  title: "Image Upload",
  desc: "Create quizzes from images and diagrams",
  btnText: "Upload Image",
  Icon: Image
},]

export default function Page() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <AuroraBackground>
      <div className="min-h-screen w-full relative overflow-clip ">
        <Navbar isLanding />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-7xl font-bold tracking-tighter bg-gradient-to-bl dark:from-neutral-100 dark:to-neutral-400 from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Quiz AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                Create engaging quizzes instantly using AI. Upload content, get intelligent questions.
              </p>
            </div>
            <Link href="/app">
              <Button className="bg-gradient-to-bl from-blue-500 to-blue-700">Get Started</Button>
            </Link>

            <Carousel
              plugins={[plugin.current]}
              className="w-full">
              <CarouselContent className="-ml-1">
                {
                  CardItem.map((item, i) => {
                    return (
                      <CarouselItem key={i} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <LandingCard
                          title={item.title}
                          desc={item.desc}
                          Icon={item.Icon}
                          btnText={item.btnText}
                        />
                      </CarouselItem>
                    )
                  })
                }
              </CarouselContent>
            </Carousel>

          </div>
        </main>
      </div>
    </AuroraBackground>
  );
}

function LandingCard(props: {
  title: string,
  desc: string,
  btnText: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}) {
  const { title, desc, btnText, Icon } = props
  return (
    <Card className="p-6 h-60 hover:shadow-lg transition-shadow group bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mx-auto dark:bg-blue-900/40 bg-blue-100">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {desc}
        </p>
        <Link href="/app">
          <Button className="w-full">{btnText}</Button>
        </Link>
      </div>
    </Card>
  )
}