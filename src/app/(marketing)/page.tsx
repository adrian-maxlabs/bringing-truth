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
  getScriptureBannersForHome,
  getTestimonies,
} from "@/lib/content/queries";

export default async function HomePage() {
  const [profile, highlights, testimonies, teasers, scriptureBands] = await Promise.all([
    getOrganizationProfile(),
    getMissionHighlights(),
    getTestimonies(),
    getHomePostTeasers(2),
    getScriptureBannersForHome(),
  ]);

  const [band1, band2, band3, band4] = scriptureBands.slice(0, 4);

  return (
    <>
      <HeroPrimarySection profile={profile} />
      {band1 ? (
        <ScriptureHeroSection
          id={band1.anchor_slug}
          reference={band1.reference}
          tone={band1.tone}
          translationNote={band1.translation_note}
        >
          {band1.body}
        </ScriptureHeroSection>
      ) : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HeroImpactSection />
      </div>
      {band2 ? (
        <ScriptureHeroSection
          id={band2.anchor_slug}
          reference={band2.reference}
          tone={band2.tone}
          translationNote={band2.translation_note}
        >
          {band2.body}
        </ScriptureHeroSection>
      ) : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <MissionVisionSection profile={profile} />
      </div>
      {band3 ? (
        <ScriptureHeroSection
          id={band3.anchor_slug}
          reference={band3.reference}
          tone={band3.tone}
          translationNote={band3.translation_note}
        >
          {band3.body}
        </ScriptureHeroSection>
      ) : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HighlightsSection highlights={highlights} />
      </div>
      {band4 ? (
        <ScriptureHeroSection
          id={band4.anchor_slug}
          reference={band4.reference}
          tone={band4.tone}
          translationNote={band4.translation_note}
        >
          {band4.body}
        </ScriptureHeroSection>
      ) : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <TestimoniesSection testimonies={testimonies} />
        <UpdatesTeaserSection posts={teasers} />
        <ContactTeaserSection />
      </div>
    </>
  );
}
