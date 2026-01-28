import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Pharmacy Dashboard",
};

export default function Page() {
  const DynamicAdmin = dynamic(
    () => import("@/components/dashboard/Dashboard"),
    {
      loading: () => <Loader />,
    }
  );
  return (
    <div className="">
      <DynamicAdmin />
    </div>
  );
}
