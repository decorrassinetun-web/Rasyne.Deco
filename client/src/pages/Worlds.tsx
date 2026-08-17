import GameCanvas from "@/components/GameCanvas";
import { getWhatsAppUrl } from "@/lib/contact";
import { buildWorldBrief, buildWorldStudioHref } from "@/lib/worlds";
import { useLocale, localeNames, type Locale } from "@/lib/locale";
import { furnitureCatalog, initialWorldSnapshot, type FurnitureId, type LegFinish, type SurfaceMaterial, type WorldSnapshot } from "@/game/WorldState";
import type { GameHandle } from "@/game/scene";
import { ArrowLeft, ArrowUpRight, Check, Home, Layers3, MessageCircle, Orbit, Palette, Sparkles, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./worlds.css";

const copy = {
  en: { eyebrow: "Rasyne Worlds / 01", title: "Compose a room. See its next horizon.", text: "Place five Rasyne pieces inside a live spatial study, then carry your composition directly into the Design Studio.", home: "Home", studio: "Design Studio", mission: "Spatial study", starter: "First room", skyline: "Skyline suite", unlock: "Place three pieces and the skyline view enters the study.", unlocked: "Skyline view is now part of the study", hint: "Choose a piece, then select a glowing placement tile.", inventory: "Atelier inventory", surface: "Surface", finish: "Finish", shareStudio: "Take this to Studio", shareWhatsApp: "Share with atelier", reset: "Reset room", demo: "Compose view", placed: "pieces placed", selected: "Selected", level: "Act", atelier: "A spatial study from the atelier — every real project is refined with Rasyne Deco.", sofa: "Modular sofa", chair: "Lounge chair", table: "Coffee table", lamp: "Floor lamp", ottoman: "Ottoman", boucle: "Ivory bouclé", leather: "Cognac leather", velvet: "Terracotta velvet", walnut: "Walnut", brass: "Brushed brass", espresso: "Espresso" },
  fr: { eyebrow: "Rasyne Worlds / 01", title: "Composez une pièce. Voyez son prochain horizon.", text: "Placez cinq pièces Rasyne dans une étude spatiale vivante, puis emportez votre composition directement dans le Design Studio.", home: "Accueil", studio: "Design Studio", mission: "Étude spatiale", starter: "Première pièce", skyline: "Suite skyline", unlock: "Placez trois pièces et la vue skyline entre dans l’étude.", unlocked: "La vue skyline est désormais dans l’étude", hint: "Choisissez une pièce puis sélectionnez un emplacement lumineux.", inventory: "Inventaire atelier", surface: "Surface", finish: "Finition", shareStudio: "Passer au Studio", shareWhatsApp: "Partager avec l’atelier", reset: "Réinitialiser", demo: "Composer la vue", placed: "pièces placées", selected: "Sélection", level: "Acte", atelier: "Une étude spatiale de l’atelier — chaque projet réel est affiné avec Rasyne Deco.", sofa: "Canapé modulaire", chair: "Fauteuil lounge", table: "Table basse", lamp: "Lampadaire", ottoman: "Ottoman", boucle: "Bouclé ivoire", leather: "Cuir cognac", velvet: "Velours terracotta", walnut: "Noyer", brass: "Laiton brossé", espresso: "Espresso" },
  ar: { eyebrow: "Rasyne Worlds / 01", title: "صمّم الغرفة. واكتشف أفقها التالي.", text: "ضع خمس قطع من Rasyne داخل دراسة مكانية حية، ثم انقل تكوينك مباشرة إلى استوديو التصميم.", home: "الرئيسية", studio: "استوديو التصميم", mission: "دراسة مكانية", starter: "الغرفة الأولى", skyline: "جناح الأفق", unlock: "ضع ثلاث قطع لتدخل رؤية الأفق في الدراسة.", unlocked: "أصبحت رؤية الأفق جزءاً من الدراسة", hint: "اختر قطعة ثم حدد مساحة وضع مضيئة.", inventory: "مخزون الورشة", surface: "الخامة", finish: "التشطيب", shareStudio: "انتقل إلى الاستوديو", shareWhatsApp: "شارك مع الورشة", reset: "إعادة الغرفة", demo: "كوّن المشهد", placed: "قطع موضوعة", selected: "المختار", level: "فصل", atelier: "دراسة مكانية من الورشة — وكل مشروع حقيقي يُصقل مع Rasyne Deco.", sofa: "كنبة معيارية", chair: "كرسي استرخاء", table: "طاولة قهوة", lamp: "مصباح أرضي", ottoman: "مسند", boucle: "بوكليه عاجي", leather: "جلد كونياك", velvet: "مخمل تيراكوتا", walnut: "جوز", brass: "نحاس مصقول", espresso: "إسبريسو" },
} as const;

const pieceIcons: Record<FurnitureId, string> = { sofa: "01", chair: "02", table: "03", lamp: "04", ottoman: "05" };
const materials: SurfaceMaterial[] = ["boucle", "leather", "velvet"];
const finishes: LegFinish[] = ["walnut", "brass", "espresso"];

export default function Worlds() {
  const { locale, setLocale } = useLocale();
  const t = copy[locale];
  const game = useRef<GameHandle | null>(null);
  const [snapshot, setSnapshot] = useState<WorldSnapshot>(initialWorldSnapshot);
  const [selected, setSelected] = useState<FurnitureId>("sofa");
  const [surface, setSurface] = useState<SurfaceMaterial>("boucle");
  const [finish, setFinish] = useState<LegFinish>("walnut");
  const placed = snapshot.placements.filter(Boolean).length;
  const brief = buildWorldBrief(snapshot, locale);
  const studioHref = buildWorldStudioHref(snapshot, locale);

  const selectPiece = (id: FurnitureId) => { setSelected(id); game.current?.selectFurniture(id); };
  const chooseSurface = (next: SurfaceMaterial) => { setSurface(next); game.current?.setVisualStyle(next, finish); };
  const chooseFinish = (next: LegFinish) => { setFinish(next); game.current?.setVisualStyle(surface, next); };

  useEffect(() => {
    const id = window.setTimeout(() => game.current?.selectFurniture(selected), 0);
    return () => window.clearTimeout(id);
  }, [selected]);

  const shareToStudio = () => {
    window.sessionStorage.setItem("rasyne-worlds-brief", brief);
  };

  return <div className="worlds-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
    <div className="worlds-stage"><GameCanvas onReady={(handle) => { game.current = handle; handle.selectFurniture(selected); handle.setVisualStyle(surface, finish); }} onState={setSnapshot} />
      <header className="worlds-topbar"><a href="/" className="worlds-brand"><span>R</span><b>Rasyne<br />Worlds</b></a><nav><a href="/"><Home size={14}/>{t.home}</a><a href="/studio"><Sparkles size={14}/>{t.studio}</a></nav><div className="worlds-locale">{(["en", "fr", "ar"] as Locale[]).map((item) => <button key={item} onClick={() => setLocale(item)} className={item === locale ? "active" : ""}>{localeNames[item]}</button>)}</div></header>
      <section className="worlds-intro"><p>{t.eyebrow}</p><h1>{t.title}</h1><span>{t.text}</span></section>
      <aside className="worlds-mission"><div className="worlds-mission-icon"><Trophy size={17}/></div><div><small>{t.mission}</small><strong>{snapshot.level === "skyline" ? t.skyline : t.starter}</strong><p>{snapshot.level === "skyline" ? t.unlocked : t.unlock}</p></div><div className="worlds-progress"><b>{placed}/5</b><span>{t.placed}</span></div></aside>
      <aside className="worlds-controls"><div className="worlds-control-heading"><Palette size={15}/><span>{t.surface}</span></div><div className="worlds-swatches">{materials.map((item) => <button key={item} className={`worlds-swatch ${item} ${surface === item ? "active" : ""}`} onClick={() => chooseSurface(item)} aria-label={t[item]}><i></i><span>{t[item]}</span></button>)}</div><div className="worlds-control-heading finish"><Layers3 size={15}/><span>{t.finish}</span></div><div className="worlds-finishes">{finishes.map((item) => <button key={item} className={finish === item ? "active" : ""} onClick={() => chooseFinish(item)}><i className={item}></i>{t[item]}</button>)}</div></aside>
      <div className="worlds-atelier-label"><Orbit size={14}/><span>{t.atelier}</span></div>
      <div className="worlds-hint"><Check size={15}/>{t.hint}</div>
      <div className="worlds-inventory"><div className="worlds-inventory-heading"><span>{t.inventory}</span><small>{t.selected}: {t[selected]}</small></div><div className="worlds-piece-row">{furnitureCatalog.map((piece) => <button key={piece.id} onClick={() => selectPiece(piece.id)} className={`worlds-piece ${selected === piece.id ? "active" : ""} ${snapshot.placements.includes(piece.id) ? "placed" : ""}`}><b>{pieceIcons[piece.id]}</b><span>{t[piece.id]}</span>{snapshot.placements.includes(piece.id) && <i><Check size={11}/></i>}</button>)}</div></div>
      <div className="worlds-actions"><button onClick={() => { game.current?.reset(); setSelected("sofa"); setSurface("boucle"); setFinish("walnut"); }} className="worlds-reset"><ArrowLeft size={15}/>{t.reset}</button><button onClick={() => game.current?.demo()} className="worlds-demo">{t.demo}<Orbit size={15}/></button><a href={getWhatsAppUrl(`Hello Rasyne Deco, ${brief}`)} target="_blank" rel="noreferrer" className="worlds-whatsapp"><MessageCircle size={16}/>{t.shareWhatsApp}</a><a href={studioHref} onClick={shareToStudio} className="worlds-studio-link">{t.shareStudio}<ArrowUpRight size={16}/></a></div>
      <div className="worlds-level-chip"><small>{t.level}</small><strong>{snapshot.level === "skyline" ? "02 / SKYLINE" : "01 / STARTER"}</strong></div>
    </div>
  </div>;
}
