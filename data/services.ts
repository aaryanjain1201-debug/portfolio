import { Box, Film, Palette, Brain, Camera, Layers, Monitor, Stethoscope } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

export const services: Service[] = [
  {
    title: "Animated Series",
    description:
      "Character-driven 2D and 3D animated series, TV episodes, and digital content for audiences everywhere.",
    icon: Film,
    features: [
      "2D Cartoon Animation",
      "3D Character Animation",
      "Episodic Production",
      "Story-Driven Content",
    ],
  },
  {
    title: "Animated Commercials",
    description:
      "High-impact animated advertisements and brand films that communicate ideas with clarity and creativity.",
    icon: Camera,
    features: [
      "TV Commercials",
      "Digital Ads",
      "Brand Films",
      "Social Media Content",
    ],
  },
  {
    title: "CGI Product Animation",
    description:
      "Photorealistic CGI product visuals and animations that help brands showcase their products beautifully.",
    icon: Box,
    features: [
      "Product Renders",
      "CGI Advertisements",
      "360° Product Views",
      "Commercial Spots",
    ],
  },
  {
    title: "Architectural Visualization",
    description:
      "Realistic 3D architectural walkthroughs and visualization for real estate and construction projects.",
    icon: Layers,
    features: [
      "3D Walkthroughs",
      "Interior Design",
      "Exterior Visualization",
      "Virtual Tours",
    ],
  },
  {
    title: "E-Learning & Medical Animation",
    description:
      "Engaging educational and medical animations that explain complex concepts with visual clarity.",
    icon: Stethoscope,
    features: [
      "Medical Animation",
      "Educational Videos",
      "Explainer Content",
      "Training Modules",
    ],
  },
  {
    title: "Motion Graphics & VFX",
    description:
      "Dynamic motion graphics, visual effects, and post-production work for film, TV, and digital content.",
    icon: Monitor,
    features: [
      "Motion Graphics",
      "Visual Effects",
      "Compositing",
      "Post Production",
    ],
  },
];
