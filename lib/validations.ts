import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional().nullable(),
  techStack: z.array(z.string()).default([]),
  repoUrl: z.string().url().optional().or(z.literal("")).nullable(),
  demoUrl: z.string().url().optional().or(z.literal("")).nullable(),
  imageUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["LANGUAGES", "FRAMEWORKS", "GENAI", "TOOLS_CLOUD", "FUNDAMENTALS"]),
  proficiency: z.number().int().min(1).max(5).default(4),
  order: z.number().int().default(0),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  bullets: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  detail: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  order: z.number().int().default(0),
});

export const siteSettingsSchema = z.object({
  tagline: z.string().min(1),
  bio: z.string().default(""),
  linkedinUrl: z.string().url().optional().or(z.literal("")).nullable(),
  githubUrl: z.string().url().optional().or(z.literal("")).nullable(),
  leetcodeUrl: z.string().url().optional().or(z.literal("")).nullable(),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  resumeUrl: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message is too short").max(5000),
});
