import '../styles/Contact.css';
import React, { useState } from 'react';

export function Contact() {
    const [sent, setSent] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Placeholder submit; can be wired to backend later
        setSent(true);
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

                    {!sent && (
                        <button type="submit" className="c-button">Send message</button>
                    )}
                    {sent && (
                        <div className="c-success" role="status">Thanks — we’ll get back to you shortly.</div>
                    )}
                </form>
            </section>
        </div>
    );
}