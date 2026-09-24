import { ImageResponse } from "next/og";
import CatMark from "@/components/CatMark";

// Browser tab icon (replaces the default Next.js favicon.ico).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<CatMark size={size.width} />, { ...size });
}
