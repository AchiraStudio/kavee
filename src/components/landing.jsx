import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../global/siteConfig';
import '../styles/landing.css';

import About from './about';
import Menu from './menu';
import Setup from './setup';
import Footer from './footer';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const Landing = () => {
    return (
        <div className="landing-wrapper">

            {/* --- HERO SECTION --- */}
            <section className="hero-section">
                {/* Background Image with Overlay */}
                <div className="hero-bg">
                    <img
                        src="/images/landing.png"
                        alt="Kavee Exterior"
                    />
                    <div className="overlay"></div>
                </div>

                <motion.div
                    className="container hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        <span className="dot"></span> Open Today 10:00 AM - 12:00 AM
                    </motion.div>

                    <motion.h1 variants={fadeInUp}>
                        {siteConfig.brand.name}<br />
                        <span className="outline-text">COFFEE & SPACE</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp}>
                        {siteConfig.brand.tagline}
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-actions">
                        <a href="#menu" className="btn-primary">View Menu</a>
                        <a href="#location" className="btn-secondary text-light">Find Us</a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </motion.div>
            </section>

            <About />
            <Menu />
            <Setup />
            <Footer />
        </div>
    );
};

export default Landing;