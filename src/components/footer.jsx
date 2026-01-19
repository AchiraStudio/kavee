import React from 'react';
import { MapPin, Clock, Instagram, Phone } from 'lucide-react';
import { siteConfig } from '../global/siteConfig';
import '../styles/footer.css';

const Footer = () => {
    return (
        <section id="location" className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-info">
                        <h2>{siteConfig.brand.name}.</h2>
                        <div className="info-block">
                            <MapPin className="icon" size={20} />
                            <p>{siteConfig.contact.address}</p>
                        </div>
                        <div className="info-block">
                            <Phone className="icon" size={20} />
                            <p>{siteConfig.contact.phone}</p>
                        </div>
                        <div className="info-block">
                            <Clock className="icon" size={20} />
                            <div>
                                {siteConfig.hours.map((h, i) => (
                                    <div key={i} className="hours-row">
                                        <span>{h.day}</span>
                                        <strong>{h.time}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="socials">
                            <a href="https://www.instagram.com/kavee.coffee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon"><Instagram /></a>
                            <a href={siteConfig.contact.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary small-btn">Petunjuk Arah</a>
                        </div>
                    </div>

                    <div className="footer-map">
                        <iframe
                            src="https://www.google.com/maps?q=-6.4696039,106.729304&z=15&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Kavee Location"
                        ></iframe>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Achira Studios.</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
