export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: number; // minutes
  body: string; // Markdown-like plain text paragraphs, separated by "\n\n"
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tampa-bay-housing-market-spring-2025",
    title: "Tampa Bay Housing Market: What Buyers & Sellers Need to Know in Spring 2025",
    date: "2025-03-01",
    excerpt:
      "Inventory is up, rates have pulled back slightly, and sellers are negotiating again. Here's what the spring 2025 Tampa Bay market actually looks like on the ground.",
    category: "Market Update",
    readTime: 4,
    body: `The Tampa Bay housing market is entering spring 2025 in a notably different posture than the frenzied years of 2021–2022. Active inventory is up roughly 35% year-over-year across Hillsborough County, meaning buyers have more choices — and more negotiating room — than they've had in years.

That said, demand hasn't evaporated. Well-priced homes in Fish Hawk, Riverview, and South Tampa are still moving in under two weeks. What's changed is that overpriced listings sit — sometimes for 60+ days — and sellers who priced aggressively are now offering concessions they wouldn't have considered two years ago.

**What sellers should know:** Pricing accuracy matters more than ever. A $15,000 mispricing at list is now costing sellers $20,000–$30,000 in eventual price cuts and carrying costs. Professional staging, pre-inspections, and competitive entry pricing remain the best levers.

**What buyers should know:** You have room to negotiate, but don't overplay your hand on move-in-ready homes in top school zones — those still generate multiple offers. The leverage exists on properties with deferred maintenance, days on market over 45, or in communities with active new construction nearby.

**On interest rates:** 30-year conforming rates are hovering in the mid-6s as of early March 2025. Affordability has improved modestly from the 2024 peak, and VA loan buyers in particular have additional options via assumable mortgages on homes bought between 2020–2022.

Call or text me at 708-781-8205 if you want a current market snapshot for a specific zip code or neighborhood.`,
  },
  {
    slug: "fish-hawk-vs-riverview-which-is-right-for-your-family",
    title: "Fish Hawk vs. Riverview: Which Tampa Bay Community Is Right for Your Family?",
    date: "2025-02-10",
    excerpt:
      "Two of Hillsborough County's most popular family destinations — Fish Hawk Ranch and Riverview — offer very different lifestyles and price points. Here's how to choose.",
    category: "Neighborhood Guide",
    readTime: 5,
    body: `Fish Hawk Ranch and Riverview are two of the most searched communities for families relocating to the Tampa Bay area, and for good reason: both offer top-rated schools, newer construction, and easy access to Tampa. But they serve different needs, and picking the wrong one is one of the most common relocation mistakes I see.

**Fish Hawk Ranch** is a master-planned community with a strong sense of neighborhood identity. The amenities — aquatic clubs, tennis courts, miles of trails, community events — are built in. Schools like Newsome High School and Bevis Elementary consistently rank among the best in Hillsborough County. The trade-off: prices are higher (median around $500K–$550K for a 4-bed), and the community is mostly built-out, so resale inventory is what you're working with.

**Riverview** is broader, more diverse in price and style, and continues to grow rapidly along US-301 and 301 corridors. You'll find everything from entry-level townhomes under $300K to executive homes over $700K. School quality varies significantly by zone, so mapping a specific property to its assigned schools before you fall in love with it is essential.

**Commute differences:** Fish Hawk to downtown Tampa runs 35–45 minutes on a typical morning. Riverview commutes vary widely — western Riverview near I-75 is closer to 30 minutes; eastern pockets can exceed 50 minutes.

**MacDill AFB proximity:** Riverview generally beats Fish Hawk for MacDill commuters, particularly communities near the Gibsonton/Apollo Beach corridor.

**My recommendation:** If school consistency and community cohesion are your top priorities, Fish Hawk is usually the right call. If budget flexibility and new construction options matter more, Riverview opens up significantly more choices.

Want a side-by-side comparison of specific listings in both communities? Reach out at 708-781-8205 or use the contact form.`,
  },
  {
    slug: "va-loan-homebuying-guide-tampa-bay",
    title: "VA Loan Home Buying in Tampa Bay: A Practical Guide for Military Families",
    date: "2025-01-22",
    excerpt:
      "VA loans offer powerful advantages — zero down, no PMI, competitive rates — but they work differently than conventional financing. Here's what military families need to know before making an offer.",
    category: "Military Families",
    readTime: 6,
    body: `As the wife of a Marine Corps OEF/OIF veteran and a Tampa Bay real estate agent, I've helped many military families navigate the VA loan process. Here's what I wish every VA buyer knew before making their first offer.

**The VA loan advantage is real — but so are the misconceptions.** Zero down payment and no private mortgage insurance (PMI) are genuine, significant benefits. On a $450,000 home, skipping PMI saves you roughly $200–$300 per month compared to a conventional loan with less than 20% down. That's real money.

**Sellers are not automatically reluctant.** A common fear is that sellers won't accept VA offers. In Tampa Bay's 2025 market, this concern is largely outdated for standard purchases. VA appraisals are thorough, not punishing — and a good buyer's agent (like me) will present your offer competitively and address any seller concerns about the appraisal process directly.

**VA appraisals have required conditions.** The VA's Minimum Property Requirements (MPRs) ensure the home is safe, structurally sound, and sanitary. Peeling paint, roof issues, or missing handrails on stairs can trigger repair requirements. Knowing this before you make an offer — and negotiating accordingly — is part of what I do for VA clients.

**Assumable VA mortgages are a hidden opportunity.** If you find a home purchased between 2020–2022 with a VA loan, the original loan's interest rate may be assumable. I've seen Tampa Bay clients assume rates in the 2.5%–3.5% range in a market where new loans are in the mid-6s. This can translate to hundreds of dollars per month in savings — but it requires a specific process and lender cooperation.

**Entitlement and funding fee basics.** First-time VA users typically pay a 2.15% funding fee (which can be rolled into the loan). Subsequent use is 3.3%. Veterans with service-connected disabilities rated 10% or higher are exempt from the funding fee entirely.

Ready to start your home search in Tampa Bay? I work exclusively with veteran and active-duty families on a regular basis. Call or text me at 708-781-8205 — let's build your strategy before you set foot in a showing.`,
  },
];
