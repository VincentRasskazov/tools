import dynamic from "next/dynamic";
const AgeCalculator = dynamic(() => import("@/components/tools/AgeCalculator"), { ssr: false });
export default AgeCalculator;
