import { ScriptureHeroSection } from "@/features/marketing/scripture-banners";
import {
  ContactTeaserSection,
  HeroImpactSection,
  HeroPrimarySection,
  HighlightsSection,
  MissionVisionSection,
  TestimoniesSection,
  UpdatesTeaserSection,
} from "@/features/marketing/sections";
import {
  getHomePostTeasers,
  getMissionHighlights,
  getOrganizationProfile,
  getTestimonies,
} from "@/lib/content/queries";

export default async function HomePage() {
  const [profile, highlights, testimonies, teasers] = await Promise.all([
    getOrganizationProfile(),
    getMissionHighlights(),
    getTestimonies(),
    getHomePostTeasers(2),
  ]);

  return (
    <>
      <HeroPrimarySection profile={profile} />
      <ScriptureHeroSection
        id="scripture-jesus-is-truth"
        reference="John 14:6"
        tone="light"
      >
        I am the way, and the truth, and the life. No one comes to the Father
        except through me.
      </ScriptureHeroSection>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HeroImpactSection />
      </div>
      <ScriptureHeroSection
        id="scripture-truth-sets-free"
        reference="John 8:32"
        tone="deep"
      >
        You will know the truth, and the truth will set you free.
      </ScriptureHeroSection>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <MissionVisionSection profile={profile} />
      </div>
      <ScriptureHeroSection
        id="scripture-abide-and-fruit"
        reference="John 15:5"
        tone="light"
      >
        I am the vine; you are the branches. Whoever abides in me and I in him,
        he it is that bears much fruit, for apart from me you can do nothing.
      </ScriptureHeroSection>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HighlightsSection highlights={highlights} />
      </div>
      <ScriptureHeroSection
        id="scripture-fruit-of-the-spirit"
        reference="Galatians 5:22–23"
        tone="deep"
      >
        The fruit of the Spirit is love, joy, peace, patience, kindness,
        goodness, faithfulness, gentleness, self-control; against such things
        there is no law.
      </ScriptureHeroSection>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <TestimoniesSection testimonies={testimonies} />
        <UpdatesTeaserSection posts={teasers} />
        <ContactTeaserSection />
      </div>
    </>
  );
}
