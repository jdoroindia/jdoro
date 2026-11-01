import type { Metadata } from "next";
import { FittingRoom } from "@/components/fitting-room";

export const metadata: Metadata = {
  title: "Fitting Room",
  description: "Style the drop before you buy. Mix pieces, switch colours, then check out the whole look.",
  alternates: { canonical: "/fitting-room" },
};

export default function FittingRoomPage() {
  return <FittingRoom />;
}
