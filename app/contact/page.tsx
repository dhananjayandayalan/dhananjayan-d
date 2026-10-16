'use client';

import ContactForm from '@/components/contact/ContactForm';
import ContactCard from '@/components/contact/ContactCard';

export default function Contact() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-[72px]">
      <div className="mb-12">
        <p className="eyebrow mb-4 text-muted">Contact</p>
        <h1 className="font-display text-[clamp(44px,6vw,84px)] font-extrabold leading-[0.95] tracking-[-0.035em] [font-stretch:115%]">
          Get in touch
        </h1>
        <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-ink-soft">
          Have a question or want to work together? I’d love to hear from you.
        </p>
      </div>

      <div className="flex flex-wrap items-stretch gap-7">
        <ContactForm />
        <ContactCard />
      </div>
    </div>
  );
}
