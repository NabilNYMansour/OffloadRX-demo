import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy Policy for OffloadRx",
  alternates: {
    canonical: `${MAIN_URL}/privacy`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
