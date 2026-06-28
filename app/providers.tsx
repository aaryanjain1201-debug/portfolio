"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { projects as defaultProjects, Project } from "@/data/projects";
import { videos as defaultVideos } from "@/data/videos";
import { skills as defaultSkills, SkillCategory } from "@/data/skills";
import { siteData as defaultSite } from "@/data/site";

interface SiteData {
  name: string;
  shortName: string;
  title: string;
  description: string;
  email: string;
  social: {
    artstation: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    twitter: string;
  };
}

interface DataContextType {
  projects: Project[];
  videos: typeof defaultVideos;
  skills: SkillCategory[];
  site: SiteData;
  addProject: (p: Project) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addVideo: (v: typeof defaultVideos[0]) => void;
  updateVideo: (id: string, v: Partial<typeof defaultVideos[0]>) => void;
  deleteVideo: (id: string) => void;
  moveVideo: (index: number, direction: "up" | "down") => void;
  reorderVideos: (fromIndex: number, toIndex: number) => void;
  addSkill: (s: SkillCategory) => void;
  updateSkill: (title: string, s: Partial<SkillCategory>) => void;
  deleteSkill: (title: string) => void;
  updateSite: (s: Partial<SiteData>) => void;
  resetToDefaults: () => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [videos, setVideos] = useState<typeof defaultVideos>(defaultVideos);
  const [skills, setSkills] = useState<SkillCategory[]>(defaultSkills);
  const [site, setSite] = useState<SiteData>(defaultSite);
  const [loading, setLoading] = useState(true);

  const saveToAPI = useCallback(async (data: { projects: Project[]; videos: typeof defaultVideos; skills: SkillCategory[]; site: SiteData }) => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error("Failed to save to API:", e);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      // Try API first
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            if (data.projects) setProjects(data.projects);
            if (data.videos) {
              const stored = data.videos as typeof defaultVideos;
              const merged = [...defaultVideos.filter(dv => !stored.some(sv => sv.id === dv.id)), ...stored];
              setVideos(merged);
            }
            if (data.skills) setSkills(data.skills);
            if (data.site) setSite(data.site);
            setLoading(false);
            return;
          }
        }
      } catch (e) {}

      // Fallback to localStorage
      const p = localStorage.getItem("admin_projects");
      const v = localStorage.getItem("admin_videos");
      const s = localStorage.getItem("admin_skills");
      const d = localStorage.getItem("admin_site");
      if (p) setProjects(JSON.parse(p));
      if (v) {
        const stored = JSON.parse(v) as typeof defaultVideos;
        const merged = [...defaultVideos.filter(dv => !stored.some(sv => sv.id === dv.id)), ...stored];
        setVideos(merged);
      }
      if (s) setSkills(JSON.parse(s));
      if (d) setSite(JSON.parse(d));
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (loading) return;
    localStorage.setItem("admin_projects", JSON.stringify(projects));
    localStorage.setItem("admin_videos", JSON.stringify(videos));
    localStorage.setItem("admin_skills", JSON.stringify(skills));
    localStorage.setItem("admin_site", JSON.stringify(site));
    saveToAPI({ projects, videos, skills, site });
  }, [projects, videos, skills, site, loading, saveToAPI]);

  const addProject = (p: Project) => setProjects((prev) => [...prev, { ...p, id: Date.now().toString() }]);
  const updateProject = (id: string, p: Partial<Project>) =>
    setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, ...p } : item)));
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((item) => item.id !== id));

  const addVideo = (v: typeof defaultVideos[0]) =>
    setVideos((prev) => [...prev, { ...v, id: Date.now().toString() }]);
  const updateVideo = (id: string, v: Partial<typeof defaultVideos[0]>) =>
    setVideos((prev) => prev.map((item) => (item.id === id ? { ...item, ...v } : item)));
  const deleteVideo = (id: string) => setVideos((prev) => prev.filter((item) => item.id !== id));

  const moveVideo = (index: number, direction: "up" | "down") => {
    setVideos((prev) => {
      const newVideos = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newVideos.length) return prev;
      [newVideos[index], newVideos[targetIndex]] = [newVideos[targetIndex], newVideos[index]];
      return newVideos;
    });
  };

  const reorderVideos = (fromIndex: number, toIndex: number) => {
    setVideos((prev) => {
      const newVideos = [...prev];
      const [moved] = newVideos.splice(fromIndex, 1);
      newVideos.splice(toIndex, 0, moved);
      return newVideos;
    });
  };

  const addSkill = (s: SkillCategory) => setSkills((prev) => [...prev, s]);
  const updateSkill = (title: string, s: Partial<SkillCategory>) =>
    setSkills((prev) => prev.map((item) => (item.title === title ? { ...item, ...s } : item)));
  const deleteSkill = (title: string) => setSkills((prev) => prev.filter((item) => item.title !== title));

  const updateSite = (s: Partial<SiteData>) => setSite((prev) => ({ ...prev, ...s }));

  const resetToDefaults = () => {
    setProjects(defaultProjects);
    setVideos(defaultVideos);
    setSkills(defaultSkills);
    setSite(defaultSite);
  };

  return (
    <DataContext.Provider
      value={{
        projects, videos, skills, site, loading,
        addProject, updateProject, deleteProject,
        addVideo, updateVideo, deleteVideo, moveVideo, reorderVideos,
        addSkill, updateSkill, deleteSkill,
        updateSite, resetToDefaults,
      }}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
