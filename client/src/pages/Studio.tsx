import { Locale, localeNames, useLocale } from "@/lib/locale";
import { atelierChannels, getWhatsAppUrl } from "@/lib/contact";
import { createStudioDraft, persistStudioDrafts, readStudioDrafts, type SavedStudioDraft, type StudioReference } from "@/lib/studioDrafts";
import { trpc } from "@/lib/trpc";
import FurnitureCommandScene from "@/components/FurnitureCommandScene";
import "./command-deck.css";
import "./studio-augmentation.css";
import "./studio-finish-compass.css";
import {
  ArrowLeft,
  ArrowUpRight,
  AtSign,
  Bookmark,
  Check,
  ImagePlus,
  LoaderCircle,
  Mic,
  Pause,
  RotateCcw,
  Send,
  MessageCircle,
  Box,
  Clipboard,
  Crosshair,
  Cpu,
  Layers3,
  Orbit,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// HMR integrity marker: this module is intentionally safe to reload independently.

const markUrl = "/manus-storage/rasyine-deco-mark_ae9209a1.png";

const saveCopy = {
  en: { save: "Save dossier", saved: "Dossier saved on this device", savedDesigns: "Saved studies", restore: "Restore", remove: "Remove", noSaved: "No saved studies yet.", saveError: "This browser could not save the dossier.", worldImported: "Rasyne Worlds composition imported." },
  fr: { save: "Sauvegarder le dossier", saved: "Dossier enregistré sur cet appareil", savedDesigns: "Études sauvegardées", restore: "Restaurer", remove: "Retirer", noSaved: "Aucune étude sauvegardée.", saveError: "Ce navigateur ne peut pas sauvegarder le dossier.", worldImported: "Composition Rasyne Worlds importée." },
  ar: { save: "احفظ الملف", saved: "تم حفظ الملف على هذا الجهاز", savedDesigns: "الدراسات المحفوظة", restore: "استعد", remove: "حذف", noSaved: "لا توجد دراسات محفوظة بعد.", saveError: "تعذر على المتصفح حفظ الملف.", worldImported: "تم استيراد تكوين Rasyne Worlds." },
} satisfies Record<Locale, Record<string, string>>;

const socialSignalCopy = {
  en: { title: "Follow the atelier", instagram: "Instagram", facebook: "Facebook", instagramSoon: "Instagram profile coming soon.", facebookSoon: "Facebook page coming soon." },
  fr: { title: "Suivre l’atelier", instagram: "Instagram", facebook: "Facebook", instagramSoon: "Profil Instagram bientôt disponible.", facebookSoon: "Page Facebook bientôt disponible." },
  ar: { title: "تابع الورشة", instagram: "إنستغرام", facebook: "فيسبوك", instagramSoon: "حساب إنستغرام قريباً.", facebookSoon: "صفحة فيسبوك قريباً." },
} satisfies Record<Locale, Record<string, string>>;

const commandCopy = {
  en: { badge: "Rasyne Design Command Deck", title: "Give the idea real coordinates.", text: "A live spatial study for proportion, comfort, material and construction before the visual concept is generated.", stage: "Live spatial model", orbit: "Drag to orbit · scroll to zoom", exploded: "Exploded view", assembled: "Assembly view", structure: "Structural controls", width: "Overall width", depth: "Seat depth", comfort: "Comfort index", material: "Material system", finish: "Leg finish", layers: "Construction layers", layerItems: ["Silhouette", "Seat system", "Back volume", "Arms", "Leg geometry"], materials: ["Ivory bouclé", "Cognac leather", "Terracotta velvet"], finishes: ["Walnut", "Brushed brass", "Espresso"], unit: "cm", config: "Configuration payload", observatory: "Material Observatory", observeText: "Select a surface and let its behavior enter your study.", materialNotes: ["Dense weave · cloud-soft reflection", "Hand-finished grain · warm patina", "Directional pile · saturated depth", "Mineral surface · calm architectural ground"], dossier: "Live project dossier", dossierText: "A clean packet of the current study, ready for the atelier.", copy: "Copy dossier", share: "Send to atelier", dimensions: "Dimensions", contactDossier: "Project signal" },
  fr: { badge: "Rasyne Design Command Deck", title: "Donnez de vraies coordonnées à l’idée.", text: "Une étude spatiale en direct pour la proportion, le confort, la matière et la construction avant de générer le concept visuel.", stage: "Modèle spatial en direct", orbit: "Glissez pour tourner · défilez pour zoomer", exploded: "Vue éclatée", assembled: "Vue assemblée", structure: "Contrôles structurels", width: "Largeur totale", depth: "Profondeur d’assise", comfort: "Indice de confort", material: "Système matière", finish: "Finition des pieds", layers: "Couches de construction", layerItems: ["Silhouette", "Système d’assise", "Volume du dossier", "Accoudoirs", "Géométrie des pieds"], materials: ["Bouclé ivoire", "Cuir cognac", "Velours terracotta"], finishes: ["Noyer", "Laiton brossé", "Espresso"], unit: "cm", config: "Configuration transmise", observatory: "Observatoire des matières", observeText: "Choisissez une surface et intégrez son comportement à votre étude.", materialNotes: ["Tissage dense · reflet nuageux", "Grain fini main · patine chaleureuse", "Poil directionnel · profondeur saturée", "Surface minérale · fond architectural calme"], dossier: "Dossier de projet vivant", dossierText: "Une fiche nette de l’étude en cours, prête pour l’atelier.", copy: "Copier le dossier", share: "Envoyer à l’atelier", dimensions: "Dimensions", contactDossier: "Signal du projet" },
  ar: { badge: "Rasyne Design Command Deck", title: "امنح الفكرة إحداثيات حقيقية.", text: "دراسة مكانية مباشرة للنِّسب والراحة والخامة والبنية قبل إنشاء التصور البصري.", stage: "نموذج مكاني مباشر", orbit: "اسحب للدوران · مرر للتكبير", exploded: "عرض مفكك", assembled: "عرض مركب", structure: "عناصر التحكم البنيوية", width: "العرض الكلي", depth: "عمق المقعد", comfort: "مؤشر الراحة", material: "نظام الخامة", finish: "تشطيب الأرجل", layers: "طبقات التكوين", layerItems: ["الهيئة", "نظام الجلوس", "حجم الظهر", "المساند", "هندسة الأرجل"], materials: ["بوكليه عاجي", "جلد كونياك", "مخمل تيراكوتا"], finishes: ["جوز", "نحاس مصقول", "إسبريسو"], unit: "سم", config: "بيانات التكوين", observatory: "مرصد الخامات", observeText: "اختر سطحاً ودع خصائصه تدخل دراستك.", materialNotes: ["نسيج كثيف · انعكاس ناعم", "حبيبات مشغولة يدوياً · عراقة دافئة", "وبر اتجاهي · عمق مشبع", "سطح معدني · أرضية معمارية هادئة"], dossier: "ملف مشروع حي", dossierText: "حزمة واضحة للدراسة الحالية وجاهزة للورشة.", copy: "نسخ الملف", share: "أرسله إلى الورشة", dimensions: "الأبعاد", contactDossier: "إشارة المشروع" },
} satisfies Record<Locale, Record<string, string | string[]>>;

const labels = {
  en: {
    back: "Back to atelier", badge: "Rasyne Deco · Design Studio", title: "Engineer a future piece from real-world craft.", subtitle: "Start with a reference or a precise direction, then use the command deck to study proportion, comfort, construction and material before we create the visual concept.",
    step1: "1. Choose your starting point", uploadTitle: "Add a reference photo", uploadText: "Sofa, chair, salon, car interior or fabric detail. JPG, PNG or WEBP, up to 8 MB.", uploadButton: "Choose a photo", noUpload: "I’m starting without a photo", photoReady: "Reference ready", uploading: "Uploading…", remove: "Remove", 
    step2: "2. Describe what you imagine", placeholder: "For example: Reupholster this three-seat salon in warm beige bouclé with slim walnut legs, a softer rounded profile, and a calm Mediterranean feeling.", voice: "Record your idea", stop: "Stop recording", transcribing: "Turning your voice into text…", 
    service: "Service", style: "Style direction", material: "Material / fabric", optional: "optional", generate: "Create visual concept", generating: "Creating your concept…", result: "Your design direction", resultText: "Use this visual concept to begin a real conversation with our workshop. Fine details, timing and cost are confirmed after review.", refine: "Create another direction",
    orderBadge: "3. Send a real request", orderTitle: "Ready to discuss the piece?", orderText: "Send your details and the atelier will receive your project brief, reference photo and concept — if one was created.", name: "Your name", phone: "Phone / WhatsApp", email: "Email", contact: "Preferred contact", contactPhone: "Phone", contactWhatsApp: "WhatsApp", contactEmail: "Email", submit: "Send request to atelier", sending: "Sending request…", success: "Your request has been received. Rasyne Deco will review it personally.", shareWhatsApp: "Share your brief on WhatsApp",
    designWithout: "No image? No problem. Describe the room, object, material or feeling you want to create.", uploadError: "Please choose an image under 8 MB or an audio file under 16 MB.", required: "Write a little more about your idea before creating a concept.", recordError: "Microphone access is needed to record your idea.", orderRequired: "Please add your name, phone number and project description.", generationError: "Unable to create a concept right now.", orderError: "Unable to send the request right now.",
  },
  fr: {
    back: "Retour à l’atelier", badge: "Rasyne Deco · Design Studio", title: "Concevez une pièce du futur à partir d’un vrai savoir-faire.", subtitle: "Partez d’une référence ou d’une direction précise, puis utilisez le command deck pour étudier la proportion, le confort, la construction et la matière avant de créer le concept visuel.",
    step1: "1. Choisissez votre point de départ", uploadTitle: "Ajoutez une photo de référence", uploadText: "Canapé, fauteuil, salon, intérieur automobile ou détail de tissu. JPG, PNG ou WEBP, jusqu’à 8 Mo.", uploadButton: "Choisir une photo", noUpload: "Je commence sans photo", photoReady: "Référence prête", uploading: "Téléversement…", remove: "Retirer",
    step2: "2. Décrivez ce que vous imaginez", placeholder: "Par exemple : Réfection de ce salon trois places en bouclé beige chaud, avec des pieds fins en noyer, un profil plus arrondi et une ambiance méditerranéenne apaisée.", voice: "Enregistrer votre idée", stop: "Arrêter l’enregistrement", transcribing: "Votre voix devient un texte…",
    service: "Service", style: "Direction stylistique", material: "Matière / tissu", optional: "facultatif", generate: "Créer un concept visuel", generating: "Création du concept…", result: "Votre direction de design", resultText: "Utilisez ce concept visuel pour commencer un véritable échange avec l’atelier. Les détails, délais et prix sont confirmés après étude.", refine: "Créer une autre direction",
    orderBadge: "3. Envoyez une vraie demande", orderTitle: "Prêt à parler de la pièce ?", orderText: "Envoyez vos coordonnées : l’atelier recevra votre brief, votre photo de référence et le concept, s’il a été créé.", name: "Votre nom", phone: "Téléphone / WhatsApp", email: "E-mail", contact: "Contact préféré", contactPhone: "Téléphone", contactWhatsApp: "WhatsApp", contactEmail: "E-mail", submit: "Envoyer la demande à l’atelier", sending: "Envoi de la demande…", success: "Votre demande a été reçue. Rasyne Deco l’étudiera personnellement.", shareWhatsApp: "Partager votre brief sur WhatsApp",
    designWithout: "Pas d’image ? Aucun problème. Décrivez la pièce, l’objet, la matière ou l’ambiance que vous souhaitez créer.", uploadError: "Choisissez une image de moins de 8 Mo ou un fichier audio de moins de 16 Mo.", required: "Décrivez un peu plus votre idée avant de créer un concept.", recordError: "L’accès au microphone est nécessaire pour enregistrer votre idée.", orderRequired: "Ajoutez votre nom, votre numéro et une description du projet.", generationError: "Impossible de créer un concept pour le moment.", orderError: "Impossible d’envoyer la demande pour le moment.",
  },
  ar: {
    back: "العودة إلى الورشة", badge: "Rasyne Deco · استوديو التصميم", title: "صمّم قطعة مستقبلية من حِرفة واقعية.", subtitle: "ابدأ بمرجع أو اتجاه دقيق، ثم استخدم منصة القيادة لدراسة النسب والراحة والبنية والخامة قبل إنشاء التصور البصري.",
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

type UploadedAsset = StudioReference;

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
  const savedT = saveCopy[locale];
  const socialT = socialSignalCopy[locale];
  const command = commandCopy[locale];
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
  const [modelWidth, setModelWidth] = useState(280);
  const [modelDepth, setModelDepth] = useState(96);
  const [comfort, setComfort] = useState(7);
  const [sceneMaterial, setSceneMaterial] = useState<"boucle" | "leather" | "velvet">("boucle");
  const [legFinish, setLegFinish] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [activeStudy, setActiveStudy] = useState(0);
  const [savedDrafts, setSavedDrafts] = useState<SavedStudioDraft[]>(readStudioDrafts);

  const upload = trpc.studio.upload.useMutation();
  const transcribe = trpc.studio.transcribe.useMutation();
  const generate = trpc.studio.generate.useMutation();
  const createOrder = trpc.orders.create.useMutation();
  const sceneAccent = ["#5a3424", "#c99f62", "#271713"][legFinish];
  const furnitureConfig = `${command.config as string}: ${modelWidth}${command.unit as string} × ${modelDepth}${command.unit as string}; ${command.materials[sceneMaterial === "boucle" ? 0 : sceneMaterial === "leather" ? 1 : 2]}; ${(command.finishes as unknown as string[])[legFinish]}; ${command.comfort as string} ${comfort}/10; ${exploded ? (command.exploded as string) : (command.assembled as string)}.`;
  const enrichedBrief = brief ? `${brief}\n\n${furnitureConfig}` : furnitureConfig;
  const materialStudies = [
    { id: "boucle", title: (command.materials as string[])[0], className: "boucle", scene: "boucle" as const },
    { id: "leather", title: (command.materials as string[])[1], className: "leather", scene: "leather" as const },
    { id: "velvet", title: (command.materials as string[])[2], className: "velvet", scene: "velvet" as const },
    { id: "plaster", title: locale === "fr" ? "Plâtre minéral" : locale === "ar" ? "جص معدني" : "Mineral plaster", className: "plaster", scene: "boucle" as const },
  ];
  const finishSignals = locale === "fr" ? ["Grain sculpté · douceur architecturale", "Éclat satiné · ligne de précision", "Noir profond · contraste graphique"] : locale === "ar" ? ["عروق منحوتة · دفء معماري", "بريق حريري · خط دقيق", "سواد عميق · تباين رسومي"] : ["Sculpted grain · architectural warmth", "Satin glow · precision line", "Deep black · graphic contrast"];
  const projectDossier = `${command.dossier as string}\n${furnitureConfig}\n${command.contactDossier as string}: ${service}\n${command.material as string}: ${material || materialStudies[activeStudy].title}\n${command.config as string}: ${brief || "—"}`;
  const dossierHref = getWhatsAppUrl(`Hello Rasyne Deco, ${projectDossier}`);

  const selectMaterialStudy = (index: number) => {
    const study = materialStudies[index];
    setActiveStudy(index);
    setSceneMaterial(study.scene);
    setMaterial(study.title);
  };

  const selectFinishStudy = (index: number) => setLegFinish(index);

  const copyDossier = async () => {
    await navigator.clipboard?.writeText(projectDossier);
    toast.success(command.copy as string);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const briefFromLab = query.get("brief");
    const styleFromLab = query.get("style");
    const materialFromLab = query.get("material");
    if (briefFromLab) setBrief(briefFromLab);
    if (styleFromLab) setStyle(styleFromLab);
    if (materialFromLab) setMaterial(materialFromLab);
    const worldBrief = window.sessionStorage.getItem("rasyne-worlds-brief");
    if (!briefFromLab && worldBrief) {
      setBrief(worldBrief);
      window.sessionStorage.removeItem("rasyne-worlds-brief");
      toast.success(savedT.worldImported);
    }
  }, []);

  const saveCurrentDraft = () => {
    try {
      const saved = createStudioDraft({ brief, service, style, material, modelWidth, modelDepth, comfort, sceneMaterial, legFinish, exploded, activeStudy, reference, conceptUrl });
      const next = [saved, ...savedDrafts.filter((draft) => draft.brief !== saved.brief)].slice(0, 6);
      persistStudioDrafts(next);
      setSavedDrafts(next);
      toast.success(savedT.saved);
    } catch { toast.error(savedT.saveError); }
  };

  const restoreDraft = (draft: SavedStudioDraft) => {
    setBrief(draft.brief); setService(draft.service as typeof service); setStyle(draft.style); setMaterial(draft.material); setModelWidth(draft.modelWidth); setModelDepth(draft.modelDepth); setComfort(draft.comfort); setSceneMaterial(draft.sceneMaterial); setLegFinish(draft.legFinish); setExploded(draft.exploded); setActiveStudy(draft.activeStudy); setReference(draft.reference); setPreviewUrl(draft.reference?.url ?? null); setConceptUrl(draft.conceptUrl); toast.success(savedT.restore);
  };

  const removeDraft = (id: string) => {
    try { const next = savedDrafts.filter((draft) => draft.id !== id); persistStudioDrafts(next); setSavedDrafts(next); } catch { toast.error(savedT.saveError); }
  };

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
      const result = await generate.mutateAsync({ brief: enrichedBrief, service, style: style || undefined, material: material || undefined, referenceKey: reference?.key, referenceMimeType: reference?.mimeType as "image/jpeg" | "image/png" | "image/webp" | undefined });
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
        brief: enrichedBrief,
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
  const openSocial = (network: "instagram" | "facebook") => {
    const url = network === "instagram" ? atelierChannels.instagramUrl : atelierChannels.facebookUrl;
    if (url) { window.open(url, "_blank", "noopener,noreferrer"); return; }
    toast.message(network === "instagram" ? socialT.instagramSoon : socialT.facebookSoon);
  };
  const shareOrderHref = getWhatsAppUrl(`Hello Rasyne Deco, here is my design brief:\n${enrichedBrief}\n\nReference image: ${reference?.url ?? "not attached"}\nConcept image: ${conceptUrl ?? "not generated"}`);

  return (
    <div className="studio-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="studio-nav">
        <a href="/" className="studio-brand"><img src={markUrl} alt="Rasyne Deco" /><span><b>Rasyne</b> Deco</span></a>
        <div className="studio-nav-right"><a href="/" className="back-link"><ArrowLeft size={16} /> {t.back}</a><div className="locale-switcher studio-locale">{(["en", "fr", "ar"] as Locale[]).map(item => <button key={item} onClick={() => setLocale(item)} className={locale === item ? "active" : ""}>{localeNames[item]}</button>)}</div></div>
      </header>

      <main className="studio-main">
        <section className="studio-heading"><div><span className="studio-kicker"><Sparkles size={14}/>{t.badge}</span><h1>{t.title}</h1></div><p>{t.subtitle}</p></section>

        <section className="command-deck">
          <div className="command-deck-head"><div><span className="studio-kicker"><Cpu size={14}/>{command.badge as string}</span><h2>{command.title as string}</h2></div><p>{command.text as string}</p></div>
          <div className="command-grid">
            <div className="command-stage">
              <div className="stage-topline"><span><Crosshair size={14}/>{command.stage as string}</span><span>{command.orbit as string}</span></div>
              <div className="scene-wrap"><FurnitureCommandScene width={modelWidth / 95} depth={modelDepth / 95} comfort={comfort} material={sceneMaterial} accent={sceneAccent} exploded={exploded}/></div>
              <div className="stage-bottomline"><div><b>{modelWidth}</b><span>{command.unit as string} / W</span></div><div><b>{modelDepth}</b><span>{command.unit as string} / D</span></div><div><b>{comfort}</b><span>/ 10</span></div><button type="button" className={exploded ? "active" : ""} onClick={() => setExploded(value => !value)}><Layers3 size={15}/>{exploded ? command.assembled as string : command.exploded as string}</button></div>
              <span className="orbit-ring orbit-ring-one"></span><span className="orbit-ring orbit-ring-two"></span>
            </div>
            <aside className="command-controls">
              <div className="control-heading"><span><SlidersHorizontal size={15}/>{command.structure as string}</span><b>R-01</b></div>
              <label className="range-control"><span><Ruler size={14}/>{command.width as string}<b>{modelWidth} {command.unit as string}</b></span><input type="range" min="190" max="360" value={modelWidth} onChange={event => setModelWidth(Number(event.target.value))}/></label>
              <label className="range-control"><span><Ruler size={14}/>{command.depth as string}<b>{modelDepth} {command.unit as string}</b></span><input type="range" min="72" max="130" value={modelDepth} onChange={event => setModelDepth(Number(event.target.value))}/></label>
              <label className="range-control"><span><Orbit size={14}/>{command.comfort as string}<b>{comfort}/10</b></span><input type="range" min="2" max="10" value={comfort} onChange={event => setComfort(Number(event.target.value))}/></label>
              <div className="command-option"><span>{command.material as string}</span><div className="material-options">{(command.materials as unknown as string[]).map((item, index) => { const value = (["boucle", "leather", "velvet"] as const)[index]; return <button type="button" key={value} onClick={() => setSceneMaterial(value)} className={sceneMaterial === value ? "active" : ""}><i className={`material-dot ${value}`}></i>{item}</button>; })}</div></div>
              <div className="command-option"><span>{command.finish as string}</span><div className="finish-options">{(command.finishes as unknown as string[]).map((item, index) => <button type="button" key={item} onClick={() => setLegFinish(index)} className={legFinish === index ? "active" : ""}>{item}</button>)}</div></div>
            </aside>
          </div>
          <div className="command-layers"><div><span className="studio-kicker"><Box size={14}/>{command.layers as string}</span><p>{furnitureConfig}</p></div><ol>{(command.layerItems as unknown as string[]).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<i></i></li>)}</ol></div>
        </section>

        <section className="material-observatory">
          <div className="augmentation-head"><div><span className="studio-kicker"><Sparkles size={14}/>{command.observatory as string}</span><h3>{command.observatory as string}</h3></div><p>{command.observeText as string}</p></div>
          <div className="material-study-grid">{materialStudies.map((study, index) => <button type="button" key={study.id} onClick={() => selectMaterialStudy(index)} className={`material-study ${activeStudy === index ? "active" : ""}`}><i className={`material-swatch ${study.className}`}></i><b>{study.title}</b><small>{String(index + 1).padStart(2, "0")} / MATERIAL SIGNAL</small></button>)}</div>
          <div className="material-reading"><i></i><span>{(command.materialNotes as string[])[activeStudy]}</span></div>
          <div className="finish-compass"><span className="studio-kicker"><Layers3 size={14}/>{command.finish as string}</span><div>{(command.finishes as string[]).map((item, index) => <button type="button" key={item} onClick={() => selectFinishStudy(index)} className={`finish-study ${legFinish === index ? "active" : ""}`}><i className={`finish-swatch finish-${index}`}></i><b>{item}</b><small>{finishSignals[index]}</small></button>)}</div></div>
        </section>

        <section className="project-dossier">
          <div className="dossier-head"><div><span className="studio-kicker"><Clipboard size={14}/>{command.dossier as string}</span><h3>{command.dossier as string}</h3></div><div><p>{command.dossierText as string}</p><div className="dossier-actions"><button type="button" onClick={copyDossier}><Clipboard size={14}/>{command.copy as string}</button><button type="button" onClick={saveCurrentDraft}><Bookmark size={14}/>{savedT.save}</button><a href={dossierHref} target="_blank" rel="noreferrer"><MessageCircle size={14}/>{command.share as string}</a></div></div></div>
          <div className="dossier-grid"><div><span>{command.dimensions as string}</span><b>{modelWidth} × {modelDepth} {command.unit as string}</b></div><div><span>{command.material as string}</span><b>{material || materialStudies[activeStudy].title}</b></div><div><span>{command.finish as string}</span><b>{(command.finishes as string[])[legFinish]}</b></div><div><span>{command.comfort as string}</span><b>{comfort} / 10</b></div><div><span>{command.contactDossier as string}</span><b>{service}</b></div><div><span>{command.layers as string}</span><b>{exploded ? command.exploded as string : command.assembled as string}</b></div></div>
          <div className="saved-studies"><div className="saved-studies-head"><span>{savedT.savedDesigns}</span><small>{savedDrafts.length}/6</small></div>{savedDrafts.length ? <div className="saved-study-list">{savedDrafts.map((draft) => <article key={draft.id}><div><b>{draft.brief || `${draft.modelWidth} × ${draft.modelDepth} ${command.unit as string}`}</b><small>{new Date(draft.createdAt).toLocaleDateString(locale === "ar" ? "ar-TN" : locale === "fr" ? "fr-TN" : "en-TN")}</small></div><div><button type="button" onClick={() => restoreDraft(draft)}>{savedT.restore}</button><button type="button" className="remove-draft" onClick={() => removeDraft(draft.id)} aria-label={savedT.remove}><Trash2 size={14}/></button></div></article>)}</div> : <p className="saved-empty">{savedT.noSaved}</p>}</div>
        </section>

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

        <section className="order-panel"><div className="order-intro"><span className="studio-kicker"><Send size={14}/>{t.orderBadge}</span><h2>{t.orderTitle}</h2><p>{t.orderText}</p><div className="studio-social-signals"><small>{socialT.title}</small><div><button type="button" onClick={() => openSocial("instagram")}><AtSign size={14}/>{socialT.instagram}</button><button type="button" onClick={() => openSocial("facebook")}><b>f</b>{socialT.facebook}</button></div></div></div>{orderSent ? <div className="order-success"><span><Check size={25}/></span><div><h3>{t.success}</h3><a href={shareOrderHref} target="_blank" rel="noreferrer" className="order-share"><MessageCircle size={16}/>{t.shareWhatsApp}</a></div></div> : <form onSubmit={submitOrder} className="order-form"><label><span>{t.name}</span><input value={customer.fullName} onChange={event => setCustomer({ ...customer, fullName: event.target.value })} required /></label><label><span>{t.phone}</span><input value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} required inputMode="tel" /></label><label><span>{t.email}</span><input value={customer.email} onChange={event => setCustomer({ ...customer, email: event.target.value })} type="email" /></label><label><span>{t.contact}</span><select value={customer.preferredContact} onChange={event => setCustomer({ ...customer, preferredContact: event.target.value as "phone" | "whatsapp" | "email" })}><option value="whatsapp">{t.contactWhatsApp}</option><option value="phone">{t.contactPhone}</option><option value="email">{t.contactEmail}</option></select></label><button className="order-submit" type="submit" disabled={createOrder.isPending}>{createOrder.isPending ? t.sending : <>{t.submit}<ArrowUpRight size={17}/></>}</button></form>}</section>
      </main>
    </div>
  );
}
