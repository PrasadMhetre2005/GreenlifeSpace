export default function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={`specimen-tag ${light ? "text-sage" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-serif text-3xl sm:text-4xl ${light ? "text-greige" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-prose text-[15px] leading-relaxed ${light ? "text-greige/75" : "text-ink/70"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
