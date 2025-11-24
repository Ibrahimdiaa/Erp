const properties = [
  {
    id: 1,
    title: 'Skyline Penthouse',
    location: 'New Cairo, Egypt',
    price: '$1,250,000',
    status: 'For Sale',
    features: ['3 Beds', '4 Baths', '288 m²'],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Gardenia Villas',
    location: 'Sheikh Zayed, Egypt',
    price: '$4,800 / mo',
    status: 'For Rent',
    features: ['4 Beds', '5 Baths', 'Private Pool'],
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Palm Courtyard',
    location: 'Dubai Marina, UAE',
    price: '$2,400,000',
    status: 'Hot Deal',
    features: ['Sea View', '3 Cars', 'Smart Home'],
    image:
      'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=900&q=80',
  },
];

const features = [
  {
    icon: '🏙️',
    title: 'Luxury Downtown',
    body: 'Move-in-ready residences with designer finishes, skyline views, and hotel-inspired services.',
  },
  {
    icon: '🌿',
    title: 'Resort Amenities',
    body: 'Infinity pools, yoga decks, private cinemas, and concierge services curated for you.',
  },
  {
    icon: '⚡',
    title: 'Smart & Sustainable',
    body: 'Solar-ready rooftops, EV charging, smart locks, and energy monitoring built in.',
  },
  {
    icon: '🤝',
    title: 'Trusted Advisors',
    body: 'Award-winning agents guiding you through financing, negotiation, and closing.',
  },
];

const TagPillRow = ({ items }) => (
  <div className="pill-row">
    {items.map((item) => (
      <span key={item} className="pill">
        {item}
      </span>
    ))}
  </div>
);

const Hero = () => (
  <section className="hero container">
    <div className="hero-card" style={{ animationDelay: '0ms' }}>
      <span className="eyebrow">
        <span>⛳</span> Real Estate with flair
      </span>
      <h1>Find your next iconic address</h1>
      <p className="lead">
        اكتشف منازل فاخرة بتصاميم عصرية، مساحات خضراء، وخدمات ذكية تجعل الحياة اليومية أسهل.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn">ابدأ البحث الآن</button>
        <button className="btn secondary">حجز زيارة افتراضية</button>
      </div>
      <div className="metrics">
        <div className="metric-card">
          <strong>18K+</strong>
          منازل تم تسليمها
        </div>
        <div className="metric-card">
          <strong>4.9★</strong>
          رضا العملاء
        </div>
        <div className="metric-card">
          <strong>15</strong>
          مدن نخدمها
        </div>
      </div>
    </div>
    <div className="hero-card" style={{ animationDelay: '100ms' }}>
      <div className="section-title">
        <div>
          <h2>أحدث العقارات</h2>
          <p className="section-subtitle">
            باقات منتقاة مع فيديوهات، جولات ثلاثية الأبعاد، ووثائق جاهزة للإغلاق.
          </p>
        </div>
        <button className="btn secondary">تصفح الكل</button>
      </div>
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} className="card">
            <div
              className="card__image"
              style={{ backgroundImage: `url(${property.image})` }}
            >
              <span className="badge">{property.status}</span>
            </div>
            <div className="card__body">
              <div className="price">{property.price}</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{property.title}</div>
              <div style={{ color: '#4a4a57', marginTop: '4px' }}>{property.location}</div>
              <div className="tags">
                {property.features.map((feature) => (
                  <span key={feature} className="tag">
                    {feature}
                  </span>
                ))}
              </div>
              <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                حجز جولة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="container">
    <div className="section-title">
      <h2>مزايا مبهرة</h2>
      <span className="eyebrow">New 2025 portfolio</span>
    </div>
    <p className="section-subtitle">
      خصصنا كل مشروع بلمسة نبيتي جذابة، تفاصيل فاخرة، وحركة سلسة تجعل تجربتك الرقمية مميزة.
    </p>
    <div className="features-grid">
      {features.map((feature) => (
        <div key={feature.title} className="feature-card">
          <div className="icon">{feature.icon}</div>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '6px' }}>
            {feature.title}
          </div>
          <p style={{ margin: 0, color: '#3a3a45' }}>{feature.body}</p>
        </div>
      ))}
    </div>
  </section>
);

const CTA = () => (
  <section className="container">
    <div className="cta">
      <h3>جاهز للخطوة القادمة؟</h3>
      <p>ارسل بياناتك لنخصص لك قائمة عقارات متكاملة حسب أسلوب حياتك وميزانيتك.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn">تواصل مع خبير</button>
        <button className="btn secondary">مشاهدة عروض حصرية</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer container">
    <TagPillRow items={[
      'فلل فاخرة',
      'بنتهاوس',
      'شقق بإطلالة نهرية',
      'عقارات استثمارية',
      'مكاتب جاهزة',
      'عقارات ساحلية',
    ]} />
    <p style={{ marginTop: '16px' }}>
      Maroon Estates · Crafted with passion, elevated باللون النبيتي.
    </p>
  </footer>
);

const App = () => (
  <>
    <header>
      <div className="container navbar">
        <div className="brand">
          <div className="logo">ME</div>
          <span>Maroon Estates</span>
        </div>
        <nav>
          <ul>
            <li><a href="#homes">Homes</a></li>
            <li><a href="#rent">Rentals</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="btn">احجز زيارة</button>
      </div>
    </header>

    <main>
      <Hero />
      <Features />
      <CTA />
    </main>
    <Footer />
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
