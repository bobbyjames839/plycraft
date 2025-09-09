import '../styles/Contact.css';
import React, { useState, useMemo } from 'react';

export function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string>('');

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
        setMessage('');
        try {
            const res = await fetch(`${API_BASE}/contact/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || 'Failed to send message');
            }
            setStatus('success');
            setMessage("Thanks — we’ll get back to you shortly.");
            form.reset();
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong');
        } finally {
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="c-page">
            <div className="c-top">
                <h1 className="c-title">Contact</h1>
                <p className="c-sub">Have a question or a project in mind? We’d love to hear from you.</p>
            </div>

            <section className="c-section">
                <form className="c-form" onSubmit={onSubmit} aria-label="Contact form">
                    <div className="c-row">
                        <div className="c-field">
                            <label htmlFor="firstName" className="c-label">First name</label>
                            <input id="firstName" name="firstName" type="text" className="c-input" required placeholder="Jane" />
                        </div>
                        <div className="c-field">
                            <label htmlFor="lastName" className="c-label">Last name</label>
                            <input id="lastName" name="lastName" type="text" className="c-input" required placeholder="Doe" />
                        </div>
                    </div>

                    <div className="c-row">
                        <div className="c-field">
                            <label htmlFor="email" className="c-label">Email</label>
                            <input id="email" name="email" type="email" className="c-input" required placeholder="jane@example.com" />
                        </div>
                        <div className="c-field">
                            <label htmlFor="phone" className="c-label">Phone (optional)</label>
                            <input id="phone" name="phone" type="tel" className="c-input" placeholder="+44 7700 900123" />
                        </div>
                    </div>

                    <div className="c-field">
                        <label htmlFor="product" className="c-label">Product of interest (optional)</label>
                        <select id="product" name="product" className="c-select" defaultValue="">
                            <option value="" disabled>Choose a product</option>
                            <option value="Desks">Desks</option>
                            <option value="Drawers">Drawers</option>
                            <option value="Tables">Tables</option>
                            <option value="Shelves">Shelves</option>
                        </select>
                    </div>

                    <div className="c-field">
                        <label htmlFor="subject" className="c-label">Subject</label>
                        <input id="subject" name="subject" type="text" className="c-input" placeholder="Custom dining table for kitchen" />
                    </div>

                    <div className="c-field">
                        <label htmlFor="message" className="c-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="c-textarea"
                            required
                            placeholder="Share dimensions, wood preference, style, and any timing considerations."></textarea>
                    </div>

                    <button type="submit" className="c-button" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending…' : 'Send message'}
                    </button>
                    {status === 'success' && (
                        <div className="c-success" role="status">{message}</div>
                    )}
                    {status === 'error' && (
                        <div className="c-error" role="alert">{message}</div>
                    )}
                </form>
            </section>
        </div>
    );
}