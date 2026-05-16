import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, ArrowRight, MessageCircle, Sparkles, Wallet, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [open, setOpen] = useState(false);

  const channels = [
    {
      key: "free",
      icon: Sparkles,
      title: "Free Entry",
      description: "Join at no cost. Link coming soon.",
      url: null as string | null,
    },
    {
      key: "payg",
      icon: Wallet,
      title: "Pay-As-You-Go (PAYG)",
      description: "Pay only for what you use. Link coming soon.",
      url: null as string | null,
    },
    {
      key: "paid",
      icon: GraduationCap,
      title: "Standard Paid",
      description: "Full access with complete support and resources.",
      url: course.enrollUrl ?? null,
    },
  ];

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <span className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-display font-bold text-xl text-card-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {course.description}
        </p>

        {/* Why Take This Course */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-card-foreground">Why take this course:</h4>
          <ul className="space-y-1.5">
            {course.whyTake.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Beginner:</span>
            <span className="font-semibold text-card-foreground">{course.beginnerTimeline}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Intermediate:</span>
            <span className="font-semibold text-card-foreground">{course.intermediateTimeline}</span>
          </div>
        </div>

        {/* Custom Course CTA - button-styled */}
        <Link to="/message" className="block">
          <Button variant="outline" size="sm" className="w-full">
            <MessageCircle className="w-4 h-4" />
            <span>Contact us for custom courses</span>
          </Button>
        </Link>

        {/* CTA */}
        {course.isCustomRequest ? (
          <Link to="/message">
            <Button variant="course" className="w-full mt-2 group/btn">
              <MessageCircle className="w-4 h-4" />
              <span>Send Us a Message</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="course" className="w-full mt-2 group/btn">
                <span>Enroll</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Choose your registration channel</DialogTitle>
                <DialogDescription>
                  Select how you'd like to enroll in {course.title}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                {channels.map((ch) => {
                  const Icon = ch.icon;
                  const inner = (
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/5 transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold text-card-foreground">{ch.title}</h4>
                          {!ch.url && (
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{ch.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground mt-3 flex-shrink-0" />
                    </div>
                  );
                  return ch.url ? (
                    <a
                      key={ch.key}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <button
                      key={ch.key}
                      type="button"
                      className="w-full text-left opacity-70 cursor-not-allowed"
                      disabled
                    >
                      {inner}
                    </button>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
