import React from 'react';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
    id?: number;
    title: string;
    image: string;
    onClick?: () => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, image, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) return onClick();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        if (id != null) {
            navigate(`/products/${id}`);
        } else {
            const slug = title.toLowerCase();
            navigate(`/products/${encodeURIComponent(slug)}`);
        }
    };

    return (
        <div className="prod-card" role="listitem" onClick={handleClick} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h3 className="prod-card-title">{title}</h3>
            <span className='prod-card-span'>Made to order</span>
        </div>
    );
};

export default ProductCard;
