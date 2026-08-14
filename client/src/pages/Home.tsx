import { Locale, localeNames, useLocale } from "@/lib/locale";
import { getWhatsAppUrl } from "@/lib/contact";
import { trpc } from "@/lib/trpc";
import {
  ArrowDownRight,
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Scissors,
  Sofa,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const markUrl = "/manus-storage/rasyine-deco-mark_ae9209a1.png";
const heroUrl = "/manus-storage/rasyine-deco-hero_274855ee.jpg";
const livingUrl = "/manus-storage/rasyine-deco-living-room_597a6552.jpg";
const detailUrl = "/manus-storage/rasyine-deco-chair-detail_c162ac80.jpg";
const autoUrl = "/manus-storage/rasyine-deco-auto_079a4f3c.jpg";
const atelierMachinesUrl = "/manus-storage/rasyine-atelier-machines_53380334.jpg";
const atelierCuttingUrl = "/manus-storage/rasyine-atelier-cutting_7cc9350f.jpg";
const labSofaUrl = "/manus-storage/rasyne-gallery-sculptural-sofa_19679fdc.jpg";
const labChairUrl = "/manus-storage/rasyne-gallery-lounge-chair_0cc701fb.jpg";
const labDiningUrl = "/manus-storage/rasyne-gallery-dining-set_ed70bd1e.jpg";

const copy = {
  en: {
    nav: ["Services", "Furniture Lab", "Studio", "Atelier", "Contact"],
    studio: "Design studio",
    eyebrow: "Sayada, Tunisia · Since the first stitch",
    heroLead: "Furniture with a past. A future shaped around you.",
    heroText:
      "Rasyne Deco is a hands-on atelier for upholstery, restoration, made-to-measure living rooms and automotive interiors.",
    heroPrimary: "Start a design idea",
    heroSecondary: "Explore the atelier",
    heroNote: "Small workshop. Considered work. Personal service.",
    servicesLabel: "What we make possible",
    servicesTitle: "Objects keep their story. We renew the way they live with you.",
    serviceRead: "Discover",
    studioLabel: "A concept, before the first cut",
    studioTitle: "Describe it. Upload it. See where it can go.",
    studioText:
      "Bring a photo of a chair, a salon set or a car interior — or simply start with a few words. Our Design Studio turns your direction into a visual concept, then into a request our atelier can discuss with you.",
    studioCta: "Open Design Studio",
    labLabel: "Objects in play",
    labTitle: "Modern furniture, unboxed.",
    labText: "Choose a form, change its material and bring a bold direction to the workshop.",
    labCta: "Enter AI Furniture Lab",
    atelierLabel: "Inside the atelier",
    atelierTitle: "Not a factory. A working room for fabric, form and patience.",
    atelierText:
      "Rasyne Deco works from Sayada, Monastir. Every consultation begins with an object, a need and a real conversation — not a catalogue.",
    processLabel: "From thought to touch",
    processTitle: "A clear path from inspiration to a piece made for you.",
    contactLabel: "Meet the material",
    contactTitle: "Bring us the piece with a story.",
    contactText: "Visit, call, or send a first idea. We will help you shape what comes next.",
    visit: "Visit the atelier",
    viewMap: "Open location",
    address: "Avenue Karaia, Sayada 5035, Monastir, Tunisia",
    contactFormTitle: "A short note is enough.",
    contactName: "Your name",
    contactDetail: "Phone, WhatsApp or email",
    contactMessage: "Tell us what you would like to restore or design",
    contactSend: "Send a message",
    contactSending: "Sending…",
    contactSuccess: "Thank you — your message has reached the atelier.",
    contactError: "Please add your name, a contact detail and a short message.",
    whatsapp: "Chat on WhatsApp",
    footer: "Furniture restoration · upholstery · custom interiors",
  },
  fr: {
    nav: ["Services", "Laboratoire", "Studio", "Atelier", "Contact"],
    studio: "Studio de design",
    eyebrow: "Sayada, Tunisie · Depuis le premier point",
    heroLead: "Un mobilier qui a vécu. Une nouvelle vie façonnée pour vous.",
    heroText:
      "Rasyne Deco est un atelier de proximité dédié à la tapisserie, la restauration, aux salons sur mesure et aux intérieurs automobiles.",
    heroPrimary: "Imaginer un projet",
    heroSecondary: "Découvrir l’atelier",
    heroNote: "Petit atelier. Travail réfléchi. Service personnel.",
    servicesLabel: "Nos savoir-faire",
    servicesTitle: "Les objets gardent leur histoire. Nous renouvelons la manière dont ils vivent avec vous.",
    serviceRead: "Découvrir",
    studioLabel: "Un concept avant la première coupe",
    studioTitle: "Décrivez-le. Téléversez-le. Voyez jusqu’où il peut aller.",
    studioText:
      "Apportez une photo d’un fauteuil, d’un salon ou d’un intérieur de voiture — ou commencez simplement par quelques mots. Le Design Studio transforme votre direction en concept visuel, puis en demande que notre atelier peut étudier avec vous.",
    studioCta: "Ouvrir le Design Studio",
    labLabel: "Objets en jeu",
    labTitle: "Le mobilier moderne, hors cadre.",
    labText: "Choisissez une forme, changez sa matière et apportez une direction audacieuse à l’atelier.",
    labCta: "Entrer dans l’AI Furniture Lab",
    atelierLabel: "Au cœur de l’atelier",
    atelierTitle: "Pas une usine. Un lieu de travail pour le tissu, la forme et la patience.",
    atelierText:
      "Rasyne Deco travaille depuis Sayada, Monastir. Chaque échange commence par un objet, un besoin et une vraie conversation — jamais par un catalogue.",
    processLabel: "De l’idée à la matière",
    processTitle: "Un chemin clair, de l’inspiration à une pièce réalisée pour vous.",
    contactLabel: "Parlons matière",
    contactTitle: "Apportez-nous la pièce qui a une histoire.",
    contactText: "Passez nous voir, appelez-nous ou envoyez une première idée. Nous vous aiderons à imaginer la suite.",
    visit: "Visiter l’atelier",
    viewMap: "Voir l’emplacement",
    address: "Avenue Karaia, Sayada 5035, Monastir, Tunisie",
    contactFormTitle: "Un petit mot suffit.",
    contactName: "Votre nom",
    contactDetail: "Téléphone, WhatsApp ou e-mail",
    contactMessage: "Dites-nous ce que vous souhaitez restaurer ou imaginer",
    contactSend: "Envoyer un message",
    contactSending: "Envoi…",
    contactSuccess: "Merci — votre message est bien arrivé à l’atelier.",
    contactError: "Ajoutez votre nom, un moyen de contact et un court message.",
    whatsapp: "Échanger sur WhatsApp",
    footer: "Restauration de mobilier · tapisserie · intérieurs sur mesure",
  },
  ar: {
    nav: ["الخدمات", "مختبر الأثاث", "الاستوديو", "الورشة", "اتصل بنا"],
    studio: "استوديو التصميم",
    eyebrow: "صيادة، تونس · من أول غرزة",
    heroLead: "أثاث يحمل ماضيه. ومستقبل نصمّمه حولك.",
    heroText:
      "Rasyne Deco ورشة حرفية متخصصة في التنجيد، ترميم الأثاث، تصميم الصالونات حسب الطلب وتجديد المقصورات الداخلية للسيارات.",
    heroPrimary: "ابدأ فكرة تصميم",
    heroSecondary: "اكتشف الورشة",
    heroNote: "ورشة صغيرة. عمل مدروس. خدمة شخصية.",
    servicesLabel: "ما الذي نقدمه",
    servicesTitle: "تحفظ القطع قصتها. ونجدد الطريقة التي تعيش بها معك.",
    serviceRead: "اكتشف",
    studioLabel: "فكرة قبل أول قصّة",
    studioTitle: "صفها. حمّلها. واكتشف ما يمكن أن تصبح عليه.",
    studioText:
      "أحضر صورة لكرسي أو صالون أو داخل سيارة — أو ابدأ ببضع كلمات فقط. يحوّل استوديو التصميم فكرتك إلى تصور بصري، ثم إلى طلب يمكن لورشتنا مناقشته معك.",
    studioCta: "افتح استوديو التصميم",
    labLabel: "قطع للعب بها",
    labTitle: "أثاث حديث خارج الإطار.",
    labText: "اختر شكلاً، غيّر خامته، وخذ اتجاهاً جريئاً إلى الورشة.",
    labCta: "ادخل مختبر الأثاث بالذكاء الاصطناعي",
    atelierLabel: "من داخل الورشة",
    atelierTitle: "ليست مصنعاً. إنها مساحة عمل للقماش والشكل والصبر.",
    atelierText:
      "تعمل Rasyne Deco من صيادة، المنستير. يبدأ كل طلب بقطعة واحتياج وحديث حقيقي — وليس من كتالوج.",
    processLabel: "من الفكرة إلى اللمسة",
    processTitle: "طريق واضح من الإلهام إلى قطعة صنعت من أجلك.",
    contactLabel: "لنلتقِ حول المادة",
    contactTitle: "أحضر إلينا القطعة التي تحمل قصة.",
    contactText: "زرنا أو اتصل بنا أو أرسل فكرتك الأولى. سنساعدك في تشكيل ما يأتي بعدها.",
    visit: "زيارة الورشة",
    viewMap: "فتح الموقع",
    address: "شارع القراية، صيادة 5035، المنستير، تونس",
    contactFormTitle: "رسالة قصيرة تكفي.",
    contactName: "اسمك",
    contactDetail: "الهاتف أو واتساب أو البريد الإلكتروني",
    contactMessage: "أخبرنا بما تريد ترميمه أو تصميمه",
    contactSend: "أرسل رسالة",
    contactSending: "جارٍ الإرسال…",
    contactSuccess: "شكراً — وصلت رسالتك إلى الورشة.",
    contactError: "أضف اسمك وطريقة تواصل ورسالة قصيرة.",
    whatsapp: "تحدث عبر واتساب",
    footer: "ترميم الأثاث · تنجيد · تصميم داخلي حسب الطلب",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const serviceCards = [
  { icon: Sofa, image: livingUrl, key: "salon", title: { en: "Salon & sofa", fr: "Salon & canapé", ar: "الصالون والكنبة" }, text: { en: "Reupholstery, repairs and new comfort for the centre of your home.", fr: "Réfection, réparation et nouveau confort pour le cœur de votre maison.", ar: "تنجيد وإصلاح وراحة جديدة لقلب منزلك." } },
  { icon: Scissors, image: detailUrl, key: "upholstery", title: { en: "Furniture renewal", fr: "Renouveau du mobilier", ar: "تجديد الأثاث" }, text: { en: "A fresh expression for cherished chairs, headboards and custom pieces.", fr: "Une nouvelle expression pour les fauteuils, têtes de lit et pièces précieuses.", ar: "تعبير جديد للكراسي وظهور الأسرة والقطع العزيزة." } },
  { icon: CarFront, image: autoUrl, key: "auto", title: { en: "Automotive interior", fr: "Intérieur automobile", ar: "داخل السيارة" }, text: { en: "Refined seating, panels and detail work for the road ahead.", fr: "Assises, panneaux et finitions soignées pour la route.", ar: "مقاعد وألواح ولمسات دقيقة للطريق القادم." } },
];

function BrandMark({ invert = false }: { invert?: boolean }) {
  return (
    <span className={`brand-mark ${invert ? "brand-mark-invert" : ""}`}>
      <img src={markUrl} alt="Rasyne Deco mark" />
    </span>
  );
}

export default function Home() {
  const { locale, setLocale } = useLocale();
  const t = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ fullName: "", contact: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const contactMutation = trpc.contact.create.useMutation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTargets = ["#services", "/lab", "/studio", "#atelier", "#contact"];
  const goTo = (target: string) => {
    setMenuOpen(false);
    if (target.startsWith("#")) document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const sendContact = async (event: FormEvent) => {
    event.preventDefault();
    if (contactForm.fullName.trim().length < 2 || contactForm.contact.trim().length < 5 || contactForm.message.trim().length < 10) {
      toast.error(t.contactError);
      return;
    }
    try {
      await contactMutation.mutateAsync({ ...contactForm, language: locale });
      setContactSent(true);
      setContactForm({ fullName: "", contact: "", message: "" });
      toast.success(t.contactSuccess);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.contactError);
    }
  };

  return (
    <div className="site-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <a className="brand" href="/" aria-label="Rasyne Deco home">
          <BrandMark />
          <span className="brand-copy"><b>Rasyne</b><small>Deco</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={navTargets[index]} onClick={() => goTo(navTargets[index])}>{item}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="locale-switcher" aria-label="Choose language">
            <Languages size={14} aria-hidden="true" />
            {(["en", "fr", "ar"] as Locale[]).map(item => (
              <button key={item} className={locale === item ? "active" : ""} onClick={() => setLocale(item)} aria-label={`Switch to ${item}`}>
                {localeNames[item]}
              </button>
            ))}
          </div>
          <a href="/studio" className="nav-studio"><Sparkles size={15} /> {t.studio}</a>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(value => !value)} aria-label="Open navigation menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <aside className="mobile-menu">
          <div className="mobile-menu-links">
            {t.nav.map((item, index) => <a key={item} href={navTargets[index]} onClick={() => goTo(navTargets[index])}>{item}<ChevronRight size={17} /></a>)}
          </div>
          <a href="/studio" className="button-primary mobile-studio-link"><Sparkles size={16} /> {t.studio}</a>
        </aside>
      )}

      <main>
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span></span>{t.eyebrow}</div>
              <img className="hero-mark-watermark" src={markUrl} alt="" aria-hidden="true" />
              <h1>{t.heroLead}</h1>
              <p className="hero-description">{t.heroText}</p>
              <div className="hero-actions">
                <a href="/studio" className="button-primary">{t.heroPrimary}<ArrowUpRight size={18} /></a>
                <a href="#atelier" onClick={() => goTo("#atelier")} className="text-link">{t.heroSecondary}<ArrowDownRight size={18} /></a>
              </div>
              <p className="hero-note"><span></span>{t.heroNote}</p>
            </div>
            <div className="hero-image-wrap">
              <img className="hero-image" src={heroUrl} alt="A warm Rasyne Deco living-room transformation" />
              <div className="hero-image-caption"><span>01</span><p>Rasyne<br />Deco</p></div>
            </div>
          </div>
          <div className="hero-side-label">RASYNE DECO — ATELIER</div>
        </section>

        <section id="services" className="services-section section-padding">
          <div className="section-intro split-heading">
            <div><p className="eyebrow dark"><span></span>{t.servicesLabel}</p></div>
            <h2>{t.servicesTitle}</h2>
          </div>
          <div className="service-grid">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className={`service-card service-card-${index + 1}`} key={service.key}>
                  <div className="service-image-wrap"><img src={service.image} alt={service.title[locale]} /><span className="service-number">0{index + 1}</span></div>
                  <div className="service-card-body">
                    <Icon size={20} strokeWidth={1.5} />
                    <h3>{service.title[locale]}</h3>
                    <p>{service.text[locale]}</p>
                    <a href="/studio" className="card-link">{t.serviceRead} <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="lab" className="lab-preview-section section-padding">
          <div className="lab-preview-heading"><div><p className="eyebrow dark"><span></span>{t.labLabel}</p><h2>{t.labTitle}</h2></div><p>{t.labText}</p><a href="/lab" className="button-primary">{t.labCta}<ArrowUpRight size={17}/></a></div>
          <div className="lab-preview-gallery"><figure><img src={labSofaUrl} alt="Sculptural modular sofa concept"/><figcaption>01 / ORBIT</figcaption></figure><figure><img src={labChairUrl} alt="Contemporary lounge chair concept"/><figcaption>02 / ARC</figcaption></figure><figure><img src={labDiningUrl} alt="Contemporary dining furniture concept"/><figcaption>03 / PLINTH</figcaption></figure></div>
        </section>

        <section className="studio-promo">
          <div className="studio-promo-art"><img src={detailUrl} alt="Hand-finished upholstery detail" /></div>
          <div className="studio-promo-copy">
            <p className="eyebrow light"><span></span>{t.studioLabel}</p>
            <h2>{t.studioTitle}</h2>
            <p>{t.studioText}</p>
            <a href="/studio" className="button-ivory">{t.studioCta} <ArrowUpRight size={18} /></a>
          </div>
          <div className="studio-orbit">RASYNE · CONCEPT · STUDIO · RASYNE · CONCEPT · STUDIO ·</div>
        </section>

        <section id="atelier" className="atelier-section section-padding">
          <div className="atelier-top">
            <div>
              <p className="eyebrow dark"><span></span>{t.atelierLabel}</p>
              <h2>{t.atelierTitle}</h2>
            </div>
            <p className="atelier-description">{t.atelierText}</p>
          </div>
          <div className="atelier-gallery">
            <figure className="atelier-photo atelier-photo-large"><img src={atelierMachinesUrl} alt="The Rasyne Deco workshop and sewing machines" /><figcaption>01 — Documentary craft: upholstery in progress</figcaption></figure>
            <figure className="atelier-photo atelier-photo-small"><img src={atelierCuttingUrl} alt="Fabric preparation inside the Rasyne Deco workshop" /><figcaption>02 — Documentary craft: measuring by hand</figcaption></figure>
            <div className="atelier-statement"><span>From Sayada<br />to your interior.</span><ArrowDownRight size={34} /></div>
          </div>
        </section>

        <section className="process-section section-padding">
          <div className="process-header"><p className="eyebrow dark"><span></span>{t.processLabel}</p><h2>{t.processTitle}</h2></div>
          <div className="process-steps">
            {["01", "02", "03"].map((number, index) => (
              <div className="process-step" key={number}>
                <span>{number}</span>
                <h3>{locale === "en" ? ["Share the piece", "Shape the direction", "Bring it to life"][index] : locale === "fr" ? ["Partagez la pièce", "Définissez la direction", "Donnez-lui vie"][index] : ["شارك القطعة", "حدّد الاتجاه", "امنحها حياة"][index]}</h3>
                <p>{locale === "en" ? ["Send a photo or come to the atelier with the object and its story.", "Choose a material, finish or mood with us — in person or through the Studio.", "Confirm the proposal and let patient, practical craft take over."][index] : locale === "fr" ? ["Envoyez une photo ou venez à l’atelier avec l’objet et son histoire.", "Choisissez une matière, une finition ou une ambiance avec nous — sur place ou via le Studio.", "Validez la proposition et laissez le savoir-faire patient prendre le relais."][index] : ["أرسل صورة أو تعال إلى الورشة بالقطعة وقصتها.", "اختر المادة أو اللمسة أو الجو معنا — في الورشة أو عبر الاستوديو.", "أكّد الاقتراح ودع الحرفة العملية الهادئة تتولى الباقي."][index]}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy"><p className="eyebrow light"><span></span>{t.contactLabel}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-actions"><a href={getWhatsAppUrl("Hello Rasyne Deco, I would like to share a furniture idea with the workshop.")} target="_blank" rel="noreferrer" className="button-ivory"><MessageCircle size={18} />{t.whatsapp}</a><a className="contact-address" href="https://www.google.com/maps/search/?api=1&query=Avenue+Karaia+Sayada+5035+Monastir" target="_blank" rel="noreferrer"><MapPin size={18}/><span>{t.address}</span></a></div></div>
          <div className="contact-right"><div className="contact-map-panel"><span>RASYNE DECO</span><MapPin size={34} strokeWidth={1.3}/><a href="https://www.google.com/maps/search/?api=1&query=Avenue+Karaia+Sayada+5035+Monastir" target="_blank" rel="noreferrer">{t.viewMap} <ArrowUpRight size={16}/></a></div>{contactSent ? <div className="contact-form-success"><Check size={22}/><p>{t.contactSuccess}</p></div> : <form className="contact-form" onSubmit={sendContact}><h3>{t.contactFormTitle}</h3><label><span>{t.contactName}</span><input value={contactForm.fullName} onChange={event => setContactForm({ ...contactForm, fullName: event.target.value })} /></label><label><span>{t.contactDetail}</span><input value={contactForm.contact} onChange={event => setContactForm({ ...contactForm, contact: event.target.value })} /></label><label><span>{t.contactMessage}</span><textarea rows={3} value={contactForm.message} onChange={event => setContactForm({ ...contactForm, message: event.target.value })} /></label><button type="submit" disabled={contactMutation.isPending}>{contactMutation.isPending ? t.contactSending : <>{t.contactSend}<ArrowUpRight size={16}/></>}</button></form>}</div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand brand-footer" href="/"><BrandMark invert /><span className="brand-copy"><b>Rasyne</b><small>Deco</small></span></a><p>{t.footer}</p><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
