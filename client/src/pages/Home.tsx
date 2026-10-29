import { Locale, localeNames, useLocale } from "@/lib/locale";
import { atelierChannels, getWhatsAppUrl } from "@/lib/contact";
import { trpc } from "@/lib/trpc";
import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  CarFront,
  Check,
  ChevronRight,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  Ruler,
  Scissors,
  Sofa,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

// HMR integrity marker: this module is intentionally safe to reload independently.
import "./home-augmentation.css";
import "./home-film.css";

const markUrl = "/manus-storage/rasyine-deco-mark_ae9209a1.png";
const heroUrl = "/manus-storage/rasyine-deco-hero_274855ee.jpg";
const livingUrl = "/manus-storage/rasyine-deco-living-room_597a6552.jpg";
const detailUrl = "/manus-storage/rasyine-deco-chair-detail_c162ac80.jpg";
const autoUrl = "/manus-storage/rasyine-deco-auto_079a4f3c.jpg";
const atelierMachinesUrl = "/manus-storage/rasyne-atelier-craft-team-editorial_b582691e.jpg";
const atelierCuttingUrl = "/manus-storage/rasyne-atelier-pattern-table-editorial_d0b6762a.jpg";
const labSofaUrl = "/manus-storage/rasyne-gallery-sculptural-sofa_19679fdc.jpg";
const labChairUrl = "/manus-storage/rasyne-gallery-lounge-chair_0cc701fb.jpg";
const labDiningUrl = "/manus-storage/rasyne-gallery-dining-set_ed70bd1e.jpg";
const labChaiseUrl = "/manus-storage/rasyne-gallery-cloud-chaise_45f2e198.jpg";
const labAutoLoungeUrl = "/manus-storage/rasyne-gallery-auto-lounge_7ffd5029.jpg";
const labStoolUrl = "/manus-storage/rasyne-gallery-sculptural-stool_0db1f02b.jpg";
const refurbishmentCompleteFilmUrl = "/manus-storage/rasyne-refurbishment-complete-film_7c6c15fc.mp4";

const socialCopy = {
  en: { follow: "Follow the atelier", instagram: "Instagram", facebook: "Facebook", instagramSoon: "Instagram profile coming soon.", facebookSoon: "Facebook page coming soon." },
  fr: { follow: "Suivre l’atelier", instagram: "Instagram", facebook: "Facebook", instagramSoon: "Profil Instagram bientôt disponible.", facebookSoon: "Page Facebook bientôt disponible." },
  ar: { follow: "تابع الورشة", instagram: "إنستغرام", facebook: "فيسبوك", instagramSoon: "حساب إنستغرام قريباً.", facebookSoon: "صفحة فيسبوك قريباً." },
} satisfies Record<Locale, Record<string, string>>;

const copy = {
  en: {
    nav: ["Services", "Furniture Lab", "Worlds", "Studio", "Atelier", "Contact"],
    studio: "Design studio",
    eyebrow: "Sayada, Tunisia · Since the first stitch",
    heroLead: "Play with an idea. Build what comes next.",
    heroText:
      "Rasyne Deco is one small, real world inside PlayNbuildAnything: a World Augmenter where play becomes contribution, and a voice, photograph or simple thought can become considered furniture, interiors or automotive craft.",
    heroPrimary: "Play with your idea",
    heroSecondary: "Explore the atelier",
    heroNote: "PlayNbuildAnything begins here · Play, shape, make.",
    servicesLabel: "What we make possible",
    servicesTitle: "One playful contribution can become a room, a seat, a journey — or something no one has built yet.",
    serviceRead: "Discover",
    studioLabel: "A concept, before the first cut",
    studioTitle: "Imagine it. Play with it. Give it a direction.",
    studioText:
      "Bring a photo, a voice note or a few words. The Design Studio helps you explore variations, materials and proportions, then turns the strongest direction into a brief our atelier can discuss with you.",
    studioCta: "Open Design Studio",
    labLabel: "Objects in play",
    labTitle: "A playground for things not yet made.",
    labText: "Choose a form, change its material, compare possibilities and discover the first world of PlayNbuildAnything.",
    labCta: "Enter AI Furniture Lab",
    atelierLabel: "Inside the atelier",
    atelierTitle: "Not a factory. A working room for fabric, form and patience.",
    atelierText:
      "Rasyne Deco works from Sayada, Monastir. Every consultation begins with an object, a need and a real conversation — not a catalogue.",
    processLabel: "From thought to touch",
    processTitle: "A clear path from inspiration to a piece made for you.",
    contactLabel: "Meet the material",
    contactTitle: "Bring us the idea before it becomes a thing.",
    contactText: "Visit, call, or send a first idea. We will help you move from play to a clear conversation about what can be made.",
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
    renewalLabel: "The renewal record",
    renewalTitle: "A piece changes state. It keeps its story.",
    renewalText: "Each refurbishment starts with close observation, then moves through proportion, material, stitch and return. The rhythm is patient because the result has to live with you.",
    renewalStages: [["Read", "Inspect the structure, memory and real use of the piece."], ["Recompose", "Adjust comfort, proportion and construction before the first cut."], ["Dress", "Choose material, finish and stitch language with intention."], ["Return", "Reveal a piece ready for its next room and next chapter."]],
    filmTitle: "The atelier, in motion.",
    filmText: "Inspection, careful dismantling, material selection, stitching, padding and the final reveal — carried by a small team.",
    chatSignal: "Atelier signal",
    chatNow: "Share your piece with Rasyne",
    footer: "Furniture restoration · upholstery · custom interiors",
  },
  fr: {
    nav: ["Services", "Laboratoire", "Worlds", "Studio", "Atelier", "Contact"],
    studio: "Studio de design",
    eyebrow: "Sayada, Tunisie · Depuis le premier point",
    heroLead: "Jouez avec une idée. Construisez la suite.",
    heroText:
      "Rasyne Deco est un petit monde réel dans PlayNbuildAnything : un World Augmenter où le jeu devient contribution, et où une note vocale, une photographie ou une intuition peut devenir une pièce, un intérieur ou un travail automobile pensé pour vous.",
    heroPrimary: "Jouer avec votre idée",
    heroSecondary: "Découvrir l’atelier",
    heroNote: "PlayNbuildAnything commence ici · Jouer, façonner, réaliser.",
    servicesLabel: "Nos savoir-faire",
    servicesTitle: "Une contribution ludique peut devenir une pièce, un salon, un habitacle — ou quelque chose qui n’existe pas encore.",
    serviceRead: "Découvrir",
    studioLabel: "Un concept avant la première coupe",
    studioTitle: "Imaginez-le. Jouez avec. Donnez-lui une direction.",
    studioText:
      "Apportez une photo, une note vocale ou quelques mots. Le Design Studio vous aide à explorer les variantes, matières et proportions, puis transforme la meilleure direction en brief que notre atelier peut étudier avec vous.",
    studioCta: "Ouvrir le Design Studio",
    labLabel: "Objets en jeu",
    labTitle: "Un terrain de jeu pour les objets à venir.",
    labText: "Choisissez une forme, changez sa matière, comparez les possibles et découvrez le premier monde de PlayNbuildAnything.",
    labCta: "Entrer dans l’AI Furniture Lab",
    atelierLabel: "Au cœur de l’atelier",
    atelierTitle: "Pas une usine. Un lieu de travail pour le tissu, la forme et la patience.",
    atelierText:
      "Rasyne Deco travaille depuis Sayada, Monastir. Chaque échange commence par un objet, un besoin et une vraie conversation — jamais par un catalogue.",
    processLabel: "De l’idée à la matière",
    processTitle: "Un chemin clair, de l’inspiration à une pièce réalisée pour vous.",
    contactLabel: "Parlons matière",
    contactTitle: "Apportez l’idée avant qu’elle ne devienne une pièce.",
    contactText: "Passez nous voir, appelez-nous ou envoyez une première idée. Nous vous aiderons à passer du jeu à une conversation claire sur ce qui peut être réalisé.",
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
    renewalLabel: "Le carnet de rénovation",
    renewalTitle: "Une pièce change d’état. Elle garde son histoire.",
    renewalText: "Chaque rénovation commence par l’observation, puis passe par la proportion, la matière, le point et le retour. Le rythme est patient car la pièce doit vivre avec vous.",
    renewalStages: [["Lire", "Observer la structure, la mémoire et l’usage réel de la pièce."], ["Recomposer", "Ajuster le confort, la proportion et la construction avant la première coupe."], ["Habiller", "Choisir matière, finition et langage de couture avec intention."], ["Rendre", "Révéler une pièce prête pour son prochain intérieur et son prochain chapitre."]],
    filmTitle: "L’atelier, en mouvement.",
    filmText: "Inspection, démontage attentif, choix des matières, couture, garnissage et révélation finale — menés par une petite équipe.",
    chatSignal: "Signal atelier",
    chatNow: "Partager votre pièce avec Rasyne",
    footer: "Restauration de mobilier · tapisserie · intérieurs sur mesure",
  },
  ar: {
    nav: ["الخدمات", "مختبر الأثاث", "Worlds", "الاستوديو", "الورشة", "اتصل بنا"],
    studio: "استوديو التصميم",
    eyebrow: "صيادة، تونس · من أول غرزة",
    heroLead: "العب بفكرة. وابنِ ما سيأتي.",
    heroText:
      "Rasyne Deco هو عالم صغير وحقيقي داخل PlayNbuildAnything: World Augmenter يصبح فيه اللعب مساهمة، وقد تتحول ملاحظة صوتية أو صورة أو فكرة بسيطة إلى قطعة أثاث أو مساحة أو حرفة سيارات مصممة بعناية.",
    heroPrimary: "العب بفكرتك",
    heroSecondary: "اكتشف الورشة",
    heroNote: "تبدأ PlayNbuildAnything هنا · نلعب، نشكّل، نصنع.",
    servicesLabel: "ما الذي نقدمه",
    servicesTitle: "قد تتحول مساهمة مرحة إلى غرفة أو مقعد أو رحلة — أو شيء لم يُبنَ من قبل.",
    serviceRead: "اكتشف",
    studioLabel: "فكرة قبل أول قصّة",
    studioTitle: "تخيّلها. العب بها. امنحها اتجاهاً.",
    studioText:
      "أحضر صورة أو رسالة صوتية أو بضع كلمات. يساعدك استوديو التصميم على استكشاف الاختلافات والخامات والنسب، ثم يحوّل الاتجاه الأقوى إلى موجز يمكن لورشتنا مناقشته معك.",
    studioCta: "افتح استوديو التصميم",
    labLabel: "قطع للعب بها",
    labTitle: "مساحة لعب للأشياء التي لم تُصنع بعد.",
    labText: "اختر شكلاً، غيّر خامته، قارن الاحتمالات، واكتشف أول عالم من PlayNbuildAnything.",
    labCta: "ادخل مختبر الأثاث بالذكاء الاصطناعي",
    atelierLabel: "من داخل الورشة",
    atelierTitle: "ليست مصنعاً. إنها مساحة عمل للقماش والشكل والصبر.",
    atelierText:
      "تعمل Rasyne Deco من صيادة، المنستير. يبدأ كل طلب بقطعة واحتياج وحديث حقيقي — وليس من كتالوج.",
    processLabel: "من الفكرة إلى اللمسة",
    processTitle: "طريق واضح من الإلهام إلى قطعة صنعت من أجلك.",
    contactLabel: "لنلتقِ حول المادة",
    contactTitle: "أحضر الفكرة قبل أن تصبح شيئاً.",
    contactText: "زرنا أو اتصل بنا أو أرسل فكرتك الأولى. سنساعدك على الانتقال من اللعب إلى حديث واضح حول ما يمكن صنعه.",
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
    renewalLabel: "سجل التجديد",
    renewalTitle: "تتغير القطعة. لكنها تحتفظ بقصتها.",
    renewalText: "يبدأ كل تجديد بالملاحظة الدقيقة، ثم ينتقل عبر النسب والخامة والغرز والعودة. الإيقاع هادئ لأن القطعة يجب أن تعيش معك.",
    renewalStages: [["نقرأ", "نفحص البنية والذاكرة والاستخدام الحقيقي للقطعة."], ["نعيد التكوين", "نضبط الراحة والنسب والبنية قبل أول قصّة."], ["نكسو", "نختار الخامة واللمسة ولغة الغرز بعناية."], ["نعيدها", "نكشف عن قطعة جاهزة لغرفتها وفصلها التالي."]],
    filmTitle: "الورشة في حركة.",
    filmText: "فحص دقيق، تفكيك متأنٍ، اختيار الخامات، خياطة، حشو وكشف نهائي — تنجزها مجموعة صغيرة من الحرفيين.",
    chatSignal: "إشارة الورشة",
    chatNow: "شارك قطعتك مع Rasyne",
    footer: "ترميم الأثاث · تنجيد · تصميم داخلي حسب الطلب",
  },
} satisfies Record<Locale, Record<string, string | string[] | string[][]>>;

const serviceCards = [
  { icon: Sofa, image: livingUrl, key: "salon", title: { en: "Salon & sofa", fr: "Salon & canapé", ar: "الصالون والكنبة" }, text: { en: "Reupholstery, repairs and new comfort for the centre of your home.", fr: "Réfection, réparation et nouveau confort pour le cœur de votre maison.", ar: "تنجيد وإصلاح وراحة جديدة لقلب منزلك." } },
  { icon: Scissors, image: detailUrl, key: "upholstery", title: { en: "Furniture renewal", fr: "Renouveau du mobilier", ar: "تجديد الأثاث" }, text: { en: "A fresh expression for cherished chairs, headboards and custom pieces.", fr: "Une nouvelle expression pour les fauteuils, têtes de lit et pièces précieuses.", ar: "تعبير جديد للكراسي وظهور الأسرة والقطع العزيزة." } },
  { icon: CarFront, image: autoUrl, key: "auto", title: { en: "Automotive interior", fr: "Intérieur automobile", ar: "داخل السيارة" }, text: { en: "Refined seating, panels and detail work for the road ahead.", fr: "Assises, panneaux et finitions soignées pour la route.", ar: "مقاعد وألواح ولمسات دقيقة للطريق القادم." } },
];

const briefEngineCopy = {
  en: {
    label: "Atelier brief engine",
    title: "Give the piece a direction before it enters the room.",
    text: "A precise three-step brief turns instinct into a conversation our atelier can act on.",
    object: "The piece",
    state: "Its current state",
    mood: "The new atmosphere",
    send: "Send this brief on WhatsApp",
    route: "Choose your atelier line",
    primary: "Main line",
    secondary: "Secondary line",
    primaryNote: "+216 20 580 505",
    secondaryNote: "+216 20 579 336",
    objects: ["A living-room sofa", "A chair or headboard", "A car interior"],
    states: ["Restore its soul", "Rebuild the comfort", "Start from a new form"],
    moods: ["Quiet luxury", "Warm Mediterranean", "A sharper future"],
  },
  fr: {
    label: "Atelier brief engine",
    title: "Donnez une direction à la pièce avant qu’elle n’entre dans la pièce.",
    text: "En trois choix précis, votre intuition devient une conversation que l’atelier peut transformer.",
    object: "La pièce",
    state: "Son état actuel",
    mood: "La nouvelle atmosphère",
    send: "Envoyer ce brief sur WhatsApp",
    route: "Choisissez votre ligne atelier",
    primary: "Ligne principale",
    secondary: "Ligne secondaire",
    primaryNote: "+216 20 580 505",
    secondaryNote: "+216 20 579 336",
    objects: ["Un canapé de salon", "Un fauteuil ou une tête de lit", "Un intérieur automobile"],
    states: ["Restaurer son âme", "Recomposer le confort", "Partir d’une nouvelle forme"],
    moods: ["Luxe discret", "Méditerranée chaleureuse", "Un futur plus net"],
  },
  ar: {
    label: "محرك موجز الورشة",
    title: "امنح القطعة اتجاهها قبل أن تدخل إلى مساحتك.",
    text: "ثلاثة اختيارات دقيقة تحول إحساسك إلى حوار تستطيع الورشة تنفيذه.",
    object: "القطعة",
    state: "حالَتها الحالية",
    mood: "الأجواء الجديدة",
    send: "أرسل الموجز عبر واتساب",
    route: "اختر خط الورشة",
    primary: "الخط الأساسي",
    secondary: "الخط الثانوي",
    primaryNote: "+216 20 580 505",
    secondaryNote: "+216 20 579 336",
    objects: ["كنبة صالون", "كرسي أو ظهر سرير", "مقصورة سيارة"],
    states: ["نرمم روحها", "نعيد بناء راحتها", "نبدأ من شكل جديد"],
    moods: ["فخامة هادئة", "دفء متوسطي", "مستقبل أكثر نقاءً"],
  },
} as const;

function AtelierBriefEngine({ locale }: { locale: Locale }) {
  const c = briefEngineCopy[locale];
  const [objectIndex, setObjectIndex] = useState(0);
  const [stateIndex, setStateIndex] = useState(0);
  const [moodIndex, setMoodIndex] = useState(0);
  const [line, setLine] = useState<"primary" | "secondary">("primary");
  const options = [
    { label: c.object, values: c.objects, icon: Sofa },
    { label: c.state, values: c.states, icon: Ruler },
    { label: c.mood, values: c.moods, icon: Sparkles },
  ];
  const indexes = [objectIndex, stateIndex, moodIndex];
  const setIndexes = [setObjectIndex, setStateIndex, setMoodIndex];
  const brief = locale === "ar"
    ? `مرحباً Rasyne Deco، أود مناقشة ${c.objects[objectIndex]} — ${c.states[stateIndex]} — بأجواء ${c.moods[moodIndex]}.`
    : locale === "fr"
      ? `Bonjour Rasyne Deco, je souhaite discuter de ${c.objects[objectIndex]} — ${c.states[stateIndex]} — dans une atmosphère ${c.moods[moodIndex]}.`
      : `Hello Rasyne Deco, I would like to discuss ${c.objects[objectIndex]} — ${c.states[stateIndex]} — with a ${c.moods[moodIndex]} atmosphere.`;

  return (
    <section className="brief-engine section-padding" id="brief-engine">
      <div className="brief-engine-header"><div><p className="eyebrow dark"><span></span>{c.label}</p><h2>{c.title}</h2></div><p>{c.text}</p></div>
      <div className="brief-engine-console">
        <div className="brief-engine-steps">
          {options.map((option, optionIndex) => {
            const Icon = option.icon;
            return <div className="brief-engine-step" key={option.label}><div className="brief-engine-step-title"><span>0{optionIndex + 1}</span><Icon size={16} /><b>{option.label}</b></div><div className="brief-engine-options">{option.values.map((value, valueIndex) => <button key={value} type="button" className={indexes[optionIndex] === valueIndex ? "active" : ""} onClick={() => setIndexes[optionIndex](valueIndex)}>{value}</button>)}</div></div>;
          })}
        </div>
        <div className="brief-engine-output"><small>RASYNE / LIVE BRIEF</small><p>{brief}</p><div className="brief-engine-route"><span>{c.route}</span><div><button type="button" className={line === "primary" ? "active" : ""} onClick={() => setLine("primary")}><PhoneCall size={14}/><b>{c.primary}</b><small>{c.primaryNote}</small></button><button type="button" className={line === "secondary" ? "active" : ""} onClick={() => setLine("secondary")}><PhoneCall size={14}/><b>{c.secondary}</b><small>{c.secondaryNote}</small></button></div></div><a className="button-primary brief-engine-send" href={getWhatsAppUrl(brief, line)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>{c.send}<ArrowUpRight size={16}/></a></div>
      </div>
    </section>
  );
}

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
  const socials = socialCopy[locale];
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

  const navTargets = ["#services", "/lab", "/worlds", "/studio", "#atelier", "#contact"];
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

  const openSocial = (network: "instagram" | "facebook") => {
    const url = network === "instagram" ? atelierChannels.instagramUrl : atelierChannels.facebookUrl;
    if (url) { window.open(url, "_blank", "noopener,noreferrer"); return; }
    toast.message(network === "instagram" ? socials.instagramSoon : socials.facebookSoon);
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
          <div className="lab-preview-gallery"><figure><img src={labSofaUrl} alt="Sculptural modular sofa concept"/><figcaption>01 / ORBIT</figcaption></figure><figure><img src={labChairUrl} alt="Contemporary lounge chair concept"/><figcaption>02 / ARC</figcaption></figure><figure><img src={labDiningUrl} alt="Contemporary dining furniture concept"/><figcaption>03 / PLINTH</figcaption></figure><figure><img src={labChaiseUrl} alt="Contemporary chaise lounge concept"/><figcaption>04 / CLOUD</figcaption></figure><figure><img src={labAutoLoungeUrl} alt="Automotive-inspired lounge bench concept"/><figcaption>05 / TOURING</figcaption></figure><figure><img src={labStoolUrl} alt="Sculptural stool concept"/><figcaption>06 / PIVOT</figcaption></figure></div>
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

        <AtelierBriefEngine locale={locale} />

        <section id="atelier" className="atelier-section section-padding">
          <div className="atelier-top">
            <div>
              <p className="eyebrow dark"><span></span>{t.atelierLabel}</p>
              <h2>{t.atelierTitle}</h2>
            </div>
            <p className="atelier-description">{t.atelierText}</p>
          </div>
          <div className="atelier-gallery">
            <figure className="atelier-photo atelier-photo-large"><img src={atelierMachinesUrl} alt="Professional Rasyne Deco upholsterers at work in the atelier" /><figcaption>01 — Precision upholstery: craft in progress</figcaption></figure>
            <figure className="atelier-photo atelier-photo-small"><img src={atelierCuttingUrl} alt="Professional fabric preparation inside the Rasyne Deco atelier" /><figcaption>02 — Material study: measured by hand</figcaption></figure>
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

        <section className="renewal-sequence">
          <div className="renewal-intro"><div><p className="eyebrow light"><span></span>{t.renewalLabel as string}</p><h2>{t.renewalTitle as string}</h2></div><p>{t.renewalText as string}</p></div>
          <div className="renewal-stages">{(t.renewalStages as string[][]).map(([title, text], index) => <article className="renewal-stage" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          <figure className="renewal-film"><video src={refurbishmentCompleteFilmUrl} controls muted loop playsInline preload="metadata" aria-label={t.filmTitle as string}></video><figcaption className="renewal-film-caption"><small>RASYNE / FILM 01 · COMPLETE RESTORATION</small><strong>{t.filmTitle as string}</strong><p>{t.filmText as string}</p><i></i></figcaption></figure>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy"><p className="eyebrow light"><span></span>{t.contactLabel}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-actions"><a href={getWhatsAppUrl("Hello Rasyne Deco, I would like to share a furniture idea with the workshop.")} target="_blank" rel="noreferrer" className="button-ivory"><MessageCircle size={18} />{t.whatsapp}</a><a className="contact-address" href="https://www.google.com/maps/search/?api=1&query=Avenue+Karaia+Sayada+5035+Monastir" target="_blank" rel="noreferrer"><MapPin size={18}/><span>{t.address}</span></a></div><div className="contact-lines"><a href={getWhatsAppUrl("Hello Rasyne Deco, I would like to contact the main atelier line.", "primary")} target="_blank" rel="noreferrer"><PhoneCall size={14}/><span><small>{briefEngineCopy[locale].primary}</small><b>{briefEngineCopy[locale].primaryNote}</b></span></a><a href={getWhatsAppUrl("Hello Rasyne Deco, I would like to contact the secondary atelier line.", "secondary")} target="_blank" rel="noreferrer"><PhoneCall size={14}/><span><small>{briefEngineCopy[locale].secondary}</small><b>{briefEngineCopy[locale].secondaryNote}</b></span></a></div><div className="contact-socials"><small>{socials.follow}</small><div><button type="button" onClick={() => openSocial("instagram")}><AtSign size={15}/>{socials.instagram}</button><button type="button" onClick={() => openSocial("facebook")}><b>f</b>{socials.facebook}</button></div></div></div>
          <div className="contact-right"><div className="contact-map-panel"><span>RASYNE DECO</span><MapPin size={34} strokeWidth={1.3}/><a href="https://www.google.com/maps/search/?api=1&query=Avenue+Karaia+Sayada+5035+Monastir" target="_blank" rel="noreferrer">{t.viewMap} <ArrowUpRight size={16}/></a></div>{contactSent ? <div className="contact-form-success"><Check size={22}/><p>{t.contactSuccess}</p></div> : <form className="contact-form" onSubmit={sendContact}><h3>{t.contactFormTitle}</h3><label><span>{t.contactName}</span><input value={contactForm.fullName} onChange={event => setContactForm({ ...contactForm, fullName: event.target.value })} /></label><label><span>{t.contactDetail}</span><input value={contactForm.contact} onChange={event => setContactForm({ ...contactForm, contact: event.target.value })} /></label><label><span>{t.contactMessage}</span><textarea rows={3} value={contactForm.message} onChange={event => setContactForm({ ...contactForm, message: event.target.value })} /></label><button type="submit" disabled={contactMutation.isPending}>{contactMutation.isPending ? t.contactSending : <>{t.contactSend}<ArrowUpRight size={16}/></>}</button></form>}</div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand brand-footer" href="/"><BrandMark invert /><span className="brand-copy"><b>Rasyne</b><small>Deco</small></span></a><p>{t.footer}</p><span>© {new Date().getFullYear()}</span></footer>
      <a className="atelier-chat-rail" href={getWhatsAppUrl(locale === "fr" ? "Bonjour Rasyne Deco, je souhaite partager une idée de mobilier avec l’atelier." : locale === "ar" ? "مرحباً Rasyne Deco، أود مشاركة فكرة أثاث مع الورشة." : "Hello Rasyne Deco, I would like to share a furniture idea with the atelier.")} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span><small>{t.chatSignal as string}</small>{t.chatNow as string}</span></a>
    </div>
  );
}
