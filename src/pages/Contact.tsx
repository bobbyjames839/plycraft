import '../styles/Contact.css';
import React, { useState, useMemo } from 'react';
import { useToast } from '../components/other/Toast';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const toast = useToast();

  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '');
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get('firstName') || ''),
      lastName: String(data.get('lastName') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      product: String(data.get('product') || ''),
      subject: String(data.get('subject') || ''),
      message: String(data.get('message') || ''),
    };

    setStatus('loading');

    try {
      const res = await fetch(`${API_BASE}/contact/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let userMessage = 'Failed to send message';
        try {
          const err = await res.json();
          if (err?.detail && typeof err.detail === 'string') {
            // Keep server detail minimal (avoid raw traces)
            if (err.detail.length < 140) userMessage = err.detail;
          }
        } catch(_) { /* ignore parse error */ }
        throw new Error(userMessage);
      }

      setStatus('success');
      toast.push('success', 'Thanks — we\u2019ll get back to you shortly.');
      form.reset();
    } catch (err: any) {
      // Log full error internally for debugging
      // eslint-disable-next-line no-console
      console.error('Contact form submission error:', err);
      setStatus('error');
      toast.push('error', err?.message && err.message !== 'Failed to send message' ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }
  };

  return (
    <div className="c-page">
      <div className="c-top">
        <h1 className="c-title">Contact</h1>
        <p className="c-sub">
          Have a question or a project in mind? We’d love to hear from you.
        </p>
      </div>

      <section className="c-section">
        <form className="c-form" onSubmit={onSubmit} aria-label="Contact form" noValidate>
          <div className="c-form-head">
            <h2 className="c-form-title">Send us a message</h2>
            <p className="c-form-sub">
              Tell us a little about what you need and we’ll reply with ideas, timing and next steps.
            </p>
          </div>

          <div className="c-row">
            <div className="c-field c-floating">
              <input id="firstName" name="firstName" type="text" className="c-input" placeholder=" " required aria-required="true" />
              <label htmlFor="firstName" className="c-label">
                First Name <span aria-hidden="true" className="c-req">*</span>
              </label>
            </div>
            <div className="c-field c-floating">
              <input id="lastName" name="lastName" type="text" className="c-input" placeholder=" " required aria-required="true" />
              <label htmlFor="lastName" className="c-label">
                Last Name <span aria-hidden="true" className="c-req">*</span>
              </label>
            </div>
          </div>

          <div className="c-row">
            <div className="c-field c-floating">
              <input id="email" name="email" type="email" className="c-input" placeholder=" " required aria-required="true" />
              <label htmlFor="email" className="c-label">
                Email <span aria-hidden="true" className="c-req">*</span>
              </label>
            </div>
            <div className="c-field c-floating">
              <input id="phone" name="phone" type="tel" className="c-input" placeholder=" " />
              <label htmlFor="phone" className="c-label">Phone</label>
            </div>
          </div>

          <div className="c-field c-floating c-select-field">
            <select id="product" name="product" className="c-select c-select--floating" defaultValue="Desks" aria-label="Product of interest">
              <option value="" disabled hidden></option>
              <option value="Desks">Desks</option>
              <option value="Drawers">Drawers</option>
              <option value="Tables">Tables</option>
              <option value="Shelves">Shelves</option>
              <option value="Other">Other / Not sure yet</option>
            </select>
            <label htmlFor="product" className="c-label">Product of interest</label>
          </div>

          <div className="c-field c-floating">
            <input id="subject" name="subject" type="text" className="c-input" placeholder=" " />
            <label htmlFor="subject" className="c-label">Subject</label>
          </div>

            <div className="c-field c-floating">
              <textarea id="message" name="message" className="c-textarea" placeholder=" " required aria-required="true"></textarea>
              <label htmlFor="message" className="c-label">
                Message <span aria-hidden="true" className="c-req">*</span>
              </label>
            </div>

          <button type="submit" className="c-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </section>
    </div>
  );
}
