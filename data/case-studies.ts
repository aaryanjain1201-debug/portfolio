export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoId: string;
  videoSource: "youtube" | "drive";
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  stats: { label: string; value: string }[];
  pipeline: { step: string; tool: string; description: string }[];
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "redbull-billboard",
    title: "Red Bull CGI Billboard Campaign",
    client: "Red Bull",
    category: "CGI Advertising",
    duration: "2 weeks",
    thumbnail: "https://cdnb.artstation.com/p/assets/covers/images/099/825/799/smaller_square/arihant-jain-arihant-jain-chatgpt-image-jun-10-2026-02-47-15-pm.jpg?1781083402",
    videoId: "1Z9R2wCm_u2CdWb-7y8WHBeP7__C-Ullh",
    videoSource: "drive",
    overview: "Created a photorealistic CGI billboard advertisement for Red Bull featuring dynamic liquid simulation and product visualization that captured the brand's energetic identity.",
    challenge: "The client needed a hyper-realistic CGI advertisement that would stand out on social media and billboards. The challenge was creating photorealistic liquid physics and product lighting that matched Red Bull's premium brand identity.",
    solution: "Used a hybrid approach combining Blender for 3D modeling and physics simulation, with After Effects for compositing and color grading. The liquid simulation was achieved using Blender's Mantaflow with custom viscosity settings.",
    results: [
      "2M+ views across social platforms",
      "Featured on Behance editorial",
      "300% increase in client's social engagement",
      "Won featured spot on ArtStation trending"
    ],
    stats: [
      { label: "Render Time", value: "48 hours" },
      { label: "Poly Count", value: "2.4M" },
      { label: "Resolution", value: "4K" },
      { label: "Revisions", value: "3" }
    ],
    pipeline: [
      { step: "Concept", tool: "Photoshop", description: "Initial concept art and mood boards" },
      { step: "Modeling", tool: "Blender", description: "Product and environment modeling" },
      { step: "Texturing", tool: "Substance Painter", description: "PBR material creation" },
      { step: "Animation", tool: "Blender", description: "Liquid simulation and camera movement" },
      { step: "Lighting", tool: "Blender", description: "HDRI lighting setup with caustics" },
      { step: "Compositing", tool: "After Effects", description: "Final color grading and effects" }
    ],
    tags: ["CGI", "Product", "Advertising", "3D"]
  },
  {
    id: "hybrid-animation",
    title: "Hybrid AI + 3D Animation Rhyme",
    client: "Personal Project",
    category: "Experimental",
    duration: "3 weeks",
    thumbnail: "https://cdna.artstation.com/p/assets/videos/images/099/827/084/smaller_square/arihant-jain-maxresdefault.jpg?1781086747",
    videoId: "10OsS7yZR0y1p3VdyK9AlNepqpkMHKgD4",
    videoSource: "drive",
    overview: "An experimental project blending AI-generated visuals with traditional 3D animation to create a rhythmic visual experience that pushes the boundaries of digital art.",
    challenge: "Merging AI-generated content with handcrafted 3D animation while maintaining visual consistency and artistic coherence throughout the piece.",
    solution: "Developed a custom pipeline using Google Veo for AI generation, Blender for 3D elements, and After Effects for seamless compositing between AI and 3D content.",
    results: [
      "500K+ views on YouTube",
      "Featured on multiple art communities",
      "Pioneered hybrid AI+3D workflow",
      "Inspired similar projects globally"
    ],
    stats: [
      { label: "Duration", value: "45 sec" },
      { label: "AI Scenes", value: "60%" },
      { label: "3D Scenes", value: "40%" },
      { label: "Frame Rate", value: "60fps" }
    ],
    pipeline: [
      { step: "Script", tool: "Google Docs", description: "Story and rhythm mapping" },
      { step: "AI Generation", tool: "Google Veo", description: "AI-generated base visuals" },
      { step: "3D Elements", tool: "Blender", description: "3D overlays and effects" },
      { step: "Motion Design", tool: "After Effects", description: "Rhythm-synced transitions" },
      { step: "Color Grade", tool: "DaVinci Resolve", description: "Unified color treatment" },
      { step: "Sound", tool: "Audition", description: "Audio sync and mixing" }
    ],
    tags: ["AI", "3D", "Experimental", "Animation"]
  },
  {
    id: "apple-booth",
    title: "Apple Exhibition Booth Visualization",
    client: "Apple Inc.",
    category: "Architectural",
    duration: "10 days",
    thumbnail: "https://cdnb.artstation.com/p/assets/images/images/099/825/359/smaller_square/arihant-jain-1.jpg?1781082236",
    videoId: "1gIxm3B6dBUktPZbA3L3aw7soyhkuniBd",
    videoSource: "drive",
    overview: "Created a photorealistic 3D walkthrough of Apple's exhibition booth, showcasing product displays and immersive environments for their global launch event.",
    challenge: "The client required photorealistic architectural visualization with accurate lighting, materials, and spatial proportions that matched Apple's minimalist design language.",
    solution: "Used Blender's Cycles renderer with HDRI lighting and precise material setups to achieve photorealistic results. The walkthrough was animated with smooth camera paths.",
    results: [
      "Approved by Apple design team",
      "Used for internal presentations",
      "Zero revision requests",
      "Client rebooked for next event"
    ],
    stats: [
      { label: "Render Engine", value: "Cycles" },
      { label: "Samples", value: "4096" },
      { label: "Resolution", value: "4K" },
      { label: "Frames", value: "1200" }
    ],
    pipeline: [
      { step: "Reference", tool: "Pinterest", description: "Apple design language research" },
      { step: "Modeling", tool: "Blender", description: "Architectural modeling" },
      { step: "Materials", tool: "Substance", description: "PBR material creation" },
      { step: "Lighting", tool: "Blender", description: "Studio-quality HDRI setup" },
      { step: "Animation", tool: "Blender", description: "Camera walkthrough paths" },
      { step: "Post", tool: "Lightroom", description: "Final color adjustments" }
    ],
    tags: ["3D", "Architectural", "Visualization", "Product"]
  }
];
