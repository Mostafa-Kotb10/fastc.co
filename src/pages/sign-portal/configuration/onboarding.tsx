import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import onboardingSrc from "@/assets/images/onboarding.png";

import ShiftTime from "./ShiftTIme";
import { useState } from "react";
import { PharmacyNameForm } from "./PharmacyNameStep";

const Onboarding = () => {
  const [step, setStep] = useState<"pharmacy" | "shift">("pharmacy");
  return (
    <section className="relative h-screen overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <img
        src={onboardingSrc}
        alt="Onboarding Background"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-cyan-950/40" />
    </div>

    <div className="relative z-10 grid h-full grid-cols-2">
      <div className="flex flex-col justify-center space-y-6 px-10 py-20 text-white">
        <h2 className="text-5xl font-bold">Welcome to FastAF</h2>
        <p className="max-w-lg text-lg text-white/80">
          Let’s get your pharmacy up and running. Just a few steps to go!
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 shadow-2xl">
        <Card className="h-[35rem] w-full max-w-xl rounded-sm border-none shadow-none">
          <CardHeader>
            <CardTitle>
              <p className="max-w-sm text-4xl font-bold">
                Configure your Pharmacy
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative flex items-center justify-center h-full w-full ">
            {step === "pharmacy" ? (
              <PharmacyNameForm onNext={() => setStep("shift")} />
            ) : (
              <ShiftTime />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  );
};


export default Onboarding;
