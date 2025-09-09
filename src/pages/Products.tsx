import '../styles/Products.css';
import prod1 from '../images/product1.png';
import prod2 from '../images/product2.png';
import prod3 from '../images/product3.png';
import prod4 from '../images/product4.png';
import { ProductCard } from '../components/products/ProductCard';

export function Products() {
    const rows = [
        { title: 'Desks',   subtitle: 'Writing, Executive, Corner, Standing', image: prod1 },
        { title: 'Drawers', subtitle: 'Low, Tall, Modular, Media',             image: prod2 },
        { title: 'Tables',  subtitle: 'Dining, Coffee, Side, Console',         image: prod3 },
        { title: 'Shelves', subtitle: 'Floating, Ladder, Wall, Freestanding',  image: prod4 },
    ].map((row) => ({
        ...row,
        items: Array.from({ length: 4 }, (_, i) => ({ title: row.title, image: row.image, key: `${row.title}-${i}` }))
    }));

    return (
        <div className="p-page">
            <div className="p-top">
                <h1 className="p-title">Products</h1>
                <p className="p-sub">Explore our growing collection. More categories coming soon.</p>
            </div>

            {rows.map((row) => (
                <section className="p-section" key={row.title} aria-labelledby={`row-${row.title}`}>
                    <div className="p-row-head">
                        <h2 id={`row-${row.title}`} className="p-row-title">{row.title}</h2>
                        <p className="p-row-sub">{row.subtitle}</p>
                    </div>
                    <div className="p-grid" role="list" aria-label={`${row.title} list`}>
                        {row.items.map((it) => (
                            <ProductCard key={it.key} title={it.title} image={it.image} />
                        ))}
                    </div>
                </section>
            ))}
            <span style={{ height: '100px' }}></span>
        </div>
    );
}