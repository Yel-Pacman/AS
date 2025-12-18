import React, { useState, useEffect } from 'react';
import { 
  Car, Plane, Monitor, Calculator, 
  Phone, MapPin, Menu, X, Smartphone, 
  PenTool, Layers, Send, ChevronRight, ChevronLeft,
  CreditCard, ArrowUp, CheckCircle, MessageCircle, Mail,
  Moon, Sun, Globe, ShoppingCart, ShoppingBag, Trash2, Plus, Minus
} from 'lucide-react';

const AssalamServicesPro = () => {
  // Global States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'shop'
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('fr'); // 'ar', 'fr', 'en' (Default is French now)
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedService, setSelectedService] = useState(''); // To auto-fill contact form

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // --- Data & Translations ---
  const t = {
    ar: {
      nav: { home: 'الصفحة الرئيسية', services: 'خدماتنا', portfolio: 'أعمالنا', contact: 'تواصل معنا', shop: 'المتجر', cart: 'السلة' },
      hero: {
        badge: '✨ التميز في الخدمات الإدارية والرقمية',
        title1: 'نصنع لك',
        title2: 'المستقبل الرقمي',
        desc: 'شريكك الموثوق للمعاملات الحكومية، التأشيرات، وتطوير هويتك التجارية. والآن تسوق أدواتك المكتبية بكل سهولة.',
        cta1: 'ابدأ مشروعك',
        cta2: 'تصفح المتجر',
        status: 'تم قبول الملف ✅',
      },
      services: {
        badge: 'خدماتنا الشاملة',
        title: 'كل ما تحتاجه في مكان واحد',
        desc: 'اضغط على الخدمة لطلبها فوراً.',
        tabs: { all: 'الكل', admin: 'إدارية', digital: 'رقمية' },
        orderNow: 'اطلب الخدمة'
      },
      portfolio: {
        badge: 'معرض الأعمال',
        title1: 'إبداعنا يتحدث',
        title2: 'عن نفسه',
      },
      shop: {
        title: 'متجر الأدوات المكتبية',
        subtitle: 'أجود الأدوات بأسعار تنافسية',
        addToCart: 'أضف',
        price: 'درهم',
        checkout: 'إتمام الطلب',
        total: 'المجموع',
        empty: 'السلة فارغة',
        formTitle: 'معلومات التوصيل',
        formDesc: 'الدفع عند الاستلام.',
        name: 'الاسم الكامل',
        address: 'العنوان الكامل',
        city: 'المدينة',
        phone: 'رقم الهاتف',
        confirm: 'تأكيد الطلب',
        back: 'عودة للتسوق'
      },
      contact: {
        title1: 'جاهز لبدء',
        title2: 'رحلة النجاح؟',
        desc: 'فريقنا مستعد للإجابة على جميع استفساراتكم.',
        labels: { name: 'الاسم الكامل', phone: 'رقم الهاتف', service: 'نوع الخدمة', msg: 'رسالتك', send: 'إرسال الطلب' },
        info: { call: 'اتصل بنا', whatsapp: 'واتساب', email: 'البريد الإلكتروني', location: 'موقعنا' }
      },
      footer: { rights: '© 2025 جميع الحقوق محفوظة لمكتبة السلام.' },
      whatsapp: { title: 'تواصل معنا مباشرة عبر', btn: 'واتساب' }
    },
    fr: {
      nav: { home: 'Accueil', services: 'Services', portfolio: 'Portfolio', contact: 'Contact', shop: 'Boutique', cart: 'Panier' },
      hero: {
        badge: '✨ Excellence en Services Administratifs & Numériques',
        title1: 'Nous créons votre',
        title2: 'Avenir Numérique',
        desc: 'Votre partenaire de confiance pour les démarches administratives. Visitez notre boutique de fournitures de bureau dès maintenant.',
        cta1: 'Démarrer',
        cta2: 'Visiter la Boutique',
        status: 'Dossier Approuvé ✅',
      },
      services: {
        badge: 'NOS SERVICES',
        title: 'Tout ce dont vous avez besoin',
        desc: 'Cliquez sur un service pour commander.',
        tabs: { all: 'Tous', admin: 'Admin', digital: 'Digital' },
        orderNow: 'Commander'
      },
      portfolio: {
        badge: 'PORTFOLIO',
        title1: 'Notre créativité',
        title2: 'parle d\'elle-même',
      },
      shop: {
        title: 'Papeterie & Fournitures',
        subtitle: 'Meilleurs produits aux meilleurs prix',
        addToCart: 'Ajouter',
        price: 'DH',
        checkout: 'Commander',
        total: 'Total',
        empty: 'Panier vide',
        formTitle: 'Infos de Livraison',
        formDesc: 'Paiement à la livraison.',
        name: 'Nom Complet',
        address: 'Adresse Complète',
        city: 'Ville',
        phone: 'Téléphone',
        confirm: 'Confirmer',
        back: 'Retour'
      },
      contact: {
        title1: 'Prêt à commencer',
        title2: 'votre succès ?',
        desc: 'Notre équipe est prête à répondre à toutes vos questions.',
        labels: { name: 'Nom Complet', phone: 'Téléphone', service: 'Type de Service', msg: 'Votre Message', send: 'Envoyer' },
        info: { call: 'Appelez-nous', whatsapp: 'WhatsApp', email: 'Email', location: 'Adresse' }
      },
      footer: { rights: '© 2025 Tous droits réservés Librairie Assalam.' },
      whatsapp: { title: 'Contactez-nous directement via', btn: 'WhatsApp' }
    },
    en: {
      nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', contact: 'Contact', shop: 'Store', cart: 'Cart' },
      hero: {
        badge: '✨ Excellence in Admin & Digital Services',
        title1: 'We Create Your',
        title2: 'Digital Future',
        desc: 'Your trusted partner for government procedures, visas, and branding. Shop high-quality office supplies now.',
        cta1: 'Get Started',
        cta2: 'Visit Store',
        status: 'File Approved ✅',
      },
      services: {
        badge: 'OUR SERVICES',
        title: 'Everything You Need',
        desc: 'Click on a service to order directly.',
        tabs: { all: 'All', admin: 'Admin', digital: 'Digital' },
        orderNow: 'Order Now'
      },
      portfolio: {
        badge: 'PORTFOLIO',
        title1: 'Our Creativity',
        title2: 'Speaks for Itself',
      },
      shop: {
        title: 'Office Stationery Shop',
        subtitle: 'Best Quality Supplies',
        addToCart: 'Add',
        price: 'MAD',
        checkout: 'Checkout',
        total: 'Total',
        empty: 'Cart is empty',
        formTitle: 'Delivery Info',
        formDesc: 'Cash on Delivery.',
        name: 'Full Name',
        address: 'Full Address',
        city: 'City',
        phone: 'Phone Number',
        confirm: 'Confirm',
        back: 'Back to Shop'
      },
      contact: {
        title1: 'Ready to Start',
        title2: 'Your Success?',
        desc: 'Our team is ready to answer all your questions.',
        labels: { name: 'Full Name', phone: 'Phone', service: 'Service Type', msg: 'Message', send: 'Send Request' },
        info: { call: 'Call Us', whatsapp: 'WhatsApp', email: 'Email', location: 'Location' }
      },
      footer: { rights: '© 2025 All rights reserved Assalam Library.' },
      whatsapp: { title: 'Contact us directly via', btn: 'WhatsApp' }
    }
  };

  // --- Logic ---
  const content = t[lang];
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState('all');

  const toggleLang = () => {
    if (lang === 'ar') setLang('fr');
    else if (lang === 'fr') setLang('en');
    else setLang('ar');
  };
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smart Navigation Handler
  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    
    if (section === 'shop') {
        setCurrentView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setCurrentView('home');
        // If we are already on home, scroll smoothly. If not, wait for render then scroll.
        if (currentView === 'home') {
            const element = document.getElementById(section);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
            else if (section === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setTimeout(() => {
                const element = document.getElementById(section);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else if (section === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    }
  };

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    handleNavClick('contact');
  };

  // Shop Products Data
  const products = [
    { id: 1, name: 'Premium Notebook A4', price: 45, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: 'Ballpoint Pen Set', price: 20, img: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: 'Office Stapler', price: 35, img: 'https://images.unsplash.com/photo-1621356064047-9207038676d3?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'Sticky Notes', price: 15, img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: 'Desk Organizer', price: 80, img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=300' },
    { id: 6, name: 'Printing Paper', price: 60, img: 'https://images.unsplash.com/photo-1603484477846-c65223331572?auto=format&fit=crop&q=80&w=300' },
    { id: 7, name: 'Scissors', price: 25, img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=300' },
    { id: 8, name: 'Calculator', price: 120, img: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=300' },
  ];

  // Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // UseEffect for DarkMode & Scroll
  useEffect(() => {
    setIsVisible(true);
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setItemsVisible(window.innerWidth >= 768 ? 3 : 1);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  // Data (Localized) with Responsive ClassNames for Icons
  const servicesData = [
    { id: 1, category: 'admin', title: lang === 'ar' ? "خدمات NARSA" : "Services NARSA", desc: lang === 'ar' ? "نقل الملكية، البطاقة الرمادية، رخصة السياقة." : "Mutation, Carte Grise, Permis de conduire.", icon: <Car className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 2, category: 'admin', title: lang === 'ar' ? "المواعيد القنصلية" : "Rendez-vous Consulaires", desc: lang === 'ar' ? "حجز مواعيد الفيزا (شنغن، أمريكا) وتجهيز الملفات." : "Rendez-vous Visa (Schengen, USA) et préparation de dossiers.", icon: <Plane className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 3, category: 'design', title: lang === 'ar' ? "الهوية البصرية" : "Identité Visuelle", desc: lang === 'ar' ? "تصميم الشعارات (Logo) وكتابة ميثاق الهوية." : "Création de Logos et Charte Graphique.", icon: <PenTool className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 4, category: 'dev', title: lang === 'ar' ? "تطوير المواقع" : "Développement Web", desc: lang === 'ar' ? "مواقع تعريفية، متاجر إلكترونية، وأنظمة إدارة." : "Sites vitrines, E-commerce et Dashboards.", icon: <Monitor className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 5, category: 'design', title: lang === 'ar' ? "مطبوعات إشهارية" : "Impression Publicitaire", desc: lang === 'ar' ? "Flyers, Brochures, Badges, Roll-ups." : "Flyers, Brochures, Badges, Roll-ups.", icon: <Layers className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 6, category: 'admin', title: lang === 'ar' ? "التصريح الضريبي" : "Déclaration Fiscale", desc: lang === 'ar' ? "المحاسبة والخدمات المالية للمقاولين الذاتيين." : "Comptabilité et services fiscaux pour auto-entrepreneurs.", icon: <Calculator className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 7, category: 'dev', title: lang === 'ar' ? "تطبيقات الهاتف" : "Apps Mobiles", desc: lang === 'ar' ? "تطبيقات Android و iOS احترافية وسريعة." : "Applications Android et iOS performantes.", icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" /> },
    { id: 8, category: 'design', title: lang === 'ar' ? "البطاقة الشخصية للأعمال" : "Cartes de Visite", desc: lang === 'ar' ? "Carte Visite بتصاميم عصرية وجذابة." : "Cartes de visite modernes et attractives.", icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8" /> },
  ];

  const filteredServices = activeTab === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab || (activeTab === 'digital' && (s.category === 'dev' || s.category === 'design')));

  const portfolioItems = [
    { id: 1, img: 'pic1.png', tag: 'Print', title: lang === 'ar' ? 'تصميم فلاير إعلاني' : 'Design Flyer', col: 'orange' },
    { id: 2, img: 'pic2.png', tag: 'Web', title: lang === 'ar' ? 'موقع شركة عقارية' : 'Site Immobilier', col: 'blue' },
    { id: 3, img: 'pic3.png', tag: 'Branding', title: lang === 'ar' ? 'هوية بصرية كاملة' : 'Branding Complet', col: 'purple' },
    { id: 4, img: 'pic1.png', tag: 'App', title: lang === 'ar' ? 'تطبيق توصيل طلبات' : 'App de Livraison', col: 'green' },
    { id: 5, img: 'pic2.png', tag: 'Social', title: lang === 'ar' ? 'تصاميم انستغرام' : 'Posts Instagram', col: 'orange' },
  ];

  const nextSlide = () => {
    const maxIndex = portfolioItems.length - itemsVisible;
    setCurrentSlide(prev => prev >= maxIndex ? 0 : prev + 1);
  };
  const prevSlide = () => {
    const maxIndex = portfolioItems.length - itemsVisible;
    setCurrentSlide(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Logic to determine Nav Background
  const getNavBg = () => {
    if (scrolled) {
        return darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100';
    }
    // If in Shop View and NOT dark mode, make it blue so white text is visible
    if (currentView === 'shop' && !darkMode) {
        return 'bg-blue-900/95 border-blue-800 shadow-lg';
    }
    return 'bg-transparent border-transparent';
  };

  const navTextColor = () => {
      if (scrolled && !darkMode) return 'text-gray-600';
      // In Shop view (unscrolled, light mode), we forced blue bg, so text must be white
      if (currentView === 'shop' && !scrolled && !darkMode) return 'text-blue-100';
      return 'text-blue-100'; // Default for Hero section (blue bg) or Dark mode
  };

  // Main Render
  return (
    <div className={`font-sans min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} ${isVisible ? 'opacity-100' : 'opacity-0'}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${getNavBg()} ${scrolled ? 'backdrop-blur-md shadow-lg py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 overflow-hidden shadow-lg border-2 ${scrolled ? (darkMode ? 'border-gray-700 bg-gray-800' : 'border-white bg-white') : 'border-white/30 bg-white/10 backdrop-blur-md'}`}>
               <img src="logo.png" alt="AS" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="font-serif text-xl font-bold text-orange-500">AS</span>'; }}/>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-lg font-black tracking-tighter leading-none transition-colors duration-300 ${scrolled && !darkMode ? 'text-blue-900' : 'text-white'}`}>ASSALAM</h1>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled && !darkMode ? 'text-orange-500' : 'text-blue-200'}`}>SERVICES</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:order-2">
            {/* Cart Icon */}
            <button onClick={() => setCartOpen(true)} className={`relative p-2 rounded-full transition-all ${scrolled && !darkMode ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}>
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full">{cart.length}</span>}
            </button>
            {/* Dark Mode */}
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all ${scrolled && !darkMode ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Lang */}
            <button onClick={toggleLang} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${scrolled && !darkMode ? 'bg-gray-100 text-gray-800 border border-gray-200' : 'bg-white/20 text-white backdrop-blur-md border border-white/20'}`}>
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
            {/* Mobile Menu Btn */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 rounded-lg transition-colors ${scrolled && !darkMode ? 'text-blue-900' : 'text-white'}`}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Menu - Full Navigation */}
          <div className={`hidden md:flex gap-6 font-medium text-sm md:order-1 ${navTextColor()}`}>
            <button onClick={() => handleNavClick('home')} className="hover:text-orange-500 transition-colors">{content.nav.home}</button>
            <button onClick={() => handleNavClick('services')} className="hover:text-orange-500 transition-colors">{content.nav.services}</button>
            <button onClick={() => handleNavClick('portfolio')} className="hover:text-orange-500 transition-colors">{content.nav.portfolio}</button>
            <button onClick={() => handleNavClick('shop')} className={`hover:text-orange-500 transition-colors flex items-center gap-1 ${currentView === 'shop' ? 'text-orange-500 font-bold' : ''}`}><ShoppingBag size={16}/> {content.nav.shop}</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-orange-500 transition-colors">{content.nav.contact}</button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 w-full shadow-xl border-t transition-all duration-300 origin-top overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 flex flex-col gap-2">
            <button onClick={() => handleNavClick('home')} className={`text-start font-bold p-3 rounded-lg ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>{content.nav.home}</button>
            <button onClick={() => handleNavClick('services')} className={`text-start font-bold p-3 rounded-lg ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>{content.nav.services}</button>
            <button onClick={() => handleNavClick('portfolio')} className={`text-start font-bold p-3 rounded-lg ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>{content.nav.portfolio}</button>
            <button onClick={() => handleNavClick('shop')} className={`text-start font-bold p-3 rounded-lg flex items-center gap-2 ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}><ShoppingBag size={16}/> {content.nav.shop}</button>
            <button onClick={() => handleNavClick('contact')} className={`text-start font-bold p-3 rounded-lg ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>{content.nav.contact}</button>
          </div>
        </div>
      </nav>

      {/* --- CART DRAWER --- */}
      <div className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>
        <div className={`relative w-full max-w-md h-full shadow-2xl transition-transform duration-300 transform ${cartOpen ? (isRTL ? 'translate-x-0' : 'translate-x-0') : (isRTL ? '-translate-x-full' : 'translate-x-full')} ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex flex-col h-full">
            <div className="p-5 border-b flex justify-between items-center bg-blue-900 text-white">
              <h3 className="font-bold text-lg flex items-center gap-2"><ShoppingCart /> {content.shop.total}: {cartTotal} {content.shop.price}</h3>
              <button onClick={() => setCartOpen(false)}><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-50"/>
                  <p>{content.shop.empty}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className={`flex gap-4 p-3 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                      <p className="text-orange-500 font-bold text-sm">{item.price} {content.shop.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded-full bg-gray-200 text-gray-800"><Minus size={12} /></button>
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded-full bg-gray-200 text-gray-800"><Plus size={12} /></button>
                        <button onClick={() => removeFromCart(item.id)} className="mr-auto text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Checkout Form */}
              {cart.length > 0 && (
                <div className={`mt-8 p-5 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-blue-100 bg-blue-50/50'}`}>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-900 dark:text-blue-400"><MapPin size={18}/> {content.shop.formTitle}</h4>
                  <p className="text-xs text-gray-500 mb-4">{content.shop.formDesc}</p>
                  
                  <form name="shop-order" method="POST" data-netlify="true" className="space-y-3">
                    <input type="hidden" name="form-name" value="shop-order" />
                    <input type="hidden" name="order_details" value={JSON.stringify(cart.map(i => `${i.name} (x${i.qty})`))} />
                    <input type="hidden" name="total_price" value={cartTotal} />
                    
                    <input type="text" name="name" placeholder={content.shop.name} className="w-full p-3 rounded-lg border text-sm outline-none focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600" required />
                    <input type="tel" name="phone" placeholder={content.shop.phone} className="w-full p-3 rounded-lg border text-sm outline-none focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600" required />
                    <input type="text" name="city" placeholder={content.shop.city} className="w-full p-3 rounded-lg border text-sm outline-none focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600" required />
                    <textarea name="address" placeholder={content.shop.address} rows="2" className="w-full p-3 rounded-lg border text-sm outline-none focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600" required></textarea>
                    
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95 mt-2">
                      {content.shop.confirm} - {cartTotal} {content.shop.price}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT (SWITCH) --- */}
      {currentView === 'home' ? (
        <>
        {/* HERO */}
        <header id="home" className="relative min-h-[800px] flex items-center bg-blue-900 overflow-hidden pt-20">
            <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-gray-900 via-blue-950 to-black' : 'from-[#0f172a] via-[#1e3a8a] to-[#172554]'}`}></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/20 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-16 items-center pb-20">
            <div className="text-white space-y-8 animate-fadeInUp">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-orange-300 text-sm font-medium tracking-wide shadow-sm">
                {content.hero.badge}
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                {content.hero.title1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-200">
                    {content.hero.title2}
                </span>
                </h1>
                <p className="text-lg text-blue-100/90 max-w-xl leading-relaxed font-light">
                {content.hero.desc}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => handleNavClick('contact')} className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                    {content.hero.cta1}
                    {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
                <button onClick={() => setCurrentView('shop')} className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                    <ShoppingBag size={20} className="text-green-400" />
                    {content.hero.cta2}
                </button>
                </div>
            </div>
            
            <div className="hidden md:block relative perspective-1000">
                <div className="relative z-10 transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/5 bg-gray-800">
                    <img src="hero.png" alt="Hero" className="w-full h-auto object-cover transform scale-105" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML = '<div class="h-64 bg-gray-800 flex items-center justify-center text-gray-500">Hero Image</div>'}}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                </div>
                </div>
            </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={`${darkMode ? 'fill-gray-900' : 'fill-gray-50'}`}></path>
                </svg>
            </div>
        </header>

         {/* Services Section (UPDATED) */}
      <section id="services" className={`py-16 relative ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">{content.services.badge}</span>
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {content.services.title.split(' ').slice(0, -2).join(' ')} <span className="text-orange-500 relative inline-block">{content.services.title.split(' ').slice(-2).join(' ')}<svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg></span>
            </h2>
            
            {/* Compact Filter Tabs */}
            <div className={`inline-flex p-1 rounded-full shadow-sm border mt-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              {Object.keys(content.services.tabs).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : (darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-50')}`}
                >
                  {content.services.tabs[tab]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => handleServiceClick(service.title)}
                className={`group cursor-pointer rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-100 hover:border-blue-200'}`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${['dev', 'design'].includes(service.category) ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-start gap-3">
                    <div className={`w-10 h-10 md:w-16 md:h-16 flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${['dev', 'design'].includes(service.category) ? (darkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-50 text-orange-600') : (darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600')}`}>
                    {service.icon}
                    </div>
                    <div>
                        <h3 className={`text-xs md:text-xl font-bold mb-1 transition-colors ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-900'}`}>{service.title}</h3>
                        <p className={`text-[10px] md:text-sm leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{service.desc}</p>
                    </div>
                </div>
                
                <div className="mt-3 flex justify-center md:justify-end">
                    <div className={`text-[10px] md:text-sm font-bold flex items-center gap-1 ${['dev', 'design'].includes(service.category) ? 'text-orange-500' : 'text-blue-600'}`}>
                        {content.services.orderNow}
                        {isRTL ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`relative py-32 overflow-hidden ${darkMode ? 'bg-[#0b1120]' : 'bg-[#0f172a]'} text-white`}>
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={`${darkMode ? 'fill-gray-900' : 'fill-gray-50'}`}></path>
            </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1 w-10 bg-orange-500 rounded-full"></span>
                <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">{content.portfolio.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black">{content.portfolio.title1} <br/> <span className="text-gray-400 font-light">{content.portfolio.title2}</span></h2>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-4 dir-ltr">
               <button onClick={isRTL ? nextSlide : prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300">
                 <ChevronLeft size={24} />
               </button>
               <button onClick={isRTL ? prevSlide : nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300">
                 <ChevronRight size={24} />
               </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(${currentSlide * (100 / itemsVisible) * (isRTL ? 1 : -1)}%)` }}>
              {portfolioItems.map((item, i) => (
                <div key={i} className="px-4 flex-shrink-0" style={{ width: `${100 / itemsVisible}%` }}>
                  <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className={`absolute bottom-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${isRTL ? 'right-0' : 'left-0'}`}>
                      <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase mb-3 bg-${item.col}-500/20 text-${item.col}-400 border border-${item.col}-500/30 backdrop-blur-sm`}>{item.tag}</span>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className={`${darkMode ? 'fill-gray-900' : 'fill-white'}`}></path>
            </svg>
        </div>
      </section>

        {/* CONTACT (Moved here to be in Home View) */}
        <section id="contact" className={`py-24 relative ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
             <div className="container mx-auto px-4">
              <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 rounded-[3rem] overflow-hidden shadow-2xl p-6 md:p-0">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-5/12 p-10 md:p-16 text-white relative z-10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{content.contact.title1}<br/><span className="text-orange-400">{content.contact.title2}</span></h3>
                      <p className="text-blue-200 text-lg mb-10">{content.contact.desc}</p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-5 group"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400"><Phone size={28} /></div><div><p className="text-sm text-blue-300 uppercase font-bold">{content.contact.info.call}</p><p className="text-xl font-bold dir-ltr text-right">07 05 55 66 96</p></div></div>
                      <a href="https://wa.me/212705556696" className="flex items-center gap-5 group cursor-pointer"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-green-400"><MessageCircle size={28} /></div><div><p className="text-sm text-blue-300 uppercase font-bold">{content.contact.info.whatsapp}</p><p className="text-xl font-bold dir-ltr text-right">+212 705-556696</p></div></a>
                      <div className="flex items-center gap-5 group"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400"><Mail size={28} /></div><div className="overflow-hidden"><p className="text-sm text-blue-300 uppercase font-bold">{content.contact.info.email}</p><p className="text-lg font-bold truncate">assalamservices@gmail.com</p></div></div>
                    </div>
                  </div>
                  <div className={`md:w-7/12 md:rounded-l-[3rem] p-10 md:p-16 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <form name="contact" method="POST" data-netlify="true" className="space-y-6 relative z-20">
                      <input type="hidden" name="form-name" value="contact" />
                      <div className="grid md:grid-cols-2 gap-6">
                        {['name', 'phone'].map((field) => (
                          <div key={field} className="group"><label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{content.contact.labels[field]}</label><input type="text" name={field} className={`w-full px-5 py-4 border-2 rounded-xl focus:border-blue-600 outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-100'}`} required /></div>
                        ))}
                      </div>
                      <div className="group">
                          <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{content.contact.labels.service}</label>
                          <div className="relative">
                            <select name="service" defaultValue={selectedService} className={`w-full px-5 py-4 border-2 rounded-xl focus:border-blue-600 outline-none transition-all duration-300 appearance-none cursor-pointer ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' : 'bg-gray-50 border-gray-100 focus:bg-white'}`}>
                                <option value="" disabled>Select Service</option>
                                <option>Service Administratif</option>
                                <option>Design Graphique</option>
                                <option>Web / Mobile Dev</option>
                                {servicesData.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-500">
                                <ChevronRight className="rotate-90" size={20}/>
                            </div>
                          </div>
                      </div>
                      <div className="group"><label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{content.contact.labels.msg}</label><textarea name="message" rows="4" className={`w-full px-5 py-4 border-2 rounded-xl focus:border-blue-600 outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-100'}`}></textarea></div>
                      <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-5 rounded-xl shadow-xl transition active:scale-95 flex justify-center items-center gap-2"><span>{content.contact.labels.send}</span><Send size={20} /></button>
                    </form>
                  </div>
                </div>
              </div>
             </div>
        </section>
        
        {/* NEW WHATSAPP CTA SECTION (Wide Banner) */}
        <div className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4 text-center">
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {content.whatsapp.title}
            </h3>
            <a href="https://wa.me/212705556696" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <MessageCircle size={28} />
              <span>{content.whatsapp.btn}</span>
            </a>
          </div>
        </div>
        </>
      ) : (
        /* SHOP VIEW */
        <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
            <div className="text-center mb-10 animate-fadeInUp">
                <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-3">{content.shop.title}</span>
                <h2 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-blue-900'}`}>{content.shop.subtitle}</h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div key={product.id} className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border transition-all hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="relative h-40 overflow-hidden bg-gray-100 p-4">
                            <img src={product.img} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-blue-900 font-bold px-2 py-0.5 rounded-full shadow-sm text-xs">
                                {product.price} {content.shop.price}
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className={`font-bold text-sm mb-2 truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>{product.name}</h3>
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 text-xs"
                            >
                                <ShoppingCart size={14} /> {content.shop.addToCart}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`border-t pt-16 pb-8 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
             <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                   <img src="logo.png" alt="AS" className="w-full h-full object-cover" />
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>ASSALAM SERVICES</span>
             </div>
             <p className="text-gray-400 text-sm">{content.footer.rights}</p>
          </div>
          
          <div className="flex justify-center md:justify-end mt-4">
             <button onClick={scrollToTop} className={`p-2 rounded-full transition-all shadow-sm group ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white border border-gray-200 hover:bg-blue-900 hover:text-white'}`}>
               <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AssalamServicesPro;