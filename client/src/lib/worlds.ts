import type { Locale } from "./locale";
import { furnitureCatalog, type WorldSnapshot } from "@/game/WorldState";

const labels = {
  en: { room: "Rasyne Worlds interior composition", material: "surface", finish: "finish", placed: "placed" },
  fr: { room: "composition intérieure Rasyne Worlds", material: "matière", finish: "finition", placed: "placé" },
  ar: { room: "تكوين داخلي من Rasyne Worlds", material: "الخامة", finish: "التشطيب", placed: "تم وضعه" },
} as const;

const names = {
  sofa: { en: "modular sofa", fr: "canapé modulaire", ar: "كنبة معيارية" },
  chair: { en: "lounge chair", fr: "fauteuil lounge", ar: "كرسي استرخاء" },
  table: { en: "coffee table", fr: "table basse", ar: "طاولة قهوة" },
  lamp: { en: "floor lamp", fr: "lampadaire", ar: "مصباح أرضي" },
  ottoman: { en: "ottoman", fr: "ottoman", ar: "مسند" },
} as const;

export function buildWorldBrief(snapshot: WorldSnapshot, locale: Locale) {
  const t = labels[locale];
  const pieces = snapshot.placements.filter(Boolean).map((id) => names[id as keyof typeof names][locale]);
  const placementSummary = pieces.length ? pieces.join(", ") : furnitureCatalog.map((item) => names[item.id][locale]).slice(0, 1).join("");
  return `${t.room}: ${placementSummary} ${t.placed}. ${t.material}: ${snapshot.surface}. ${t.finish}: ${snapshot.finish}. Level: ${snapshot.level}.`;
}

export function buildWorldStudioHref(snapshot: WorldSnapshot, locale: Locale) {
  const params = new URLSearchParams({ brief: buildWorldBrief(snapshot, locale), style: "quiet luxury / Rasyne Worlds", material: snapshot.surface });
  return `/studio?${params.toString()}`;
}
