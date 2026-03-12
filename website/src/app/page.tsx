import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { WhySection } from "@/components/sections/why";
import { ArchitectureSection } from "@/components/sections/architecture";
import { CodeExampleSection } from "@/components/sections/code-example";
import { StatsSection } from "@/components/sections/stats";
import { SpiderRatingSection } from "@/components/sections/spiderrating";
import { OpenSourceCloudSection } from "@/components/sections/oss-cloud";
import { ParticleBackground } from "@/components/particles";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <ArchitectureSection />
        <CodeExampleSection />
        <StatsSection />
        <SpiderRatingSection />
        <OpenSourceCloudSection />
      </div>
    </>
  );
}
