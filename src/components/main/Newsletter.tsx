import '../../styles/Main.css';
import { useState, useMemo } from 'react';
import { useToast } from '../other/Toast';

export function NewsletterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle'|'loading'>('idle');
    const toast = useToast();

    const API_BASE = useMemo(() => (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, ''), []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        try {
            const res = await fetch(`${API_BASE}/newsletter/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email }),
            });
            if (!res.ok) {
                let userMessage = 'Subscription failed';
                try {
                    const body = await res.json();
                    if (body?.detail && typeof body.detail === 'string' && body.detail.length < 140) {
                        userMessage = body.detail;
                    }
                } catch(_) {}
                throw new Error(userMessage);
            }
            toast.push('success', 'Thanks for subscribing!');
            setFirstName('');
            setLastName('');
            setEmail('');
        } catch (err: any) {
            // eslint-disable-next-line no-console
            console.error('Newsletter signup error:', err);
            toast.push('error', err?.message && err.message !== 'Subscription failed' ? err.message : 'Could not subscribe. Try again.');
        } finally {
            setStatus('idle');
        }
    }

    return (
        <form className='m-newsletter-form' onSubmit={onSubmit} noValidate>
            <div className='m-newsletter-row'>
                <div className='m-news-field m-news-floating'>
                    <input
                        id='nl-firstName'
                        type="text"
                        name="firstName"
                        placeholder=" "
                        className='m-newsletter-input m-news-input'
                        aria-label='First name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor='nl-firstName' className='m-news-label'>First Name</label>
                </div>
                <div className='m-news-field m-news-floating'>
                    <input
                        id='nl-lastName'
                        type="text"
                        name="lastName"
                        placeholder=" "
                        className='m-newsletter-input m-news-input'
                        aria-label='Last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor='nl-lastName' className='m-news-label'>Last Name</label>
                </div>
            </div>
            <div className='m-news-field m-news-floating'>
                <input
                    id='nl-email'
                    type="email"
                    name="email"
                    required
                    placeholder=" "
                    className='m-newsletter-input m-news-input'
                    aria-label='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='nl-email' className='m-news-label'>Email Address</label>
            </div>
            <button type='submit' className='m-newsletter-button' disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
            <p className='m-newsletter-legal'>By signing up you agree to receive marketing emails from PlyCraft.</p>
        </form>
    );
}