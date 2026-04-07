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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HeroImpactSection />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <MissionVisionSection profile={profile} />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <HighlightsSection highlights={highlights} />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 sm:gap-20 sm:px-6 sm:py-20">
        <TestimoniesSection testimonies={testimonies} />
        <UpdatesTeaserSection posts={teasers} />
        <ContactTeaserSection />
      </div>
    </>
  );
}
