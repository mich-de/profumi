import { useState, useEffect } from 'react'
import './App.css'

import { perfumes } from './data/perfumes-zara'

const translations = {
    it: {
        nav: { home: "Home", equivalents: "Equivalenti", about: "Chi Siamo" },
        hero: {
            title: "Qualità Premium.",
            subtitle: "Frazione del Prezzo.",
            desc: "Scopri i confronti olfattivi più ricercati al mondo. Esperienze di lusso, ai prezzi di Zara.",
            cta: "Esplora Equivalenti",
            vs: "VS"
        },
        grid: {
            title: "Tabella globale dupe Zara maschili / unisex con prezzi e cloni (agg. gennaio 2026)",
            card: {
                collection: "Collezione Zara",
                savings: "Risparmio Stimato",
                equivalent: "Equivalente di",
                originalPrice: "Prezzo Originale",
                buy: "Acquista su Zara"
            }
        },
        about: {
            title: "Ridefiniamo il",
            luxury: "Lusso",
            lead: "Le essenze autentiche non dovrebbero costare una fortuna.",
            p1: "Da ScentSense, crediamo che l'arte della profumeria risieda nel succo, non nella bottiglia o nel budget di marketing. Analizziamo meticolosamente i profili olfattivi delle fragranze più costose al mondo e li abbiniamo alle loro controparti di alta qualità dei mastri profumieri di Zara.",
            p2: "Vivi le stesse note di testa, di cuore e di fondo che ami, a una frazione del prezzo."
        },
        footer: "© 2026 ScentSense Portal. Sviluppato da Antigravity."
    },
    en: {
        nav: { home: "Home", equivalents: "Equivalents", about: "About Us" },
        hero: {
            title: "Premium Quality.",
            subtitle: "Fraction of the Price.",
            desc: "Discover the most sought-after olfactory comparisons in the world. Luxury experiences at Zara prices.",
            cta: "Explore Equivalents",
            vs: "VS"
        },
        grid: {
            title: "Global Zara Dupes Table Men / Unisex with Prices and Clones (Jan 2026)",
            card: {
                collection: "Zara Collection",
                savings: "Estimated Savings",
                equivalent: "Equivalent of",
                originalPrice: "Original Price",
                buy: "Buy on Zara"
            }
        },
        about: {
            title: "Redefining",
            luxury: "Luxury",
            lead: "Authentic essences shouldn't cost a fortune.",
            p1: "At ScentSense, we believe the art of perfumery lies in the juice, not the bottle or marketing budget. We meticulously analyze the scent profiles of the world's most expensive fragrances and match them with their high-quality counterparts from Zara master perfumers.",
            p2: "Experience the same top, heart, and base notes you love, at a fraction of the price."
        },
        footer: "© 2026 ScentSense Portal. Developed by Antigravity."
    }
};

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [lang, setLang] = useState('it');

    const t = (path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]) || path;
    };

    const toggleLang = () => {
        setLang(prev => prev === 'it' ? 'en' : 'it');
    };

    const openLightbox = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app">
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="logo">SCENT<span>SENSE</span></div>
                    <ul className="nav-links">
                        <li><a href="#hero">{t('nav.home')}</a></li>
                        <li><a href="#grid">{t('nav.equivalents')}</a></li>
                        <li><a href="#about">{t('nav.about')}</a></li>
                        <li>
                            <button className="lang-switch" onClick={toggleLang}>
                                {lang === 'it' ? '🇺🇸 EN' : '🇮🇹 IT'}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <section id="hero" className="hero">
                <div className="hero-content">
                    <h1>{t('hero.title')}<br /><span>{t('hero.subtitle')}</span></h1>
                    <p>{t('hero.desc')}</p>
                    <a href="#grid" className="btn-primary">{t('hero.cta')}</a>
                </div>
                <div className="hero-visual">
                    <div className="comparison-main">
                        <img
                            src={`${import.meta.env.BASE_URL}images/zara/vibrant_leather.jpg`}
                            alt="Vibrant Leather"
                            className="img-zara clickable-img"
                            onClick={() => openLightbox(`${import.meta.env.BASE_URL}images/zara/vibrant_leather.jpg`)}
                        />
                        <div className="vs">VS</div>
                        <img
                            src={`${import.meta.env.BASE_URL}images/originals/creed_aventus.png`}
                            alt="Creed Aventus"
                            className="img-original clickable-img"
                            onClick={() => openLightbox(`${import.meta.env.BASE_URL}images/originals/creed_aventus.png`)}
                        />
                    </div>
                </div>
            </section>

            <section id="grid" className="dupe-grid-section">
                <h2 className="section-title">{t('grid.title')}</h2>
                <div className="grid">
                    {perfumes.map(p => (
                        <div key={p.id} className="perfume-card">
                            <div className="card-media">
                                <img
                                    src={`${import.meta.env.BASE_URL}${p.zaraImg.startsWith('/') ? p.zaraImg.substring(1) : p.zaraImg}`}
                                    alt={p.name}
                                    className="zara-thumb clickable-img"
                                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/placeholder_zara.jpg` }}
                                    onClick={() => openLightbox(`${import.meta.env.BASE_URL}${p.zaraImg.startsWith('/') ? p.zaraImg.substring(1) : p.zaraImg}`)}
                                />
                                <div className="media-overlay">
                                    <span className="price-tag">{p.priceZara}</span>
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-buy" onClick={(e) => e.stopPropagation()}>
                                            {t('grid.card.buy')}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="card-info">
                                <div className="card-header">
                                    <h3>{p.name}</h3>
                                    <span className="gender-badge">{p.gender}</span>
                                </div>
                                <p className="type">{p.format || t('grid.card.collection')}</p>

                                <div className="similarity-box">
                                    <p className="similarity-text">"{p.similarity}"</p>
                                </div>

                                {p.savings && p.savings !== "N/A" && (
                                    <div className="savings-badge">
                                        {t('grid.card.savings')}: {p.savings}
                                    </div>
                                )}

                                <div className="dupe-indicator">
                                    <div className="line"></div>
                                    <span>{t('grid.card.equivalent')}</span>
                                    <div className="line"></div>
                                </div>
                                <img
                                    src={`${import.meta.env.BASE_URL}${p.originalImg.startsWith('/') ? p.originalImg.substring(1) : p.originalImg}`}
                                    alt={p.original}
                                    className="original-thumb clickable-img"
                                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/placeholder_original.jpg` }}
                                    onClick={() => openLightbox(`${import.meta.env.BASE_URL}${p.originalImg.startsWith('/') ? p.originalImg.substring(1) : p.originalImg}`)}
                                />
                                <h4 className="original-name">{p.original}</h4>
                                <p className="original-price">{t('grid.card.originalPrice')}: {p.priceOriginal}</p>
                                <div className="notes">
                                    {p.notes.split(', ').map((n, i) => <span key={i} className="note-badge">{n}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <h2>{t('about.title')} <span className="text-gold">{t('about.luxury')}</span></h2>
                        <p className="lead">{t('about.lead')}</p>
                        <p>
                            {t('about.p1')}
                        </p>
                        <p>
                            {t('about.p2')}
                        </p>
                    </div>
                </div>
            </section>

            <footer>
                <p>{t('footer')}</p>
            </footer>

            {
                selectedImage && (
                    <div className="lightbox-overlay" onClick={closeLightbox}>
                        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={closeLightbox}>×</button>
                            <img src={selectedImage} alt="Full view" className="lightbox-img" />
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default App
