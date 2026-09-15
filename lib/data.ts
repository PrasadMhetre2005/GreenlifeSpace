import type { StaticImageData } from "next/image";

import glassDecorationView from "../photos/glass decoration veiw.jpg";
import plantCareBoyImage from "../photos/plant care boy pic.jpg";
import waterThowingImage from "../photos/water thwoing.jpg";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  startingPrice: string;
};

export const services: Service[] = [
  {
    slug: "plant-styling",
    name: "Plant Styling",
    short: "Choosing and placing plants for a space",
    description:
      "We assess light, footfall and the mood you want, then select and place plants and pots that suit the space — from a single reception desk to a full office fit-out.",
    startingPrice: "From ₹500",
  },
  {
    slug: "plant-maintenance",
    name: "Plant Maintenance",
    short: "Scheduled watering, feeding and pruning",
    description:
      "Regular visits to water, feed, prune and check for pests, so your plants stay healthy without anyone in-house needing to think about it.",
    startingPrice: "From ₹800 / visit",
  },
  {
    slug: "plant-polishing",
    name: "Plant Polishing",
    short: "Leaf cleaning for a showroom finish",
    description:
      "Dust and residue dull leaves over time. We hand-clean and polish foliage so plants look showroom-fresh for events, photoshoots or everyday impressions.",
    startingPrice: "From ₹300 / visit",
  },
  {
    slug: "office-greening",
    name: "Office Greening",
    short: "Full plant programs for workplaces",
    description:
      "An end-to-end plant program for offices and coworking spaces: selection, delivery, placement and a standing maintenance schedule.",
    startingPrice: "Custom quote",
  },
  {
    slug: "event-styling",
    name: "Event & Hotel Styling",
    short: "Short-term greenery for events and lobbies",
    description:
      "Temporary and seasonal plant displays for weddings, launches, hotel lobbies and receptions — delivered, styled and collected.",
    startingPrice: "Custom quote",
  },
  {
    slug: "plant-doctor",
    name: "Plant Doctor Visit",
    short: "Diagnosis for a struggling plant",
    description:
      "A one-off visit to diagnose yellowing leaves, pests or poor growth, with a written care plan you can follow yourself.",
    startingPrice: "From ₹300 / visit",
  },
];

export const serviceAreas: { city: string; localities: string[] }[] = [
  {
    city: "Pune",
    localities: [
      "Koregaon Park",
      "Baner",
      "Viman Nagar",
      "Kothrud",
      "Hinjewadi",
      "Kalyani Nagar",
    ],
  },
 
];

export type Project = {
  client: string;
  location: string;
  servicesPerformed: string[];
  duration: string;
  summary: string;
  image?: StaticImageData;
  tone?: "moss" | "sage" | "ochre";
};

export const projects: Project[] = [
  {
    client: "Meridian Coworks",
    location: "Baner, Pune",
    servicesPerformed: ["Office Greening", "Plant Maintenance"],
    duration: "Ongoing since 2023",
    summary:
      "A 40-plant program across three floors of a coworking space, with a fortnightly maintenance visit and a full leaf-polish before every member event.",
    image: glassDecorationView,
    tone: "moss",
  },
  {
    client: "The Ivy Room Café",
    location: "Koregaon Park, Pune",
    servicesPerformed: ["Plant Styling", "Plant Maintenance"],
    duration: "6 months",
    summary:
      "Hanging planters and a living wall panel for a café that wanted its indoor seating to feel like an extension of its garden seating.",
    image: plantCareBoyImage,
    tone: "sage",
  },
  {
    client: "Solstice Hotel",
    location: "Viman Nagar, Pune",
    servicesPerformed: ["Event & Hotel Styling"],
    duration: "Recurring seasonal",
    summary:
      "Lobby and banquet-hall displays refreshed each season, plus one-off styling for weddings hosted at the property.",
    image: waterThowingImage,
    tone: "ochre",
  },
];

export const testimonials: { quote: string; name: string; role: string }[] =
  [
    {
      quote:
        "Our reception plants used to die within a month. Two years in with Greenlife Spaces and they still look like the day they arrived.",
      name: "Aditi Rao",
      role: "Facilities Lead, Meridian Coworks",
    },
    {
      quote:
        "Booking a visit takes less time than making the coffee. No accounts, no back-and-forth — just a form and a confirmed slot.",
      name: "Farhan Sheikh",
      role: "Owner, The Ivy Room Café",
    },
    {
      quote:
        "They diagnosed a pest issue we hadn't even noticed yet and had a plan for it within the same visit.",
      name: "Priya Menon",
      role: "Homeowner, Kothrud",
    },
  ];

export const stats = [
  { label: "Plants maintained", value: "3,200+" },
  { label: "Happy customers", value: "180+" },
  { label: "Years of experience", value: "6" },
];
