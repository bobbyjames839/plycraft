import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../../styles/other/Footer.css';

export function Footer() {
    return (
        <div className="footer">
        <div className='footer_inner'>
            <div className='footer_inner_left'>
            <div className='footer_section footer_section_left'>
                <h3 className='footer_subtitle'>Sections</h3>
                <a href='/' className='footer_para'>Home</a>
                <a href='/products' className='footer_para'>Products</a>
                <a href='/about' className='footer_para'>About</a>
                <a href='/contact' className='footer_para'>Contact</a>
            </div>

            <div className='footer_section'>
                <h3 className='footer_subtitle'>Contact</h3>
                <p className='footer_para'>07786 241225</p>
                <p className='footer_para'>info@companyname.com</p>
                <p className='footer_para'>Potto, North Yorkshire</p>
            </div>
            </div>

            <div className='footer_right'>
            <p className='h-logo'>PlyCraft</p>
            <div className='footer_socials'>
                <a href='https://www.facebook.com/profile.php?id=61553292410630' className='footer_social_link' aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href='https://www.instagram.com/swalesidevaleting/' className='footer_social_link' aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
            </div>
        </div>

        <p className='footer_note'>@PlyCraft 2025</p>
        </div>
    )
}