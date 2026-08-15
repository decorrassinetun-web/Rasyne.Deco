import DashboardLayout from "@/components/DashboardLayout";
import { Locale, localeNames, useLocale } from "@/lib/locale";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ClipboardList, Home, Languages, LoaderCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const statuses = ["received", "reviewing", "quoted", "accepted", "completed"] as const;

const copy = {
  en: {
    atelier: "Rasyne Atelier", requests: "Project requests", viewSite: "View Rasyne Deco", back: "Back to Rasyne Deco", desk: "Atelier desk", title: "Project requests", intro: "Customer briefs submitted through the Rasyne Deco Design Studio.", refresh: "Refresh", loading: "Loading requests…", empty: "No requests received yet. New Design Studio orders will appear here.", status: "Status", inbox: "Contact inbox", messages: "Messages to the atelier", loadingMessages: "Loading messages…", noMessages: "No contact messages received yet.", updated: "Order status updated", error: "Unable to update the order.", service: { reupholstery: "Reupholstery", living_room: "Living room", car_interior: "Car interior", furniture_redesign: "Furniture redesign", carpeting: "Carpet / covering", other: "Other" }, statuses: { received: "Received", reviewing: "Reviewing", quoted: "Quoted", accepted: "Accepted", completed: "Completed" }, contact: { phone: "Phone", whatsapp: "WhatsApp", email: "Email" },
  },
  fr: {
    atelier: "Atelier Rasyne", requests: "Demandes de projets", viewSite: "Voir Rasyne Deco", back: "Retour à Rasyne Deco", desk: "Bureau de l’atelier", title: "Demandes de projets", intro: "Demandes clients reçues via le Design Studio de Rasyne Deco.", refresh: "Actualiser", loading: "Chargement des demandes…", empty: "Aucune demande pour le moment. Les demandes du Design Studio apparaîtront ici.", status: "Statut", inbox: "Boîte de réception", messages: "Messages à l’atelier", loadingMessages: "Chargement des messages…", noMessages: "Aucun message de contact pour le moment.", updated: "Statut de la demande mis à jour", error: "Impossible de mettre à jour la demande.", service: { reupholstery: "Tapisserie", living_room: "Salon", car_interior: "Intérieur automobile", furniture_redesign: "Redesign mobilier", carpeting: "Tapis / revêtement", other: "Autre" }, statuses: { received: "Reçue", reviewing: "En cours d’étude", quoted: "Devis envoyé", accepted: "Acceptée", completed: "Terminée" }, contact: { phone: "Téléphone", whatsapp: "WhatsApp", email: "E-mail" },
  },
  ar: {
    atelier: "ورشة Rasyne", requests: "طلبات المشاريع", viewSite: "عرض Rasyne Deco", back: "العودة إلى Rasyne Deco", desk: "مكتب الورشة", title: "طلبات المشاريع", intro: "ملخصات العملاء المرسلة عبر استوديو التصميم لدى Rasyne Deco.", refresh: "تحديث", loading: "جارٍ تحميل الطلبات…", empty: "لا توجد طلبات بعد. ستظهر طلبات استوديو التصميم هنا.", status: "الحالة", inbox: "صندوق الرسائل", messages: "رسائل إلى الورشة", loadingMessages: "جارٍ تحميل الرسائل…", noMessages: "لا توجد رسائل تواصل بعد.", updated: "تم تحديث حالة الطلب", error: "تعذّر تحديث الطلب.", service: { reupholstery: "تنجيد", living_room: "صالون", car_interior: "داخل السيارة", furniture_redesign: "إعادة تصميم الأثاث", carpeting: "سجاد / كساء", other: "أخرى" }, statuses: { received: "وصل", reviewing: "قيد المراجعة", quoted: "تم إرسال العرض", accepted: "مقبول", completed: "مكتمل" }, contact: { phone: "الهاتف", whatsapp: "واتساب", email: "البريد الإلكتروني" },
  },
} satisfies Record<Locale, Record<string, unknown>>;

export default function OwnerOrders() {
  const { locale, setLocale } = useLocale();
  const t = copy[locale];
  const orders = trpc.orders.list.useQuery();
  const contacts = trpc.contact.list.useQuery();
  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => { orders.refetch(); toast.success(t.updated); },
    onError: () => toast.error(t.error),
  });
  const dateLocale = locale === "ar" ? "ar-TN" : locale === "fr" ? "fr-FR" : "en-GB";

  return (
    <DashboardLayout brandLabel={t.atelier as string} navigation={[{ icon: ClipboardList, label: t.requests as string, path: "/atelier" }, { icon: Home, label: t.viewSite as string, path: "/" }]}>
      <div className="owner-orders" dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className="owner-tools"><a href="/" className="owner-back"><ArrowLeft size={16}/> {t.back as string}</a><div className="locale-switcher owner-locale"><Languages size={14}/>{(["en", "fr", "ar"] as Locale[]).map(item => <button key={item} onClick={() => setLocale(item)} className={locale === item ? "active" : ""}>{localeNames[item]}</button>)}</div></div>
        <div className="owner-header"><div><span className="owner-kicker"><ClipboardList size={15}/> {t.desk as string}</span><h1>{t.title as string}</h1><p>{t.intro as string}</p></div><button onClick={() => { orders.refetch(); contacts.refetch(); }} className="owner-refresh"><RefreshCw size={16}/> {t.refresh as string}</button></div>
        {orders.isLoading ? <div className="owner-loading"><LoaderCircle className="spin"/> {t.loading as string}</div> : orders.error ? <div className="owner-error">{orders.error.message}</div> : <div className="orders-list">{orders.data?.length ? orders.data.map(order => <article className="owner-order" key={order.id}><div className="order-thumb">{order.conceptUrl || order.referenceUrl ? <img src={order.conceptUrl || order.referenceUrl || ""} alt="Project visual" /> : <ClipboardList size={22}/>}</div><div className="order-main"><div className="order-name-line"><h2>{order.fullName}</h2><span className={`status status-${order.status}`}>{(t.statuses as Record<string, string>)[order.status]}</span></div><p className="order-meta">{(t.service as Record<string, string>)[order.service]} · {(t.contact as Record<string, string>)[order.preferredContact]} · {new Date(order.createdAt).toLocaleDateString(dateLocale)}</p><p className="order-brief">{order.brief}</p><div className="order-contact"><span>{order.phone}</span>{order.email && <span>{order.email}</span>}{order.style && <span>{order.style}</span>}{order.material && <span>{order.material}</span>}</div></div><label className="order-status-control"><span>{t.status as string}</span><select value={order.status} onChange={event => updateStatus.mutate({ id: order.id, status: event.target.value as typeof statuses[number] })} disabled={updateStatus.isPending}>{statuses.map(status => <option value={status} key={status}>{(t.statuses as Record<string, string>)[status]}</option>)}</select></label></article>) : <div className="owner-empty">{t.empty as string}</div>}</div>}
        <section className="contact-inbox"><span className="owner-kicker">{t.inbox as string}</span><h2>{t.messages as string}</h2>{contacts.isLoading ? <p>{t.loadingMessages as string}</p> : contacts.data?.length ? <div className="contact-message-list">{contacts.data.map(message => <article key={message.id}><div><b>{message.fullName}</b><span>{message.contact} · {new Date(message.createdAt).toLocaleDateString(dateLocale)}</span></div><p>{message.message}</p></article>)}</div> : <p>{t.noMessages as string}</p>}</section>
      </div>
    </DashboardLayout>
  );
}
