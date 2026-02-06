
import { useState, useEffect } from 'react'
import './App.css'

import perfumes from './data/perfumes-zara.json'
import lattafaPerfumes from './data/perfumes-lattafa.json'

const translations = {
    it: {
        nav: { home: "Home", equivalents: "Equivalenti", about: "Chi Siamo" },
        hero: {
            title: "Qualità Premium.",
            subtitle: "Frazione del Prezzo.",
            desc: "Scopri i confronti olfattivi più ricercati al mondo. Esperienze di lusso, ai prezzi di Zara e Lattafa.",
            cta: "Esplora Equivalenti",
            vs: "VS"
        },
        grid: {
            title: "Tabella globale dupe Zara maschili / unisex (agg. 2026)",
            titleLattafa: "Tabella dettagliata profumi maschili e unisex Lattafa vs Originali (Edizione 2025)",
            introLattafa: "Ecco la tabella dettagliata dei profumi maschili e unisex di Lattafa, con i relativi cloni, il confronto dei prezzi sul mercato italiano e una descrizione olfattiva per guidarti nella scelta.",
            card: {
                collection: "Collezione",
                savings: "Risparmio Stimato",
                equivalent: "Equivalente di",
                originalPrice: "Prezzo Originale",
                buy: "Acquista ora",
                brand: "Brand",
                sort: {
                    label: "Ordina per:",
                    name: "Nome",
                    original: "Originale",
                    priceZara: "Prezzo",
                    priceOriginal: "Prezzo Orig.",
                    format: "Formato"
                }
            }
        },
        about: {
            title: "Ridefiniamo il",
            luxury: "Lusso",
            lead: "Le essenze autentiche non dovrebbero costare una fortuna.",
            p1: "Da ScentSense, crediamo che l'arte della profumeria risieda nel succo, non nella bottiglia o nel budget di marketing. Analizziamo meticolosamente i profili olfattivi delle fragranze più costose al mondo e li abbiniamo alle loro controparti di alta qualità dei mastri profumieri di Zara e Lattafa.",
            p2: "Vivi le stesse note di testa, di cuore e di fondo che ami, a una frazione del prezzo."
        },
        footer: "© 2026 ScentSense Portal. Sviluppato da Antigravity."
    },
    en: {
        nav: { home: "Home", equivalents: "Equivalents", about: "About Us" },
        hero: {
            title: "Premium Quality.",
            subtitle: "Fraction of the Price.",
            desc: "Discover the most sought-after olfactory comparisons in the world. Luxury experiences at Zara and Lattafa prices.",
            cta: "Explore Equivalents",
            vs: "VS"
        },
        grid: {
            title: "Global Zara Dupes Table Men / Unisex (updated 2026)",
            titleLattafa: "Detailed Lattafa vs Original Perfumes Comparison (2025 Edition)",
            introLattafa: "Here is the detailed table of Lattafa masculine and unisex perfumes, with their clones, price comparison on the international market, and olfactory descriptions.",
            card: {
                collection: "Collection",
                savings: "Estimated Savings",
                equivalent: "Equivalent of",
                originalPrice: "Original Price",
                buy: "Buy Now",
                brand: "Brand",
                sort: {
                    label: "Sort by:",
                    name: "Name",
                    original: "Original",
                    priceZara: "Price",
                    priceOriginal: "Orig. Price",
                    format: "Format"
                }
            }
        },
        about: {
            title: "Redefining",
            luxury: "Luxury",
            lead: "Authentic essences shouldn't cost a fortune.",
            p1: "At ScentSense, we believe the art of perfumery lies in the juice, not the bottle or marketing budget. We meticulously analyze the scent profiles of the world's most expensive fragrances and match them with their high-quality counterparts from Zara and Lattafa.",
            p2: "Experience the same top, heart, and base notes you love, at a fraction of the price."
        },
        footer: "© 2026 ScentSense Portal. Developed by Antigravity."
    }
};

const PerfumeCard = ({ p, lang, t, cacheBuster, openLightbox }) => (
    <div key={p.id} className="perfume-card" role="article" aria-label={`${p.name} - ${t('grid.card.equivalent')} ${p.original}`}>
        <div className="card-media">
            <img
                src={`${import.meta.env.BASE_URL}${p.zaraImg.startsWith('/') ? p.zaraImg.substring(1) : p.zaraImg}?${cacheBuster}`}
                alt={p.name}
                className="zara-thumb clickable-img"
                loading="lazy"
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/placeholder_zara.jpg` }}
                onClick={() => openLightbox(`${import.meta.env.BASE_URL}${p.zaraImg.startsWith('/') ? p.zaraImg.substring(1) : p.zaraImg}?${cacheBuster}`)}
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
                {p.gender && <span className="gender-badge">{p.gender}</span>}
            </div>
            <p className="type">{p.format || (p.brand ? `${p.brand} Collection` : t('grid.card.collection'))}</p>

            <div className="similarity-box">
                <p className="similarity-text">"{lang === 'en' && p.similarityEn ? p.similarityEn : p.similarity}"</p>
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
                src={`${import.meta.env.BASE_URL}${p.originalImg.startsWith('/') ? p.originalImg.substring(1) : p.originalImg}?${cacheBuster}`}
                alt={p.original}
                className="original-thumb clickable-img"
                loading="lazy"
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/placeholder_original.jpg` }}
                onClick={() => openLightbox(`${import.meta.env.BASE_URL}${p.originalImg.startsWith('/') ? p.originalImg.substring(1) : p.originalImg}?${cacheBuster}`)}
            />
            <h4 className="original-name">{p.original}</h4>
            <span className="price-tag price-tag-original">{p.priceOriginal}</span>
            <div className="notes">
                {p.notes.split(', ').map((n, i) => <span key={i} className="note-badge">{n}</span>)}
            </div>
        </div>
    </div>
);

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [lang, setLang] = useState('it');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const cacheBuster = "v=" + new Date().getTime();

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const matches = priceStr.match(/(\d+[.,]\d+)/);
        if (matches) return parseFloat(matches[1].replace(',', '.'));
        return 0;
    };

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const t = (path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]) || path;
    };

    const toggleLang = () => setLang(prev => prev === 'it' ? 'en' : 'it');

    const openLightbox = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                closeLightbox();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    const sortData = (data, pKey) => [...data].sort((a, b) => {
        let aValue, bValue;
        switch (sortConfig.key) {
            case 'priceZara':
                aValue = parsePrice(a[pKey] || a.priceZara);
                bValue = parsePrice(b[pKey] || b.priceZara);
                break;
            case 'priceOriginal':
                aValue = parsePrice(a.priceOriginal);
                bValue = parsePrice(b.priceOriginal);
                break;
            case 'original':
                aValue = a.original.toLowerCase();
                bValue = b.original.toLowerCase();
                break;
            case 'name':
            default:
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const sortedZara = sortData(perfumes, 'priceZara');
    const sortedLattafa = sortData(lattafaPerfumes, 'priceLattafa');

    return (
        <div className="app">
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="logo">SCENT<span>SENSE</span></div>
                    <ul className="nav-links">
                        <li><a href="#hero">{t('nav.home')}</a></li>
                        <li><a href="#grid">Zara</a></li>
                        <li><a href="#lattafa">Lattafa</a></li>
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
                    <div className="hero-btns">
                        <a href="#grid" className="btn-primary">Zara</a>
                        <a href="#lattafa" className="btn-secondary">Lattafa</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="comparison-main">
                        <img
                            src={`${import.meta.env.BASE_URL}images/zara/vibrant_leather.jpg?${cacheBuster}`}
                            alt="Vibrant Leather"
                            className="img-zara clickable-img"
                            onClick={() => openLightbox(`${import.meta.env.BASE_URL}images/zara/vibrant_leather.jpg?${cacheBuster}`)}
                        />
                        <div className="vs">VS</div>
                        <img
                            src={`${import.meta.env.BASE_URL}images/originals/creed_aventus.png?${cacheBuster}`}
                            alt="Creed Aventus"
                            className="img-original clickable-img"
                            onClick={() => openLightbox(`${import.meta.env.BASE_URL}images/originals/creed_aventus.png?${cacheBuster}`)}
                        />
                    </div>
                </div>
            </section>

            <div className="sort-toolbar sticky-sort">
                <span className="sort-label">{t('grid.card.sort.label')}</span>
                <button className={`sort-btn ${sortConfig.key === 'name' ? 'active' : ''}`} onClick={() => handleSort('name')}>
                    {t('grid.card.sort.name')} {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
                <button className={`sort-btn ${sortConfig.key === 'original' ? 'active' : ''}`} onClick={() => handleSort('original')}>
                    {t('grid.card.sort.original')} {sortConfig.key === 'original' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
                <button className={`sort-btn ${sortConfig.key === 'priceZara' ? 'active' : ''}`} onClick={() => handleSort('priceZara')}>
                    {t('grid.card.sort.priceZara')} {sortConfig.key === 'priceZara' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            <section id="grid" className="dupe-grid-section">
                <h2 className="section-title">{t('grid.title')}</h2>
                <div className="grid">
                    {sortedZara.map(p => (
                        <PerfumeCard key={p.id} p={p} lang={lang} t={t} cacheBuster={cacheBuster} openLightbox={openLightbox} />
                    ))}
                </div>
            </section>

            <section id="lattafa" className="dupe-grid-section lattafa-section">
                <h2 className="section-title">{t('grid.titleLattafa')}</h2>
                <p className="section-intro">{t('grid.introLattafa')}</p>
                <div className="grid">
                    {sortedLattafa.map(p => (
                        <PerfumeCard key={p.id} p={{ ...p, priceZara: p.priceLattafa, zaraImg: p.lattafaImg }} lang={lang} t={t} cacheBuster={cacheBuster} openLightbox={openLightbox} />
                    ))}
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <h2>{t('about.title')} <span className="text-gold">{t('about.luxury')}</span></h2>
                        <p className="lead">{t('about.lead')}</p>
                        <p>{t('about.p1')}</p>
                        <p>{t('about.p2')}</p>
                    </div>
                </div>
            </section>

            <footer>
                <p>{t('footer')}</p>
            </footer>

            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image preview">
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image preview">×</button>
                        <img src={selectedImage} alt="Full view" className="lightbox-img" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
