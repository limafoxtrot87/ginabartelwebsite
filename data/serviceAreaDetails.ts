export type ServiceAreaDetail = {
  schools: string;
  housing: string;
  commute: string;
  lifestyle: string;
  bestFor: string[];
  watchFor: string[];
  militaryNotes: string;
  weekendSpots: string[];
};

export const serviceAreaDetails: Record<string, ServiceAreaDetail> = {
  "tampa": {
    schools: "School options vary by district and neighborhood, with magnet, charter, and private choices available across the city.",
    housing: "Mix of historic bungalows, modern infill, luxury condos, and established single-family communities.",
    commute: "Direct access to I-275, Selmon, and the airport corridor supports broad job-center connectivity.",
    lifestyle: "Urban convenience with strong dining, waterfront activity, sports, and cultural events.",
    bestFor: ["Buyers wanting city access", "Professionals with variable commute hubs", "Lifestyle-driven relocations"],
    watchFor: ["Street-by-street flood-zone differences", "Premium pricing in high-demand enclaves", "Traffic near downtown cores"],
    militaryNotes: "Useful for MacDill-connected households depending on exact submarket and bridge timing.",
    weekendSpots: ["Riverwalk", "Armature Works", "Hyde Park", "Bayshore Boulevard"]
  },
  "fish-hawk": {
    schools: "Known for highly rated school access and family-oriented education planning.",
    housing: "Predominantly planned single-family neighborhoods with amenity-rich HOA communities.",
    commute: "Practical Brandon/Tampa routes; timing depends on peak-hour patterns.",
    lifestyle: "Master-planned, activity-oriented, and very family-focused.",
    bestFor: ["School-priority families", "Amenity-focused buyers", "Long-term owner-occupants"],
    watchFor: ["Lower entry inventory", "HOA restrictions vary", "Peak commute congestion windows"],
    militaryNotes: "Popular with military families seeking suburban structure and school stability.",
    weekendSpots: ["Park Square", "Community trail systems", "Neighborhood recreation facilities"]
  },
  "lithia": {
    schools: "Family demand often centers on school-zoned neighborhoods and campus access.",
    housing: "Larger-lot homes, newer construction pockets, and established suburban streets.",
    commute: "Regional arterials connect to Brandon and Tampa employment corridors.",
    lifestyle: "Space-forward suburban living with parks and outdoor access.",
    bestFor: ["Buyers needing more square footage", "Families prioritizing room to grow", "Relocators leaving dense urban cores"],
    watchFor: ["Car dependency", "Distance to downtown hubs", "Inventory quality varies by micro-area"],
    militaryNotes: "Strong fit for military families seeking larger homes and predictable community rhythms.",
    weekendSpots: ["Alafia River parks", "Neighborhood playgrounds", "Local dining clusters"]
  },
  "riverview": {
    schools: "Broad range of school options, with strong demand concentrated in preferred attendance zones.",
    housing: "Large inventory mix from newer subdivisions to established homes with updates.",
    commute: "I-75 and key east-west routes provide functional access across Tampa Bay.",
    lifestyle: "Balanced suburban convenience with expanding retail and service infrastructure.",
    bestFor: ["Move-up buyers", "Commuter households", "Families needing multiple price-point options"],
    watchFor: ["Fast-moving quality listings", "Ongoing construction in growth corridors", "Traffic around major retail nodes"],
    militaryNotes: "Frequently considered by MacDill and broader military relocations due to housing variety.",
    weekendSpots: ["Big Bend retail corridor", "Community parks", "Family recreation centers"]
  },
  "south-tampa": {
    schools: "Strong demand around preferred public zones and private-school commuting convenience.",
    housing: "Luxury infill, renovated classics, townhomes, and premium established streets.",
    commute: "Direct value for MacDill proximity and core city access.",
    lifestyle: "Upscale, walkable pockets with dining and waterfront daily-life options.",
    bestFor: ["MacDill-connected buyers", "Luxury and lifestyle purchasers", "Short-commute households"],
    watchFor: ["Higher taxes/insurance in some blocks", "Tight inventory in top pockets", "Rapid offer timelines"],
    militaryNotes: "Often a top target for PCS families assigned to MacDill due to commute efficiency.",
    weekendSpots: ["Bayshore", "Hyde Park Village", "Ballast Point", "SoHo dining"]
  },
  "apollo-beach": {
    schools: "Families evaluate school paths alongside waterfront and community features.",
    housing: "Strong waterfront, canal, and newer-construction options.",
    commute: "Reasonable north-south commuting with route planning by neighborhood depth.",
    lifestyle: "Coastal and boating-oriented with relaxed day-to-day atmosphere.",
    bestFor: ["Waterfront lifestyle buyers", "Boating households", "Move-up buyers wanting outdoor living"],
    watchFor: ["Waterfront insurance considerations", "Varied flood-zone exposure", "Inventory quality by canal/section"],
    militaryNotes: "Appealing for military families balancing commute and lifestyle-driven home selection.",
    weekendSpots: ["Local marinas", "Waterfront dining", "Shoreline parks"]
  },
  "ruskin": {
    schools: "School and youth-activity planning is key when comparing neighborhoods.",
    housing: "Value-centric options with a blend of established and newer communities.",
    commute: "Connected to Tampa and south county corridors via main regional routes.",
    lifestyle: "Relaxed, practical, and affordability-focused for many buyers.",
    bestFor: ["Budget-conscious movers", "First-time buyers", "Families prioritizing space"],
    watchFor: ["Longer downtown commute", "Community quality can vary", "Selective turnkey inventory"],
    militaryNotes: "Can present strong value opportunities for military buyers using VA benefits.",
    weekendSpots: ["EG Simmons Park", "Waterfront access points", "Local family attractions"]
  },
  "brandon": {
    schools: "Well-established school access with broad extracurricular options in surrounding areas.",
    housing: "Mature suburban housing stock plus renovated and newer pockets.",
    commute: "Efficient access into Tampa business corridors and east-west travel routes.",
    lifestyle: "Convenience-oriented with major shopping, healthcare, and dining nearby.",
    bestFor: ["Families needing daily convenience", "Commuters", "Buyers wanting established neighborhoods"],
    watchFor: ["Peak-hour corridor traffic", "Price sensitivity in turnkey homes", "Condition variance in older subdivisions"],
    militaryNotes: "Common shortlist area for military households needing balanced commute and schools.",
    weekendSpots: ["Brandon retail/dining hubs", "Parks", "Community sports venues"]
  },
  "seffner": {
    schools: "School access is typically evaluated with nearby Brandon and east Tampa options.",
    housing: "Smaller inventory pool with suburban homes and value-leaning choices.",
    commute: "I-4 adjacency supports broader regional movement.",
    lifestyle: "Quiet residential pockets with practical access to larger hubs.",
    bestFor: ["Buyers wanting quieter neighborhoods", "Value-focused commuters", "Households seeking low-profile suburbs"],
    watchFor: ["Limited inventory cycles", "Fewer destination amenities in-core", "Property condition variation"],
    militaryNotes: "Useful for military buyers prioritizing budget and regional flexibility.",
    weekendSpots: ["Local parks", "Nearby Brandon attractions", "Family-centered community spaces"]
  },
  "gibsonton": {
    schools: "Family buyers usually compare specific school-zoned pockets before offer strategy.",
    housing: "Mix of established homes and updated inventory near major routes.",
    commute: "U.S. 41 access supports practical north/south movement.",
    lifestyle: "Laid-back with functional convenience and regional access.",
    bestFor: ["Value-minded purchasers", "Commuter households", "Buyers seeking practical location"],
    watchFor: ["Micro-area quality differences", "Route congestion at peak windows", "Inventory condition spread"],
    militaryNotes: "Frequently considered for cost-conscious military family planning.",
    weekendSpots: ["Nearby waterfront options", "Local shopping", "Community recreation spots"]
  },
  "dover": {
    schools: "Buyers often prioritize zone checks and school transportation practicality.",
    housing: "Semi-rural parcels and larger-lot homes with more spacing between properties.",
    commute: "Regional corridors connect into Brandon, Plant City, and Tampa routes.",
    lifestyle: "Lower-density and space-first for buyers wanting breathing room.",
    bestFor: ["Land/lot-focused buyers", "Privacy seekers", "Households leaving denser suburbs"],
    watchFor: ["Limited retail in immediate core", "Longer drive times", "Inventory can be sporadic"],
    militaryNotes: "Can suit military households prioritizing property size over centrality.",
    weekendSpots: ["Rural recreation routes", "Nearby regional parks", "East county local events"]
  },
  "temple-terrace": {
    schools: "Proximity to USF and school networks supports varied education planning.",
    housing: "Character homes, established neighborhoods, and selective modern updates.",
    commute: "Good access to university, medical, and central Tampa corridors.",
    lifestyle: "Classic neighborhood identity with strong tree canopy and golf/river context.",
    bestFor: ["Buyers wanting established charm", "USF/medical corridor professionals", "Families seeking central access"],
    watchFor: ["Condition and renovation scope vary", "Lower inventory in top streets", "Lot/layout diversity"],
    militaryNotes: "Useful option for military families balancing commute and character neighborhoods.",
    weekendSpots: ["Golf and river-adjacent areas", "Local parks", "Nearby cultural spots"]
  },
  "carrollwood": {
    schools: "School and private-education access is a major driver in buyer decision-making.",
    housing: "Mature suburban communities with wide variation from classic to renovated homes.",
    commute: "Functional airport and central Tampa connectivity via major corridors.",
    lifestyle: "Convenience-oriented suburban living with strong service density.",
    bestFor: ["Families seeking established neighborhoods", "Commuters wanting central west-side access", "Move-up buyers"],
    watchFor: ["Pricing premium in best pockets", "Traffic near major retail arteries", "Fast competition on updated homes"],
    militaryNotes: "Strong candidate for military families wanting stable suburban infrastructure.",
    weekendSpots: ["Country clubs", "Parks", "Dining corridors", "Retail destinations"]
  },
  "town-and-country": {
    schools: "Education choices are evaluated alongside airport/expressway commuting priorities.",
    housing: "Diverse inventory from value-focused homes to renovated suburban options.",
    commute: "Excellent for airport and west Tampa business access.",
    lifestyle: "Practical and commuter-friendly with broad neighborhood variety.",
    bestFor: ["Airport-connected professionals", "Buyers seeking west Tampa access", "Families wanting broad price bands"],
    watchFor: ["Street-level variance in housing quality", "Traffic concentration around key arteries", "Select pockets turn over quickly"],
    militaryNotes: "Helpful for military households needing flexible transportation corridors.",
    weekendSpots: ["West-side dining", "Regional shopping", "Nearby parks"]
  },
  "bloomingdale": {
    schools: "Known for school-driven demand and family-activity orientation.",
    housing: "Established homes with community amenities and golf-adjacent pockets.",
    commute: "Practical access to Brandon and broader southeast Tampa routes.",
    lifestyle: "Family-centered and activity-friendly suburban setting.",
    bestFor: ["School-focused buyers", "Families wanting established subdivisions", "Move-up households"],
    watchFor: ["Selective inventory in prime streets", "Some homes need modernization", "Peak-traffic commute windows"],
    militaryNotes: "Regularly considered by military families prioritizing schools and neighborhood stability.",
    weekendSpots: ["Golf club access", "Parks", "Family sports facilities", "Nearby dining"]
  },
  "clair-mel-city": {
    schools: "Buyers evaluate school options with nearby Tampa and charter alternatives.",
    housing: "Mixed-condition housing with value and renovation upside potential.",
    commute: "Central orientation provides quick directional flexibility across Tampa.",
    lifestyle: "Practical and location-driven for buyers prioritizing access over amenities density.",
    bestFor: ["Value-focused in-city buyers", "Renovation-minded purchasers", "Commuters needing central location"],
    watchFor: ["Property condition variance", "Micro-block differences", "Limited luxury-tier inventory"],
    militaryNotes: "Can serve military buyers seeking affordability near central Tampa routes.",
    weekendSpots: ["East Tampa parks", "Nearby downtown access", "Local community spots"]
  },
  "plant-city": {
    schools: "Families often prioritize school zoning while balancing larger-lot preferences.",
    housing: "Blend of historic homes, suburban neighborhoods, and larger-lot opportunities.",
    commute: "I-4 corridor supports practical access to both Tampa and Lakeland areas.",
    lifestyle: "Community-centered with small-town identity and room to spread out.",
    bestFor: ["Buyers seeking more land", "Families wanting community feel", "Value-minded move-up buyers"],
    watchFor: ["Longer central Tampa commute", "Inventory pace varies by season", "Age/condition variance in older homes"],
    militaryNotes: "Good option for military families prioritizing space, value, and long-term home utility.",
    weekendSpots: ["Historic downtown", "Local events", "Regional parks", "Family dining"]
  }
};
