// Official CALP decorative organic shapes, vectorised from the brand SVG set.
// Decorative only — never used to convey information. Absolutely positioned;
// the parent must be `relative overflow-hidden`.
//
// Every fill references a palette variable from src/styles.css, so no colour
// can drift from the official CALP palette. Transparency is applied with
// fill-opacity, which is what produces the overlap blending in the brand
// artwork (two shapes darken where they cross).
//
// Framing: each source file crops its path to a 375.12 x 225 frame, which cuts
// the silhouette with a straight edge. `oval` and `round` are closed organic
// paths, so we frame them to their own true bounds instead — same shape as the
// brand file, just uncropped, with no straight cuts and no stray spurs.

type ShapeDef = {
  d: string;
  viewBox: string;
};

const SHAPES = {
  // 3.svg — soft wide oval (closed path, framed to its own bounds)
  oval: {
    d: "M 278.585938 41.570312 C 230.875 14.472656 171.417969 8.414062 119.0625 39.832031 C 34.433594 90.601562 -63.707031 297.265625 75.367188 349.097656 C 135.609375 371.53125 293.800781 322.371094 334.171875 273.109375 C 403.941406 188.011719 357.222656 86.246094 278.585938 41.585938 Z M 278.585938 41.570312 ",
    viewBox: "-40 0 460 380",
  },
  // 2.svg — rounder form (closed path, framed to its own bounds)
  round: {
    d: "M 357.195312 145.660156 C 342.757812 96.492188 306.769531 53.792969 251.175781 40.828125 C 161.320312 19.882812 -38.984375 94.679688 20.722656 219.808594 C 46.589844 274.003906 184.796875 343.832031 243.949219 337.035156 C 346.152344 325.316406 380.957031 226.710938 357.179688 145.660156 Z M 357.195312 145.660156 ",
    viewBox: "-25 10 405 340",
  },
} satisfies Record<string, ShapeDef>;

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
  rotate = 0,
  className = "",
}: {
  shape: BrandShapeName;
  fill: BrandShapeFill;
  opacity?: number;
  rotate?: number;
  className?: string;
}) {
  const def = SHAPES[shape];

  return (
    <svg
      viewBox={def.viewBox}
      className={"pointer-events-none absolute " + className}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      aria-hidden
      focusable="false"
    >
      <path d={def.d} fill={FILLS[fill]} fillOpacity={opacity} />
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
        rotate={-18}
        className="-left-[6%] bottom-0 h-[62%] w-[62%]"
      />
      <BrandShape
        shape="round"
        fill="red"
        opacity={0.75}
        rotate={140}
        className="bottom-[8%] right-[6%] h-[32%] w-[32%]"
      />
    </div>
  );
}

// Warm cluster: a large red form crossing a dark-blue form, with a pale-red
// shape catching the top edge.
export function ShapeClusterWarm({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={"pointer-events-none absolute " + className}>
      <BrandShape
        shape="round"
        fill="blue50"
        opacity={0.95}
        rotate={8}
        className="right-0 top-[6%] h-[82%] w-[82%]"
      />
      <BrandShape
        shape="oval"
        fill="red"
        opacity={0.7}
        rotate={-160}
        className="bottom-0 left-0 h-[70%] w-[70%]"
      />
      <BrandShape
        shape="round"
        fill="paleRed"
        opacity={0.9}
        rotate={24}
        className="-top-[4%] left-[22%] h-[38%] w-[38%]"
      />
    </div>
  );
}
