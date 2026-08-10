import { useId } from "react";

// Official CALP decorative organic shapes, vectorised from the brand SVG set.
// Decorative only — never used to convey information. Absolutely positioned;
// the parent must be `relative overflow-hidden`.
//
// Every fill references a palette variable from src/styles.css, so no colour
// can drift from the official CALP palette. Transparency is applied with
// fill-opacity, which is what produces the overlap blending in the brand
// artwork (two shapes darken where they cross).
//
// IMPORTANT: each source file draws its path inside a clipPath that crops it
// to the 375.12 x 225 frame, and every path overflows that frame. The clip
// rects below are copied verbatim from the source files, so each silhouette
// shows exactly the visible portion the brand artwork shows — no more, no less.

const VIEW_BOX = "0 0 375.12 225";

type ShapeDef = {
  d: string;
  clip: { x: number; y: number; width: number; height: number };
};

const SHAPES: Record<string, ShapeDef> = {
  // 3.svg — soft wide oval
  oval: {
    d: "M 278.585938 41.570312 C 230.875 14.472656 171.417969 8.414062 119.0625 39.832031 C 34.433594 90.601562 -63.707031 297.265625 75.367188 349.097656 C 135.609375 371.53125 293.800781 322.371094 334.171875 273.109375 C 403.941406 188.011719 357.222656 86.246094 278.585938 41.585938 Z M 278.585938 41.570312 ",
    clip: { x: 5.167969, y: 18.667969, width: 363.632812, height: 205.335937 },
  },
  // 15.svg — the broad wave form
  wave: {
    d: "M 368.605469 138.1875 C 324.058594 76.015625 260.019531 39.828125 188.554688 16.636719 C 149.578125 3.644531 113.382812 -7.492188 73.476562 6.425781 C 35.425781 20.347656 15.933594 53.75 7.582031 92.722656 C -6.339844 160.460938 -5.414062 268.089844 60.480469 309.847656 C 114.308594 345.109375 197.835938 322.84375 253.519531 305.210938 C 266.515625 301.5 277.652344 296.859375 288.789062 290.363281 C 295.289062 286.652344 307.347656 277.375 315.699219 277.375 C 334.261719 279.230469 343.542969 314.492188 363.03125 320.984375 C 361.175781 302.425781 350.964844 282.941406 352.824219 264.382812 C 354.679688 250.464844 363.960938 236.546875 367.675781 221.699219 C 373.242188 197.570312 377.886719 161.386719 367.675781 138.1875 ",
    clip: { x: 0.390625, y: 0, width: 373.34375, height: 224.003906 },
  },
  // 2.svg — rounder form
  round: {
    d: "M 357.195312 145.660156 C 342.757812 96.492188 306.769531 53.792969 251.175781 40.828125 C 161.320312 19.882812 -38.984375 94.679688 20.722656 219.808594 C 46.589844 274.003906 184.796875 343.832031 243.949219 337.035156 C 346.152344 325.316406 380.957031 226.710938 357.179688 145.660156 Z M 357.195312 145.660156 ",
    clip: { x: 9.746094, y: 37.335938, width: 354.671875, height: 186.667968 },
  },
};

// Official palette only — see src/styles.css.
const FILLS = {
  blue: "var(--calp-blue)",
  blue75: "var(--calp-blue-75)",
  blue50: "var(--calp-blue-50)",
  red: "var(--calp-red)",
  paleRed: "var(--calp-pale-red)",
  teal: "var(--calp-teal)",
  paleTeal: "var(--calp-pale-teal)",
} as const;

export type BrandShapeName = keyof typeof SHAPES;
export type BrandShapeFill = keyof typeof FILLS;

export function BrandShape({
  shape,
  fill,
  opacity = 1,
  className = "",
}: {
  shape: BrandShapeName;
  fill: BrandShapeFill;
  opacity?: number;
  className?: string;
}) {
  const rawId = useId();
  const clipId = `calp-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}-${shape}`;
  const def = SHAPES[shape];

  return (
    <svg
      viewBox={VIEW_BOX}
      className={"pointer-events-none absolute " + className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={def.clip.x}
            y={def.clip.y}
            width={def.clip.width}
            height={def.clip.height}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d={def.d} fill={FILLS[fill]} fillOpacity={opacity} />
      </g>
    </svg>
  );
}

// Cool cluster: a large teal form with a dark-blue shape crossing its lower
// edge so the intersection reads darker, plus a red accent (CALP red must be
// present in every design).
export function ShapeClusterCool({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={"pointer-events-none absolute " + className}>
      <BrandShape
        shape="oval"
        fill="teal"
        opacity={0.6}
        className="right-0 top-0 h-[85%] w-[85%]"
      />
      <BrandShape
        shape="round"
        fill="blue"
        opacity={0.7}
        className="-left-[6%] bottom-0 h-[64%] w-[64%]"
      />
      <BrandShape
        shape="wave"
        fill="red"
        opacity={0.8}
        className="bottom-[6%] right-[4%] h-[34%] w-[34%]"
      />
    </div>
  );
}

// Warm cluster: the red wave crossing a dark-blue form, with a pale-red shape
// catching the top edge.
export function ShapeClusterWarm({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={"pointer-events-none absolute " + className}>
      <BrandShape
        shape="round"
        fill="blue50"
        opacity={0.95}
        className="right-0 top-[6%] h-[82%] w-[82%]"
      />
      <BrandShape
        shape="wave"
        fill="red"
        opacity={0.8}
        className="bottom-0 left-0 h-[72%] w-[72%]"
      />
      <BrandShape
        shape="oval"
        fill="paleRed"
        opacity={0.9}
        className="-top-[2%] left-[20%] h-[42%] w-[42%]"
      />
    </div>
  );
}
