export function Testimonial({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_50px_rgba(11,29,23,0.18)] backdrop-blur-sm">
      <span className="mb-4 text-2xl text-ochre-light">“</span>
      <blockquote className="font-serif text-xl leading-snug text-greige">
        {quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm text-greige/75">
        <span className="font-medium text-greige">{name}</span> — {role}
      </figcaption>
    </figure>
  );
}

export function StatBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="font-serif text-4xl text-moss-dark sm:text-5xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-ink/60">{label}</p>
    </div>
  );
}
