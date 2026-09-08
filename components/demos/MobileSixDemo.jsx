"use client";

import { useState, useMemo } from "react";
import {
  Users, CheckSquare, Clock, TrendingUp,
  Plus, Edit2, Trash2, UserPlus, X, Calendar, AlertCircle,
  LogOut, Menu, LayoutDashboard, ListChecks, ChevronRight,
  Bell, Check, Activity, ArrowRight,
} from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ---------- Design tokens (identité Mobile Six) ---------- */
const COLOR = {
  ink: "#0D151D",
  panel: "#131F29",
  panelAlt: "#182633",
  glass: "rgba(24,38,51,0.55)",
  line: "#233442",
  text: "#E9EEF2",
  muted: "#8496A3",
  signal: "#FF7A33",
  cyan: "#2FD3C7",
  green: "#3ECF8E",
  amber: "#F2B134",
  red: "#F0654F",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
.msix2 * { font-family: 'Inter', sans-serif; }
.msix2 .display { font-family: 'Space Grotesk', sans-serif; }
.msix2 .mono { font-family: 'JetBrains Mono', monospace; }
.msix2 ::selection { background: ${COLOR.signal}; color: ${COLOR.ink}; }
@keyframes barPulse { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
.msix2 .signalbar { animation: barPulse 1.6s ease-in-out infinite; transform-origin: bottom; }
@keyframes toastIn { from { opacity:0; transform: translateY(-8px);} to { opacity:1; transform: translateY(0);} }
.msix2 .toast-in { animation: toastIn 0.25s ease-out; }
`;

/* ---------- Mock data ---------- */
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };
const daysFromNow = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

const INITIAL_WORKERS = [
  { id: "w1", full_name: "Amina Belinga", email: "a.belinga@mobilesix.cm", created_at: daysAgo(210) },
  { id: "w2", full_name: "Junior Ndongo", email: "j.ndongo@mobilesix.cm", created_at: daysAgo(140) },
  { id: "w3", full_name: "Carine Fotso", email: "c.fotso@mobilesix.cm", created_at: daysAgo(95) },
  { id: "w4", full_name: "Herve Mballa", email: "h.mballa@mobilesix.cm", created_at: daysAgo(30) },
];

const INITIAL_TASKS = [
  { id: "t1", title: "Inspection station de base — Bonanjo", description: "Vérifier alimentation, antenne et lien fibre.", priority: "high", status: "in_progress", due_date: daysFromNow(1), created_at: daysAgo(1), assignedWorkerIds: ["w1"] },
  { id: "t2", title: "Déploiement fibre — Akwa business district", description: "Tirage fibre jusqu'au nouvel immeuble commercial.", priority: "high", status: "pending", due_date: daysFromNow(4), created_at: daysAgo(2), assignedWorkerIds: ["w2", "w4"] },
  { id: "t3", title: "Réclamation client — coupure réseau Bepanda", description: "Client signale une perte de connexion mobile depuis 2 jours.", priority: "high", status: "pending", due_date: daysFromNow(0), created_at: daysAgo(0), assignedWorkerIds: ["w3"] },
  { id: "t4", title: "Audit conformité enregistrement SIM", description: "Contrôle mensuel des dossiers en agence.", priority: "medium", status: "completed", due_date: daysAgo(2), created_at: daysAgo(6), assignedWorkerIds: ["w1", "w3"] },
  { id: "t5", title: "Maintenance groupe électrogène — site Ndokoti", description: "Entretien préventif trimestriel du site relais.", priority: "low", status: "pending", due_date: daysFromNow(9), created_at: daysAgo(3), assignedWorkerIds: [] },
  { id: "t6", title: "Mise à niveau routeur — agence Douala centre", description: "Remplacement du routeur principal, fin de vie.", priority: "medium", status: "completed", due_date: daysAgo(4), created_at: daysAgo(5), assignedWorkerIds: ["w2"] },
  { id: "t7", title: "Formation techniciens — nouveau protocole 5G", description: "Session interne sur le déploiement des nouveaux sites 5G.", priority: "low", status: "in_progress", due_date: daysFromNow(6), created_at: daysAgo(1), assignedWorkerIds: ["w4", "w1"] },
];

const INITIAL_ACTIVITY = [
  { id: "a1", action: "task_completed", user: "Amina Belinga", detail: "Audit conformité enregistrement SIM", created_at: daysAgo(2) },
  { id: "a2", action: "task_assigned", user: "Administrateur", detail: "Déploiement fibre → Junior Ndongo, Herve Mballa", created_at: daysAgo(2) },
  { id: "a3", action: "task_created", user: "Administrateur", detail: "Formation techniciens — nouveau protocole 5G", created_at: daysAgo(1) },
  { id: "a4", action: "task_completed", user: "Junior Ndongo", detail: "Mise à niveau routeur — agence Douala centre", created_at: daysAgo(4) },
];

const INITIAL_NOTIFS = [
  { id: "n1", title: "Tâche terminée", message: "Amina Belinga a terminé « Audit conformité SIM »", type: "success", read: false, created_at: daysAgo(2) },
  { id: "n2", title: "Échéance proche", message: "« Réclamation client — Bepanda » arrive à échéance aujourd'hui", type: "warning", read: false, created_at: daysAgo(0) },
  { id: "n3", title: "Nouvelle tâche assignée", message: "Vous avez été assigné à « Inspection station de base »", type: "info", read: true, created_at: daysAgo(1) },
];

const PRIORITY_META = {
  low: { label: "Faible", color: COLOR.muted },
  medium: { label: "Moyenne", color: COLOR.cyan },
  high: { label: "Haute", color: COLOR.amber },
};
const STATUS_META = {
  pending: { label: "En attente", color: COLOR.amber },
  in_progress: { label: "En cours", color: COLOR.cyan },
  completed: { label: "Terminée", color: COLOR.green },
};
const ACTION_META = {
  task_created: { label: "Tâche créée", icon: Plus, color: COLOR.cyan },
  task_assigned: { label: "Tâche assignée", icon: UserPlus, color: COLOR.amber },
  task_completed: { label: "Tâche terminée", icon: Check, color: COLOR.green },
  task_deleted: { label: "Tâche supprimée", icon: Trash2, color: COLOR.red },
};

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "Sans échéance");
const fmtDateTime = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/* ---------- Atoms ---------- */
function Pill({ color, children }) {
  return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium" style={{ background: `${color}22`, color }}>{children}</span>;
}

function SignalMark({ size = 40 }) {
  const bars = [0.35, 0.55, 0.8, 1];
  return (
    <div className="flex items-end gap-1" style={{ height: size }}>
      {bars.map((h, i) => (
        <div key={i} className="signalbar rounded-sm" style={{ width: size * 0.16, height: `${h * 100}%`, background: COLOR.signal, animationDelay: `${i * 0.15}s`, opacity: 0.55 + i * 0.15 }} />
      ))}
    </div>
  );
}

function Avatar({ name, size = 32 }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center font-semibold flex-shrink-0" style={{ width: size, height: size, background: `${COLOR.signal}22`, color: COLOR.signal, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

/* ---------- Notification bell ---------- */
function NotificationBell({ notifications, setNotifications }) {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative p-2 rounded-lg" style={{ background: COLOR.panelAlt, border: `1px solid ${COLOR.line}` }}>
        <Bell size={18} style={{ color: COLOR.text }} />
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: COLOR.red, color: "#fff" }}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 rounded-xl overflow-hidden z-40 toast-in" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}`, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
            <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
              <h3 className="text-sm font-semibold" style={{ color: COLOR.text }}>Notifications</h3>
              {unread > 0 && (
                <button onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))} className="text-xs flex items-center gap-1" style={{ color: COLOR.cyan }}>
                  <Check size={12} /> Tout marquer lu
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm" style={{ color: COLOR.muted }}>Aucune notification</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} onClick={() => setNotifications(notifications.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                    className="p-3.5 cursor-pointer" style={{ borderBottom: `1px solid ${COLOR.line}`, background: n.read ? "transparent" : `${COLOR.signal}0d` }}>
                    <div className="flex items-start gap-2">
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: COLOR.signal }} />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium" style={{ color: COLOR.text }}>{n.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: COLOR.muted }}>{n.message}</p>
                        <p className="text-xs mt-1" style={{ color: COLOR.muted }}>{fmtDateTime(n.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Landing ---------- */
function Landing({ onSignIn, tasks, workers }) {
  const completed = tasks.filter((t) => t.status === "completed").length;
  const posts = [
    { title: "Extension de la couverture 5G à Douala", author: "Équipe réseau", date: daysAgo(3), content: "Trois nouveaux sites relais mis en service dans les zones d'Akwa et Bonanjo, renforçant la capacité mobile du centre-ville." },
    { title: "Nouveau protocole d'intervention terrain", author: "Direction technique", date: daysAgo(8), content: "Mise à jour des procédures de sécurité pour les interventions sur les sites relais en hauteur." },
  ];

  return (
    <div className="min-h-full relative overflow-hidden" style={{ background: `radial-gradient(circle at 20% 0%, ${COLOR.panelAlt}, ${COLOR.ink} 60%)` }}>
      <header className="sticky top-0 z-20 backdrop-blur-md" style={{ background: "rgba(13,21,29,0.75)", borderBottom: `1px solid ${COLOR.line}` }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SignalMark size={26} />
            <div>
              <p className="display font-semibold text-sm" style={{ color: COLOR.text }}>Mobile Six SA</p>
              <p className="text-xs" style={{ color: COLOR.muted }}>Télécommunications & innovation numérique</p>
            </div>
          </div>
          <button onClick={onSignIn} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: COLOR.signal, color: COLOR.ink }}>
            Se connecter <ArrowRight size={15} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="rounded-2xl p-12 text-center mb-14" style={{ background: COLOR.glass, border: `1px solid ${COLOR.line}` }}>
          <h1 className="display text-4xl md:text-5xl font-semibold mb-4" style={{ color: COLOR.text }}>
            Gestion des interventions terrain, à l&apos;échelle de l&apos;entreprise
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: COLOR.muted }}>
            Suivi des tâches, des techniciens et des performances réseau sur une seule plateforme.
          </p>
          <button onClick={onSignIn} className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold" style={{ background: COLOR.signal, color: COLOR.ink }}>
            Accéder au tableau de bord <ArrowRight size={16} />
          </button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {[
            { label: "Tâches totales", value: tasks.length, icon: ListChecks },
            { label: "Techniciens", value: workers.length, icon: Users },
            { label: "Tâches terminées", value: completed, icon: CheckSquare },
          ].map((s) => (
            <div key={s.label} className="p-6 rounded-xl text-center" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
              <s.icon size={20} className="mx-auto mb-3" style={{ color: COLOR.signal }} />
              <p className="mono text-3xl font-semibold" style={{ color: COLOR.text }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: COLOR.muted }}>{s.label}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="display text-xl font-semibold mb-6" style={{ color: COLOR.text }}>Actualités récentes</h2>
          <div className="space-y-4">
            {posts.map((p) => (
              <div key={p.title} className="p-5 rounded-xl" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: COLOR.text }}>{p.title}</h3>
                <p className="text-xs mb-2.5" style={{ color: COLOR.muted }}>{p.author} · {fmtDate(p.date)}</p>
                <p className="text-sm" style={{ color: COLOR.muted }}>{p.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Auth ---------- */
function AuthScreen({ onEnter }) {
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const inputStyle = { background: COLOR.panelAlt, border: `1px solid ${COLOR.line}`, color: COLOR.text };

  return (
    <div className="min-h-full flex items-center justify-center p-6" style={{ background: COLOR.ink }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <SignalMark size={26} />
          <span className="display text-lg font-semibold" style={{ color: COLOR.text }}>Mobile Six</span>
        </div>
        <div className="p-6 rounded-xl space-y-4" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Nom complet</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Paul Etoundi" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Adresse e-mail</label>
            <input placeholder="vous@mobilesix.cm" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Mot de passe</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Se connecter en tant que</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: "admin", label: "Administrateur" }, { id: "worker", label: "Technicien" }].map((r) => (
                <button key={r.id} onClick={() => setRole(r.id)} className="py-2 rounded-lg text-sm font-medium"
                  style={{ background: role === r.id ? `${COLOR.signal}1f` : COLOR.panelAlt, border: `1px solid ${role === r.id ? COLOR.signal : COLOR.line}`, color: role === r.id ? COLOR.signal : COLOR.muted }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => onEnter(role, name)} className="w-full py-2.5 rounded-lg text-sm font-semibold mt-2" style={{ background: COLOR.signal, color: COLOR.ink }}>
            Se connecter
          </button>
          <p className="text-xs text-center pt-1" style={{ color: COLOR.muted }}>Démo interactive. Aucune donnée réelle n&apos;est utilisée.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shell ---------- */
function Shell({ role, userName, view, setView, sidebarOpen, setSidebarOpen, onLogout, notifications, setNotifications, children }) {
  const nav = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, show: true },
    { id: "tasks", label: "Tâches", icon: ListChecks, show: role === "admin" },
    { id: "workers", label: "Techniciens", icon: Users, show: role === "admin" },
    { id: "activity", label: "Journal d'activité", icon: Activity, show: role === "admin" },
  ];
  return (
    <div className="min-h-full flex" style={{ background: COLOR.ink }}>
      <aside className={`fixed md:static z-30 inset-y-0 left-0 w-64 flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} style={{ background: COLOR.panel, borderRight: `1px solid ${COLOR.line}` }}>
        <div className="flex items-center gap-3 p-5" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
          <SignalMark size={22} />
          <span className="display font-semibold" style={{ color: COLOR.text }}>Mobile Six</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.filter((n) => n.show).map((n) => {
            const Icon = n.icon; const active = view === n.id;
            return (
              <button key={n.id} onClick={() => { setView(n.id); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                style={{ background: active ? COLOR.panelAlt : "transparent", color: active ? COLOR.signal : COLOR.muted }}>
                <Icon size={17} /> {n.label} {active && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
        <div className="p-3" style={{ borderTop: `1px solid ${COLOR.line}` }}>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: COLOR.muted }}>
            <LogOut size={17} /> Déconnexion
          </button>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)} style={{ color: COLOR.text }}><Menu size={22} /></button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <NotificationBell notifications={notifications} setNotifications={setNotifications} />
            <div className="flex items-center gap-2.5">
              <Avatar name={userName || (role === "admin" ? "Admin" : "Tech")} size={32} />
              <div className="hidden sm:block">
                <p className="text-sm font-medium" style={{ color: COLOR.text }}>{userName || (role === "admin" ? "Administrateur" : "Technicien")}</p>
                <p className="text-xs" style={{ color: COLOR.muted }}>{role === "admin" ? "Administrateur" : "Technicien terrain"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

function StatStrip({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="p-5 rounded-xl" style={{ background: COLOR.panel, borderLeft: `3px solid ${s.color}` }}>
          <div className="flex items-center justify-between">
            <div><p className="text-xs" style={{ color: COLOR.muted }}>{s.label}</p><p className="mono text-2xl font-semibold mt-1.5" style={{ color: COLOR.text }}>{s.value}</p></div>
            <s.icon size={20} style={{ color: s.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Analytics ---------- */
function AnalyticsPanel({ tasks }) {
  const statusData = [
    { name: "En attente", value: tasks.filter((t) => t.status === "pending").length, fill: COLOR.amber },
    { name: "En cours", value: tasks.filter((t) => t.status === "in_progress").length, fill: COLOR.cyan },
    { name: "Terminées", value: tasks.filter((t) => t.status === "completed").length, fill: COLOR.green },
  ];
  const priorityData = [
    { name: "Haute", value: tasks.filter((t) => t.priority === "high").length, fill: COLOR.amber },
    { name: "Moyenne", value: tasks.filter((t) => t.priority === "medium").length, fill: COLOR.cyan },
    { name: "Faible", value: tasks.filter((t) => t.priority === "low").length, fill: COLOR.muted },
  ];
  const last7 = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) days.push(daysAgo(i));
    return days.map((d) => {
      const key = d.toISOString().split("T")[0];
      return {
        date: d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        tasks: tasks.filter((t) => new Date(t.created_at).toISOString().split("T")[0] === key).length,
      };
    });
  }, [tasks]);

  const panelStyle = { background: COLOR.panel, border: `1px solid ${COLOR.line}` };
  const axisStyle = { fontSize: 11, fill: COLOR.muted };
  const tooltipStyle = { background: COLOR.panelAlt, border: `1px solid ${COLOR.line}`, borderRadius: 8, color: COLOR.text, fontSize: 12 };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div className="p-5 rounded-xl" style={panelStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLOR.text }}>Statut des tâches</h3>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={4} dataKey="value">
                {statusData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 space-y-1.5">
          {statusData.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2" style={{ color: COLOR.muted }}><span className="w-2 h-2 rounded-full" style={{ background: s.fill }} />{s.name}</span>
              <span className="mono" style={{ color: COLOR.text }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-xl" style={panelStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLOR.text }}>Niveaux de priorité</h3>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLOR.line} vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: COLOR.line }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: COLOR.panelAlt }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {priorityData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-5 rounded-xl" style={panelStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLOR.text }}>Créations (7 derniers jours)</h3>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLOR.line} vertical={false} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={{ stroke: COLOR.line }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="tasks" stroke={COLOR.signal} strokeWidth={2} dot={{ fill: COLOR.signal, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ---------- Admin dashboard ---------- */
function AdminDashboard({ tasks, workers }) {
  const stats = [
    { label: "Techniciens", value: workers.length, icon: Users, color: COLOR.cyan },
    { label: "Tâches totales", value: tasks.length, icon: CheckSquare, color: COLOR.signal },
    { label: "Terminées", value: tasks.filter((t) => t.status === "completed").length, icon: TrendingUp, color: COLOR.green },
    { label: "En attente", value: tasks.filter((t) => t.status === "pending").length, icon: Clock, color: COLOR.amber },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-2xl font-semibold" style={{ color: COLOR.text }}>Tableau de bord</h2>
        <p className="text-sm mt-1" style={{ color: COLOR.muted }}>Vue d&apos;ensemble des opérations Mobile Six SA</p>
      </div>
      <StatStrip stats={stats} />
      <AnalyticsPanel tasks={tasks} />
    </div>
  );
}

/* ---------- Worker dashboard ---------- */
function WorkerDashboard({ tasks, workerId }) {
  const mine = tasks.filter((t) => t.assignedWorkerIds.includes(workerId));
  const active = mine.filter((t) => t.status !== "completed");
  const done = mine.filter((t) => t.status === "completed");
  const stats = [
    { label: "Mes tâches", value: mine.length, icon: CheckSquare, color: COLOR.cyan },
    { label: "En cours", value: active.length, icon: Clock, color: COLOR.amber },
    { label: "Terminées", value: done.length, icon: TrendingUp, color: COLOR.green },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-2xl font-semibold" style={{ color: COLOR.text }}>Mes tâches</h2>
        <p className="text-sm mt-1" style={{ color: COLOR.muted }}>Interventions qui vous sont assignées</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-xl" style={{ background: COLOR.panel, borderLeft: `3px solid ${s.color}` }}>
            <div className="flex items-center justify-between">
              <div><p className="text-xs" style={{ color: COLOR.muted }}>{s.label}</p><p className="mono text-2xl font-semibold mt-1.5" style={{ color: COLOR.text }}>{s.value}</p></div>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
        <div className="p-5" style={{ borderBottom: `1px solid ${COLOR.line}` }}><h3 className="text-sm font-semibold" style={{ color: COLOR.text }}>Interventions actives</h3></div>
        {active.length === 0 ? (
          <p className="p-8 text-center text-sm" style={{ color: COLOR.muted }}>Aucune tâche active pour le moment</p>
        ) : active.map((t) => (
          <div key={t.id} className="p-5 flex items-start justify-between gap-4" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h4 className="text-sm font-semibold" style={{ color: COLOR.text }}>{t.title}</h4>
                <Pill color={PRIORITY_META[t.priority].color}>{PRIORITY_META[t.priority].label}</Pill>
              </div>
              <p className="text-sm mb-2" style={{ color: COLOR.muted }}>{t.description}</p>
              <div className="flex items-center gap-3 text-xs" style={{ color: COLOR.muted }}>
                <span className="flex items-center gap-1"><Calendar size={13} /> {fmtDate(t.due_date)}</span>
                <Pill color={STATUS_META[t.status].color}>{STATUS_META[t.status].label}</Pill>
              </div>
            </div>
            {t.priority === "high" && <AlertCircle size={20} style={{ color: COLOR.red }} className="flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Admin tasks (table) ---------- */
function AdminTasksPage({ tasks, setTasks, workers, logAction }) {
  const [dialog, setDialog] = useState(null); // 'create' | 'edit' | 'assign'
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", due_date: "" });
  const [assignSel, setAssignSel] = useState([]);
  const inputStyle = { background: COLOR.panelAlt, border: `1px solid ${COLOR.line}`, color: COLOR.text };

  const openCreate = () => { setEditing(null); setForm({ title: "", description: "", priority: "medium", due_date: "" }); setDialog("create"); };
  const openEdit = (t) => { setEditing(t); setForm({ title: t.title, description: t.description, priority: t.priority, due_date: t.due_date ? new Date(t.due_date).toISOString().slice(0, 10) : "" }); setDialog("edit"); };
  const openAssign = (t) => { setEditing(t); setAssignSel(t.assignedWorkerIds); setDialog("assign"); };
  const close = () => { setDialog(null); setEditing(null); };

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editing) {
      setTasks(tasks.map((t) => (t.id === editing.id ? { ...t, ...form, due_date: form.due_date || null } : t)));
    } else {
      const nt = { id: `t${Date.now()}`, ...form, due_date: form.due_date || null, status: "pending", created_at: new Date(), assignedWorkerIds: [] };
      setTasks([nt, ...tasks]);
      logAction("task_created", "Administrateur", form.title);
    }
    close();
  };
  const removeTask = (t) => { setTasks(tasks.filter((x) => x.id !== t.id)); logAction("task_deleted", "Administrateur", t.title); };
  const submitAssign = (e) => {
    e.preventDefault();
    setTasks(tasks.map((t) => (t.id === editing.id ? { ...t, assignedWorkerIds: assignSel } : t)));
    const names = assignSel.map((id) => workers.find((w) => w.id === id)?.full_name).join(", ") || "personne";
    logAction("task_assigned", "Administrateur", `${editing.title} → ${names}`);
    close();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="display text-2xl font-semibold" style={{ color: COLOR.text }}>Gestion des tâches</h2>
          <p className="text-sm mt-1" style={{ color: COLOR.muted }}>Créer, assigner et suivre les interventions</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ background: COLOR.signal, color: COLOR.ink }}>
          <Plus size={16} /> Nouvelle tâche
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLOR.line}` }}>
              {["Tâche", "Priorité", "Statut", "Échéance", "Assignée à", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: COLOR.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} style={{ borderBottom: `1px solid ${COLOR.line}` }}>
                <td className="px-5 py-3.5">
                  <p className="font-medium" style={{ color: COLOR.text }}>{t.title}</p>
                  <p className="text-xs mt-0.5 max-w-xs truncate" style={{ color: COLOR.muted }}>{t.description}</p>
                </td>
                <td className="px-5 py-3.5"><Pill color={PRIORITY_META[t.priority].color}>{PRIORITY_META[t.priority].label}</Pill></td>
                <td className="px-5 py-3.5"><Pill color={STATUS_META[t.status].color}>{STATUS_META[t.status].label}</Pill></td>
                <td className="px-5 py-3.5" style={{ color: COLOR.muted }}>{fmtDate(t.due_date)}</td>
                <td className="px-5 py-3.5" style={{ color: COLOR.muted }}>
                  {t.assignedWorkerIds.length ? t.assignedWorkerIds.map((id) => workers.find((w) => w.id === id)?.full_name.split(" ")[0]).join(", ") : "—"}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1 justify-end">
                    <button onClick={() => openAssign(t)} className="p-1.5 rounded" style={{ color: COLOR.cyan }} title="Assigner"><UserPlus size={15} /></button>
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded" style={{ color: COLOR.muted }} title="Modifier"><Edit2 size={15} /></button>
                    <button onClick={() => removeTask(t)} className="p-1.5 rounded" style={{ color: COLOR.red }} title="Supprimer"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(dialog === "create" || dialog === "edit") && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="w-full max-w-md rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
              <h3 className="font-semibold" style={{ color: COLOR.text }}>{editing ? "Modifier la tâche" : "Nouvelle tâche"}</h3>
              <button onClick={close} style={{ color: COLOR.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={submitForm} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Titre</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Priorité</label>
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}>
                    {Object.entries(PRIORITY_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: COLOR.muted }}>Échéance</label>
                  <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 py-2.5 rounded-lg text-sm font-medium" style={{ border: `1px solid ${COLOR.line}`, color: COLOR.muted }}>Annuler</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: COLOR.signal, color: COLOR.ink }}>{editing ? "Mettre à jour" : "Créer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {dialog === "assign" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="w-full max-w-md rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: `1px solid ${COLOR.line}` }}>
              <h3 className="font-semibold" style={{ color: COLOR.text }}>Assigner des techniciens</h3>
              <button onClick={close} style={{ color: COLOR.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={submitAssign} className="p-5 space-y-4">
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {workers.map((w) => (
                  <label key={w.id} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer" style={{ background: COLOR.panelAlt }}>
                    <input type="checkbox" checked={assignSel.includes(w.id)} onChange={(e) => setAssignSel(e.target.checked ? [...assignSel, w.id] : assignSel.filter((id) => id !== w.id))} className="w-4 h-4" />
                    <div><p className="text-sm font-medium" style={{ color: COLOR.text }}>{w.full_name}</p><p className="text-xs" style={{ color: COLOR.muted }}>{w.email}</p></div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 py-2.5 rounded-lg text-sm font-medium" style={{ border: `1px solid ${COLOR.line}`, color: COLOR.muted }}>Annuler</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: COLOR.signal, color: COLOR.ink }}>Assigner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Admin workers (table) ---------- */
function AdminWorkersPage({ workers, tasks }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-2xl font-semibold" style={{ color: COLOR.text }}>Techniciens</h2>
        <p className="text-sm mt-1" style={{ color: COLOR.muted }}>Équipe terrain et charge de travail</p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLOR.line}` }}>
              {["Technicien", "E-mail", "Depuis", "Tâches", "Terminées"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: COLOR.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => {
              const assigned = tasks.filter((t) => t.assignedWorkerIds.includes(w.id));
              const done = assigned.filter((t) => t.status === "completed");
              return (
                <tr key={w.id} style={{ borderBottom: `1px solid ${COLOR.line}` }}>
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><Avatar name={w.full_name} size={30} /><span className="font-medium" style={{ color: COLOR.text }}>{w.full_name}</span></div></td>
                  <td className="px-5 py-3.5" style={{ color: COLOR.muted }}>{w.email}</td>
                  <td className="px-5 py-3.5" style={{ color: COLOR.muted }}>{fmtDate(w.created_at)}</td>
                  <td className="px-5 py-3.5 mono" style={{ color: COLOR.text }}>{assigned.length}</td>
                  <td className="px-5 py-3.5 mono" style={{ color: COLOR.green }}>{done.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Admin activity ---------- */
function AdminActivityPage({ activity }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-2xl font-semibold" style={{ color: COLOR.text }}>Journal d&apos;activité</h2>
        <p className="text-sm mt-1" style={{ color: COLOR.muted }}>Historique des actions sur la plateforme</p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: COLOR.panel, border: `1px solid ${COLOR.line}` }}>
        {activity.map((a, i) => {
          const meta = ACTION_META[a.action];
          const Icon = meta.icon;
          return (
            <div key={a.id} className="p-4 flex items-start gap-3" style={{ borderBottom: i < activity.length - 1 ? `1px solid ${COLOR.line}` : "none" }}>
              <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${meta.color}22` }}><Icon size={15} style={{ color: meta.color }} /></div>
              <div className="min-w-0">
                <p className="text-sm" style={{ color: COLOR.text }}><span className="font-medium">{a.user}</span> — {meta.label.toLowerCase()}</p>
                <p className="text-xs mt-0.5" style={{ color: COLOR.muted }}>{a.detail}</p>
                <p className="text-xs mt-1" style={{ color: COLOR.muted }}>{fmtDateTime(a.created_at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Root ---------- */
export default function MobileSixV2Demo() {
  const [stage, setStage] = useState("landing"); // landing | auth | app
  const [session, setSession] = useState(null);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [workers] = useState(INITIAL_WORKERS);
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);

  const workerId = useMemo(() => (session?.role === "worker" ? "w1" : null), [session]);

  const logAction = (action, user, detail) => {
    setActivity((prev) => [{ id: `a${Date.now()}`, action, user, detail, created_at: new Date() }, ...prev]);
    const meta = ACTION_META[action];
    setNotifications((prev) => [{ id: `n${Date.now()}`, title: meta.label, message: detail, type: "info", read: false, created_at: new Date() }, ...prev]);
  };

  const handleEnter = (role, name) => { setSession({ role, name: name.trim() }); setStage("app"); setView("dashboard"); };
  const handleLogout = () => { setSession(null); setStage("landing"); setView("dashboard"); };

  return (
    <div className="msix2 w-full h-full" style={{ minHeight: 640 }}>
      <style>{FONTS}</style>
      {stage === "landing" && <Landing onSignIn={() => setStage("auth")} tasks={tasks} workers={workers} />}
      {stage === "auth" && <AuthScreen onEnter={handleEnter} />}
      {stage === "app" && session && (
        <Shell
          role={session.role} userName={session.name} view={view} setView={setView}
          sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout}
          notifications={notifications} setNotifications={setNotifications}
        >
          {view === "dashboard" && session.role === "admin" && <AdminDashboard tasks={tasks} workers={workers} />}
          {view === "dashboard" && session.role === "worker" && <WorkerDashboard tasks={tasks} workerId={workerId} />}
          {view === "tasks" && session.role === "admin" && <AdminTasksPage tasks={tasks} setTasks={setTasks} workers={workers} logAction={logAction} />}
          {view === "workers" && session.role === "admin" && <AdminWorkersPage workers={workers} tasks={tasks} />}
          {view === "activity" && session.role === "admin" && <AdminActivityPage activity={activity} />}
        </Shell>
      )}
    </div>
  );
}
