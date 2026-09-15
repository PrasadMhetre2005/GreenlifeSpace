/**
 * Stand-in for real photography until Cloudinary-hosted photos are wired
 * up (see report section 5, "File uploads"). Swap the <div> below for a
 * Next.js <Image src="https://res.cloudinary.com/..." /> once photos
 * exist — keep the same className for the clip-path/shape.
 */
export default function PhotoPlaceholder({
  label,
  className = "",
  clip = "clip-leaf",
  tone = "moss",
}: {
  label: string;
  className?: string;
  clip?: "clip-leaf" | "clip-leaf-alt" | "";
  tone?: "moss" | "sage" | "ochre";
}) {
  const gradients: Record<string, string> = {
    moss: "from-moss to-moss-dark",
    sage: "from-sage to-sagedeep",
    ochre: "from-ochre-light to-ochre",
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${gradients[tone]} ${clip} ${className}`}
    >
      <span className="px-4 text-center font-serif text-sm italic text-greige/70">
        {label}
      </span>
    </div>
  );
}
