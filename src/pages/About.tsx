import '../styles/About.css';
import profile from '../images/profile.jpg';
import main1 from '../images/main1.jpg';

export function About() {
    const team = [
        { name: 'Sam', role: 'Founder / Lead Maker', image: profile },
        { name: 'Ava', role: 'Design & Client Experience', image: profile },
        { name: 'Liam', role: 'Joinery & Assembly', image: profile },
    ];

    return (
        <div className="a-page">
            <section className="a-top">
                <h1 className="a-title">About Us</h1>
                <p className="a-sub">Furniture shaped by human hands, honest materials, and deliberate pace.</p>
            </section>

            {/* Our story */}
            <section className="a-section a-story">
                <img src={main1} alt="Workshop detail" className="a-section-image" />
                <div className="a-section-body">
                    <h2 className="a-section-title">Our story</h2>
                    <p className="a-section-text">
                        Loom began in a small garage, building for friends and family on weekends. What started
                        as a love for well-made objects turned into a studio that focuses on timeless design,
                        sustainable materials, and enduring craftsmanship. We work slowly and intentionally,
                        shaping pieces that feel natural in your space and better with age.
                    </p>
                    <p className="a-section-text">
                        Today, we continue that approach — fewer pieces, more attention, and an open process.
                        We sketch, prototype, and build by hand, selecting boards for grain and proportion,
                        and finishing surfaces for long-term care and repair.
                    </p>
                </div>
            </section>

            {/* Meet the team */}
            <section className="a-team">
                <h2 className="a-section-title">Meet the team</h2>
                <div className="a-team-grid">
                    {team.map(m => (
                        <div className="a-team-card" key={m.name}>
                            <img src={m.image} alt={m.name} className="a-team-image" />
                            <div className="a-team-meta">
                                <div className="a-team-name">{m.name}</div>
                                <div className="a-team-role">{m.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}