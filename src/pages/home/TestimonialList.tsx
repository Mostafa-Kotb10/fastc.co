import { testimonials } from "@/constants/constants";
import TestimonialCard from "./TestimonialCard";

const TestimonialList = () => {
  return (
    <div className="flex  gap-16">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialList;
