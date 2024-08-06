import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of Service for OffloadRx",
  alternates: {
    canonical: `${MAIN_URL}/terms`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
