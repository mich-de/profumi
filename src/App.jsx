
import { useState, useEffect } from 'react'
import './App.css'

import perfumes from './data/perfumes-zara.json'
import lattafaPerfumes from './data/perfumes-lattafa.json'
import armafPerfumes from './data/perfumes-armaf.json'
import otherPerfumes from './data/perfumes-others.json'

const translations = {
    it: {
        nav: { home: "Home", zara: "Zara", lattafa: "Lattafa", others: "Altri Arabi", about: "Chi Siamo" },
        hero: {
            title: "Qualità Premium.",
            subtitle: "Frazione del Prezzo.",
            desc: "Scopri i confronti olfattivi più ricercati. Zara, Lattafa e le migliori gemme arabe in un unico portale.",
            cta: "Esplora",
            vs: "VS"
        },
        grid: {
            title: "Collezione Zara (Maschile / Unisex)",
            titleLattafa: "Collezione Lattafa & Maison Alhambra",
            introLattafa: "Il colosso di Dubai. Fragranze opulente, packaging di lusso e una somiglianza spesso impressionante con la nicchia.",
            titleOthers: "Altri Brand Arabi (Armaf, Afnan, Rasasi...)",
            introOthers: "Le gemme nascoste. Da Armaf (i re di Aventus) a Rasasi e Afnan: prestazioni 'beast mode' per veri intenditori.",
            card: {
                collection: "Collezione",
                savings: "Risparmio Stimato",
                equivalent: "Equivalente di",
                originalPrice: "Prezzo Originale",
                buy: "Dettagli per il confronto",
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
            p1: "Da ScentSense, crediamo che l'arte della profumeria risieda nel succo. Analizziamo meticolosamente i profili olfattivi delle fragranze più costose al mondo e li abbiniamo alle loro controparti di alta qualità.",
            p2: "Vivi le stesse note di testa, di cuore e di fondo che ami, a una frazione del prezzo."
        },
        footer: "© 2026 ScentSense Portal. Sviluppato da Antigravity."
    },
    en: {
        nav: { home: "Home", zara: "Zara", lattafa: "Lattafa", others: "Other Arabs", about: "About Us" },
        hero: {
            title: "Premium Quality.",
            subtitle: "Fraction of the Price.",
            desc: "Discover the most sought-after olfactory comparisons. Zara, Lattafa and the best Arab gems in one portal.",
            cta: "Explore",
            vs: "VS"
        },
        grid: {
            title: "Zara Collection (Men / Unisex)",
            titleLattafa: "Lattafa & Maison Alhambra Collection",
            introLattafa: "The Dubai giant. Opulent fragrances, luxury packaging and often impressive similarity to niche scents.",
            titleOthers: "Other Arab Brands (Armaf, Afnan, Rasasi...)",
            introOthers: "The hidden gems. From Armaf (kings of Aventus) to Rasasi and Afnan: 'beast mode' performance for true connoisseurs.",
            card: {
                collection: "Collection",
                savings: "Estimated Savings",
                equivalent: "Equivalent of",
                originalPrice: "Original Price",
                buy: "Comparison Details",
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
            p1: "At ScentSense, we believe the art of perfumery lies in the juice. We meticulously analyze the scent profiles of the world's most expensive fragrances and match them with their high-quality counterparts.",
            p2: "Experience the same top, heart, and base notes you love, at a fraction of the price."
        },
        footer: "© 2026 ScentSense Portal. Developed by Antigravity."
    }
};

const getFragranticaSearchUrl = (query) => {
    if (!query) return "https://www.fragrantica.it/";
    return `https://www.fragrantica.it/search/?query=${encodeURIComponent(query)}`;
};

const getFragranticaDesignerUrl = (designer) => {
    if (!designer) return "https://www.fragrantica.it/designer/";
    const slug = designer.split(' ').join('-');
    return `https://www.fragrantica.it/designer/${slug}.html`;
};

const PerfumeCard = ({ p, lang, t, cacheBuster, openLightbox }) => (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#12100d] transition-all duration-500 hover:border-primary/40 hover:shadow-gold-glow">
        {/* IMAGE CONTAINER - Premium Studio Background */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden premium-studio-bg">
            {p.savings && p.savings !== "N/A" && (
                <div className="absolute top-3 right-3 z-20">
                    <span className="gold-pill-badge rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-widest text-[#211c12]">
                        -{p.savings}
                    </span>
                </div>
            )}

            {/* Soft Shadow on Floor */}
            <div className="absolute bottom-4 h-4 w-3/4 rounded-[100%] bg-black/40 blur-xl"></div>

            <div className="relative z-10 h-[72%] w-[72%] transition-transform duration-700 group-hover:scale-110 flex items-center justify-center">
                <img
                    className="h-full w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] cursor-zoom-in brightness-[1.1]"
                    src={`${import.meta.env.BASE_URL}${p.zaraImg?.startsWith('/') ? p.zaraImg.substring(1) : (p.zaraImg || 'images/placeholder_zara.jpg')}?${cacheBuster}`}
                    loading="lazy"
                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/placeholder_zara.jpg` }}
                    onClick={() => openLightbox(p)}
                />
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex flex-col p-4 pt-4 flex-grow">
            <div className="h-[60px] mb-3 overflow-hidden">
                <h3 className="text-[15px] font-black tracking-tight text-white line-clamp-1 uppercase leading-tight gold-text-gradient">{p.name.replace('ScentSense ', '')}</h3>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500 line-clamp-2 leading-relaxed italic">{p.notes}</p>
            </div>

            <div className="mt-auto space-y-3">
                <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <span className="material-symbols-outlined text-[14px] text-primary/70 shrink-0">auto_awesome</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 truncate">
                        {t('grid.card.equivalent')} <span className="text-white/80">{p.original}</span>
                    </span>
                </div>

                <button
                    onClick={() => openLightbox(p)}
                    className="group/btn relative flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary text-[10px] font-black uppercase tracking-widest text-[#211c12] transition-all hover:bg-[#dca72e] hover:shadow-gold-glow active:scale-[0.98]"
                >
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-[100%]"></div>
                    {t('grid.card.buy')}
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1">compare_arrows</span>
                </button>
            </div>
        </div>
    </div>
);

const ComparisonModal = ({ p, lang, t, cacheBuster, onClose }) => {
    if (!p) return null;

    const originalImg = `${import.meta.env.BASE_URL}${p.originalImg?.startsWith('/') ? p.originalImg.substring(1) : (p.originalImg || 'images/placeholder_original.jpg')}?${cacheBuster}`;
    const zaraImg = `${import.meta.env.BASE_URL}${p.zaraImg?.startsWith('/') ? p.zaraImg.substring(1) : (p.zaraImg || 'images/placeholder_zara.jpg')}?${cacheBuster}`;
    const cleanMatchName = p.name.replace('ScentSense ', '');

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden">
            <div className="relative min-h-screen w-full p-4 md:p-12 flex flex-col items-center justify-center">
                <div className="hero-spotlight absolute inset-0 -z-10 opacity-50"></div>

                <button
                    className="fixed top-6 right-6 z-[110] flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-black transition-all shadow-xl"
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined text-3xl">close</span>
                </button>

                <div className="text-center max-w-2xl mx-auto space-y-4 mb-10 w-full">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                        {lang === 'it' ? 'Il Confronto Olfattivo' : 'The Scent Comparison'}
                    </h2>
                    <p className="text-lg text-gray-400 font-medium italic">
                        {lang === 'it' ? 'Analizza la composizione e la differenza di valore.' : 'Analyze the composition match and value difference.'}
                    </p>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full max-w-[1240px]">
                    {/* VS BADGE */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center size-24 rounded-full bg-[#0a0a0a] border-2 border-primary shadow-[0_0_30px_rgba(220,167,46,0.3)]">
                        <span className="text-3xl font-black italic text-primary">VS</span>
                    </div>

                    {/* ORIGINAL COLUMN */}
                    <div className="group relative flex flex-col items-center rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 p-8 transition-all duration-500 overflow-hidden premium-studio-bg">
                        <div className="absolute top-6 left-6 z-20">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/5 text-gray-400 uppercase tracking-widest border border-white/10">{lang === 'it' ? 'L\'Icona' : 'The Icon'}</span>
                        </div>
                        <div className="relative w-full aspect-square max-w-xs mx-auto mb-10 flex items-center justify-center p-6">
                            <div className="absolute bottom-0 h-4 w-3/4 rounded-[100%] bg-black/60 blur-2xl"></div>
                            <img src={originalImg} alt={p.original} className="relative z-10 max-h-80 w-auto object-contain transition-transform duration-700 group-hover:-translate-y-4 drop-shadow-[0_35px_45px_rgba(0,0,0,0.8)]" />
                        </div>
                        <div className="flex flex-col items-center text-center gap-6 w-full mt-auto relative z-20">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-white tracking-tight">{p.original}</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest opacity-60">{lang === 'it' ? 'Fragranza Originale' : 'Original Fragrance'}</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {p.notes?.split(', ').map((note, idx) => (
                                    <span key={idx} className="text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-gray-400 px-3 py-1 rounded-md">{note}</span>
                                ))}
                            </div>

                            <a
                                href={getFragranticaSearchUrl(p.original)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 group/link flex h-11 items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">search</span>
                                {lang === 'it' ? 'Vedi su Fragrantica' : 'Search on Fragrantica'}
                            </a>

                            <div className="pt-6 border-t border-white/5 w-full mt-2">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">{lang === 'it' ? 'Prezzo al Dettaglio' : 'Retail Price'}</p>
                                <span className="text-3xl font-black text-gray-500 line-through decoration-red-500/40 decoration-2">{p.priceOriginal}</span>
                            </div>
                        </div>
                    </div>

                    {/* VS MOBILE */}
                    <div className="lg:hidden flex justify-center items-center py-4">
                        <div className="flex items-center justify-center size-20 rounded-full bg-[#0a0a0a] border border-primary shadow-gold-glow">
                            <span className="text-2xl font-black italic text-primary">VS</span>
                        </div>
                    </div>

                    {/* CLONE COLUMN */}
                    <div className="group relative flex flex-col items-center rounded-2xl bg-[#0a0a0a] border border-primary/20 hover:border-primary/40 p-8 transition-all duration-500 shadow-2xl overflow-hidden premium-studio-bg-intense">
                        <div className="absolute top-6 right-6 z-20">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-primary text-[#211c12] uppercase tracking-widest flex items-center gap-1 shadow-gold-glow">
                                <span className="material-symbols-outlined text-[14px]">science</span>
                                {lang === 'it' ? 'Top Match' : 'Top Match'}
                            </span>
                        </div>
                        <div className="relative w-full aspect-square max-w-xs mx-auto mb-10 flex items-center justify-center p-6">
                            <div className="absolute bottom-0 h-4 w-3/4 rounded-[100%] bg-black/80 blur-2xl"></div>
                            <img src={zaraImg} alt={cleanMatchName} className="relative z-10 max-h-80 w-auto object-contain transition-transform duration-700 group-hover:-translate-y-4 drop-shadow-[0_45px_55px_rgba(0,0,0,0.95)]" />
                        </div>
                        <div className="flex flex-col items-center text-center gap-6 w-full mt-auto relative z-20">
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black gold-text-gradient tracking-tight">{cleanMatchName}</h3>
                                <p className="text-xs font-black tracking-widest text-primary/80 uppercase">{lang === 'it' ? 'Ispirazione ScentSense' : 'ScentSense Inspiration'}</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {p.notes?.split(', ').map((note, idx) => (
                                    <span key={idx} className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                                        {note}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={getFragranticaSearchUrl(cleanMatchName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 group/link flex h-11 items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">search</span>
                                {lang === 'it' ? 'Vedi su Fragrantica' : 'Search on Fragrantica'}
                            </a>

                            <div className="pt-6 border-t border-primary/20 w-full mt-2 flex flex-col items-center gap-1">
                                <p className="text-[10px] text-primary/60 uppercase font-black tracking-widest mb-1">{lang === 'it' ? 'Valore Stimato' : 'Estimated Value'}</p>
                                <span className="text-5xl font-extrabold text-white tracking-tighter">{p.priceZara}</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">{lang === 'it' ? 'Risparmio' : 'Saving'} {p.priceOriginal}*</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-16 pb-8 gap-6 w-full">
                    <button
                        onClick={onClose}
                        className="group flex items-center gap-3 text-white/50 hover:text-primary transition-all font-black uppercase tracking-[0.3em] text-xs"
                    >
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                        {lang === 'it' ? 'Torna alla Scoperta' : 'Back to Discovery'}
                    </button>

                    <p className="text-[10px] text-gray-500 opacity-40 italic tracking-wide max-w-sm text-center">
                        *Prezzi indicativi basati su formati standard. Tutte le informazioni sono a scopo puramente informativo.
                    </p>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedPerfume, setSelectedPerfume] = useState(null);
    const [lang, setLang] = useState('it');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [visibleCount, setVisibleCount] = useState(8);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const cacheBuster = "v=" + new Date().getTime();

    const categories = [
        { id: 'All', it: 'Tutti', en: 'All Scents', icon: 'grid_view' },
        { id: 'Woody', it: 'Legnosi', en: 'Woody', keywords: ['Sandalwood', 'Cedar', 'Woody', 'Vetiver', 'Oud', 'Patchouli', 'Legno'] },
        { id: 'Floral', it: 'Floreali', en: 'Floral', keywords: ['Rose', 'Jasmine', 'Floral', 'Fiori', 'Lavanda', 'Iris', 'Mughetto'] },
        { id: 'Fresh', it: 'Freschi', en: 'Fresh', keywords: ['Agrumi', 'Citrus', 'Bergamotto', 'Marine', 'Menta', 'Fresco', 'Lemon'] },
        { id: 'Oriental', it: 'Orientali', en: 'Oriental', keywords: ['Ambra', 'Vaniglia', 'Tonka', 'Speziato', 'Oriental', 'Spezie', 'Amber'] },
    ];

    const brands = [
        { id: 'All', it: 'Tutti i Brand', en: 'All Brands' },
        { id: 'Zara', it: 'Zara', en: 'Zara' },
        { id: 'Lattafa', it: 'Lattafa', en: 'Lattafa' },
        { id: 'Armaf', it: 'Armaf', en: 'Armaf' },
        { id: 'Other', it: 'Altri', en: 'Others' }
    ];

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

    const openLightbox = (perfume) => {
        setSelectedPerfume(perfume);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedPerfume(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 300);

            // Infinite Scroll logic
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                setVisibleCount(prev => prev + 4);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && setSelectedPerfume) {
                closeLightbox();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPerfume]);

    // PREPARE DATA GROUPS
    const allData = [
        ...perfumes.map(p => ({ ...p, type: 'Zara' })),
        ...lattafaPerfumes.map(p => ({ ...p, priceZara: p.priceLattafa || p.price, zaraImg: p.lattafaImg || p.img, type: 'Lattafa' })),
        ...armafPerfumes.map(p => ({ ...p, priceZara: p.price, zaraImg: p.img, type: 'Armaf' })),
        ...otherPerfumes.map(p => ({ ...p, priceZara: p.price, zaraImg: p.img, type: 'Other' }))
    ];

    const sortData = (data) => [...data].sort((a, b) => {
        let aValue, bValue;
        switch (sortConfig.key) {
            case 'priceZara':
                aValue = parsePrice(a.priceZara);
                bValue = parsePrice(b.priceZara);
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

    const filterData = (data) => {
        let filtered = data;

        // Category Filter
        if (selectedCategory !== 'All') {
            const cat = categories.find(c => c.id === selectedCategory);
            filtered = filtered.filter(p =>
                cat.keywords.some(k =>
                    p.notes?.toLowerCase().includes(k.toLowerCase()) ||
                    p.name?.toLowerCase().includes(k.toLowerCase())
                )
            );
        }

        // Brand Filter
        if (selectedBrand !== 'All') {
            filtered = filtered.filter(p => p.type === selectedBrand);
        }

        // Search Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(lowerTerm) ||
                p.original.toLowerCase().includes(lowerTerm) ||
                p.notes?.toLowerCase().includes(lowerTerm)
            );
        }

        return filtered;
    };

    const finalData = sortData(filterData(allData));
    const displayedData = finalData.slice(0, visibleCount);

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-sans selection:bg-primary/30">
            <header className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${scrolled ? 'bg-background-dark/95 backdrop-blur-lg py-1' : 'bg-background-dark/50 backdrop-blur-md py-2'}`}>
                <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
                    <div className="flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-primary text-3xl">diamond</span>
                        <h2 className="font-display text-xl font-bold tracking-tight">ScentSense</h2>
                    </div>
                    <nav className="hidden items-center gap-10 md:flex">
                        <a href="#" className="text-sm font-medium text-white transition hover:text-primary">{t('nav.home')}</a>
                        <a href="#grid" className="text-sm font-medium text-primary">Discovery</a>
                        <a href="#about" className="text-sm font-medium text-white transition hover:text-primary">{t('nav.about')}</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 text-[20px]">search</span>
                            <input
                                className="h-10 w-64 rounded-xl border border-white/10 bg-card-dark pl-10 pr-4 text-sm text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder={lang === 'it' ? "Cerca..." : "Find a match..."}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-card-dark text-white transition hover:bg-[#352d1e]" onClick={toggleLang}>
                            <span className="material-symbols-outlined text-[20px]">{lang === 'it' ? 'language' : 'language'}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
                    <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div>
                            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                                Scent Discovery
                            </h1>
                            <p className="mt-2 text-text-muted">{lang === 'it' ? 'Esplora profili olfattivi e trova il tuo match perfetto.' : 'Explore scent profiles and find your perfect olfactory match.'}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap justify-center md:justify-end gap-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setVisibleCount(8); }}
                                        className={`flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-medium transition-all ${selectedCategory === cat.id
                                            ? 'bg-primary text-[#211c12] font-bold shadow-gold-glow'
                                            : 'bg-card-dark border border-white/5 text-white hover:border-primary/50 hover:text-primary'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{cat.icon || 'scent'}</span>
                                        {lang === 'it' ? cat.it : cat.en}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-end gap-2 border-t border-white/5 pt-4">
                                {brands.map(brand => (
                                    <button
                                        key={brand.id}
                                        onClick={() => { setSelectedBrand(brand.id); setVisibleCount(8); }}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedBrand === brand.id
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent text-text-muted border-white/10 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {lang === 'it' ? brand.it : brand.en}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {displayedData.map(p => (
                            <PerfumeCard key={`${p.type}-${p.id}`} p={p} lang={lang} t={t} cacheBuster={cacheBuster} openLightbox={openLightbox} />
                        ))}
                    </div>

                </div>
            </main>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[#211c12] shadow-gold-glow transition-all duration-300 hover:scale-110 active:scale-95 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            >
                <span className="material-symbols-outlined text-3xl font-bold">arrow_upward</span>
            </button>

            <section id="about" className="py-20 bg-[#1a160e]">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-3xl font-bold text-white mb-6">
                            {t('about.title')} <span className="text-primary">{t('about.luxury')}</span>
                        </h2>
                        <p className="text-lg text-text-muted mb-6 leading-relaxed">
                            {t('about.lead')}
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 text-text-muted/80 text-sm">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 py-12 bg-background-dark">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-white/50">
                        <span className="material-symbols-outlined text-primary text-2xl">diamond</span>
                        <span className="font-display font-bold">ScentSense</span>
                    </div>
                    <p className="text-sm text-text-muted">
                        {t('footer')}
                    </p>
                </div>
            </footer>

            {selectedPerfume && (
                <ComparisonModal
                    p={selectedPerfume}
                    lang={lang}
                    t={t}
                    cacheBuster={cacheBuster}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
}

export default App;
