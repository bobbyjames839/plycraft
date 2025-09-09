import React from 'react';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
    title: string;
    image: string;
    onClick?: () => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ title, image, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) return onClick();
        // Basic slug from title; detail page renders same product for now
        const slug = title.toLowerCase();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        navigate(`/products/${encodeURIComponent(slug)}`);
    };

    return (
        <div className="prod-card" role="listitem" onClick={handleClick} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="prod-card-overlay">
                <h3 className="prod-card-title">{title}</h3>
                <span className='prod-card-span'>Made to order</span>
            </div>
        </div>
    );
};

export default ProductCard;
