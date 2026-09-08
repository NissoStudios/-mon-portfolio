'use client';

import { useState } from 'react';
import {
  Compass,
  Star,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Signal,
  Wifi,
  BatteryFull,
  Palmtree,
  Mountain,
  Tent,
  Building2,
  Search,
  Map as MapIcon,
  Navigation,
  X,
  Plus,
  Camera,
  Lightbulb,
  Sparkles,
  Users,
  User,
  Bookmark,
  Check,
  Settings,
} from 'lucide-react';

// ============================================================
// TripBook — demo interactive (version complète)
// Reconstitue la vision produit décrite dans le README (réseau
// social de voyageurs : récits, photos, tips, notation d'agences,
// mise en relation avec d'autres voyageurs, découverte de pépites
// cachées) — le code réel du zip ne contient que l'écran de
// notation d'agences ; tout le reste est une extrapolation
// assumée de l'intention du projet, à présenter comme telle dans
// la fiche portfolio.
// ============================================================

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');";

// ---------- 1. TYPES ----------
type Tab = 'feed' | 'map' | 'community' | 'agencies' | 'profile';

interface FeedPost {
  id: number;
  author: string;
  location: string;
  caption: string;
  likes: number;
  comments: number;
  icon: typeof Palmtree;
  gradient: [string, string];
  x: number;
  y: number;
  isTip?: boolean;
  hiddenGem?: boolean;
}

interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  timestamp: string;
}

interface Agency {
  id: number;
  name: string;
  location: string;
  specialty: string;
  reviews: Review[];
  x: number;
  y: number;
}

interface Traveler {
  id: number;
  name: string;
  homeBase: string;
  trips: number;
  bio: string;
  avatarGradient: [string, string];
}

// ---------- 2. DONNÉES MOCKÉES ----------
const STORIES = ['Amara', 'Kofi', 'Zainab', 'Iddris', 'Naledi'];

const INITIAL_FEED: FeedPost[] = [
  {
    id: 1,
    author: 'Amara O.',
    location: 'Zanzibar, Tanzanie',
    caption: "Coucher de soleil sur Nungwi Beach — une des plus belles fins de journée du voyage jusqu'ici.",
    likes: 142,
    comments: 18,
    icon: Palmtree,
    gradient: ['#E0A947', '#B5482F'],
    x: 250,
    y: 190,
  },
  {
    id: 2,
    author: 'Kofi A.',
    location: 'Serengeti, Tanzanie',
    caption: "Trois jours de safari avec Kilimanjaro Trails. Guide incroyable, on a croisé une migration de gnous.",
    likes: 289,
    comments: 34,
    icon: Mountain,
    gradient: ['#3C5A46', '#6B8F6E'],
    x: 225,
    y: 160,
  },
  {
    id: 3,
    author: 'Naledi M.',
    location: 'Marrakech, Maroc',
    caption: "Nuit dans le désert d'Agafay avec Atlas Expeditions — ciel étoilé, thé à la menthe, feu de camp.",
    likes: 201,
    comments: 27,
    icon: Tent,
    gradient: ['#C15B3A', '#E0A947'],
    x: 110,
    y: 55,
    hiddenGem: true,
  },
  {
    id: 4,
    author: 'Iddris K.',
    location: 'Accra, Ghana',
    caption:
      "Astuce : réserve tes visas Afrique de l'Est au moins 3 semaines à l'avance, les délais s'allongent en haute saison.",
    likes: 56,
    comments: 9,
    icon: Lightbulb,
    gradient: ['#DDA23E', '#8A7A68'],
    x: 190,
    y: 210,
    isTip: true,
  },
];

const TRAVELERS: Traveler[] = [
  { id: 1, name: 'Amara O.', homeBase: 'Lagos, Nigeria', trips: 14, bio: 'Chasseuse de couchers de soleil et de plages secrètes.', avatarGradient: ['#E0A947', '#B5482F'] },
  { id: 2, name: 'Kofi A.', homeBase: 'Accra, Ghana', trips: 22, bio: 'Safaris, randonnées, et cafés locaux.', avatarGradient: ['#3C5A46', '#6B8F6E'] },
  { id: 3, name: 'Naledi M.', homeBase: 'Le Cap, Afrique du Sud', trips: 9, bio: "À la recherche de pépites cachées loin des foules.", avatarGradient: ['#C15B3A', '#E0A947'] },
  { id: 4, name: 'Iddris K.', homeBase: 'Accra, Ghana', trips: 31, bio: 'Voyageur au long cours, un tip par étape.', avatarGradient: ['#8A7A68', '#3C5A46'] },
  { id: 5, name: 'Zainab T.', homeBase: 'Zanzibar, Tanzanie', trips: 6, bio: 'Nouvelle sur TripBook — direction la Namibie en juin.', avatarGradient: ['#DDA23E', '#C15B3A'] },
];

const AGENCIES: Agency[] = [
  {
    id: 1,
    name: 'Baobab Travel Co.',
    location: 'Yaoundé, Cameroun',
    specialty: 'Circuits culturels & nature',
    x: 95,
    y: 170,
    reviews: [
      { id: 'r1', author: 'Emmanuel T.', text: 'Guide francophone excellent, itinéraire bien pensé du Mfoundi au Parc de Waza.', rating: 5, timestamp: '3 jours' },
      { id: 'r2', author: 'Grace N.', text: 'Bon rapport qualité-prix mais bus en retard au départ.', rating: 3.5, timestamp: '1 semaine' },
    ],
  },
  {
    id: 2,
    name: 'Kilimanjaro Trails',
    location: 'Arusha, Tanzanie',
    specialty: 'Safaris & treks',
    x: 235,
    y: 150,
    reviews: [
      { id: 'r3', author: 'Kofi A.', text: "L'ascension du Kilimandjaro la mieux organisée que j'aie vue — équipe au top.", rating: 5, timestamp: '2 semaines' },
    ],
  },
  {
    id: 3,
    name: 'Atlas Expeditions',
    location: 'Marrakech, Maroc',
    specialty: 'Désert & montagne',
    x: 105,
    y: 50,
    reviews: [
      { id: 'r4', author: 'Naledi M.', text: 'Nuit dans le désert magique, seul bémol : peu de communication avant le départ.', rating: 4, timestamp: '5 jours' },
      { id: 'r5', author: 'Yasmine B.', text: 'Superbe organisation, chameaux et campement au top.', rating: 5, timestamp: '3 semaines' },
    ],
  },
  {
    id: 4,
    name: 'Sahara Voyages',
    location: 'Dakar, Sénégal',
    specialty: 'Côte & îles',
    x: 30,
    y: 100,
    reviews: [],
  },
];

const avgRating = (reviews: Review[]) =>
  reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

// ---------- 3. PETITS COMPOSANTS ----------
const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        className={i <= Math.round(value) ? 'text-[#DDA23E]' : 'text-[#E7DCCB]'}
        fill={i <= Math.round(value) ? '#DDA23E' : 'none'}
      />
    ))}
  </div>
);

const StatusBar = () => (
  <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[#2A2019] relative z-30">
    <span className="text-xs font-semibold" style={{ fontFamily: 'Work Sans, sans-serif' }}>
      9:41
    </span>
    <div className="flex items-center gap-1.5">
      <Signal size={13} />
      <Wifi size={13} />
      <BatteryFull size={15} />
    </div>
  </div>
);

// ---------- 4. COMPOSITEUR DE PUBLICATION ----------
const Composer = ({
  onClose,
  onPost,
}: {
  onClose: () => void;
  onPost: (post: Omit<FeedPost, 'id' | 'likes' | 'comments' | 'x' | 'y'>) => void;
}) => {
  const [type, setType] = useState<'photo' | 'tip'>('photo');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');

  const gradients: [string, string][] = [
    ['#E0A947', '#B5482F'],
    ['#3C5A46', '#6B8F6E'],
    ['#C15B3A', '#E0A947'],
  ];

  const submit = () => {
    if (!caption.trim()) return;
    onPost({
      author: 'Toi',
      location: location.trim() || 'Quelque part en Afrique',
      caption: caption.trim(),
      icon: type === 'tip' ? Lightbulb : Camera,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      isTip: type === 'tip',
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#2A2019]/40 flex items-end">
      <div className="w-full rounded-t-3xl bg-[#F5EEE1] p-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
            Partager
          </h2>
          <button onClick={onClose} className="text-[#8A7A68]">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setType('photo')}
            className="flex-1 py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5"
            style={{
              fontFamily: 'Work Sans, sans-serif',
              background: type === 'photo' ? '#C15B3A' : '#fff',
              color: type === 'photo' ? '#fff' : '#8A7A68',
              border: '1px solid #E7DCCB',
            }}
          >
            <Camera size={13} /> Story / Photo
          </button>
          <button
            onClick={() => setType('tip')}
            className="flex-1 py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5"
            style={{
              fontFamily: 'Work Sans, sans-serif',
              background: type === 'tip' ? '#C15B3A' : '#fff',
              color: type === 'tip' ? '#fff' : '#8A7A68',
              border: '1px solid #E7DCCB',
            }}
          >
            <Lightbulb size={13} /> Tip
          </button>
        </div>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lieu (optionnel)"
          className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E7DCCB] bg-white text-[12.5px] outline-none text-[#2A2019] placeholder:text-[#8A7A68]/70"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={type === 'tip' ? 'Partage une astuce utile...' : 'Raconte ton moment...'}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-[#E7DCCB] bg-white text-[12.5px] outline-none text-[#2A2019] placeholder:text-[#8A7A68]/70 resize-none"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        />
        <button
          onClick={submit}
          className="w-full mt-3 py-2.5 rounded-lg text-white text-[12.5px] font-semibold bg-[#C15B3A]"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
          Publier
        </button>
      </div>
    </div>
  );
};

// ---------- 5. ONGLET FIL ----------
const FeedTab = ({ feed, onOpenComposer }: { feed: FeedPost[]; onOpenComposer: () => void }) => (
  <div className="pb-4">
    <div className="px-5 pt-3 pb-2 flex items-center justify-between">
      <div>
        <h1 className="text-[22px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
          TripBook
        </h1>
        <p className="text-[12.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Ton fil de voyageurs
        </p>
      </div>
      <button onClick={onOpenComposer} className="w-9 h-9 rounded-full bg-[#C15B3A] flex items-center justify-center shrink-0">
        <Plus size={18} color="#fff" />
      </button>
    </div>

    <div className="flex gap-4 px-5 py-2 overflow-x-auto no-scrollbar">
      {STORIES.map((name, i) => (
        <div key={name} className="flex flex-col items-center gap-1 shrink-0">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ background: `linear-gradient(135deg, #E0A947, #B5482F)`, opacity: i === 0 ? 1 : 0.85 }}
          >
            {name[0]}
          </div>
          <span className="text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            {name}
          </span>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-4 px-4 mt-2">
      {feed.map((post) => {
        const Icon = post.icon;
        return (
          <div key={post.id} className="rounded-2xl overflow-hidden bg-white border border-[#E7DCCB]">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5EEE1] flex items-center justify-center text-xs font-semibold text-[#B5482F]">
                {post.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {post.author}
                </p>
                <p className="flex items-center gap-1 text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  <MapPin size={10} /> {post.location}
                </p>
              </div>
              {post.hiddenGem && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#B5482F] bg-[#B5482F]/10 px-2 py-1 rounded-full shrink-0">
                  <Sparkles size={10} /> Pépite
                </span>
              )}
            </div>

            {post.isTip ? (
              <div className="mx-3 mb-3 rounded-xl bg-[#DDA23E]/12 p-3 flex gap-2 items-start">
                <Lightbulb size={16} className="text-[#DDA23E] shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-[#2A2019] leading-snug" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {post.caption}
                </p>
              </div>
            ) : (
              <>
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
                >
                  <Icon size={40} color="#fff" strokeWidth={1.5} />
                </div>
                <div className="px-3 pt-2.5">
                  <p className="text-[12.5px] text-[#2A2019] leading-snug" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    {post.caption}
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center gap-4 px-3 py-2.5 text-[#8A7A68]">
              <span className="flex items-center gap-1 text-[11.5px]">
                <Heart size={14} /> {post.likes}
              </span>
              <span className="flex items-center gap-1 text-[11.5px]">
                <MessageCircle size={14} /> {post.comments}
              </span>
              <span className="flex items-center gap-1 text-[11.5px] ml-auto">
                <Share2 size={14} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ---------- 6. LISTE DES AGENCES ----------
const AgencyList = ({ onSelect }: { onSelect: (a: Agency) => void }) => (
  <div className="pb-4">
    <div className="px-5 pt-3 pb-2">
      <h1 className="text-[22px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
        Agences
      </h1>
      <p className="text-[12.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
        Note et découvre les agences recommandées par la communauté
      </p>
    </div>

    <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5EEE1]">
      <Search size={14} className="text-[#8A7A68]" />
      <input
        placeholder="Rechercher une agence..."
        className="bg-transparent text-[12.5px] outline-none w-full text-[#2A2019] placeholder:text-[#8A7A68]/70"
        style={{ fontFamily: 'Work Sans, sans-serif' }}
      />
    </div>

    <div className="flex flex-col gap-3 px-4">
      {AGENCIES.map((a) => {
        const rating = avgRating(a.reviews);
        return (
          <button
            key={a.id}
            onClick={() => onSelect(a)}
            className="flex items-center gap-3 rounded-2xl bg-white border border-[#E7DCCB] px-3 py-3 text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-[#3C5A46]/10 flex items-center justify-center shrink-0">
              <Building2 size={18} className="text-[#3C5A46]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#2A2019] truncate" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {a.name}
              </p>
              <p className="flex items-center gap-1 text-[11px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                <MapPin size={10} /> {a.location}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Stars value={rating} size={12} />
                <span className="text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {rating ? rating.toFixed(1) : 'Pas encore noté'} · {a.reviews.length} avis
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#8A7A68] shrink-0" />
          </button>
        );
      })}
    </div>
  </div>
);

// ---------- 7. DÉTAIL AGENCE + FORMULAIRE D'AVIS ----------
const AgencyDetail = ({
  agency,
  onBack,
  onAddReview,
}: {
  agency: Agency;
  onBack: () => void;
  onAddReview: (id: number, review: Review) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const avg = avgRating(agency.reviews);

  const submit = () => {
    if (!text.trim()) return;
    onAddReview(agency.id, {
      id: Math.random().toString(36).slice(2),
      author: 'Toi',
      text: text.trim(),
      rating: rating || 5,
      timestamp: "à l'instant",
    });
    setText('');
    setRating(0);
  };

  return (
    <div className="pb-4">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <button onClick={onBack} className="p-1.5 rounded-full hover:bg-[#F5EEE1]">
          <ChevronLeft size={18} className="text-[#2A2019]" />
        </button>
        <div>
          <h1 className="text-[16px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
            {agency.name}
          </h1>
          <p className="flex items-center gap-1 text-[11px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            <MapPin size={10} /> {agency.location}
          </p>
        </div>
      </div>

      <div className="mx-4 rounded-2xl bg-white border border-[#E7DCCB] p-4 mb-3">
        <p className="text-[11.5px] text-[#8A7A68] mb-2" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          {agency.specialty}
        </p>
        <div className="flex items-center gap-2">
          <Stars value={avg} size={16} />
          <span className="text-[13px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            {avg ? avg.toFixed(1) : '—'}
          </span>
          <span className="text-[11.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            ({agency.reviews.length} avis)
          </span>
        </div>
      </div>

      <div className="mx-4 rounded-2xl bg-[#F5EEE1] p-4 mb-3">
        <p className="text-[12.5px] font-semibold text-[#2A2019] mb-2" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Laisser un avis
        </p>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} onClick={() => setRating(i)}>
              <Star size={22} className={i <= rating ? 'text-[#DDA23E]' : 'text-[#D8CBB4]'} fill={i <= rating ? '#DDA23E' : 'none'} />
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your comment"
          rows={2}
          className="w-full rounded-lg border border-[#E7DCCB] px-3 py-2 text-[12.5px] outline-none bg-white text-[#2A2019] placeholder:text-[#8A7A68]/70 resize-none"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        />
        <button
          onClick={submit}
          className="w-full mt-2 py-2 rounded-lg text-white text-[12.5px] font-semibold bg-[#C15B3A]"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
          Post Comment
        </button>
      </div>

      <div className="flex flex-col gap-2.5 px-4">
        {agency.reviews.length === 0 && (
          <p className="text-[12px] text-[#8A7A68] text-center py-4" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Aucun avis pour le moment — sois le premier à en laisser un.
          </p>
        )}
        {agency.reviews
          .slice()
          .reverse()
          .map((r) => (
            <div key={r.id} className="rounded-xl bg-white border border-[#E7DCCB] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {r.author}
                </span>
                <span className="text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {r.timestamp}
                </span>
              </div>
              <Stars value={r.rating} size={12} />
              <p className="text-[12px] text-[#2A2019] mt-1.5 leading-snug" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {r.text}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

// ---------- 8. CARTE EXPLORATEUR ----------
const MapBackground = () => (
  <svg viewBox="0 0 300 340" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="300" height="340" fill="#EFE3CE" />
    <path d="M0 0 H300 V120 Q180 150 120 100 Q60 60 0 90 Z" fill="#E7D9BC" />
    <path d="M0 340 H300 V240 Q220 210 160 260 Q90 300 0 270 Z" fill="#E3D4B4" />
    <ellipse cx="205" cy="205" rx="55" ry="40" fill="#3C5A46" opacity="0.14" />
    <ellipse cx="70" cy="230" rx="40" ry="28" fill="#3C5A46" opacity="0.12" />
    <path d="M300 60 Q270 110 300 180 V0 H260 Q285 30 300 60 Z" fill="#7FA8A3" opacity="0.5" />
    <path d="M10 300 Q100 250 130 170 T240 60" stroke="#D8C7A2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M40 40 Q90 120 90 200 T60 320" stroke="#D8C7A2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1 7" />
    <path d="M0 150 Q120 140 300 170" stroke="#D8C7A2" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="1 7" />
  </svg>
);

const MapView = ({
  agencies,
  posts,
  onSelectAgency,
}: {
  agencies: Agency[];
  posts: FeedPost[];
  onSelectAgency: (a: Agency) => void;
}) => {
  const [active, setActive] = useState<Agency | null>(null);

  return (
    <div className="relative h-full flex flex-col">
      <div className="px-5 pt-3 pb-2 relative z-20 bg-[#F5EEE1]/90 backdrop-blur">
        <h1 className="text-[22px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
          Explorer
        </h1>
        <p className="text-[12.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Agences et récits autour de toi
        </p>
        <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E7DCCB]">
          <Search size={14} className="text-[#8A7A68]" />
          <span className="text-[11.5px] text-[#8A7A68]/70" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Rechercher un lieu, une agence...
          </span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <MapBackground />

        {posts.map((p) => (
          <div key={`p-${p.id}`} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#3C5A46] border-2 border-white shadow" />
          </div>
        ))}

        {agencies.map((a) => {
          const isActive = active?.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActive(a)}
              className="absolute -translate-x-1/2 -translate-y-full transition-transform"
              style={{ left: a.x, top: a.y, transform: `translate(-50%, -100%) scale(${isActive ? 1.15 : 1})` }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 border-white"
                style={{ background: isActive ? '#C15B3A' : '#B5482F' }}
              >
                <MapPin size={15} color="#fff" fill="#fff" />
              </div>
            </button>
          );
        })}

        <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
          <Navigation size={15} className="text-[#B5482F]" />
        </button>
      </div>

      {active && (
        <div className="absolute left-3 right-3 bottom-3 rounded-2xl bg-white border border-[#E7DCCB] shadow-lg p-3.5 z-20">
          <button onClick={() => setActive(null)} className="absolute top-2.5 right-2.5 text-[#8A7A68]">
            <X size={14} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3C5A46]/10 flex items-center justify-center shrink-0">
              <Building2 size={17} className="text-[#3C5A46]" />
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-[#2A2019] truncate" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {active.name}
              </p>
              <p className="flex items-center gap-1 text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                <MapPin size={9} /> {active.location}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5">
              <Stars value={avgRating(active.reviews)} size={12} />
              <span className="text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {active.reviews.length} avis
              </span>
            </div>
            <button
              onClick={() => onSelectAgency(active)}
              className="px-3 py-1.5 rounded-lg bg-[#C15B3A] text-white text-[11px] font-semibold"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Voir la fiche
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- 9. COMMUNAUTÉ ----------
const CommunityTab = ({
  following,
  onToggleFollow,
}: {
  following: number[];
  onToggleFollow: (id: number) => void;
}) => (
  <div className="pb-4">
    <div className="px-5 pt-3 pb-2">
      <h1 className="text-[22px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
        Communauté
      </h1>
      <p className="text-[12.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
        Connecte-toi avec d&apos;autres voyageurs
      </p>
    </div>

    <div className="flex flex-col gap-3 px-4">
      {TRAVELERS.map((t) => {
        const isFollowing = following.includes(t.id);
        return (
          <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-white border border-[#E7DCCB] px-3 py-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
              style={{ background: `linear-gradient(135deg, ${t.avatarGradient[0]}, ${t.avatarGradient[1]})` }}
            >
              {t.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#2A2019] truncate" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {t.name}
              </p>
              <p className="flex items-center gap-1 text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                <MapPin size={9} /> {t.homeBase} · {t.trips} voyages
              </p>
              <p className="text-[11px] text-[#8A7A68] mt-0.5 truncate" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {t.bio}
              </p>
            </div>
            <button
              onClick={() => onToggleFollow(t.id)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0"
              style={{
                fontFamily: 'Work Sans, sans-serif',
                background: isFollowing ? '#F5EEE1' : '#C15B3A',
                color: isFollowing ? '#3C5A46' : '#fff',
                border: isFollowing ? '1px solid #E7DCCB' : 'none',
              }}
            >
              {isFollowing && <Check size={12} />}
              {isFollowing ? 'Suivi' : 'Suivre'}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

// ---------- 10. PROFIL ----------
const ProfileTab = ({ feed, followingCount }: { feed: FeedPost[]; followingCount: number }) => {
  const myPosts = feed.filter((p) => p.author === 'Toi');
  const gridPosts = myPosts.length > 0 ? myPosts : feed.slice(0, 3);
  const savedAgencies = AGENCIES.slice()
    .sort((a, b) => avgRating(b.reviews) - avgRating(a.reviews))
    .slice(0, 2);

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <h1 className="text-[22px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Fraunces, serif' }}>
          Profil
        </h1>
        <Settings size={18} className="text-[#8A7A68]" />
      </div>

      <div className="flex flex-col items-center px-5 pb-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-2xl"
          style={{ background: 'linear-gradient(135deg, #E0A947, #B5482F)' }}
        >
          T
        </div>
        <p className="text-[15px] font-semibold text-[#2A2019] mt-2" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Toi
        </p>
        <p className="text-[11.5px] text-[#8A7A68] text-center mt-1 max-w-[240px]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          En route pour découvrir des pépites cachées à travers l&apos;Afrique 🌍
        </p>

        <div className="flex items-center gap-6 mt-4">
          {[
            { label: 'Publications', value: myPosts.length || 3 },
            { label: 'Abonnés', value: 128 },
            { label: 'Abonnements', value: followingCount },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[15px] font-semibold text-[#2A2019]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {s.value}
              </p>
              <p className="text-[10px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-3">
        <p className="text-[11.5px] font-semibold text-[#2A2019] mb-2 flex items-center gap-1.5" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          <Bookmark size={12} /> Lieux sauvegardés
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {savedAgencies.map((a) => (
            <div key={a.id} className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E7DCCB] px-3 py-2.5">
              <Building2 size={15} className="text-[#3C5A46] shrink-0" />
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#2A2019] truncate" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {a.name}
                </p>
                <p className="text-[10.5px] text-[#8A7A68]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {a.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11.5px] font-semibold text-[#2A2019] mb-2" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Publications
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {gridPosts.map((p) => (
            <div
              key={p.id}
              className="aspect-square rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
            >
              <p.icon size={18} color="#fff" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- 11. NAVIGATION BASSE ----------
const BottomNav = ({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) => {
  const items: { key: Tab; label: string; icon: typeof Compass }[] = [
    { key: 'feed', label: 'Fil', icon: Compass },
    { key: 'map', label: 'Carte', icon: MapIcon },
    { key: 'community', label: 'Communauté', icon: Users },
    { key: 'agencies', label: 'Agences', icon: Star },
    { key: 'profile', label: 'Profil', icon: User },
  ];
  return (
    <div className="flex items-center justify-around border-t border-[#E7DCCB] bg-white/95 backdrop-blur px-2 py-2.5 relative z-30">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = tab === it.key;
        return (
          <button key={it.key} onClick={() => setTab(it.key)} className="flex flex-col items-center gap-0.5 px-1">
            <Icon size={18} className={isActive ? 'text-[#B5482F]' : 'text-[#B7A98E]'} />
            <span className="text-[9px] whitespace-nowrap" style={{ fontFamily: 'Work Sans, sans-serif', color: isActive ? '#B5482F' : '#B7A98E' }}>
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ---------- 12. COMPOSANT PRINCIPAL ----------
export default function TripBookDemo() {
  const [tab, setTab] = useState<Tab>('feed');
  const [feed, setFeed] = useState<FeedPost[]>(INITIAL_FEED);
  const [agencies, setAgencies] = useState<Agency[]>(AGENCIES);
  const [selected, setSelected] = useState<Agency | null>(null);
  const [following, setFollowing] = useState<number[]>([2, 4]);
  const [showComposer, setShowComposer] = useState(false);

  const addReview = (id: number, review: Review) => {
    setAgencies((prev) => prev.map((a) => (a.id === id ? { ...a, reviews: [...a.reviews, review] } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, reviews: [...prev.reviews, review] } : prev));
  };

  const toggleFollow = (id: number) => {
    setFollowing((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const addPost = (post: Omit<FeedPost, 'id' | 'likes' | 'comments' | 'x' | 'y'>) => {
    setFeed((prev) => [
      { ...post, id: Date.now(), likes: 0, comments: 0, x: 150 + Math.random() * 80, y: 150 + Math.random() * 80 },
      ...prev,
    ]);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#EFE6D6] py-10">
      <style>{`
        ${FONT_IMPORT}
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative w-[380px] h-[790px] rounded-[2.75rem] bg-[#2A2019] p-[10px] shadow-2xl">
        <div className="w-full h-full rounded-[2.25rem] bg-[#F5EEE1] overflow-hidden flex flex-col relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2A2019] rounded-b-2xl z-40" />

          <StatusBar />

          <div className={`flex-1 relative ${tab === 'map' ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'}`}>
            {tab === 'feed' && <FeedTab feed={feed} onOpenComposer={() => setShowComposer(true)} />}
            {tab === 'map' && (
              <MapView
                agencies={agencies}
                posts={feed}
                onSelectAgency={(a) => {
                  setSelected(a);
                  setTab('agencies');
                }}
              />
            )}
            {tab === 'community' && <CommunityTab following={following} onToggleFollow={toggleFollow} />}
            {tab === 'agencies' &&
              (selected ? (
                <AgencyDetail agency={selected} onBack={() => setSelected(null)} onAddReview={addReview} />
              ) : (
                <AgencyList onSelect={setSelected} />
              ))}
            {tab === 'profile' && <ProfileTab feed={feed} followingCount={following.length} />}

            {showComposer && <Composer onClose={() => setShowComposer(false)} onPost={addPost} />}
          </div>

          <BottomNav
            tab={tab}
            setTab={(t) => {
              setTab(t);
              setSelected(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}
