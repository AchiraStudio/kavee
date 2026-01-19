import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../global/siteConfig';
import '../styles/menu.css';

const MOCK_DATA = {
    drinks: {
        "Coffee": [
            { name: "Demo Latte", price: "25k", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600", bestSeller: true },
            { name: "Demo Americano", price: "20k", image: "", bestSeller: false }
        ],
        "Non-Coffee": [
            { name: "Matcha Blend", price: "28k", image: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=600", bestSeller: true }
        ]
    },
    dish: {
        "Main": [
            { name: "Nasi Goreng Kavee", price: "35k", image: "https://images.unsplash.com/photo-1603133872878-684f208fb74b?q=80&w=600", bestSeller: true }
        ]
    }
};

const Menu = () => {
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState('drinks'); // 'drinks' or 'dish'
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchMenu = async () => {
            if (!siteConfig.menuApiUrl || siteConfig.menuApiUrl.includes('REPLACE')) {
                // Determine if we should show mock data or just wait
                console.warn("API URL not configured. Using Mock Data for display.");
                setMenuData(MOCK_DATA);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(siteConfig.menuApiUrl);
                if (!response.ok) throw new Error('Failed to fetch menu');

                const data = await response.json();
                setMenuData(data);
            } catch (err) {
                console.error("Menu fetch error:", err);
                setError("Unable to load menu at the moment. Please try again later.");
                // Fallback to mock data on error for demo purposes? 
                // setMenuData(MOCK_DATA); 
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Helper to get categories for current tab
    const getCategories = () => {
        if (!menuData || !menuData[activeTab]) return [];
        return Object.keys(menuData[activeTab]);
    };

    // Helper to get items based on active tab & category
    const getFilteredItems = () => {
        if (!menuData || !menuData[activeTab]) return [];

        const categories = menuData[activeTab];
        if (activeCategory === 'All') {
            // Flatten all items from all categories
            return Object.values(categories).flat();
        }
        return categories[activeCategory] || [];
    };

    // Reset category when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setActiveCategory('All');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="menu" className="menu-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Our Menu</h2>
                    <p>Authentic flavors, crafted with passion.</p>
                </motion.div>

                {/* --- TABS --- */}
                <div className="menu-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'drinks' ? 'active' : ''}`}
                        onClick={() => handleTabChange('drinks')}
                    >
                        Drinks
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'dish' ? 'active' : ''}`}
                        onClick={() => handleTabChange('dish')}
                    >
                        Food
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading tasty items...</p>
                    </div>
                ) : error ? (
                    <div className="error-msg">{error}</div>
                ) : (
                    <>
                        {/* --- CATEGORIES --- */}
                        <div className="category-filter">
                            <button
                                className={`category-pill ${activeCategory === 'All' ? 'active' : ''}`}
                                onClick={() => setActiveCategory('All')}
                            >
                                All
                            </button>
                            {getCategories().map(cat => (
                                <button
                                    key={cat}
                                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* --- GRID --- */}
                        <motion.div
                            className="menu-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={activeTab + activeCategory} // Force re-render animation on change
                        >
                            <AnimatePresence mode='wait'>
                                {getFilteredItems().map((item, index) => (
                                    <motion.div
                                        key={index} // Use unique ID if available, otherwise index (careful with reordering)
                                        className="menu-card"
                                        variants={itemVariants}
                                        layout
                                    >
                                        <div className="card-image">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} loading="lazy" />
                                            ) : (
                                                // Fallback placeholder pattern
                                                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                                    No Image
                                                </div>
                                            )}
                                            {item.bestSeller && <span className="best-seller-badge">Best Seller</span>}
                                        </div>

                                        <div className="card-content">
                                            <h3>{item.name}</h3>
                                            <div className="card-footer">
                                                <span className="price">{item.price}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {getFilteredItems().length === 0 && (
                            <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No items found in this category.</p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Menu;
