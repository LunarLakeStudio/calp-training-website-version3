// Official CALP decorative organic shapes, vectorised from the brand SVG set.
// Decorative only — never used to convey information. Absolutely positioned;
// the parent must be `relative overflow-hidden`.
//
// Every fill references a palette variable from src/styles.css, so no colour
// can drift from the official CALP palette. Transparency is applied with
// fill-opacity, which is what produces the overlap blending in the brand
// artwork (two shapes darken where they cross).

// The source artwork paths overflow their nominal 375x225 frame, so the
// viewBox is widened to contain each silhouette without distortion.
const VIEW_BOX = "-70 -20 480 400";

const SHAPE_OVAL =
  "M 278.585938 41.570312 C 230.875 14.472656 171.417969 8.414062 119.0625 39.832031 C 34.433594 90.601562 -63.707031 297.265625 75.367188 349.097656 C 135.609375 371.53125 293.800781 322.371094 334.171875 273.109375 C 403.941406 188.011719 357.222656 86.246094 278.585938 41.585938 Z M 278.585938 41.570312 ";

const SHAPE_WAVE =
  "M 368.605469 138.1875 C 324.058594 76.015625 260.019531 39.828125 188.554688 16.636719 C 149.578125 3.644531 113.382812 -7.492188 73.476562 6.425781 C 35.425781 20.347656 15.933594 53.75 7.582031 92.722656 C -6.339844 160.460938 -5.414062 268.089844 60.480469 309.847656 C 114.308594 345.109375 197.835938 322.84375 253.519531 305.210938 C 266.515625 301.5 277.652344 296.859375 288.789062 290.363281 C 295.289062 286.652344 307.347656 277.375 315.699219 277.375 C 334.261719 279.230469 343.542969 314.492188 363.03125 320.984375 C 361.175781 302.425781 350.964844 282.941406 352.824219 264.382812 C 354.679688 250.464844 363.960938 236.546875 367.675781 221.699219 C 373.242188 197.570312 377.886719 161.386719 367.675781 138.1875 ";

const SHAPE_ROUND =
  "M 357.195312 145.660156 C 342.757812 96.492188 306.769531 53.792969 251.175781 40.828125 C 161.320312 19.882812 -38.984375 94.679688 20.722656 219.808594 C 46.589844 274.003906 184.796875 343.832031 243.949219 337.035156 C 346.152344 325.316406 380.957031 226.710938 357.179688 145.660156 Z M 357.195312 145.660156 ";

const SHAPES = {
  oval: SHAPE_OVAL,
  wave: SHAPE_WAVE,
  round: SHAPE_ROUND,
} as const;

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
  return (
    <svg
      viewBox={VIEW_BOX}
      className={"pointer-events-none absolute " + className}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      aria-hidden
      focusable="false"
    >
      <path d={SHAPES[shape]} fill={FILLS[fill]} fillOpacity={opacity} />
    </svg>
  );
}

// Cool cluster: a large pale-teal form with a dark-blue shape crossing its
// lower edge so the intersection reads darker, plus a small red accent
// (CALP red must be present in every design).
export function ShapeClusterCool({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute " + className}
    >
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
        shape="wave"
        fill="red"
        opacity={0.8}
        rotate={12}
        className="bottom-[8%] right-[6%] h-[30%] w-[30%]"
      />
    </div>
  );
}

// Warm cluster: the notched red wave crossing a dark-blue form, with a
// pale-red shape catching the top edge.
export function ShapeClusterWarm({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute " + className}
    >
      <BrandShape
        shape="round"
        fill="blue50"
        opacity={0.85}
        rotate={8}
        className="right-0 top-[6%] h-[82%] w-[82%]"
      />
      <BrandShape
        shape="wave"
        fill="red"
        opacity={0.68}
        rotate={-6}
        className="bottom-0 left-0 h-[70%] w-[70%]"
      />
      <BrandShape
        shape="oval"
        fill="paleRed"
        opacity={0.75}
        rotate={24}
        className="-top-[4%] left-[22%] h-[38%] w-[38%]"
      />
    </div>
  );
}
