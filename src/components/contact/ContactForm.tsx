'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { contactSchema, type ContactFormInput, type ContactFormValues } from '@/lib/contact';
import type { ContactApiResponse } from '../../types';

const fieldClassName =
  'w-full min-h-[50px] rounded-xl border-[1.5px] border-rule bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-line-backend focus:shadow-[0_0_0_4px_rgb(31_79_209_/_0.15)] aria-[invalid=true]:border-line-frontend';

const labelClassName = 'mb-2 block text-sm font-semibold';

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="mt-2 text-sm text-line-frontend">
      {message}
    </p>
  ) : null;

const ContactForm = () => {
  const [submitState, setSubmitState] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!submitState) return;
    const timeoutId = window.setTimeout(() => setSubmitState(null), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [submitState]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormInput, undefined, ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitState(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok) {
        setSubmitState({ type: 'error', message: result.message || 'Unable to send your message right now.' });
        return;
      }

      setSubmitState({ type: 'success', message: result.message });
      reset();
    } catch {
      setSubmitState({ type: 'error', message: 'Unable to send your message right now.' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex min-w-0 flex-[999_1_540px] flex-col gap-[22px] rounded-[22px] border border-rule bg-surface p-6 sm:p-9"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClassName}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClassName}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="mobile" className={`${labelClassName} flex justify-between`}>
          Mobile <span className="font-normal text-muted">Optional</span>
        </label>
        <input
          {...register('mobile')}
          id="mobile"
          type="tel"
          autoComplete="tel"
          placeholder="Your mobile number"
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          placeholder="Tell me a little about what you have in mind"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClassName} min-h-[168px] resize-y`}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1.5">
        <p className="text-[13px] text-muted">Your details are only used to reply to you.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[50px] cursor-pointer items-center gap-2.5 rounded-full bg-ink px-[26px] text-[15px] font-semibold text-ground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      <div aria-live="polite">
        {submitState && (
          <p
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              submitState.type === 'success' ? 'bg-line-devops/10 text-line-devops' : 'bg-line-frontend/10 text-line-frontend'
            }`}
          >
            {submitState.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
