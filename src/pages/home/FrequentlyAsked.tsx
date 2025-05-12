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
            Got Questions? We&rsquo;ve Got Answers!
          </h2>
          <p className="mt-2 max-w-md text-base text-gray-600">
            Everything you need to know about making your pharmacy faster,
            smarter, and stress-free with FastAF.
          </p>
        </div>

        <div className="rounded-sm border-2 border-gray-100 p-5">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I scan a drug without a barcode?
              </AccordionTrigger>
              <AccordionContent>
                Our system uses your phone's camera and AI to detect drugs
                visually. Simply point the camera and touch the drug on the
                screen to add it to the cart. No barcode scanner is needed at
                all.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                What if my phone camera isn't working?
              </AccordionTrigger>
              <AccordionContent>
                No worries — you can still sell drugs. The app lets you search
                by drug name. You can add it manually to the cart.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I use the system for multiple branches?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can manage each branch separately. Each has its own
                database and user roles. Perfect for expanding pharmacy chains.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can the system manage drug expiry automatically?
              </AccordionTrigger>
              <AccordionContent>
                Yes, when adding drugs to inventory, you must input the expiry
                date. The system calculates the proper shelf order based on
                expiry and uses it during sales. When a sale is made, the batch
                with the closest expiry is automatically deducted first.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Is the system easy to set up and learn?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. It&rsquo;s designed for non-technical pharmacy workers.
                Simple steps, intuitive UI, and helpful prompts. You&rsquo;ll get
                started quickly without special training.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsked;
