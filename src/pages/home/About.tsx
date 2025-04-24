
import { LiaGripfire } from 'react-icons/lia';

const About = () => {
    return (
        <section>
          <div className="section-container py-0 ">
            <div className="grid grid-cols-2 gap-4">
              {/* Icon Section */}
              <div className="flex justify-center items-center">
                <LiaGripfire className="size-24 md:size-40 text-orange-400 transition-transform duration-300 hover:scale-110" />
              </div>
    
              {/* Text Section */}
              <div className="rounded-sm flex pl-20 flex-col gap-6  ">
                <div className="space-y-4">
                <h3 className="text-xl md:text-4xl font-bold text-blue-950 max-w-md">
                  Set of trusted prompts and tools to enhance your experience.
                </h3>
    
                <ul className="space-y-3">
                  {[
                    "AI-powered prompt suggestions for faster workflows",
                    "Customizable tool integrations to fit your needs",
                    "Real-time collaboration with your team",
                    "Secure data encryption for all your inputs",
                    "User-friendly dashboard for easy navigation",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-950 text-white text-sm">
                        ✓
                      </span>
                      <p className="text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
    
            
            </div>
          </div>
        </section>
      );
}

export default About