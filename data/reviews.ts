export type ClientReview = {
  reviewer: string;
  date: string;
  transaction: string;
  location: string;
  summary: string;
  rating: number;
};

export const clientReviews: ClientReview[] = [
  {
    reviewer: "zuser20151107053230240",
    date: "May 31, 2025",
    transaction: "Bought a single-family home",
    location: "Lithia, FL",
    summary:
      "Gina showed us more than 20 homes across the Tampa area and was consistently responsive, patient, and highly knowledgeable throughout the process.",
    rating: 5
  },
  {
    reviewer: "Inna Perelmuter",
    date: "June 28, 2022",
    transaction: "Bought a townhouse",
    location: "Lithia, FL",
    summary:
      "Buying from out of state felt smooth and organized. Gina was professional, reliable, quick to respond, and went above expectations from start to close.",
    rating: 5
  },
  {
    reviewer: "rmdigioia",
    date: "June 10, 2021",
    transaction: "Bought a single-family home",
    location: "Lithia, FL",
    summary:
      "Gina turned a major family relocation into a confident move by helping us find the right home, budget, neighborhood, and schools through patient guidance and virtual tours.",
    rating: 5
  },
  {
    reviewer: "Rianon Cepriano",
    date: "June 9, 2021",
    transaction: "Bought a single-family home",
    location: "Boyette Springs, Riverview, FL",
    summary:
      "She made a stressful process feel manageable and fun, stayed available, and negotiated with our best interests in mind at every step.",
    rating: 5
  },
  {
    reviewer: "David and Carey Donaldson",
    date: "February 11, 2021",
    transaction: "Bought a single-family home",
    location: "Lithia, FL",
    summary:
      "Her local knowledge of communities and schools made the search easier, and she guided us to the right home with a true family-first approach.",
    rating: 5
  }
];
