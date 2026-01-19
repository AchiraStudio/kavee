import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../global/siteConfig';
import '../styles/about.css';

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

const About = () => {
    return (
        <section id="space" className="space-section">
            <div className="container">
                <div className="grid-2-col">
                    <motion.div
                        className="space-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>Lebih dari sekadar<br />Beton & Baja.</motion.h2>
                        <motion.p variants={fadeInUp}>
                            {siteConfig.brand.description}
                            <br /><br />
                            Baik Anda membutuhkan sudut luas untuk bekerja, meja hangat untuk makan malam keluarga, atau suasana terbuka untuk mocktail larut malam, Kavee dirancang untuk koneksi.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="stats-grid">
                            {siteConfig.stats.map((stat, idx) => (
                                <div key={idx} className="stat-item">
                                    <h3>{stat.value}</h3>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="space-gallery"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" alt="Interior Vibe" className="main-img" />
                        <img src="https://images.unsplash.com/photo-1596073419667-9d77d59f033f?q=80&w=500&auto=format&fit=crop" alt="Detail" className="sub-img" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
