// Reusable decorative organic blob shapes for CALP branding.
// Absolutely positioned; parent must be `relative overflow-hidden`.

export function RedBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={"pointer-events-none absolute " + className}
      aria-hidden
    >
      <path
        fill="#e11d48"
        d="M320,60c40,40,60,110,40,180s-80,130-150,140s-140-30-170-90s-20-140,20-190s110-70,170-60S280,20,320,60Z"
      />
    </svg>
  );
}

export function BlueBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={"pointer-events-none absolute " + className}
      aria-hidden
    >
      <path
        fill="#bfdbfe"
        d="M310,70c40,50,50,130,20,190s-100,90-170,80s-130-60-140-130s30-140,90-170s160-20,200,30Z"
      />
    </svg>
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
