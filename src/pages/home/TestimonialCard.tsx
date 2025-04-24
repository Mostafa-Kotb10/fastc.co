import { Testimonial } from "@/constants/constants";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex flex-col shadow-lg p-5 space-y-5 w-[350px] flex-1 rounded-lg">
      {/* Stars */}
      <div className="flex">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <FaStar key={index} className="size-5 text-yellow-400" />
        ))}
      </div>

      {/* Testimonial Text */}
      <div>
        <p className="text-sm">{testimonial.text}</p>
      </div>

      {/* Name & Date */}
      <div className="flex flex-col mt-auto">
        <div className="font-semibold block">{testimonial.name}</div>
        <div className="text-sm text-gray-700">{testimonial.date}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
