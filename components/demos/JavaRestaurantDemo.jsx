"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  LayoutGrid, UtensilsCrossed, CalendarClock, Users, Trash2, Plus, Minus,
  Clock, Phone, ChefHat, ShoppingCart, TrendingUp, X,
} from "lucide-react";

const MENU = [
  { id: "miso", name: "Miso Soup", desc: "Tokyo specialty", price: 2500, tag: "Starter" },
  { id: "curry", name: "Meat Curry", desc: "With tomato sauce, great for lunch", price: 3500, tag: "Main" },
  { id: "tofu", name: "Tofu Bowl", desc: "Recommended for vegetarians", price: 4500, tag: "Main" },
  { id: "special", name: "Chef's Special", desc: "A special dish, ask your server", price: 5500, tag: "Signature" },
];

const WEEKLY_DATA = [
  { day: "Mon", orders: 34, reservations: 12 },
  { day: "Tue", orders: 41, reservations: 15 },
  { day: "Wed", orders: 38, reservations: 10 },
  { day: "Thu", orders: 52, reservations: 18 },
  { day: "Fri", orders: 71, reservations: 26 },
  { day: "Sat", orders: 88, reservations: 33 },
  { day: "Sun", orders: 63, reservations: 21 },
];

const fcfa = (n) => n.toLocaleString("fr-FR") + " FCFA";

function Sidebar({ tab, setTab }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "menu", label: "Menu & orders", icon: UtensilsCrossed },
    { id: "reservations", label: "Reservations", icon: CalendarClock },
    { id: "waitlist", label: "Waitlist", icon: Users },
  ];
  return (
    <div className="flex md:flex-col gap-1 md:gap-2 md:w-56 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {items.map((it) => {
        const Icon = it.icon;
        const active = tab === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              active
                ? "bg-[#C1531B] text-white"
                : "text-[#EDE6DA]/70 hover:bg-white/5 hover:text-[#EDE6DA]"
            }`}
          >
            <Icon size={17} strokeWidth={1.8} />
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="bg-[#251F19] border border-white/5 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-[#B8AD9C]">{label}</span>
        <Icon size={16} className="text-[#C1531B]" strokeWidth={1.8} />
      </div>
      <div className="text-2xl font-medium text-[#FAF6F0]">{value}</div>
      {sub && <div className="text-xs text-[#B8AD9C]">{sub}</div>}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Orders today" value="52" sub="+18% vs last Thu" icon={ShoppingCart} />
        <StatCard label="Reservations" value="18" sub="6 tables free tonight" icon={CalendarClock} />
        <StatCard label="Avg. wait time" value="12 min" sub="Waitlist of 3" icon={Clock} />
        <StatCard label="Est. revenue" value={fcfa(312500)} sub="Today, so far" icon={TrendingUp} />
      </div>

      <div className="bg-[#251F19] border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#EDE6DA]">Orders vs reservations, this week</h3>
          <div className="flex gap-4 text-xs text-[#B8AD9C]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#C1531B] inline-block" />Orders</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#6E8F6C] inline-block" />Reservations</span>
          </div>
        </div>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={WEEKLY_DATA}>
              <CartesianGrid vertical={false} stroke="#3A3128" />
              <XAxis dataKey="day" stroke="#B8AD9C" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#B8AD9C" fontSize={12} tickLine={false} axisLine={false} width={28} />
              <Tooltip
                contentStyle={{ background: "#1A1611", border: "1px solid #3A3128", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#EDE6DA" }}
              />
              <Bar dataKey="orders" fill="#C1531B" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="reservations" fill="#6E8F6C" radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#251F19] border border-white/5 rounded-xl p-4">
        <h3 className="text-sm text-[#EDE6DA] mb-4">Revenue trend, last 7 days</h3>
        <div style={{ width: "100%", height: 180 }}>
          <ResponsiveContainer>
            <AreaChart data={WEEKLY_DATA.map((d) => ({ day: d.day, revenue: d.orders * 4200 }))}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C1531B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#C1531B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#3A3128" />
              <XAxis dataKey="day" stroke="#B8AD9C" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#B8AD9C" fontSize={12} tickLine={false} axisLine={false} width={40}
                tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip
                contentStyle={{ background: "#1A1611", border: "1px solid #3A3128", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#EDE6DA" }}
                formatter={(v) => [fcfa(v), "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#C1531B" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MenuAndOrders() {
  const [cart, setCart] = useState({});

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return c;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const total = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = MENU.find((m) => m.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0),
    [cart]
  );
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 grid sm:grid-cols-2 gap-4">
        {MENU.map((item) => (
          <div key={item.id} className="bg-[#251F19] border border-white/5 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#C1531B]/15 flex items-center justify-center">
                <ChefHat size={18} className="text-[#C1531B]" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] uppercase tracking-wide text-[#B8AD9C] border border-white/10 rounded-full px-2 py-1">
                {item.tag}
              </span>
            </div>
            <div>
              <h4 className="text-[#FAF6F0] text-sm font-medium">{item.name}</h4>
              <p className="text-xs text-[#B8AD9C] mt-1">{item.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-[#EDE6DA] text-sm">{fcfa(item.price)}</span>
              <button
                onClick={() => addToCart(item.id)}
                className="flex items-center gap-1.5 bg-[#C1531B] hover:bg-[#A94514] text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={13} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-72 shrink-0 bg-[#251F19] border border-white/5 rounded-xl p-4 h-fit sticky top-4">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={16} className="text-[#C1531B]" />
          <h3 className="text-sm text-[#EDE6DA]">Current order ({itemCount})</h3>
        </div>
        {itemCount === 0 ? (
          <p className="text-xs text-[#B8AD9C]">No dish added yet. Add something from the menu.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {Object.entries(cart).map(([id, qty]) => {
              const item = MENU.find((m) => m.id === id);
              return (
                <div key={id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-[#EDE6DA]">{item.name}</p>
                    <p className="text-xs text-[#B8AD9C]">{fcfa(item.price)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(id)} className="w-6 h-6 flex items-center justify-center rounded-md border border-white/10 text-[#EDE6DA] hover:bg-white/5">
                      <Minus size={12} />
                    </button>
                    <span className="text-[#EDE6DA] w-4 text-center">{qty}</span>
                    <button onClick={() => addToCart(id)} className="w-6 h-6 flex items-center justify-center rounded-md border border-white/10 text-[#EDE6DA] hover:bg-white/5">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-sm text-[#B8AD9C]">Total</span>
              <span className="text-[#FAF6F0] font-medium">{fcfa(total)}</span>
            </div>
            <button className="mt-1 bg-[#C1531B] hover:bg-[#A94514] text-white text-sm py-2 rounded-lg transition-colors">
              Send to kitchen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Reservations() {
  const [list, setList] = useState([
    { id: 1, name: "Aline Nkoa", people: 4, date: "2026-09-04", time: "19:30", phone: "+237 6 77 00 00 01" },
    { id: 2, name: "Paul Mbarga", people: 2, date: "2026-09-04", time: "20:00", phone: "+237 6 90 11 22 33" },
  ]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", people: "2", date: "", time: "", note: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date || !form.time) {
      setError("Fill in at least name, date and time.");
      return;
    }
    setError("");
    setList((l) => [...l, { id: Date.now(), name: form.name, people: Number(form.people), date: form.date, time: form.time, phone: form.phone }]);
    setForm({ name: "", phone: "", email: "", people: "2", date: "", time: "", note: "" });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <form onSubmit={submit} className="lg:w-96 shrink-0 bg-[#251F19] border border-white/5 rounded-xl p-5 flex flex-col gap-3">
        <h3 className="text-sm text-[#EDE6DA] mb-1">New reservation</h3>
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] placeholder:text-[#6B6455] outline-none focus:border-[#C1531B]" />
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] placeholder:text-[#6B6455] outline-none focus:border-[#C1531B]" />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] placeholder:text-[#6B6455] outline-none focus:border-[#C1531B]" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="col-span-2 bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] outline-none focus:border-[#C1531B]" />
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] outline-none focus:border-[#C1531B]" />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-[#B8AD9C]">Guests</label>
          <input type="number" min="1" value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })}
            className="w-20 bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] outline-none focus:border-[#C1531B]" />
        </div>
        <textarea placeholder="Note (allergy, occasion...)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={2}
          className="bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] placeholder:text-[#6B6455] outline-none focus:border-[#C1531B] resize-none" />
        {error && <p className="text-xs text-[#E0755A]">{error}</p>}
        <button type="submit" className="mt-1 bg-[#C1531B] hover:bg-[#A94514] text-white text-sm py-2 rounded-lg transition-colors">
          Reserve table
        </button>
      </form>

      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-sm text-[#EDE6DA]">Upcoming reservations ({list.length})</h3>
        {list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((r) => (
          <div key={r.id} className="bg-[#251F19] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[#FAF6F0] text-sm">{r.name}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#B8AD9C]">
                <span className="flex items-center gap-1"><Clock size={12} />{r.date} · {r.time}</span>
                <span className="flex items-center gap-1"><Users size={12} />{r.people} guests</span>
                {r.phone && <span className="flex items-center gap-1"><Phone size={12} />{r.phone}</span>}
              </div>
            </div>
            <button onClick={() => setList((l) => l.filter((x) => x.id !== r.id))}
              className="text-[#B8AD9C] hover:text-[#E0755A] p-1.5">
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Waitlist() {
  const [queue, setQueue] = useState([
    { n: 1, name: "Serge Fokou" },
    { n: 2, name: "Brenda Tchoua" },
  ]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nextN = queue.length ? Math.max(...queue.map((x) => x.n)) + 1 : 1;

  const add = () => {
    if (!name.trim()) {
      setError("Enter a customer name first.");
      return;
    }
    setError("");
    setQueue((q) => [...q, { n: nextN, name: name.trim() }]);
    setName("");
  };

  const remove = (n) => setQueue((q) => q.filter((x) => x.n !== n));

  return (
    <div className="max-w-xl flex flex-col gap-4">
      <div className="bg-[#251F19] border border-white/5 rounded-xl p-4 flex flex-col gap-3">
        <h3 className="text-sm text-[#EDE6DA]">Add to waitlist</h3>
        <div className="flex gap-2">
          <input
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            className="flex-1 bg-[#1A1611] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#EDE6DA] placeholder:text-[#6B6455] outline-none focus:border-[#C1531B]"
          />
          <button onClick={add} className="bg-[#C1531B] hover:bg-[#A94514] text-white text-sm px-4 rounded-lg transition-colors">
            Add
          </button>
        </div>
        {error && <p className="text-xs text-[#E0755A]">{error}</p>}
      </div>

      <div className="bg-[#251F19] border border-white/5 rounded-xl p-4">
        <h3 className="text-sm text-[#EDE6DA] mb-3">Currently waiting ({queue.length})</h3>
        {queue.length === 0 ? (
          <p className="text-xs text-[#B8AD9C]">Waitlist is empty.</p>
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            {queue.map((q) => (
              <div key={q.n} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#C1531B]/15 text-[#C1531B] text-xs flex items-center justify-center">
                    {q.n}
                  </span>
                  <span className="text-sm text-[#EDE6DA]">{q.name}</span>
                </div>
                <button onClick={() => remove(q.n)} className="text-[#B8AD9C] hover:text-[#E0755A] p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JavaRestaurantDemo() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#1A1611] font-sans">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#C1531B]">Portfolio demo</p>
            <h1 className="text-xl text-[#FAF6F0] font-medium mt-0.5">JavaRestaurant — management dashboard</h1>
            <p className="text-xs text-[#B8AD9C] mt-1">Reimagined from a Java Swing desktop app · original stack: Java, Swing, SQLite</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 border border-white/10 rounded-full pl-1 pr-3 py-1">
            <span className="w-6 h-6 rounded-full bg-[#C1531B] flex items-center justify-center text-white text-xs">F</span>
            <span className="text-xs text-[#EDE6DA]">Franky, admin</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar tab={tab} setTab={setTab} />
          <div className="flex-1 min-w-0">
            {tab === "dashboard" && <Dashboard />}
            {tab === "menu" && <MenuAndOrders />}
            {tab === "reservations" && <Reservations />}
            {tab === "waitlist" && <Waitlist />}
          </div>
        </div>
      </div>
    </div>
  );
}
