import socialMediaImg from "@/assets/courses/social-media-management.webp";
import contentWritingImg from "@/assets/courses/content-writing.webp";
import copywritingImg from "@/assets/courses/copywriting.webp";
import graphicDesignImg from "@/assets/courses/graphic-design.webp";
import aiVideoImg from "@/assets/courses/ai-video-creation.webp";
import videoEditingImg from "@/assets/courses/video-editing.webp";
import vibeCodingImg from "@/assets/courses/vibe-coding.webp";
import tutorialOnDemandImg from "@/assets/courses/tutorial-on-demand.webp";
import bootcampSocialImg from "@/assets/bootcamp-social-media.webp";
import bootcampFreelanceImg from "@/assets/bootcamp-freelance.webp";
import bootcampMonetizationImg from "@/assets/bootcamp-monetization.webp";

/** Bundled fallback artwork used when no image has been uploaded in the admin panel. */
export const courseImageFallbacks: Record<string, string> = {
  "social-media-management": socialMediaImg,
  "content-writing": contentWritingImg,
  copywriting: copywritingImg,
  "graphic-design": graphicDesignImg,
  "ai-video-creation": aiVideoImg,
  "video-editing": videoEditingImg,
  "vibe-coding": vibeCodingImg,
  "tutorial-on-demand": tutorialOnDemandImg,
};

export const bootcampImageFallbacks: Record<string, string> = {
  "Social Media Optimization Bootcamp": bootcampSocialImg,
  "Start Your Freelance Journey Bootcamp": bootcampFreelanceImg,
  "Skill Monetization Bootcamp": bootcampMonetizationImg,
};

export const courseImage = (slug: string, url?: string | null) =>
  url || courseImageFallbacks[slug] || vibeCodingImg;

export const bootcampImage = (title: string, url?: string | null) =>
  url || bootcampImageFallbacks[title] || bootcampSocialImg;
