import { ImageResponse } from "next/og";
import CatMark from "@/components/CatMark";

// iOS home screen and Safari icon. Apple doesn't show transparency, so use the page ground.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<CatMark size={size.width} background="#fafaf9" />, { ...size });
}
