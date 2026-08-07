// Reusable decorative CALP organic shapes. Decorative only — never used to
// convey information. Absolutely positioned; parent must be
// `relative overflow-hidden`.

function Blob({
  className,
  fill,
  path,
}: {
  className: string;
  fill: string;
  path: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={"pointer-events-none absolute " + className}
      aria-hidden
    >
      <path fill={fill} d={path} />
    </svg>
  );
}

const ORGANIC_A =
  "M320,60c40,40,60,110,40,180s-80,130-150,140s-140-30-170-90s-20-140,20-190s110-70,170-60S280,20,320,60Z";
const ORGANIC_B =
  "M310,70c40,50,50,130,20,190s-100,90-170,80s-130-60-140-130s30-140,90-170s160-20,200,30Z";

export function RedBlob({ className = "" }: { className?: string }) {
  return <Blob className={className} fill="var(--calp-red)" path={ORGANIC_A} />;
}

export function TealBlob({ className = "" }: { className?: string }) {
  return <Blob className={className} fill="var(--calp-teal)" path={ORGANIC_B} />;
}

export function PaleTealBlob({ className = "" }: { className?: string }) {
  return (
    <Blob className={className} fill="var(--calp-pale-teal)" path={ORGANIC_B} />
  );
}

export function PaleRedBlob({ className = "" }: { className?: string }) {
  return (
    <Blob className={className} fill="var(--calp-pale-red)" path={ORGANIC_A} />
  );
}

// Kept for existing usages — decorative pale blue shape.
export function BlueBlob({ className = "" }: { className?: string }) {
  return (
    <Blob className={className} fill="var(--calp-blue-50)" path={ORGANIC_B} />
  );
}

export function RedCircle({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute rounded-full bg-calp-red " + className}
    />
  );
}

export function TealCircle({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute rounded-full bg-calp-teal " + className}
    />
  );
}

export function PaleTealCircle({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute rounded-full bg-calp-pale-teal " + className
      }
    />
  );
}
