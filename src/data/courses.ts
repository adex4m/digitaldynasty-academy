import socialMediaImg from "@/assets/courses/social-media-management.jpg";
import contentWritingImg from "@/assets/courses/content-writing.jpg";
import copywritingImg from "@/assets/courses/copywriting.jpg";
import graphicDesignImg from "@/assets/courses/graphic-design.jpg";
import affiliateMarketingImg from "@/assets/courses/affiliate-marketing.jpg";
import aiVideoImg from "@/assets/courses/ai-video-creation.jpg";
import videoEditingImg from "@/assets/courses/video-editing.jpg";
import spokenWordImg from "@/assets/courses/spoken-word-poetry.jpg";
import dataResellingImg from "@/assets/courses/data-reselling.jpg";
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: socialMediaImg,
    category: "Marketing"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: contentWritingImg,
    category: "Writing"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: copywritingImg,
    category: "Writing"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: graphicDesignImg,
    category: "Design"
  },
  {
    id: "affiliate-marketing",
    title: "Affiliate Marketing",
    description: "Build passive income streams by promoting products and earning commissions online.",
    whyTake: [
      "Choose profitable niches",
      "Build high-converting landing pages",
      "Master traffic generation strategies",
      "Create sustainable income streams"
    ],
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: affiliateMarketingImg,
    category: "Business"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: aiVideoImg,
    category: "Video"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: videoEditingImg,
    category: "Video"
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
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: spokenWordImg,
    category: "Creative"
  },
  {
    id: "data-reselling",
    title: "Data Reselling",
    description: "Start a profitable data reselling business and earn consistent income.",
    whyTake: [
      "Understand the data business model",
      "Find reliable suppliers",
      "Build a customer base",
      "Scale your business profitably"
    ],
    beginnerTimeline: "6 weeks",
    intermediateTimeline: "Custom (based on your goals)",
    thumbnail: dataResellingImg,
    category: "Business"
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
