export interface SkillCategory {
  title: string;
  icon: string;
  tools: string[];
}

export const skills: SkillCategory[] = [
  {
    title: "3D",
    icon: "Box",
    tools: ["Blender", "Maya", "3D Studio Max", "Substance Painter"],
  },
  {
    title: "Motion",
    icon: "Film",
    tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
  },
  {
    title: "Design",
    icon: "Palette",
    tools: ["Photoshop", "Illustrator", "Figma"],
  },
  {
    title: "2D Animation",
    icon: "Pencil",
    tools: ["Moho", "Toon Boom Harmony", "Spine"],
  },
  {
    title: "AI",
    icon: "Brain",
    tools: ["Google Veo", "Vertex AI", "ElevenLabs", "DeepSeek"],
  },
];
