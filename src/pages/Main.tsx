import '../styles/Main.css';
import main7 from '../images/main7.jpg';
import main2 from '../images/main2.jpg';
import main3 from '../images/main3.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewsletterForm } from '../components/main/Newsletter';
import { useNavigate } from 'react-router-dom';

export function Main() {
    const navigate = useNavigate(); 
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1228);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 1228);

        // Run once on mount
        checkWidth();

        // Run again whenever window is resized
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    const reviews = [
        { 
            name: 'Chris R', 
            rating: 5, 
            text: 'Beautiful craftsmanship. The desk feels like an heirloom already. The attention to detail and quality of the materials make it a centerpiece in my office. I couldn’t be happier with this purchase.' 
        },
        { 
            name: 'Maureen M', 
            rating: 5, 
            text: 'Solid, timeless, and made with care. Could not be happier. The craftsmanship is impeccable, and the design fits perfectly with the aesthetic of my home. Truly a piece to treasure.' 
        },
        { 
            name: 'Jack B', 
            rating: 5, 
            text: 'Replaced a worn table with something warm and sturdy. Looks amazing. The finish is flawless, and the table has completely transformed the look of my dining room. Highly recommended!' 
        },
        { 
            name: 'Ben M', 
            rating: 5, 
            text: 'Exactly the size and feel we wanted. Quality is unmatched. The custom dimensions fit perfectly in our space, and the craftsmanship is second to none. It’s both functional and beautiful.' 
        },
        { 
            name: 'Elena P', 
            rating: 5, 
            text: 'Custom shelf fits perfectly and finishes the space beautifully. The design is elegant yet practical, and the materials used are of the highest quality. It’s a perfect addition to my home.' 
        },
        { 
            name: 'Owen L', 
            rating: 5, 
            text: 'Built to last. You can tell real people crafted this with pride. The durability and attention to detail are evident in every aspect of the piece. It’s a joy to own furniture of this caliber.' 
        },
        { 
            name: 'Sophie T', 
            rating: 5, 
            text: 'Adds warmth and character to our living room. Highly recommend. The design is stunning, and the craftsmanship is exceptional. It’s a piece that truly elevates the ambiance of our home.' 
        }
    ];
    const loopReviews = [...reviews, ...reviews];
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const els = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
    return (
        <div className="m-page">
            <div className="m-top reveal">
                <h1 className="m-top-title">PlyCraft</h1>
                <p className="m-top-subtitle">Innovative design, simple living</p>
            </div>

            <div className='m-who reveal'>
                <img src={main7} alt="Handcrafted wooden chair" className='m-who-image' />
                <div className='m-who-inner'>
                    <h1 className='m-who-header'>Who We Are</h1>
                    <p className='m-who-text'>At PlyCraft, we believe that furniture is more than just functional items; they are pieces of art that tell a story. Our mission is to create handcrafted furniture that combines traditional craftsmanship with modern design, resulting in unique pieces that enhance your living spaces.</p>
                    <button className='m-who-button' onClick={() => navigate('/about')}>Learn More</button>
                </div>
            </div>

            <div className='m-materials reveal'>
                <div className='m-materials-inner'>
                    <h1 className='m-materials-header'>Our Materials</h1>
                    <p className='m-materials-text'>
                        We source only the finest materials to craft our furniture. 
                        Our wood is sustainably harvested and chosen for its natural grain, 
                        strength, and warmth — qualities that give every piece a unique character 
                        that grows richer with time.  
                        <br /><br />
                        Alongside solid wood, we incorporate premium fabrics, natural fibers, 
                        and carefully selected metals and glass. These elements blend together 
                        to create designs that feel both timeless and contemporary.  
                        <br /><br />
                        Every material is tested for sustainability and durability, ensuring 
                        your furniture is not only beautiful today, but built to last for generations. 
                    </p>

                    <button className='m-materials-button' onClick={() => navigate('/products')}>Learn More</button>
                </div>
                <img src={main2} alt="Handcrafted wooden chair" className='m-materials-image' />
            </div>

            <div className='m-who-bottom reveal'>
                <img src={main3} alt="Handcrafted wooden chair" className='m-who-image' />
                <div className='m-who-inner'>
                    <h1 className='m-who-header'>How We Work</h1>
                    <p className='m-who-text'>
                        At PlyCraft, every piece begins with you. We start by listening to your ideas, your space, 
                        and your needs. From there, our designers create concepts that balance function with 
                        timeless design. Once approved, our skilled craftsmen bring your vision to life using 
                        sustainably sourced materials and meticulous techniques.  
                        <br /><br />
                        The result is furniture that is not only beautiful but also meaningful — designed with care, 
                        built to last, and tailored to your lifestyle.
                    </p>
                    <button className='m-who-button' onClick={() => navigate('/products')}>Learn More</button>
                </div>
            </div>


            <div className='m-products reveal'>
                <h1 className='m-products-header'>Our Products</h1>
                <p className='m-products-text'>Explore our curated collection of handcrafted furniture.</p>
                <div className='m-products-grid'>
                    <div className='product-item product-1'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Desks</h3>
                    </div>
                    <div className='product-item product-2'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Drawers</h3>
                    </div>
                    <div className='product-item product-3'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Tables</h3>
                    </div>
                    <div className='product-item product-4'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Shelves</h3>
                    </div>
                    <div className='product-item product-5'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Storage</h3>
                    </div>
                    <div className='product-item product-6'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>Seating</h3>
                    </div>
                    <div className='product-item product-7'>
                        <Link to="/products" className="product-cta" aria-label="View products" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>→</Link>
                        <h3>TV Stands</h3>
                    </div>
                </div>
            </div>

            <div className='m-custom reveal'>
                <div className='m-custom-overlay'>
                    <h1 className='m-custom-header'>Made Just for You</h1>
                    <p className='m-custom-text'>
                        Have a vision? Let us bring it to life with bespoke furniture tailored to your style and space.  
                        <br /><br />
                        Simply share your ideas or request a quote, and our team will work closely with you to design and craft 
                        a piece that fits your exact needs. From the initial concept to the final build, every detail is customized 
                        — ensuring that the furniture we create is truly one-of-a-kind, just like your home.  
                    </p>
                    <button className='m-custom-button' onClick={() => navigate('/products')}>Get Started</button>
                </div>
            </div>

            <div className='m-reviews reveal'>
                <h1 className='m-reviews-header'>What Our Customers Say</h1>
                <p className='m-reviews-text'>Hear from those who have experienced the craftsmanship and care of PlyCraft furniture.</p>
                <div className='m-reviews-row' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    <div className={`m-review-track ${paused ? 'paused' : ''}`}>
                        {loopReviews.map((r, i) => (
                            <div className='m-review-card' key={i}>
                                <div className='m-review-name'>{r.name}</div>
                                <div className='m-review-stars'>{'★★★★★'.slice(0, r.rating)}</div>
                                <div className='m-review-text'>{r.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        <div className='m-contact reveal'>
                <div className='m-contact-inner'>
                    <h2 className='m-newsletter-header'>Stay in the Loop</h2>
                    <p className='m-newsletter-text'>Get updates on new pieces, custom openings, and workshop stories.</p>
                <NewsletterForm />
                </div>
                <iframe
                    src="https://maps.google.com/maps?q=Potto%2C%20North%20Yorkshire&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width={isMobile ? '100%' : 500}
                    height={500}
                    style={{ border: '1px solid var(--color-secondary)', borderRadius: '10px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    />
            </div>
        </div>
    );
}

