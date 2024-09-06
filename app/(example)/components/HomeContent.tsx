import { CallToAction } from "@/app/(example)/components/HomeContent/CallToAction"
import { Faqs } from "@/app/(example)/components/HomeContent/Faqs"
import { Hero } from "@/app/(example)/components/HomeContent/Hero"
import { Pricing } from "@/app/(example)/components/HomeContent/Pricing"
import { PrimaryFeatures } from "@/app/(example)/components/HomeContent/PrimaryFeatures"
import { SecondaryFeatures } from "@/app/(example)/components/HomeContent/SecondaryFeatures"
import { Testimonials } from "@/app/(example)/components/HomeContent/Testimonials"

export default function HomeContent() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Testimonials />
      <Pricing />
      <Faqs />
    </>
  )
}
