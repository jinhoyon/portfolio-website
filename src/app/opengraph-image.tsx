import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link-preview card (iMessage, Slack, LinkedIn, X). Without it, previews fall back to
// cropping the first large image on the page, which is a project screenshot.
export const alt = "Jinho (Roy) Yon — Software that makes complex things clear.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#fafaf9"; // globals.css --background
const FOREGROUND = "#27272a"; // globals.css --foreground
const MUTED = "#71717a"; // zinc-500
const RULE = "#e4e4e7"; // zinc-200

// Static Geist files from the `geist` npm package (SIL OFL, see assets/fonts/Geist-OFL.txt),
// so the headline can use SemiBold like the site.
const fontDir = join(process.cwd(), "assets/fonts");
const geistRegular = readFile(join(fontDir, "Geist-Regular.ttf"));
const geistSemiBold = readFile(join(fontDir, "Geist-SemiBold.ttf"));

// The OG renderer measures Geist words ending in e, x, or k about 0.12em wider than they
// draw (the font's metrics and kerning are normal; Arial doesn't show it), which leaves
// visibly wide gaps after those words. Lay text out word by word and trim that excess.
const OVERSIZED_ENDINGS = /[exk]$/;

function Words({ text, fontSize }: { text: string; fontSize: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: fontSize * 0.26 }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ marginRight: OVERSIZED_ENDINGS.test(word) ? -fontSize * 0.12 : 0 }}>
          {word}
        </span>
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ fontWeight: 600 }}>Jinho (Roy) Yon</span>
          <span style={{ color: MUTED }}>yjinho.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2.5, maxWidth: 900 }}>
            <Words text="Software that makes complex things clear." fontSize={84} />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              paddingTop: 28,
              borderTop: `2px solid ${RULE}`,
              fontSize: 30,
              color: MUTED,
            }}
          >
            <Words text="Software engineer · fullstack and applied AI · UC Davis CS&E" fontSize={30} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: await geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: await geistSemiBold, style: "normal", weight: 600 },
      ],
    },
  );
}
