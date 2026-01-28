import { GiDna2 } from "react-icons/gi";
import MoleculeSvg from "@/svg/MoleculeSvg";
import MedicalCrossSvg from "@/svg/MedicalCrossSvg";
import PillSvg from "@/svg/PillSvg";
import StethoscopeSvg from "@/svg/StethoscopeSvg";
import HeartRateSvg from "@/svg/HeartRateSvg";



export function LoginDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-5 -left-30 w-80 h-80 opacity-10 -rotate-[285deg]">
        <GiDna2 size={200} color="#0000FF" />
      </div>
      <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10">
        <MoleculeSvg />
      </div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 opacity-10">
        <MedicalCrossSvg />
      </div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 opacity-10">
        <PillSvg />
      </div>
      <div className="absolute top-1/2 -left-16 w-48 h-48 opacity-100 transform -translate-y-1/2">
        <StethoscopeSvg />
      </div>
      <div className="absolute top-1/2 -right-16 w-48 h-48 opacity-100 transform -translate-y-1/2">
        <HeartRateSvg />
      </div>
      {/* <div className="absolute top-0 left-1/2 w-32 h-32 opacity-100 transform -translate-x-1/2">
        <MicroscopeSvg />
      </div> */}
    </div>
  );
}