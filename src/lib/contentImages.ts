import socialMediaImg from "@/assets/courses/social-media-management.jpg";
import contentWritingImg from "@/assets/courses/content-writing.jpg";
import copywritingImg from "@/assets/courses/copywriting.jpg";
import graphicDesignImg from "@/assets/courses/graphic-design.jpg";
import aiVideoImg from "@/assets/courses/ai-video-creation.jpg";
import videoEditingImg from "@/assets/courses/video-editing.jpg";
import spokenWordImg from "@/assets/courses/spoken-word-poetry.jpg";
import vibeCodingImg from "@/assets/courses/vibe-coding.jpg";
import tutorialOnDemandImg from "@/assets/courses/tutorial-on-demand.jpg";
import bootcampSocialImg from "@/assets/bootcamp-social-media.jpg";
import bootcampFreelanceImg from "@/assets/bootcamp-freelance.jpg";
import bootcampMonetizationImg from "@/assets/bootcamp-monetization.jpg";

/** Bundled fallback artwork used when no image has been uploaded in the admin panel. */
export const courseImageFallbacks: Record<string, string> = {
  "social-media-management": socialMediaImg,
  "content-writing": contentWritingImg,
  copywriting: copywritingImg,
  "graphic-design": graphicDesignImg,
  "ai-video-creation": aiVideoImg,
  "video-editing": videoEditingImg,
  "spoken-word-poetry": spokenWordImg,
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
