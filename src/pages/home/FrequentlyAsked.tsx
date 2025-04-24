import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FrequentlyAsked = () => {
  return (
    <section>
      <div className="section-container grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-cyan-700">
            Got Questions? We’ve Got Answers!
          </h2>
          <p className=" mt-2 max-w-md text-base text-gray-600">
            Everything you need to know about making your pharmacy faster,
            smarter, and stress-free with FastAF.
          </p>
        </div>

        <div className=" rounded-sm border-2 border-gray-100 p-5 ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I manage prescriptions in FastAF?
              </AccordionTrigger>
              <AccordionContent>
                FastAF allows pharmacies to track, refill, and verify
                prescriptions through a secure digital interface. You can manage
                patient records and automate reminders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Is FastAF compliant with HIPAA regulations?
              </AccordionTrigger>
              <AccordionContent>
                Yes, FastAF follows strict HIPAA compliance guidelines to ensure
                patient data security and privacy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can FastAF integrate with my existing pharmacy software?
              </AccordionTrigger>
              <AccordionContent>
                FastAF supports integrations with various pharmacy management
                systems via API, making it easy to sync data and workflows.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How does FastAF handle insurance claims?
              </AccordionTrigger>
              <AccordionContent>
                FastAF streamlines insurance claims processing by automating
                eligibility checks, claim submissions, and tracking approvals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What support is available for pharmacies using FastAF?
              </AccordionTrigger>
              <AccordionContent>
                We offer 24/7 technical support, training resources, and
                dedicated account managers to help pharmacies maximize their use
                of FastAF.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsked;
