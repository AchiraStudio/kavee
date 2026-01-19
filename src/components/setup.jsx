import React from 'react';
import { motion } from 'framer-motion';
import '../styles/setup.css';

const Setup = () => {
    return (
        <section id="night" className="night-section">
            <div className="night-bg">
                <img src="/images/setup.png" alt="Night Atmosphere" />
                <div className="night-overlay"></div>
            </div>
            <div className="container night-content">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    Saat Senja Tiba,<br />Suasana Tercipta.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Rasakan kehangatan cahaya lampu dan sesi akustik kami.
                    Sempurna untuk kencan atau berkumpul bersama teman.
                </motion.p>
            </div>
        </section>
    );
};

export default Setup;
