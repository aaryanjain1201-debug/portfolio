export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Michael R. Thompson",
    role: "Creative Director",
    company: "BrandWorks USA",
    content:
      "Exceptional 3D animation and CGI visuals. The storytelling quality and attention to detail exceeded our expectations. Highly recommended.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Marketing Head",
    company: "TechVision UAE",
    content:
      "From concept to final delivery, the motion graphics and explainer video quality was impressive. Clear communication and premium output.",
    rating: 5,
  },
  {
    name: "Anjali Shah",
    role: "Project Manager",
    company: "BuildCorp India",
    content:
      "Excellent work on architectural visualization. The 3D walkthroughs were realistic and detailed, helping our clients understand the project clearly.",
    rating: 5,
  },
  {
    name: "Daniel Wong",
    role: "Brand Strategist",
    company: "CreativeLab Singapore",
    content:
      "Outstanding creative direction and execution. The hybrid AI + 3D approach brought a unique quality to our campaign that stood out in the market.",
    rating: 5,
  },
];
