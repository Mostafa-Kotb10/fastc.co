import BillBottle from "@/components/design/BillBottle";
import LeafSvg from "@/components/design/LeafSvg";
import MedBottle from "@/components/design/MedBottle";
import PharmacySvg from "@/components/design/PharmacySvg";

export const BackgroundShapes = () => {
  return (
    <>
      <PharmacySvg
        width={250}
        height={250}
        className="absolute left-5 -z-10 text-emerald-500 blur-[2px]"
      />
      {/* <MedicineSvg
        width={250}
        height={250}
        className="text-emerald-700 blur-[2px] absolute left-5"
      /> */}
      <MedBottle
        width={300}
        height={300}
        className="absolute top-30 right-0 text-emerald-500 blur"
      />
      <LeafSvg
        width={125}
        height={125}
        className="absolute -bottom-0 left-0 -rotate-[30deg] text-emerald-700 blur-xs"
      />
    </>
  );
};

export const StackedCardsShapes = () => {
  return (
    <>
      <BillBottle
        width={200}
        height={200}
        className="absolute top-0 z-10 text-cyan-700"
      />
    </>
  );
};
