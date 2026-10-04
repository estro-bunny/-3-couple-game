import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const heartSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <Link href="/" className="inline-flex min-h-11 items-center no-underline">
      <span
        className={`${sizeClasses[size]} font-[600] tracking-tighter relative select-none flex items-baseline font-[var(--font-logo)]`}
      >
        <span className="bg-gradient-to-br from-[#ff007f] to-[#a020f0] bg-clip-text text-transparent">
          CouplePlay
        </span>

        <span className="relative inline-block -ml-[3px] -mr-[2px]">
          <span className="text-[#bd93f9] relative z-[1]">H</span>
          <span
            className={`absolute ${heartSizes[size]} text-[#ff007f] left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-[2] animate-neon-flicker`}
            style={{
              textShadow:
                "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff007f, 0 0 30px #ff007f, 0 0 40px #ff007f, 0 0 55px #ff007f, 0 0 75px #ff007f",
            }}
          >
            &#9825;
          </span>
        </span>

        <span className="bg-gradient-to-br from-[#ff007f] to-[#a020f0] bg-clip-text text-transparent">
          ub
        </span>
      </span>
    </Link>
  );
}
