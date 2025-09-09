import '../../styles/Main.css';
import { useState } from 'react';

export function NewsletterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
    const [message, setMessage] = useState<string>('');
    const API_BASE = process.env.REACT_APP_BACKEND_UR

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setMessage('');
        try {
            const res = await fetch(`${API_BASE}/newsletter/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.detail || `HTTP ${res.status}`);
            }
            setStatus('success');
            setMessage('Thanks for subscribing!');
            setFirstName('');
            setLastName('');
            setEmail('');

            // Clear the message after 3 seconds
            setTimeout(() => {
                setMessage('');
                setStatus('idle');
            }, 3000);
        } catch (err: any) {
            setStatus('error');
            setMessage(err?.message || 'Failed to subscribe');

            // Clear the message after 3 seconds
            setTimeout(() => {
                setMessage('');
                setStatus('idle');
            }, 3000);
        }
    }

    return (
        <form className='m-newsletter-form' onSubmit={onSubmit}>
            <div className='m-newsletter-row'>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className='m-newsletter-input'
                    aria-label='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className='m-newsletter-input'
                    aria-label='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className='m-newsletter-input'
                aria-label='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='m-newsletter-button' disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
            <p className='m-newsletter-legal'>By signing up you agree to receive marketing emails from PlyCraft.</p>
            {status !== 'idle' && message && (
                <div role={status === 'error' ? 'alert' : 'status'} style={{ marginTop: 8, color: status === 'error' ? 'crimson' : 'var(--color-primary)' }}>
                    {message}
                </div>
            )}
        </form>
    );
}