import socialMediaImg from "@/assets/courses/social-media-management.jpg";
import contentWritingImg from "@/assets/courses/content-writing.jpg";
import copywritingImg from "@/assets/courses/copywriting.jpg";
import graphicDesignImg from "@/assets/courses/graphic-design.jpg";
import aiVideoImg from "@/assets/courses/ai-video-creation.jpg";
import videoEditingImg from "@/assets/courses/video-editing.jpg";
import spokenWordImg from "@/assets/courses/spoken-word-poetry.jpg";
import vibeCodingImg from "@/assets/courses/vibe-coding.jpg";
import tutorialOnDemandImg from "@/assets/courses/tutorial-on-demand.jpg";

export interface Course {
  id: string;
  title: string;
  description: string;
  whyTake: string[];
  beginnerTimeline: string;
  intermediateTimeline: string;
  thumbnail: string;
  category: string;
  isCustomRequest?: boolean;
  enrollUrl?: string;
}

export const courses: Course[] = [
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Master the art of building brands and engaging audiences across all major social platforms.",
    whyTake: [
      "Learn to create viral content strategies",
      "Build and grow engaged communities",
      "Master scheduling and analytics tools",
      "Develop client management skills"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: socialMediaImg,
    category: "Marketing",
    enrollUrl: "https://selar.com/5g37e63677"
  },
  {
    id: "content-writing",
    title: "Content Writing",
    description: "Transform your ideas into compelling written content that captivates and converts readers.",
    whyTake: [
      "Develop a unique writing voice",
      "Master SEO writing techniques",
      "Create content that drives traffic",
      "Build a professional portfolio"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: contentWritingImg,
    category: "Writing",
    enrollUrl: "https://selar.com/ddicontentwriting"
  },
  {
    id: "copywriting",
    title: "Copywriting",
    description: "Learn to write persuasive copy that sells products, services, and ideas effectively.",
    whyTake: [
      "Master persuasion psychology",
      "Write high-converting sales pages",
      "Create compelling email sequences",
      "Command premium rates for your skills"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: copywritingImg,
    category: "Writing",
    enrollUrl: "https://selar.com/ddi-copywriting"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Create stunning visual designs using industry-standard tools and modern design principles.",
    whyTake: [
      "Master design software (Canva, Adobe)",
      "Understand color theory & typography",
      "Create brand identities from scratch",
      "Build a stunning design portfolio"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: graphicDesignImg,
    category: "Design",
    enrollUrl: "https://selar.com/ddi-graphicdesign"
  },
  {
    id: "ai-video-creation",
    title: "AI Video Creation",
    description: "Leverage cutting-edge AI tools to create professional videos without expensive equipment.",
    whyTake: [
      "Master AI video generation tools",
      "Create content 10x faster",
      "Produce professional-quality videos",
      "Stay ahead of industry trends"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: aiVideoImg,
    category: "Video",
    enrollUrl: "https://selar.com/ddi-aivideocreation"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Master professional video editing techniques to create stunning visual stories.",
    whyTake: [
      "Learn industry-standard software",
      "Master pacing and storytelling",
      "Add professional effects & transitions",
      "Build a video editing career"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: videoEditingImg,
    category: "Video",
    enrollUrl: "https://selar.com/ddivideoediting"
  },
  {
    id: "spoken-word-poetry",
    title: "Spoken Word & Poetry",
    description: "Express yourself powerfully through the art of spoken word and poetry performance.",
    whyTake: [
      "Find your unique voice",
      "Master performance techniques",
      "Build confidence on stage",
      "Connect deeply with audiences"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: spokenWordImg,
    category: "Creative",
    enrollUrl: "https://selar.com/ddispokenword-poetry"
  },
  {
    id: "vibe-coding",
    title: "Vibe-Coding / AI Web Development",
    description: "Start building your dream website. Master the revolutionary art of \"vibe-coding\"—using Artificial Intelligence to translate your ideas into functional, stunning websites through conversational prompts. This course empowers you to bypass the steep learning curve of traditional coding and ship real-world digital projects in days, not months.",
    whyTake: [
      "Build websites using AI-powered tools",
      "No prior coding experience needed",
      "Ship real projects in days, not months",
      "Stay ahead with cutting-edge AI skills"
    ],
    beginnerTimeline: "5 weeks + 3 weeks practical",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: vibeCodingImg,
    category: "Technology",
    enrollUrl: "https://selar.com/vibe-coding"
  },
  {
    id: "tutorial-on-demand",
    title: "Tutorial On Demand",
    description: "Can't find what you're looking for? Request a custom tutorial tailored to your specific learning needs.",
    whyTake: [
      "Get personalized learning content",
      "Learn at your own pace",
      "Cover any digital skill you need",
      "One-on-one guidance available"
    ],
    beginnerTimeline: "Custom",
    intermediateTimeline: "Custom",
    thumbnail: tutorialOnDemandImg,
    category: "Special Request",
    isCustomRequest: true
  }
];
