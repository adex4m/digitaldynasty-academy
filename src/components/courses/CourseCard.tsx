import { Link } from "react-router-dom";
import { Clock, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
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

        {/* CTA */}
        {course.isCustomRequest ? (
          <Link to="/message">
            <Button variant="course" className="w-full mt-4 group/btn">
              <MessageCircle className="w-4 h-4" />
              <span>Send Us a Message</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        ) : course.enrollUrl ? (
          <a href={course.enrollUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="course" className="w-full mt-4 group/btn">
              <span>Enroll</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </a>
        ) : (
          <Button variant="course" className="w-full mt-4 group/btn">
            <span>Enroll</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
