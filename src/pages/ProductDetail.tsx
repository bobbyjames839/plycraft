import '../styles/ProductDetail.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Product = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    description: Array<{
        basic: string;
        colours: { title: string; description: string };
        size: { title: string; description: string };
        style: { title: string; description: string };
        materials: { title: string; description: string };
    }>;
};

export function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE}/products/${id}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: Product = await res.json();
                if (!cancelled) setProduct(data);
            } catch (e: any) {
                if (!cancelled) setError(e?.message || 'Failed to load');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [API_BASE, id]);

    if (loading) return <div className="pd-page"><div style={{ padding: '2rem' }}>Loading…</div></div>;
    if (error) return <div className="pd-page"><div role="alert" style={{ color: 'crimson', padding: '2rem' }}>Failed to load product: {error}</div></div>;
    if (!product) return <div className="pd-page"><div style={{ padding: '2rem' }}>Not found.</div></div>;

    const imageUrl = product.image.startsWith('http') ? product.image : `${API_BASE}${product.image}`;
    const d = product.description?.[0];

    return (
        <div className="pd-page">
            <div className='pd-product'>
                <div className='pd-product-left'>
                    <img src={imageUrl} alt={product.title} className='pd-product-image' />
                    <img src={imageUrl} alt={product.title} className='pd-product-image-smaller' />
                    <img src={imageUrl} alt={product.title} className='pd-product-image-smaller' />
                </div>
                <div className='pd-product-right'>
                    <h1 className='pd-product-title'>{product.title}</h1>
                    <p className='pd-product-sub'>{product.subtitle}</p>

                    {d?.basic && <p className='pd-desc'>{d.basic}</p>}

                    {d?.colours && (
                        <>
                            <h3 className='pd-subhead'>{d.colours.title}</h3>
                            <p className='pd-paragraph'>{d.colours.description}</p>
                        </>
                    )}

                    {d?.size && (
                        <>
                            <h3 className='pd-subhead'>{d.size.title}</h3>
                            <p className='pd-paragraph'>{d.size.description}</p>
                        </>
                    )}

                    {d?.style && (
                        <>
                            <h3 className='pd-subhead'>{d.style.title}</h3>
                            <p className='pd-paragraph'>{d.style.description}</p>
                        </>
                    )}

                    {d?.materials && (
                        <>
                            <h3 className='pd-subhead'>{d.materials.title}</h3>
                            <p className='pd-paragraph'>{d.materials.description}</p>
                        </>
                    )}

                    <p className='pd-note'>If you’re interested in this piece or a tailored variation, please get in touch. We’ll share finish samples, confirm dimensions, outline lead times, delivery, and installation details.</p>
                    <Link to='/contact' className='pd-cta-button' aria-label='Go to contact page'>Get in touch</Link>
                </div>
            </div>

            <span style={{ height: '150px' }}></span>
        </div>
    );
}

export default ProductDetail;
