'use client';

import { useState } from 'react';
import {
  Bus,
  MapPin,
  Route as RouteIcon,
  LogOut,
  Search,
  Activity,
  ShieldCheck,
  LayoutGrid,
  Gauge,
  Wallet,
  Navigation2,
  Circle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

// ============================================================
// 1. TYPES
// ============================================================
type RouteStatus = 'En service' | 'Retard' | 'Hors service';
type VehicleStatus = 'En route' | 'Retard' | 'Maintenance';
type Tab = 'overview' | 'routes' | 'stops' | 'vehicles';

interface Stop {
  id: number;
  name: string;
  x: number;
  y: number;
}

interface RouteItem {
  id: string;
  start: string;
  end: string;
  distance: number;
  fare: number;
  vehicle: string;
  status: RouteStatus;
}

interface Vehicle {
  id: string;
  type: 'Bus' | 'Van';
  capacity: number;
  status: VehicleStatus;
  route: string;
}

// ============================================================
// 2. DONNÉES MOCKÉES
// ============================================================
const STOPS: Stop[] = [
  { id: 1, name: 'Mvan', x: 60, y: 220 },
  { id: 2, name: 'Mfoundi', x: 180, y: 140 },
  { id: 3, name: 'Bastos', x: 320, y: 70 },
  { id: 4, name: 'Nlongkak', x: 300, y: 190 },
  { id: 5, name: 'Etoudi', x: 460, y: 60 },
  { id: 6, name: 'Ngousso', x: 480, y: 200 },
  { id: 7, name: 'Emana', x: 560, y: 130 },
];

const LINKS: [number, number][] = [
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [6, 7],
];

const ROUTES: RouteItem[] = [
  { id: 'R-01', start: 'Mvan', end: 'Bastos', distance: 8.4, fare: 300, vehicle: 'V-102', status: 'En service' },
  { id: 'R-02', start: 'Mfoundi', end: 'Ngousso', distance: 6.1, fare: 250, vehicle: 'V-107', status: 'En service' },
  { id: 'R-03', start: 'Nlongkak', end: 'Etoudi', distance: 9.7, fare: 350, vehicle: 'V-114', status: 'Retard' },
  { id: 'R-04', start: 'Bastos', end: 'Emana', distance: 11.2, fare: 400, vehicle: 'V-121', status: 'En service' },
  { id: 'R-05', start: 'Ngousso', end: 'Emana', distance: 5.3, fare: 200, vehicle: '—', status: 'Hors service' },
];

const VEHICLES: Vehicle[] = [
  { id: 'V-102', type: 'Bus', capacity: 45, status: 'En route', route: 'R-01' },
  { id: 'V-107', type: 'Van', capacity: 18, status: 'En route', route: 'R-02' },
  { id: 'V-114', type: 'Bus', capacity: 45, status: 'Retard', route: 'R-03' },
  { id: 'V-121', type: 'Bus', capacity: 45, status: 'En route', route: 'R-04' },
  { id: 'V-130', type: 'Van', capacity: 18, status: 'Maintenance', route: '—' },
];

// ============================================================
// 3. UTILITAIRES
// ============================================================
const statusColor = (status: string) => {
  if (status === 'En service' || status === 'En route') return '#1FA971';
  if (status === 'Retard') return '#E1A13D';
  return '#D9564F';
};

const StatusPill = ({ status }: { status: string }) => {
  const c = statusColor(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: c + '1A', color: c }}
    >
      <Circle size={7} fill={c} stroke="none" />
      {status}
    </span>
  );
};

// ============================================================
// 4. CARTE SCHÉMATIQUE DU RÉSEAU (SVG)
// ============================================================
const NetworkMap = ({ animated = false }: { animated?: boolean }) => {
  const findStop = (id: number) => STOPS.find((s) => s.id === id)!;
  return (
    <svg viewBox="0 0 620 280" className="w-full h-full">
      {LINKS.map(([a, b], i) => {
        const s1 = findStop(a);
        const s2 = findStop(b);
        const len = Math.hypot(s2.x - s1.x, s2.y - s1.y);
        return (
          <line
            key={i}
            x1={s1.x}
            y1={s1.y}
            x2={s2.x}
            y2={s2.y}
            stroke="#0E9BF3"
            strokeWidth={3}
            strokeLinecap="round"
            style={
              animated
                ? {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    animation: `draw 1.1s ease-out forwards`,
                    animationDelay: `${i * 0.08}s`,
                  }
                : {}
            }
          />
        );
      })}
      {STOPS.map((s) => (
        <g key={s.id}>
          <circle cx={s.x} cy={s.y} r={7} fill="#fff" stroke="#0E9BF3" strokeWidth={3} />
          <text
            x={s.x}
            y={s.y - 14}
            textAnchor="middle"
            className="fill-[#0B2338] font-semibold"
            style={{ fontSize: 11 }}
          >
            {s.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ============================================================
// 5. ÉCRAN DE LOGIN (extension du form.ui Qt d'origine)
// ============================================================
const LoginScreen = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Merci de remplir tous les champs.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => onLogin(username), 900);
  };

  return (
    <div className="w-full h-full flex bg-white">
      <div className="hidden md:flex md:w-[42%] flex-col justify-between p-10 relative overflow-hidden bg-gradient-to-br from-[#5FD0F8] to-[#0E9BF3]">
        <div className="flex items-center gap-2">
          <Bus color="#fff" size={22} />
          <span className="font-extrabold text-white text-lg tracking-tight">TransMap</span>
        </div>

        <div className="relative z-10 rounded-xl p-4 opacity-90">
          <NetworkMap animated />
        </div>

        <p className="text-[#EAF7FF] text-sm leading-relaxed">
          Suivi des itinéraires, arrêts et véhicules d&apos;un réseau de transport public — en un seul tableau de bord.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <form onSubmit={submit} className="w-full max-w-sm">
          <div className="mb-8 pl-3 border-l-[3px] border-[#0E9BF3]">
            <h1 className="font-extrabold text-2xl text-[#0B2338]">Sign In To Your Account</h1>
            <p className="text-[13px] text-[#5C7A93] mt-1">Accès opérateur — réseau TransMap</p>
          </div>

          <label className="text-[13px] font-semibold text-[#0B2338]">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex. operator_02"
            className="w-full mb-5 mt-1.5 pb-2 text-sm outline-none bg-transparent border-b-2 border-[#DCEAF4] focus:border-[#0E9BF3] text-[#0B2338] placeholder:text-[#5C7A93]/60"
          />

          <label className="text-[13px] font-semibold text-[#0B2338]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full mb-2 mt-1.5 pb-2 text-sm outline-none bg-transparent border-b-2 border-[#DCEAF4] focus:border-[#0E9BF3] text-[#0B2338] placeholder:text-[#5C7A93]/60"
          />

          {error && <p className="text-[#D9564F] text-xs mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-7 py-2.5 rounded-md text-sm font-semibold text-white ${
              loading ? 'bg-[#5C7A93]' : 'bg-gradient-to-r from-[#5FD0F8] to-[#0E9BF3]'
            }`}
          >
            {loading ? 'Connexion...' : 'Login'}
          </button>

          <p className="text-xs text-[#5C7A93] mt-4 text-center">
            Démo — n&apos;importe quel identifiant/mot de passe fonctionne
          </p>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// 6. SIDEBAR
// ============================================================
const Sidebar = ({
  tab,
  setTab,
  onLogout,
  username,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onLogout: () => void;
  username: string;
}) => {
  const items: { key: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { key: 'overview', label: "Vue d'ensemble", icon: LayoutGrid },
    { key: 'routes', label: 'Itinéraires', icon: RouteIcon },
    { key: 'stops', label: 'Arrêts', icon: MapPin },
    { key: 'vehicles', label: 'Véhicules', icon: Bus },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0B2A4A] text-white p-5 flex flex-col justify-between z-50">
      <div>
        <div className="flex items-center gap-2 mb-8 px-1">
          <Bus color="#fff" size={20} />
          <span className="font-extrabold text-white text-base">TransMap</span>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const Icon = it.icon;
            const active = tab === it.key;
            return (
              <button
                key={it.key}
                onClick={() => setTab(it.key)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-[#5FD0F8] to-[#0E9BF3] text-[#0B2A4A] font-semibold'
                    : 'text-[#C9DCEC] font-medium hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-2 bg-white/[0.06]">
          <ShieldCheck size={16} className="text-[#5FD0F8]" />
          <div>
            <p className="text-[12.5px] text-white font-semibold">{username}</p>
            <p className="text-[11px] text-[#8FB2CC]">Authority: Operator</p>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 text-xs w-full rounded-lg text-[#8FB2CC]">
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
};

// ============================================================
// 7. KPI CARD
// ============================================================
const KpiCard = ({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Activity;
  label: string;
  value: string | number;
  sub?: string;
}) => (
  <div className="rounded-xl p-4 flex-1 bg-white border border-[#DCEAF4]">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[12.5px] text-[#5C7A93]">{label}</span>
      <Icon size={16} className="text-[#0E9BF3]" />
    </div>
    <p className="font-extrabold text-2xl text-[#0B2338]">{value}</p>
    {sub && <p className="text-[11.5px] text-[#5C7A93] mt-1">{sub}</p>}
  </div>
);

// ============================================================
// 8. VUE D'ENSEMBLE (KPI + carte + graphique recharts)
// ============================================================
const Overview = () => {
  const activeVehicles = VEHICLES.filter((v) => v.status === 'En route').length;
  const avgFare = Math.round(ROUTES.reduce((a, r) => a + r.fare, 0) / ROUTES.length);
  const coverage = ROUTES.reduce((a, r) => a + r.distance, 0).toFixed(1);

  const vehicleStatusData = ['En route', 'Retard', 'Maintenance'].map((status) => ({
    status,
    count: VEHICLES.filter((v) => v.status === status).length,
    color: statusColor(status),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4 flex-wrap">
        <KpiCard icon={Activity} label="Véhicules actifs" value={`${activeVehicles}/${VEHICLES.length}`} />
        <KpiCard icon={RouteIcon} label="Itinéraires" value={ROUTES.length} sub={`${coverage} km couverts`} />
        <KpiCard icon={MapPin} label="Arrêts" value={STOPS.length} />
        <KpiCard icon={Wallet} label="Tarif moyen" value={`${avgFare} FCFA`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl p-5 bg-white border border-[#DCEAF4] min-h-[320px]">
          <div className="flex items-center gap-2 mb-3">
            <Navigation2 size={16} className="text-[#0E9BF3]" />
            <h3 className="font-bold text-sm text-[#0B2338]">Carte du réseau</h3>
          </div>
          <NetworkMap />
        </div>

        <div className="rounded-xl p-5 bg-white border border-[#DCEAF4]">
          <h3 className="font-bold text-sm text-[#0B2338] mb-4">Véhicules par statut</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vehicleStatusData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCEAF4" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#5C7A93' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#5C7A93' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F8FC' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {vehicleStatusData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 9. ONGLET ITINÉRAIRES
// ============================================================
const RoutesTab = () => (
  <div className="rounded-xl overflow-hidden bg-white border border-[#DCEAF4]">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="bg-[#F3F8FC]">
          {['Itinéraire', 'Départ', 'Arrivée', 'Distance', 'Tarif', 'Véhicule', 'Statut'].map((h) => (
            <th key={h} className="px-4 py-3 text-xs font-semibold text-[#5C7A93]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROUTES.map((r) => (
          <tr key={r.id} className="border-t border-[#DCEAF4]">
            <td className="px-4 py-3 font-semibold text-[#0B2338]">{r.id}</td>
            <td className="px-4 py-3 text-[#0B2338]">{r.start}</td>
            <td className="px-4 py-3 text-[#0B2338]">{r.end}</td>
            <td className="px-4 py-3 text-[#5C7A93]">{r.distance} km</td>
            <td className="px-4 py-3 text-[#5C7A93]">{r.fare} FCFA</td>
            <td className="px-4 py-3 text-[#5C7A93]">{r.vehicle}</td>
            <td className="px-4 py-3">
              <StatusPill status={r.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================
// 10. ONGLET ARRÊTS
// ============================================================
const StopsTab = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {STOPS.map((s) => (
      <div key={s.id} className="rounded-xl p-4 bg-white border border-[#DCEAF4]">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} className="text-[#0E9BF3]" />
          <span className="font-bold text-sm text-[#0B2338]">{s.name}</span>
        </div>
        <p className="text-xs text-[#5C7A93]">
          Point GPS · x:{s.x} / y:{s.y}
        </p>
        <p className="text-xs text-[#5C7A93] mt-1">
          {ROUTES.filter((r) => r.start === s.name || r.end === s.name).length} itinéraire(s) desservi(s)
        </p>
      </div>
    ))}
  </div>
);

// ============================================================
// 11. ONGLET VÉHICULES
// ============================================================
const VehiclesTab = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {VEHICLES.map((v) => (
      <div key={v.id} className="rounded-xl p-4 flex items-center justify-between bg-white border border-[#DCEAF4]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#F3F8FC]">
            <Bus size={18} className="text-[#0E9BF3]" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#0B2338]">{v.id}</p>
            <p className="text-xs text-[#5C7A93]">
              {v.type} · {v.capacity} places · itinéraire {v.route}
            </p>
          </div>
        </div>
        <StatusPill status={v.status} />
      </div>
    ))}
  </div>
);

// ============================================================
// 12. COMPOSANT PRINCIPAL
// ============================================================
export default function TransMapDemo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tab, setTab] = useState<Tab>('overview');

  if (!loggedIn) {
    return (
      <div className="w-full h-screen bg-[#F3F8FC]">
        <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
        <LoginScreen
          onLogin={(u) => {
            setUsername(u);
            setLoggedIn(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      <Sidebar tab={tab} setTab={setTab} username={username} onLogout={() => setLoggedIn(false)} />

      <div className="ml-56 flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#DCEAF4]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3F8FC] w-[280px]">
            <Search size={15} className="text-[#5C7A93]" />
            <input
              placeholder="Rechercher un arrêt, un itinéraire..."
              className="bg-transparent text-sm outline-none w-full text-[#0B2338] placeholder:text-[#5C7A93]/60"
            />
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-[#1FA971]" />
            <span className="text-[12.5px] text-[#5C7A93]">Réseau opérationnel</span>
          </div>
        </div>

        <main className="flex-1 p-6">
          {tab === 'overview' && <Overview />}
          {tab === 'routes' && <RoutesTab />}
          {tab === 'stops' && <StopsTab />}
          {tab === 'vehicles' && <VehiclesTab />}
        </main>
      </div>
    </div>
  );
}
