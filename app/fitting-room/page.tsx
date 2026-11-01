import type { Metadata } from "next";
import { FittingRoom } from "@/components/fitting-room";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Your bag: see your pieces together, change sizes and colours, then check out.",
  alternates: { canonical: "/fitting-room" },
};

export default function FittingRoomPage() {
  return <FittingRoom />;
}
