import { useState, useEffect } from 'react'
import './App.css'

const perfumes = [
    {
        id: 1,
        name: "Vibrant Leather",
        original: "Creed Aventus",
        zaraImg: "/images/zara/vibrant_leather.jpg",
        originalImg: "/images/originals/creed_aventus.png", // Kept original (looks valid > 100KB)
        notes: "Bergamotto, Bambù, Cuoio",
        priceZara: "€22.95",
        priceOriginal: "€295"
    },
    {
        id: 2,
        name: "Sunrise on the Red Sand Dunes",
        original: "LV Imagination",
        zaraImg: "/images/zara/sunrise_red_sand_dunes.jpg", // Kept original
        originalImg: "/images/originals/lv_imagination.jpg", // Kept original
        notes: "Zenzero, Mandarino, Ambra",
        priceZara: "€25.95",
        priceOriginal: "€280"
    },
    {
        id: 3,
        name: "Sand Desert at Sunset",
        original: "Kilian Angel's Share",
        zaraImg: "/images/zara/sand_desert_sunset.jpg", // Kept original
        originalImg: "/images/originals/kilian_angels_share.jpg",
        notes: "Cannella, Iris, Fava Tonka",
        priceZara: "€25.95",
        priceOriginal: "€210"
    },
    {
        id: 4,
        name: "For Him Red Edition",
        original: "Baccarat Rouge 540",
        zaraImg: "/images/zara/for_him_red.jpg",
        originalImg: "/images/originals/baccarat_rouge.jpg",
        notes: "Arancia, Evernyl, Ambra",
        priceZara: "€22.95",
        priceOriginal: "€235"
    },
    {
        id: 5,
        name: "Tender Amber",
        original: "Xerjoff Erba Pura",
        zaraImg: "/images/zara/tender_amber.jpg",
        originalImg: "/images/originals/erba_pura.jpg",
        notes: "Frutti Esotici, Ambra, Vaniglia",
        priceZara: "€25.95",
        priceOriginal: "€200"
    },
    {
        id: 6,
        name: "Ebony Wood",
        original: "Jo Malone Wood Sage & Sea Salt",
        zaraImg: "/images/zara/ebony_wood.jpg",
        originalImg: "/images/originals/wood_sage.png",
        notes: "Ebano, Chiodi di Garofano, Pepe Rosa",
        priceZara: "€22.95",
        priceOriginal: "€140"
    },
    {
        id: 7,
        name: "Navy Black",
        original: "Bleu de Chanel",
        zaraImg: "/images/zara/navy_black.jpg",
        originalImg: "/images/originals/bleu_de_chanel_new.jpg",
        notes: "Bergamotto, Pompelmo, Vetiver",
        priceZara: "€15.95",
        priceOriginal: "€120"
    },
    {
        id: 8,
        name: "Blue Spirit",
        original: "Paco Rabanne Invictus",
        zaraImg: "/images/zara/blue_spirit.jpg", // Restored to JPG
        originalImg: "/images/originals/invictus_new.jpg",
        notes: "Note Marine, Mandarino, Ambra",
        priceZara: "€15.95",
        priceOriginal: "€100"
    },
    {
        id: 9,
        name: "Tobacco Rich Warm Addictive",
        original: "Tom Ford Tobacco Vanille",
        zaraImg: "/images/zara/tobacco_rwa.jpg",
        originalImg: "/images/originals/tobacco_vanille_new.jpg",
        notes: "Miele, Tabacco, Vaniglia",
        priceZara: "€17.95",
        priceOriginal: "€250"
    },
    {
        id: 10,
        name: "Man Silver",
        original: "Gucci Guilty",
        zaraImg: "/images/zara/man_silver.jpg", // Restored to JPG
        originalImg: "/images/originals/gucci_guilty_new.jpg",
        notes: "Neroli, Limone, Zenzero",
        priceZara: "€15.95",
        priceOriginal: "€110"
    },
    {
        id: 11,
        name: "Lisboa",
        original: "Acqua di Giò",
        zaraImg: "/images/zara/lisboa.jpg", // Restored to JPG
        originalImg: "/images/originals/acqua_di_gio.jpg",
        notes: "Limone, Note Acquatiche, Muschio di Quercia",
        priceZara: "€12.95",
        priceOriginal: "€95"
    },
    {
        id: 12,
        name: "Regal White",
        original: "ELDO Fat Electrician",
        zaraImg: "/images/zara/regal_white.jpg", // Restored to JPG
        originalImg: "/images/originals/fat_electrician.jpg",
        notes: "Cocco, Vetiver, Ambra",
        priceZara: "€25.95",
        priceOriginal: "€150"
    },
    {
        id: 13,
        name: "Imperial Purple",
        original: "Valentino Uomo Intense",
        zaraImg: "/images/zara/imperial_purple.jpg",
        originalImg: "/images/originals/valentino_uomo_intense.jpg",
        notes: "Iris, Pralina, Vaniglia",
        priceZara: "€25.95",
        priceOriginal: "€115"
    }
];

function App() {
    const [scrolled, setScrolled] = useState(false);

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
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#grid">Equivalenti</a></li>
                        <li><a href="#about">Chi Siamo</a></li>
                    </ul>
                </div>
            </nav>

            <section id="hero" className="hero">
                <div className="hero-content">
                    <h1>Qualità Premium.<br /><span>Frazione del Prezzo.</span></h1>
                    <p>Scopri i confronti olfattivi più ricercati al mondo. Esperienze di lusso, ai prezzi di Zara.</p>
                    <a href="#grid" className="btn-primary">Esplora Equivalenti</a>
                </div>
                <div className="hero-visual">
                    <div className="comparison-main">
                        <img src={`${import.meta.env.BASE_URL}images/zara/vibrant_leather.jpg`} alt="Vibrant Leather" className="img-zara" />
                        <div className="vs">VS</div>
                        <img src={`${import.meta.env.BASE_URL}images/originals/creed_aventus.png`} alt="Creed Aventus" className="img-original" />
                    </div>
                </div>
            </section>

            <section id="grid" className="dupe-grid-section">
                <h2 className="section-title">La Masterlist degli Equivalenti Zara</h2>
                <div className="grid">
                    {perfumes.map(p => (
                        <div key={p.id} className="perfume-card">
                            <div className="card-media">
                                <img src={`${import.meta.env.BASE_URL}${p.zaraImg.substring(1)}`} alt={p.name} className="zara-thumb" />
                                <div className="media-overlay">
                                    <span className="price-tag">{p.priceZara}</span>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3>{p.name}</h3>
                                <p className="type">Collezione Zara</p>
                                <div className="dupe-indicator">
                                    <div className="line"></div>
                                    <span>Equivalente di</span>
                                    <div className="line"></div>
                                </div>
                                <img src={`${import.meta.env.BASE_URL}${p.originalImg.substring(1)}`} alt={p.original} className="original-thumb" />
                                <h4 className="original-name">{p.original}</h4>
                                <p className="original-price">Prezzo di Listino: {p.priceOriginal}</p>
                                <div className="notes">
                                    {p.notes.split(', ').map(n => <span key={n} className="note-badge">{n}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <h2>Ridefiniamo il <span className="text-gold">Lusso</span></h2>
                        <p className="lead">Le essenze autentiche non dovrebbero costare una fortuna.</p>
                        <p>
                            Da ScentSense, crediamo che l'arte della profumeria risieda nel succo, non nella bottiglia o nel budget di marketing.
                            Analizziamo meticolosamente i profili olfattivi delle fragranze più costose al mondo e li abbiniamo alle loro
                            controparti di alta qualità dei mastri profumieri di Zara.
                        </p>
                        <p>
                            Vivi le stesse note di testa, di cuore e di fondo che ami, a una frazione del prezzo.
                        </p>
                    </div>
                </div>
            </section>

            <footer>
                <p>© 2026 ScentSense Portal. Sviluppato da Antigravity.</p>
            </footer>
        </div>
    )
}

export default App
