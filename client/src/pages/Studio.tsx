import { Locale, localeNames, useLocale } from "@/lib/locale";
import { getWhatsAppUrl } from "@/lib/contact";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ImagePlus,
  LoaderCircle,
  Mic,
  Pause,
  RotateCcw,
  Send,
  MessageCircle,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const markUrl = "/manus-storage/rasyine-deco-mark_ae9209a1.png";

const labels = {
  en: {
    back: "Back to atelier", badge: "Rasyne Deco · Design Studio", title: "Give a familiar piece a new point of view.", subtitle: "Upload a photo, or begin with a simple description. This tool creates a visual direction for conversation with our atelier — not a final quotation.",
    step1: "1. Choose your starting point", uploadTitle: "Add a reference photo", uploadText: "Sofa, chair, salon, car interior or fabric detail. JPG, PNG or WEBP, up to 8 MB.", uploadButton: "Choose a photo", noUpload: "I’m starting without a photo", photoReady: "Reference ready", uploading: "Uploading…", remove: "Remove", 
    step2: "2. Describe what you imagine", placeholder: "For example: Reupholster this three-seat salon in warm beige bouclé with slim walnut legs, a softer rounded profile, and a calm Mediterranean feeling.", voice: "Record your idea", stop: "Stop recording", transcribing: "Turning your voice into text…", 
    service: "Service", style: "Style direction", material: "Material / fabric", optional: "optional", generate: "Create visual concept", generating: "Creating your concept…", result: "Your design direction", resultText: "Use this visual concept to begin a real conversation with our workshop. Fine details, timing and cost are confirmed after review.", refine: "Create another direction",
    orderBadge: "3. Send a real request", orderTitle: "Ready to discuss the piece?", orderText: "Send your details and the atelier will receive your project brief, reference photo and concept — if one was created.", name: "Your name", phone: "Phone / WhatsApp", email: "Email", contact: "Preferred contact", contactPhone: "Phone", contactWhatsApp: "WhatsApp", contactEmail: "Email", submit: "Send request to atelier", sending: "Sending request…", success: "Your request has been received. Rasyne Deco will review it personally.", shareWhatsApp: "Share your brief on WhatsApp",
    designWithout: "No image? No problem. Describe the room, object, material or feeling you want to create.", uploadError: "Please choose an image under 8 MB or an audio file under 16 MB.", required: "Write a little more about your idea before creating a concept.", recordError: "Microphone access is needed to record your idea.", orderRequired: "Please add your name, phone number and project description.", generationError: "Unable to create a concept right now.", orderError: "Unable to send the request right now.",
  },
  fr: {
    back: "Retour à l’atelier", badge: "Rasyne Deco · Design Studio", title: "Donnez un nouveau regard à une pièce familière.", subtitle: "Téléversez une photo ou commencez par une simple description. Cet outil crée une direction visuelle pour échanger avec notre atelier — ce n’est pas un devis définitif.",
    step1: "1. Choisissez votre point de départ", uploadTitle: "Ajoutez une photo de référence", uploadText: "Canapé, fauteuil, salon, intérieur automobile ou détail de tissu. JPG, PNG ou WEBP, jusqu’à 8 Mo.", uploadButton: "Choisir une photo", noUpload: "Je commence sans photo", photoReady: "Référence prête", uploading: "Téléversement…", remove: "Retirer",
    step2: "2. Décrivez ce que vous imaginez", placeholder: "Par exemple : Réfection de ce salon trois places en bouclé beige chaud, avec des pieds fins en noyer, un profil plus arrondi et une ambiance méditerranéenne apaisée.", voice: "Enregistrer votre idée", stop: "Arrêter l’enregistrement", transcribing: "Votre voix devient un texte…",
    service: "Service", style: "Direction stylistique", material: "Matière / tissu", optional: "facultatif", generate: "Créer un concept visuel", generating: "Création du concept…", result: "Votre direction de design", resultText: "Utilisez ce concept visuel pour commencer un véritable échange avec l’atelier. Les détails, délais et prix sont confirmés après étude.", refine: "Créer une autre direction",
    orderBadge: "3. Envoyez une vraie demande", orderTitle: "Prêt à parler de la pièce ?", orderText: "Envoyez vos coordonnées : l’atelier recevra votre brief, votre photo de référence et le concept, s’il a été créé.", name: "Votre nom", phone: "Téléphone / WhatsApp", email: "E-mail", contact: "Contact préféré", contactPhone: "Téléphone", contactWhatsApp: "WhatsApp", contactEmail: "E-mail", submit: "Envoyer la demande à l’atelier", sending: "Envoi de la demande…", success: "Votre demande a été reçue. Rasyne Deco l’étudiera personnellement.", shareWhatsApp: "Partager votre brief sur WhatsApp",
    designWithout: "Pas d’image ? Aucun problème. Décrivez la pièce, l’objet, la matière ou l’ambiance que vous souhaitez créer.", uploadError: "Choisissez une image de moins de 8 Mo ou un fichier audio de moins de 16 Mo.", required: "Décrivez un peu plus votre idée avant de créer un concept.", recordError: "L’accès au microphone est nécessaire pour enregistrer votre idée.", orderRequired: "Ajoutez votre nom, votre numéro et une description du projet.", generationError: "Impossible de créer un concept pour le moment.", orderError: "Impossible d’envoyer la demande pour le moment.",
  },
  ar: {
    back: "العودة إلى الورشة", badge: "Rasyne Deco · استوديو التصميم", title: "امنح قطعة مألوفة منظوراً جديداً.", subtitle: "حمّل صورة أو ابدأ بوصف بسيط. تنشئ هذه الأداة اتجاهاً بصرياً للنقاش مع ورشتنا — وليست عرض سعر نهائي.",
    step1: "1. اختر نقطة البداية", uploadTitle: "أضف صورة مرجعية", uploadText: "كنبة، كرسي، صالون، داخل سيارة أو تفصيل قماش. JPG أو PNG أو WEBP حتى 8 ميغابايت.", uploadButton: "اختر صورة", noUpload: "سأبدأ دون صورة", photoReady: "المرجع جاهز", uploading: "جارٍ الرفع…", remove: "إزالة",
    step2: "2. صف ما تتخيله", placeholder: "مثلاً: جدّد هذا الصالون ذي الثلاثة مقاعد بقماش بوكليه بيج دافئ وأرجل جوز رفيعة وشكل دائري أكثر وإحساس متوسطي هادئ.", voice: "سجّل فكرتك", stop: "أوقف التسجيل", transcribing: "نحوّل صوتك إلى نص…",
    service: "الخدمة", style: "الاتجاه الأسلوبي", material: "المادة / القماش", optional: "اختياري", generate: "أنشئ تصوراً بصرياً", generating: "جارٍ إنشاء التصور…", result: "اتجاه تصميمك", resultText: "استخدم هذا التصور لبدء نقاش حقيقي مع الورشة. يتم تأكيد التفاصيل والمدة والتكلفة بعد المراجعة.", refine: "أنشئ اتجاهاً آخر",
    orderBadge: "3. أرسل طلباً حقيقياً", orderTitle: "هل أنت مستعد لمناقشة القطعة؟", orderText: "أرسل بياناتك وستتلقى الورشة وصف المشروع والصورة المرجعية والتصور إن تم إنشاؤه.", name: "اسمك", phone: "الهاتف / واتساب", email: "البريد الإلكتروني", contact: "التواصل المفضل", contactPhone: "الهاتف", contactWhatsApp: "واتساب", contactEmail: "البريد الإلكتروني", submit: "أرسل الطلب إلى الورشة", sending: "جارٍ إرسال الطلب…", success: "تم استلام طلبك. ستراجعه Rasyne Deco شخصياً.", shareWhatsApp: "شارك الوصف عبر واتساب",
    designWithout: "لا توجد صورة؟ لا مشكلة. صف الغرفة أو القطعة أو المادة أو الشعور الذي تريد تصميمه.", uploadError: "اختر صورة أقل من 8 ميغابايت أو ملفاً صوتياً أقل من 16 ميغابايت.", required: "اكتب المزيد قليلاً عن فكرتك قبل إنشاء التصور.", recordError: "نحتاج إلى إذن الميكروفون لتسجيل فكرتك.", orderRequired: "أضف اسمك ورقم هاتفك ووصف المشروع.", generationError: "تعذّر إنشاء تصور في الوقت الحالي.", orderError: "تعذّر إرسال الطلب في الوقت الحالي.",
  },
} satisfies Record<Locale, Record<string, string>>;

const services = [
  ["reupholstery", { en: "Reupholstery", fr: "Tapisserie", ar: "تنجيد" }],
  ["living_room", { en: "Living room / salon", fr: "Salon sur mesure", ar: "صالون حسب الطلب" }],
  ["furniture_redesign", { en: "Furniture redesign", fr: "Redesign mobilier", ar: "إعادة تصميم الأثاث" }],
  ["car_interior", { en: "Car interior", fr: "Intérieur automobile", ar: "داخل السيارة" }],
  ["carpeting", { en: "Carpet / covering", fr: "Tapis ou revêtement", ar: "سجاد أو كساء" }],
] as const;

type UploadedAsset = { key: string; url: string; mimeType: string };

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function Studio() {
  const { locale, setLocale } = useLocale();
  const t = labels[locale];
  const fileInput = useRef<HTMLInputElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [reference, setReference] = useState<UploadedAsset | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [brief, setBrief] = useState("");
  const [service, setService] = useState<(typeof services)[number][0]>("reupholstery");
  const [style, setStyle] = useState("");
  const [material, setMaterial] = useState("");
  const [recording, setRecording] = useState(false);
  const [conceptUrl, setConceptUrl] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [customer, setCustomer] = useState({ fullName: "", phone: "", email: "", preferredContact: "whatsapp" as "phone" | "whatsapp" | "email" });

  const upload = trpc.studio.upload.useMutation();
  const transcribe = trpc.studio.transcribe.useMutation();
  const generate = trpc.studio.generate.useMutation();
  const createOrder = trpc.orders.create.useMutation();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const briefFromLab = query.get("brief");
    const styleFromLab = query.get("style");
    const materialFromLab = query.get("material");
    if (briefFromLab) setBrief(briefFromLab);
    if (styleFromLab) setStyle(styleFromLab);
    if (materialFromLab) setMaterial(materialFromLab);
  }, []);

  const uploadFile = async (file: File) => {
    const audio = file.type.startsWith("audio/");
    const max = audio ? 16 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > max) throw new Error(t.uploadError);
    const dataUrl = await readAsDataUrl(file);
    return upload.mutateAsync({ dataUrl, fileName: file.name, mimeType: file.type as "image/jpeg" | "image/png" | "image/webp" | "audio/webm" | "audio/wav" | "audio/mpeg" | "audio/ogg" | "audio/mp4" });
  };

  const handleReference = async (file?: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error(t.uploadError);
      return;
    }
    try {
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      const asset = await uploadFile(file);
      setReference(asset);
      toast.success(t.photoReady);
    } catch (error) {
      setPreviewUrl(null);
      toast.error(error instanceof Error ? error.message : t.uploadError);
    }
  };

  const clearReference = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setReference(null);
    setPreviewUrl(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const toggleRecording = async () => {
    if (recording) {
      recorder.current?.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunks.current = [];
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = event => chunks.current.push(event.data);
      mediaRecorder.onstop = async () => {
        setRecording(false);
        stream.getTracks().forEach(track => track.stop());
        const audioFile = new File([new Blob(chunks.current, { type: "audio/webm" })], "rasyne-voice-prompt.webm", { type: "audio/webm" });
        try {
          const asset = await uploadFile(audioFile);
          const transcript = await transcribe.mutateAsync({ audioKey: asset.key, language: locale });
          setBrief(current => current ? `${current}\n${transcript.text}` : transcript.text);
          toast.success(t.transcribing.replace("…", " ✓"));
        } catch (error) {
          toast.error(error instanceof Error ? error.message : t.recordError);
        }
      };
      mediaRecorder.start();
      setRecording(true);
    } catch {
      toast.error(t.recordError);
    }
  };

  const createConcept = async () => {
    if (brief.trim().length < 12) {
      toast.error(t.required);
      return;
    }
    try {
      const result = await generate.mutateAsync({ brief, service, style: style || undefined, material: material || undefined, referenceKey: reference?.key, referenceMimeType: reference?.mimeType as "image/jpeg" | "image/png" | "image/webp" | undefined });
      setConceptUrl(result.url);
      toast.success(t.result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.generationError);
    }
  };

  const submitOrder = async (event: FormEvent) => {
    event.preventDefault();
    if (!customer.fullName.trim() || !customer.phone.trim() || brief.trim().length < 12) {
      toast.error(t.orderRequired);
      return;
    }
    try {
      await createOrder.mutateAsync({
        ...customer,
        email: customer.email || undefined,
        service,
        brief,
        style: style || undefined,
        material: material || undefined,
        referenceKey: reference?.key,
        referenceUrl: reference?.url,
        conceptUrl: conceptUrl || undefined,
        language: locale,
      });
      setOrderSent(true);
      toast.success(t.success);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.orderError);
    }
  };
  const shareOrderHref = getWhatsAppUrl(`Hello Rasyne Deco, here is my design brief:\n${brief}\n\nReference image: ${reference?.url ?? "not attached"}\nConcept image: ${conceptUrl ?? "not generated"}`);

  return (
    <div className="studio-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="studio-nav">
        <a href="/" className="studio-brand"><img src={markUrl} alt="Rasyne Deco" /><span><b>Rasyne</b> Deco</span></a>
        <div className="studio-nav-right"><a href="/" className="back-link"><ArrowLeft size={16} /> {t.back}</a><div className="locale-switcher studio-locale">{(["en", "fr", "ar"] as Locale[]).map(item => <button key={item} onClick={() => setLocale(item)} className={locale === item ? "active" : ""}>{localeNames[item]}</button>)}</div></div>
      </header>

      <main className="studio-main">
        <section className="studio-heading"><div><span className="studio-kicker"><Sparkles size={14}/>{t.badge}</span><h1>{t.title}</h1></div><p>{t.subtitle}</p></section>

        <section className="studio-workbench">
          <div className="studio-column studio-inputs">
            <div className="studio-step-label">{t.step1}</div>
            <div className={`upload-card ${previewUrl ? "has-preview" : ""}`}>
              {previewUrl ? <><img src={previewUrl} alt="Uploaded reference" /><div className="upload-overlay"><span><Check size={16}/>{reference ? t.photoReady : t.uploading}</span><button onClick={clearReference} aria-label={t.remove}><X size={17}/></button></div></> : <><div className="upload-icon"><ImagePlus size={26}/></div><h2>{t.uploadTitle}</h2><p>{t.uploadText}</p><button className="upload-button" onClick={() => fileInput.current?.click()} disabled={upload.isPending}><Upload size={16}/>{t.uploadButton}</button><button className="plain-button" onClick={() => toast.message(t.designWithout)}>{t.noUpload}</button></>}
              <input ref={fileInput} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => handleReference(event.target.files?.[0])}/>
            </div>

            <div className="studio-step-label margin-top">{t.step2}</div>
            <div className="prompt-card">
              <textarea value={brief} onChange={event => setBrief(event.target.value)} placeholder={t.placeholder} rows={7} />
              <div className="prompt-tools"><button className={`voice-button ${recording ? "recording" : ""}`} onClick={toggleRecording} disabled={transcribe.isPending || upload.isPending}>{recording ? <Pause size={16} fill="currentColor" /> : transcribe.isPending ? <LoaderCircle size={16} className="spin"/> : <Mic size={16}/>} {recording ? t.stop : transcribe.isPending ? t.transcribing : t.voice}</button><span>{brief.length}/1500</span></div>
            </div>

            <div className="studio-fields">
              <label><span>{t.service}</span><select value={service} onChange={event => setService(event.target.value as typeof service)}>{services.map(([value, label]) => <option value={value} key={value}>{label[locale]}</option>)}</select></label>
              <label><span>{t.style} <i>{t.optional}</i></span><input value={style} onChange={event => setStyle(event.target.value)} placeholder={locale === "fr" ? "Ex. Méditerranéen contemporain" : locale === "ar" ? "مثال: متوسطي معاصر" : "e.g. Mediterranean modern"}/></label>
              <label><span>{t.material} <i>{t.optional}</i></span><input value={material} onChange={event => setMaterial(event.target.value)} placeholder={locale === "fr" ? "Ex. Bouclé ivoire, noyer" : locale === "ar" ? "مثال: بوكليه عاجي، جوز" : "e.g. Ivory bouclé, walnut"}/></label>
            </div>
            <button className="studio-generate" onClick={createConcept} disabled={generate.isPending || upload.isPending}><WandSparkles size={18}/>{generate.isPending ? t.generating : t.generate}</button>
          </div>

          <div className="studio-column studio-result">
            <div className="result-topline"><span>{t.result}</span>{conceptUrl && <button onClick={() => setConceptUrl(null)}><RotateCcw size={14}/>{t.refine}</button>}</div>
            <div className={`result-canvas ${conceptUrl ? "ready" : ""}`}>{generate.isPending ? <div className="canvas-loading"><LoaderCircle className="spin" size={32}/><p>{t.generating}</p></div> : conceptUrl ? <img src={conceptUrl} alt="Generated Rasyne Deco furniture concept" /> : <div className="canvas-empty"><span className="canvas-spark"><img src={markUrl} alt="" /></span><p>{t.designWithout}</p><small>RASYNE DECO · CONCEPT</small></div>}</div>
            <p className="result-note">{t.resultText}</p>
          </div>
        </section>

        <section className="order-panel"><div className="order-intro"><span className="studio-kicker"><Send size={14}/>{t.orderBadge}</span><h2>{t.orderTitle}</h2><p>{t.orderText}</p></div>{orderSent ? <div className="order-success"><span><Check size={25}/></span><div><h3>{t.success}</h3><a href={shareOrderHref} target="_blank" rel="noreferrer" className="order-share"><MessageCircle size={16}/>{t.shareWhatsApp}</a></div></div> : <form onSubmit={submitOrder} className="order-form"><label><span>{t.name}</span><input value={customer.fullName} onChange={event => setCustomer({ ...customer, fullName: event.target.value })} required /></label><label><span>{t.phone}</span><input value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} required inputMode="tel" /></label><label><span>{t.email}</span><input value={customer.email} onChange={event => setCustomer({ ...customer, email: event.target.value })} type="email" /></label><label><span>{t.contact}</span><select value={customer.preferredContact} onChange={event => setCustomer({ ...customer, preferredContact: event.target.value as "phone" | "whatsapp" | "email" })}><option value="whatsapp">{t.contactWhatsApp}</option><option value="phone">{t.contactPhone}</option><option value="email">{t.contactEmail}</option></select></label><button className="order-submit" type="submit" disabled={createOrder.isPending}>{createOrder.isPending ? t.sending : <>{t.submit}<ArrowUpRight size={17}/></>}</button></form>}</section>
      </main>
    </div>
  );
}
