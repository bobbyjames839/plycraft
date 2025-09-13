import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface AccordionItemProps { 
    title: string; 
    content: string; 
    index: number; 
    openIndex: number | null; 
    setOpenIndex: (i: number | null) => void; 
}

export function AccordionItem({ title, content, index, openIndex, setOpenIndex }: AccordionItemProps) {
    const open = openIndex === index;
    const panelRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    const toggle = () => setOpenIndex(open ? null : index);

    // Inline style for max-height animation
    const maxHeight = open && innerRef.current ? innerRef.current.scrollHeight : 0;

    return (
        <div className={`pd-acc-item ${open ? 'is-open' : ''}`}>
            <button className="pd-acc-trigger" onClick={toggle} aria-expanded={open} aria-controls={`pd-acc-panel-${index}`} id={`pd-acc-trigger-${index}`}>
                <span className="pd-acc-title">{title}</span>
                <span className={`pd-acc-icon ${open ? 'rotated' : ''}`} aria-hidden="true">
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </button>
            <div
                className="pd-acc-panel"
                id={`pd-acc-panel-${index}`}
                role="region"
                aria-labelledby={`pd-acc-trigger-${index}`}
                aria-hidden={!open}
                ref={panelRef}
                style={{ maxHeight, transition: 'max-height .35s ease', overflow: 'hidden' }}
            >
                <div ref={innerRef} style={{ opacity: open ? 1 : 0, transition: 'opacity .35s ease .05s' }}>
                    <p className="pd-acc-text" style={{ paddingBottom: open ? 16 : 0 }}>{content}</p>
                </div>
            </div>
        </div>
    );
}