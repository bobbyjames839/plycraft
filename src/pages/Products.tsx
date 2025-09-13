import '../styles/Products.css';
import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';

type Product = {
    id: number;
    title: string;
    subtitle?: string;
    category: 'desk' | 'drawer' | 'table' | 'shelves' | string;
    image: string;
};

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const screenWidth = window.innerWidth;

    const API_BASE = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE}/products`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: Product[] = await res.json();
                if (!cancelled) setProducts(data);
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
    }, [API_BASE]);



    const productsByCategory = useMemo(() => {
        const map: Record<string, Product[]> = { desk: [], drawer: [], table: [], shelves: [] };
        for (const p of products) {
            const key = (p.category || '').toLowerCase();
            if (!map[key]) map[key] = [];
            map[key].push(p);
        }
        return map;
    }, [products]);

    const rows = [
        { title: 'Desks',   subtitle: 'Writing, Executive, Corner, Standing',   key: 'desk' },
        { title: 'Drawers', subtitle: 'Low, Tall, Modular, Media',              key: 'drawer' },
        { title: 'Tables',  subtitle: 'Dining, Coffee, Side, Console',          key: 'table' },
        { title: 'Shelves', subtitle: 'Floating, Ladder, Wall, Freestanding',   key: 'shelves' },
    ].map((row) => ({
        ...row,
        items: (productsByCategory[row.key] || []).slice(0, 4).map((p, i) => ({
            id: (p as Product).id,
            title: p.title,
            image: p.image.startsWith('http') ? p.image : `${API_BASE}${p.image}`,
            key: `${row.key}-${i}-${(p as Product).id}-${p.title}`,
        })),
    }));

    return (
        <div className="p-page">
            <div className="p-top">
                <h1 className="p-title">Products</h1>
                <p className="p-sub">Explore our growing collection. More categories coming soon.</p>
            </div>

            {error && (
                <div role="alert" style={{ color: 'crimson', margin: '1rem 0' }}>
                    Failed to load products: {error}
                </div>
            )}

            {rows.map((row) => (
                <section className="p-section" key={row.title} aria-labelledby={`row-${row.title}`}>
                    <div className="p-row-head">
                        <h2 id={`row-${row.title}`} className="p-row-title">{row.title}</h2>
                        <p className="p-row-sub">{row.subtitle}</p>
                    </div>
                    <div className="p-grid" role="list" aria-label={`${row.title} list`}>
                        {!loading && (productsByCategory[row.key].length === 0) && (
                            <div className='p-loading-span-outer'>
                                <span className='p-loading-span'></span>
                                <span className='p-loading-span'></span>
                                {screenWidth > 640 && <span className='p-loading-span'></span>}
                                {screenWidth > 1000 && <span className='p-loading-span'></span>}
                            </div>
                        )}
                        {!loading && row.items.length === 0 && (
                            <div style={{ padding: '1rem 0', color: '#666' }}>No items yet.</div>
                        )}
                        {row.items.map((it) => (
                            <ProductCard key={it.key} id={(it as any).id} title={it.title} image={it.image} />
                        ))}
                    </div>
                </section>
            ))}
            <span style={{ height: '100px' }}></span>
        </div>
    );
}