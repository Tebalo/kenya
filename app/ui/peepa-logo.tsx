import Image from "next/image";
import { roboto_serif } from "./fonts";

export default function PEEPALogo() {
  return (
    <div className={`${roboto_serif.className} flex flex-col items-center gap-3`}>
      <Image
        src="/logopeepa_final-1.jpg"
        width={180}
        height={180}
        alt="PEEPA Logo"
        className="drop-shadow-lg"
        priority
      />
      <h1 className="text-4xl font-bold tracking-tight text-white">PEEPA</h1>
    </div>
  );
}