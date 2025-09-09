import '../styles/ProductDetail.css';
import prod3 from '../images/product3.png';
import { Link, useParams } from 'react-router-dom';

export function ProductDetail() {
    // Slug is currently unused; we render the same product every time per requirements
    const { slug } = useParams();
    const product = { title: 'Table', subtitle: 'Dining / Coffee / Side / Console', image: prod3 };

    return (
        <div className="pd-page">
            <div className='pd-product'>
                <div className='pd-product-left'>
                    <img src={product.image} alt={product.title} className='pd-product-image' />
                    <img src={product.image} alt={product.title} className='pd-product-image-smaller' />
                    <img src={product.image} alt={product.title} className='pd-product-image-smaller' />
                </div>
                <div className='pd-product-right'>
                    <h1 className='pd-product-title'>{product.title}</h1>
                    <p className='pd-product-sub'>{product.subtitle}</p>

                    <p className='pd-desc'>A refined, everyday table designed for calm spaces. Each piece is built from kiln‑dried, sustainably sourced hardwoods. Edges are softened for comfort, joinery is engineered for decades of use, and the surface is finished in a durable, repairable hardwax oil that develops a rich patina with everyday care.</p>

                    <h3 className='pd-subhead'>Colours</h3>
                    <p className='pd-paragraph'>Offered in Natural Oak, American Walnut, and Ebonized Ash as standard. Tone and figure vary naturally from board to board; we select and grain‑match for a balanced appearance. Custom woods and stain tones (including mid‑brown and warm umber) are available on request, with finish samples provided for approval.</p>

                    <h3 className='pd-subhead'>Size</h3>
                    <p className='pd-paragraph'>Standard lengths range from 120–240 cm with widths between 70–100 cm; height is set to 75 cm for comfortable dining and work. Common formats include 180 × 90 cm (seats 6) and 220 × 95 cm (seats 8). We regularly produce custom dimensions to suit room layout, seating, and circulation; tolerances are held within ±2 mm.</p>

                    <h3 className='pd-subhead'>Style</h3>
                    <p className='pd-paragraph'>Minimal, modern proportions with soft radiused edges for a calm, tactile silhouette. Subtle shadow lines and slender under‑profiles keep the piece visually light, while the low‑sheen finish highlights natural grain without glare. Leg placement and profiles are tuned to maximize knee clearance and seating flexibility.</p>

                    <h3 className='pd-subhead'>Details</h3>
                    <p className='pd-paragraph'>Solid‑wood construction throughout with mortise‑and‑tenon joinery at major intersections. Boards are selected for grain flow and oriented to accommodate seasonal movement. Underside bracing adds rigidity without bulk. Leveling glides protect floors and allow micro‑adjustments. Finish can be refreshed locally; care kit and guidance included.</p>

                    <p className='pd-note'>If you’re interested in this piece or a tailored variation, please get in touch. We’ll share finish samples, confirm dimensions, outline lead times, delivery, and installation details.</p>
                    <Link to='/contact' className='pd-cta-button' aria-label='Go to contact page'>Get in touch</Link>
                </div>
            </div>

            <span style={{ height: '150px' }}></span>
        </div>
    );
}

export default ProductDetail;
