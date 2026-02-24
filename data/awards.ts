export type AwardRecognition = {
  title: string;
  year: string;
  issuer: string;
  description: string;
};

export const awardRecognitions: AwardRecognition[] = [
  {
    title: "5.0 Zillow Client Rating",
    year: "2021-2025",
    issuer: "Zillow Client Reviews",
    description:
      "Maintained a 5.0 rating across featured buyer reviews in Tampa Bay service areas including Lithia and Riverview."
  },
  {
    title: "Local Knowledge & Process Excellence Recognition",
    year: "Multi-Year",
    issuer: "Verified Buyer Feedback",
    description:
      "Consistently praised for local expertise, responsiveness, and negotiation support during complex family relocations."
  },
  {
    title: "Family Relocation Service Recognition",
    year: "2021-2025",
    issuer: "Client Testimonials",
    description:
      "Recognized by relocating families for clear communication, patient guidance, and smooth closings from out-of-state searches."
  }
];
