'use client';
/* eslint-disable @next/next/no-img-element -- Demo signatures and fallible legacy logos require native image behavior. */

import { useState, useRef, useEffect, FormEvent } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ============================================================
// 1. TYPES
// ============================================================
type DocumentStatus = 'pending' | 'validated' | 'rejected';
type DocumentType = 'medical' | 'prolongation' | 'reprise' | 'regularisation' | 'naissance' | 'deces';

interface Document {
  id: number;
  reference: string;
  type: DocumentType;
  employeeMatricule: string;
  employeeName: string;
  dateDebut: string;
  dateFin: string;
  raison: string;
  status: DocumentStatus;
  motifRejet?: string;
  medecin?: string;
  hash?: string;
  signature?: string;
  dateCreation: string;
  // Champs spécifiques
  dateHeureNaissance?: string;
  sexeNaissance?: string;
  nomEnfant?: string;
  prenomEnfant?: string;
  nomPere?: string;
  nomMere?: string;
  ageDefunt?: number;
  sexeDefunt?: string;
  lieuDeces?: string;
  causeDeces?: string;
}

interface Employee {
  matricule: string;
  nom: string;
  prenom: string;
  direction: string;
  site: string;
  poste: string;
}

// ============================================================
// 2. DONNÉES MOCKÉES (avec site)
// ============================================================
const mockEmployees: Employee[] = [
  { matricule: 'EMP1001', nom: 'MBA', prenom: 'Jean', direction: 'DTA', site: 'Mbandjock', poste: 'Ouvrier' },
  { matricule: 'EMP1002', nom: 'NGA', prenom: 'Marie', direction: 'DRH', site: 'Mbandjock', poste: 'Secrétaire' },
  { matricule: 'EMP1003', nom: 'ESSOMBA', prenom: 'Paul', direction: 'DSI', site: 'Nkoteng', poste: 'Informaticien' },
  { matricule: 'EMP1004', nom: 'TCHINDA', prenom: 'Suzanne', direction: 'DTA', site: 'Mbandjock', poste: 'Technicien' },
  { matricule: 'EMP1005', nom: 'ANGO', prenom: 'Alain', direction: 'DG', site: 'Mbandjock', poste: 'Cadre' },
  { matricule: 'EMP1006', nom: 'KAMGA', prenom: 'Béatrice', direction: 'DRH', site: 'Nkoteng', poste: 'Agent de maîtrise' },
  { matricule: 'EMP1007', nom: 'FOMBA', prenom: 'Jacques', direction: 'DTA', site: 'Mbandjock', poste: 'Chauffeur' },
  { matricule: 'EMP1008', nom: 'DJOM', prenom: 'Claire', direction: 'DSI', site: 'Nkoteng', poste: 'Développeur' },
  { matricule: 'EMP1009', nom: 'MBARGA', prenom: 'Henri', direction: 'DTA', site: 'Mbandjock', poste: 'Ouvrier' },
  { matricule: 'EMP1010', nom: 'BILONG', prenom: 'Emmanuel', direction: 'DRH', site: 'Mbandjock', poste: 'Comptable' },
];

// ============================================================
// 3. DOCUMENTS INITIAUX (incluant naissance/décès)
// ============================================================
const initialDocuments: Document[] = [
  {
    id: 1,
    reference: 'MEDI-2026-09-01-001',
    type: 'medical',
    employeeMatricule: 'EMP1001',
    employeeName: 'MBA Jean',
    dateDebut: '2026-08-20',
    dateFin: '2026-08-27',
    raison: 'HOSPITALISATION suite à une infection',
    status: 'pending',
    dateCreation: '2026-08-19T10:00:00',
  },
  {
    id: 2,
    reference: 'MEDI-2026-08-31-002',
    type: 'medical',
    employeeMatricule: 'EMP1003',
    employeeName: 'ESSOMBA Paul',
    dateDebut: '2026-08-25',
    dateFin: '2026-09-05',
    raison: 'ÉVACUATION vers l\'hôpital central',
    status: 'pending',
    dateCreation: '2026-08-24T14:30:00',
  },
  {
    id: 3,
    reference: 'PROL-2026-08-28-001',
    type: 'prolongation',
    employeeMatricule: 'EMP1006',
    employeeName: 'KAMGA Béatrice',
    dateDebut: '2026-08-28',
    dateFin: '2026-09-10',
    raison: 'PROLONGATION suite à complications',
    status: 'pending',
    dateCreation: '2026-08-27T09:15:00',
  },
  {
    id: 4,
    reference: 'MEDI-2026-08-15-003',
    type: 'medical',
    employeeMatricule: 'EMP1002',
    employeeName: 'NGA Marie',
    dateDebut: '2026-08-10',
    dateFin: '2026-08-17',
    raison: 'CONGÉ MALADIE ordinaire',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-08-09T08:00:00',
  },
  {
    id: 5,
    reference: 'REG-2026-08-22-001',
    type: 'regularisation',
    employeeMatricule: 'EMP1009',
    employeeName: 'MBARGA Henri',
    dateDebut: '2026-08-15',
    dateFin: '2026-08-22',
    raison: 'Régularisation d\'absence pour hospitalisation',
    status: 'rejected',
    motifRejet: 'Pièces justificatives incomplètes',
    dateCreation: '2026-08-21T11:20:00',
  },
  // Exemple naissance
  {
    id: 6,
    reference: 'NAIS-2026-08-25-001',
    type: 'naissance',
    employeeMatricule: 'EMP1005',
    employeeName: 'ANGO Alain',
    dateDebut: '',
    dateFin: '',
    raison: 'Déclaration de naissance',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-08-25T08:30:00',
    dateHeureNaissance: '2026-08-25T06:15',
    sexeNaissance: 'Masculin',
    nomEnfant: 'ANGO',
    prenomEnfant: 'Junior',
    nomPere: 'ANGO Alain',
    nomMere: 'ANGO Marie',
  },
  // Exemple décès
  {
    id: 7,
    reference: 'DEC-2026-08-20-001',
    type: 'deces',
    employeeMatricule: 'EMP1007',
    employeeName: 'FOMBA Jacques',
    dateDebut: '2026-08-20T14:30',
    dateFin: '',
    raison: 'Décès suite à maladie',
    status: 'pending',
    dateCreation: '2026-08-20T15:00:00',
    ageDefunt: 54,
    sexeDefunt: 'Masculin',
    lieuDeces: 'Hôpital SOSUCAM',
    causeDeces: 'Interne',
  },
  // Documents validés supplémentaires — pour que les statistiques par
  // direction montrent plusieurs directions avec des données variées.
  {
    id: 8,
    reference: 'MEDI-2026-07-10-004',
    type: 'medical',
    employeeMatricule: 'EMP1001',
    employeeName: 'MBA Jean',
    dateDebut: '2026-07-05',
    dateFin: '2026-07-12',
    raison: 'CONGÉ MALADIE — paludisme',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-07-04T09:00:00',
  },
  {
    id: 9,
    reference: 'MEDI-2026-07-18-005',
    type: 'medical',
    employeeMatricule: 'EMP1008',
    employeeName: 'DJOM Claire',
    dateDebut: '2026-07-15',
    dateFin: '2026-07-25',
    raison: 'HOSPITALISATION suite à intervention chirurgicale',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-07-14T10:30:00',
  },
  {
    id: 10,
    reference: 'MEDI-2026-08-02-006',
    type: 'medical',
    employeeMatricule: 'EMP1005',
    employeeName: 'ANGO Alain',
    dateDebut: '2026-08-01',
    dateFin: '2026-08-04',
    raison: 'CONGÉ MALADIE ordinaire',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-07-31T08:00:00',
  },
  {
    id: 11,
    reference: 'REG-2026-07-28-002',
    type: 'regularisation',
    employeeMatricule: 'EMP1004',
    employeeName: 'TCHINDA Suzanne',
    dateDebut: '2026-07-20',
    dateFin: '2026-07-28',
    raison: 'Régularisation d\'absence pour évacuation',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-07-27T13:00:00',
  },
  {
    id: 12,
    reference: 'PROL-2026-06-15-002',
    type: 'prolongation',
    employeeMatricule: 'EMP1010',
    employeeName: 'BILONG Emmanuel',
    dateDebut: '2026-06-15',
    dateFin: '2026-06-30',
    raison: 'PROLONGATION suite à complications post-opératoires',
    status: 'validated',
    medecin: 'Dr. MBOME',
    dateCreation: '2026-06-14T09:45:00',
  },
];

// ============================================================
// 4. FONCTIONS UTILITAIRES
// ============================================================
const generateReference = (type: string): string => {
  const prefix = type.substring(0, 4).toUpperCase();
  const today = new Date().toISOString().slice(0, 10);
  const random = String(Math.floor(100 + Math.random() * 900));
  return `${prefix}-${today}-${random}`;
};

const computeFakeHash = (data: unknown): string => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return 'sha256-' + Math.abs(hash).toString(16).padStart(64, '0');
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const typeLabels: Record<string, string> = {
  medical: 'Médical',
  prolongation: 'Prolongation',
  reprise: 'Reprise',
  regularisation: 'Régularisation',
  naissance: 'Naissance',
  deces: 'Décès',
};

// Calcule les jours d'absence validés, regroupés par direction — utilisé par
// les graphiques du Dashboard et des Statistiques pour rester cohérent avec
// les documents réellement créés/validés dans la démo (au lieu de chiffres figés).
const computeJoursParDirection = (documents: Document[]): Record<string, number> => {
  const totals: Record<string, number> = {};
  documents
    .filter(d => d.status === 'validated' && d.dateDebut && d.dateFin && d.type !== 'naissance' && d.type !== 'deces')
    .forEach(d => {
      const emp = mockEmployees.find(e => e.matricule === d.employeeMatricule);
      const direction = emp?.direction || 'Autre';
      const start = new Date(d.dateDebut);
      const end = new Date(d.dateFin);
      const jours = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
      totals[direction] = (totals[direction] || 0) + jours;
    });
  return totals;
};

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  medecin: 'Médecin',
  direction: 'Direction',
  secretaire: 'Secrétaire',
};

// ============================================================
// 5. COMPOSANT SIDEBAR (inchangé, mais on ajoute le logo)
// ============================================================
const Sidebar = ({
  currentPage,
  setPage,
  userRole,
  userEntite,
}: {
  currentPage: string;
  setPage: (page: string) => void;
  userRole: string;
  userEntite: string;
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'new', label: 'Nouveau document', icon: '➕' },
    { id: 'validation', label: 'Validation', icon: '✅' },
    { id: 'stats', label: 'Statistiques', icon: '📈' },
    { id: 'help', label: 'Aide', icon: '❓' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0a1628] to-[#1a3a6b] text-white p-5 flex flex-col shadow-lg z-50">
      <div className="flex items-center gap-3 mb-8">
        <img
          src="/logo.png"
          alt="SOSUCAM"
          className="h-10 w-auto object-contain"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.style.display = 'none';
            const fallback = currentTarget.parentElement?.querySelector('.logo-fallback');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        <div className="logo-fallback hidden">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold">🏥</div>
        </div>
        <span className="text-xl font-bold tracking-wide">GestMedicert</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-sm font-medium ${
              currentPage === item.id
                ? 'bg-white/20 text-white shadow-md'
                : 'text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4 text-xs text-white/50">
        <div className="flex items-center justify-between">
          <span id="userRoleDisplay">👤 {roleLabels[userRole] || userRole} • {userEntite}</span>
          <span className="text-white/30">v1.0</span>
        </div>
        <button className="mt-2 w-full text-left text-white/40 hover:text-white/70 text-sm">
          🚪 Déconnexion
        </button>
      </div>
    </aside>
  );
};

// ============================================================
// 6. COMPOSANT DASHBOARD (inchangé)
// ============================================================
const Dashboard = ({ documents }: { documents: Document[] }) => {
  const total = documents.length;
  const pending = documents.filter((d) => d.status === 'pending').length;
  const validated = documents.filter((d) => d.status === 'validated').length;
  const rejected = documents.filter((d) => d.status === 'rejected').length;

  const joursParDirection = computeJoursParDirection(documents);
  const directions = Object.keys(joursParDirection).length > 0 ? Object.keys(joursParDirection) : ['DTA', 'DRH', 'DSI', 'DG'];
  const chartData = {
    labels: directions,
    datasets: [
      {
        label: 'Jours d\'absence validés',
        data: directions.map(dir => joursParDirection[dir] || 0),
        backgroundColor: ['#1a3a6b', '#2a5a8b', '#4a7aab', '#ff4d6d', '#7a5aab'],
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3a6b]">📊 Tableau de bord</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-[#1a3a6b]">
          <div className="text-2xl font-bold text-[#1a3a6b]">{total}</div>
          <div className="text-sm text-gray-500">Total documents</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pending}</div>
          <div className="text-sm text-gray-500">En attente</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{validated}</div>
          <div className="text-sm text-gray-500">Validés</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{rejected}</div>
          <div className="text-sm text-gray-500">Rejetés</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-md font-semibold text-[#1a3a6b] mb-4">📊 Jours d&apos;absence validés par direction</h3>
        <div className="h-64">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-md font-semibold text-[#1a3a6b] mb-3">🕒 Derniers documents</h3>
        <ul className="divide-y divide-gray-100">
          {documents.slice(0, 3).map((doc) => (
            <li key={doc.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium">{doc.reference}</span>
                <span className="text-sm text-gray-500 ml-3">{doc.employeeName}</span>
                <span className={`ml-3 text-xs px-2 py-1 rounded-full ${doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : doc.status === 'validated' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {doc.status === 'pending' ? 'En attente' : doc.status === 'validated' ? 'Validé' : 'Rejeté'}
                </span>
              </div>
              <span className="text-sm text-gray-400">{formatDate(doc.dateCreation)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================================
// 7. COMPOSANT DOCUMENT LIST (avec bouton "Voir PDF")
// ============================================================
const DocumentList = ({ documents, onViewPdf }: { documents: Document[], onViewPdf: (doc: Document) => void }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const filtered = filterStatus === 'all' ? documents : documents.filter((d) => d.status === filterStatus);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1a3a6b]">📄 Documents</h2>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Tous</option>
          <option value="pending">En attente</option>
          <option value="validated">Validés</option>
          <option value="rejected">Rejetés</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1e1e2f] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Réf.</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Employé</th>
              <th className="px-4 py-3 text-left">Période</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Aucun document trouvé.</td></tr>
            ) : (
              filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{doc.reference}</td>
                  <td className="px-4 py-3"><span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{typeLabels[doc.type] || doc.type}</span></td>
                  <td className="px-4 py-3">{doc.employeeName}</td>
                  <td className="px-4 py-3">
                    {doc.type === 'naissance' ? `Naissance ${formatDateTime(doc.dateHeureNaissance || '')}` :
                     doc.type === 'deces' ? `Décès ${formatDateTime(doc.dateDebut)}` :
                     `${formatDate(doc.dateDebut)} → ${formatDate(doc.dateFin)}`}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : doc.status === 'validated' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {doc.status === 'pending' ? 'En attente' : doc.status === 'validated' ? 'Validé' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={() => onViewPdf(doc)}>👁️ Consulter</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// 8. COMPOSANT PDF VIEWER (modale)
// ============================================================
const PdfViewer = ({ doc, onClose }: { doc: Document | null, onClose: () => void }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-[#1a3a6b]">Aperçu PDF – {doc.reference}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        {/* Contenu PDF (style de pdf_document.php) */}
        <div id="pdfContent" className="border border-gray-300 p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <img src="/logo.png" alt="SOSUCAM" className="h-12 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
              <div className="text-sm font-bold text-[#1a3a6b] mt-1">SERVICE MÉDICAL</div>
            </div>
            <div className="text-sm text-right">Sosucam, le {new Date().toLocaleDateString('fr-FR')}</div>
          </div>
          <div className="text-center my-4">
            <div className="text-2xl font-bold">{typeLabels[doc.type]?.toUpperCase() || doc.type}</div>
            <div className="text-lg font-bold text-red-700">N° {doc.reference}</div>
          </div>
          <div className="font-bold text-sm my-2">INFORMATIONS</div>
          <table className="w-full border-collapse border-2 border-gray-800 text-sm">
            <tbody>
              <tr><td className="border p-1 font-bold bg-gray-100 w-1/4">Matricule</td><td className="border p-1 w-1/4">{doc.employeeMatricule}</td><td className="border p-1 font-bold bg-gray-100 w-1/4">Nom complet</td><td className="border p-1 w-1/4">{doc.employeeName}</td></tr>
              {doc.type === 'medical' || doc.type === 'prolongation' || doc.type === 'regularisation' ? (
                <tr><td className="border p-1 font-bold bg-gray-100">Période</td><td className="border p-1" colSpan={3}>{formatDate(doc.dateDebut)} → {formatDate(doc.dateFin)}</td></tr>
              ) : doc.type === 'naissance' ? (
                <>
                  <tr><td className="border p-1 font-bold bg-gray-100">Date/Heure</td><td className="border p-1" colSpan={3}>{formatDateTime(doc.dateHeureNaissance || '')}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Sexe</td><td className="border p-1" colSpan={3}>{doc.sexeNaissance}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Enfant</td><td className="border p-1" colSpan={3}>{doc.nomEnfant} {doc.prenomEnfant}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Père</td><td className="border p-1" colSpan={3}>{doc.nomPere}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Mère</td><td className="border p-1" colSpan={3}>{doc.nomMere}</td></tr>
                </>
              ) : doc.type === 'deces' ? (
                <>
                  <tr><td className="border p-1 font-bold bg-gray-100">Date/Heure</td><td className="border p-1" colSpan={3}>{formatDateTime(doc.dateDebut)}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Âge</td><td className="border p-1" colSpan={3}>{doc.ageDefunt} ans</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Sexe</td><td className="border p-1" colSpan={3}>{doc.sexeDefunt}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Lieu</td><td className="border p-1" colSpan={3}>{doc.lieuDeces}</td></tr>
                  <tr><td className="border p-1 font-bold bg-gray-100">Cause</td><td className="border p-1" colSpan={3}>{doc.causeDeces}</td></tr>
                </>
              ) : null}
              <tr><td className="border p-1 font-bold bg-gray-100">Raison</td><td className="border p-1" colSpan={3}>{doc.raison}</td></tr>
              <tr><td className="border p-1 font-bold bg-gray-100">Médecin</td><td className="border p-1" colSpan={3}>{doc.medecin || '-'}</td></tr>
              {doc.status === 'rejected' && doc.motifRejet && <tr><td className="border p-1 font-bold bg-gray-100">Motif rejet</td><td className="border p-1" colSpan={3}>{doc.motifRejet}</td></tr>}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <div className="text-center">
              <div className="font-bold text-sm">MÉDECIN</div>
              {doc.signature ? (
                <img src={doc.signature} alt="Signature" className="h-16 mx-auto" />
              ) : (
                <div className="h-16 border-b border-gray-800 w-48 mx-auto"></div>
              )}
              <div className="text-xs mt-1">{doc.medecin || 'Signature'}</div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-4 border-t border-gray-300 pt-2">
            Empreinte SHA-256 : {doc.hash || computeFakeHash(doc)}
          </div>
          <div className="text-center text-xs text-gray-400 mt-1">Document généré par GestMedicert - DSI — SOSUCAM</div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={() => window.print()} className="px-6 py-2 bg-[#1a3a6b] text-white rounded-lg hover:bg-[#0f2a4a]">🖨️ Imprimer</button>
          <button onClick={onClose} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Fermer</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 9. COMPOSANT FORMULAIRE (avec tous les types)
// ============================================================
const DocumentForm = ({
  employees,
  onCreate,
  userEntite,
  canModifyOtherSite,
}: {
  employees: Employee[];
  onCreate: (doc: Document) => void;
  userEntite: string;
  canModifyOtherSite: boolean;
}) => {
  const [type, setType] = useState<DocumentType>('medical');
  const [matricule, setMatricule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [raison, setRaison] = useState('');
  const [signature, setSignature] = useState('');
  // Champs spécifiques
  const [dateHeureNaissance, setDateHeureNaissance] = useState('');
  const [sexeNaissance, setSexeNaissance] = useState('');
  const [nomEnfant, setNomEnfant] = useState('');
  const [prenomEnfant, setPrenomEnfant] = useState('');
  const [nomPere, setNomPere] = useState('');
  const [nomMere, setNomMere] = useState('');
  const [ageDefunt, setAgeDefunt] = useState<number | ''>('');
  const [sexeDefunt, setSexeDefunt] = useState('');
  const [lieuDeces, setLieuDeces] = useState('');
  const [causeDeces, setCauseDeces] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1a3a6b';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Dessin
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    isDrawingRef.current = true;
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current || !isDrawingRef.current) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };
  const endDraw = () => {
    if (!ctxRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) setSignature(canvas.toDataURL('image/png'));
  };

  const generateAutoSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = '#1a3a6b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    const startX = 20 + Math.random()*30, startY = 30 + Math.random()*20;
    const cp1x = 40 + Math.random()*60, cp1y = 10 + Math.random()*40;
    const cp2x = 80 + Math.random()*60, cp2y = 50 + Math.random()*30;
    const endX = 140 + Math.random()*40, endY = 20 + Math.random()*30;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    const cp3x = 160 + Math.random()*50, cp3y = 10 + Math.random()*40;
    const cp4x = 200 + Math.random()*40, cp4y = 40 + Math.random()*30;
    const endX2 = 240 + Math.random()*30, endY2 = 20 + Math.random()*20;
    ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, endX2, endY2);
    ctx.stroke();
    ctx.moveTo(endX2-10, endY2+5);
    ctx.lineTo(endX2+5, endY2-5);
    ctx.stroke();
    setSignature(canvas.toDataURL('image/png'));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    ctxRef.current.fillStyle = '#ffffff';
    ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const filteredEmployees = employees.filter(emp => 
    (emp.matricule.includes(searchTerm) || emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) || emp.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
    emp.site === userEntite
  );

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setMatricule(emp.matricule);
    setSearchTerm(`${emp.nom} ${emp.prenom} (${emp.matricule})`);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) { alert('Veuillez sélectionner un employé.'); return; }
    if (!raison || raison.length < 5) { alert('Raison obligatoire (min 5 caractères).'); return; }
    if (!signature) { alert('Veuillez apposer votre signature.'); return; }

    // Vérifications spécifiques
    if (type === 'medical' || type === 'prolongation' || type === 'regularisation') {
      if (!dateDebut || !dateFin) { alert('Dates obligatoires.'); return; }
    }
    if (type === 'naissance') {
      if (!dateHeureNaissance || !sexeNaissance || !nomEnfant || !prenomEnfant || !nomPere || !nomMere) { alert('Tous les champs de naissance sont obligatoires.'); return; }
    }
    if (type === 'deces') {
      if (!dateDebut || !ageDefunt || !sexeDefunt || !lieuDeces || !causeDeces) { alert('Tous les champs de décès sont obligatoires.'); return; }
    }

    const newDoc: Document = {
      id: Date.now(),
      reference: generateReference(type),
      type,
      employeeMatricule: selectedEmployee.matricule,
      employeeName: `${selectedEmployee.nom} ${selectedEmployee.prenom}`,
      dateDebut: type === 'deces' ? dateDebut : dateDebut,
      dateFin: type !== 'deces' ? dateFin : '',
      raison,
      status: 'pending',
      signature,
      hash: computeFakeHash({ matricule, dateDebut, dateFin, raison, type }),
      dateCreation: new Date().toISOString(),
      // champs spécifiques
      dateHeureNaissance: type === 'naissance' ? dateHeureNaissance : undefined,
      sexeNaissance: type === 'naissance' ? sexeNaissance : undefined,
      nomEnfant: type === 'naissance' ? nomEnfant : undefined,
      prenomEnfant: type === 'naissance' ? prenomEnfant : undefined,
      nomPere: type === 'naissance' ? nomPere : undefined,
      nomMere: type === 'naissance' ? nomMere : undefined,
      ageDefunt: type === 'deces' ? Number(ageDefunt) : undefined,
      sexeDefunt: type === 'deces' ? sexeDefunt : undefined,
      lieuDeces: type === 'deces' ? lieuDeces : undefined,
      causeDeces: type === 'deces' ? causeDeces : undefined,
    };

    onCreate(newDoc);
    // Reset form
    setSelectedEmployee(null); setMatricule(''); setSearchTerm(''); setDateDebut(''); setDateFin(''); setRaison('');
    setDateHeureNaissance(''); setSexeNaissance(''); setNomEnfant(''); setPrenomEnfant(''); setNomPere(''); setNomMere('');
    setAgeDefunt(''); setSexeDefunt(''); setLieuDeces(''); setCauseDeces('');
    clearCanvas();
    alert(`✅ Document ${newDoc.reference} créé !`);
  };

  const isReadOnly = !canModifyOtherSite;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1a3a6b]">➕ Nouveau document</h2>
      {isReadOnly && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-yellow-800 text-sm">
          ⚠️ Vous êtes en consultation sur ce site. Vous ne pouvez pas créer de document.
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={type} onChange={(e) => setType(e.target.value as DocumentType)} disabled={isReadOnly}>
            <option value="medical">Médical</option>
            <option value="prolongation">Prolongation</option>
            <option value="reprise">Reprise</option>
            <option value="regularisation">Régularisation</option>
            <option value="naissance">Naissance</option>
            <option value="deces">Décès</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Employé</label>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Rechercher..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); if (!e.target.value) setSelectedEmployee(null); }} onFocus={() => setShowSuggestions(true)} disabled={isReadOnly} />
          {showSuggestions && searchTerm.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
              {filteredEmployees.length === 0 ? <li className="px-4 py-2 text-gray-400">Aucun employé sur ce site</li> :
                filteredEmployees.map(emp => (
                  <li key={emp.matricule} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between" onClick={() => handleSelectEmployee(emp)}>
                    <span>{emp.nom} {emp.prenom}</span><span className="text-sm text-gray-400">{emp.matricule}</span>
                  </li>
                ))
              }
            </ul>
          )}
          {selectedEmployee && <div className="mt-2 text-sm bg-blue-50 p-2 rounded-lg text-blue-800">✅ {selectedEmployee.nom} {selectedEmployee.prenom} – {selectedEmployee.direction}</div>}
        </div>

        {/* Champs communs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Raison</label>
          <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24" value={raison} onChange={(e) => setRaison(e.target.value)} disabled={isReadOnly} required />
        </div>

        {/* Champs selon type */}
        {(type === 'medical' || type === 'prolongation' || type === 'regularisation') && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date début</label><input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label><input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={dateFin} onChange={(e) => setDateFin(e.target.value)} disabled={isReadOnly} required /></div>
          </div>
        )}

        {type === 'naissance' && (
          <div className="space-y-3">
            <div><label>Date et heure de naissance</label><input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={dateHeureNaissance} onChange={(e) => setDateHeureNaissance(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Sexe</label><select className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={sexeNaissance} onChange={(e) => setSexeNaissance(e.target.value)} disabled={isReadOnly} required><option value="">--</option><option value="Masculin">Masculin</option><option value="Féminin">Féminin</option></select></div>
            <div><label>Nom de l&apos;enfant</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={nomEnfant} onChange={(e) => setNomEnfant(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Prénom de l&apos;enfant</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={prenomEnfant} onChange={(e) => setPrenomEnfant(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Nom du père</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={nomPere} onChange={(e) => setNomPere(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Nom de la mère</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={nomMere} onChange={(e) => setNomMere(e.target.value)} disabled={isReadOnly} required /></div>
          </div>
        )}

        {type === 'deces' && (
          <div className="space-y-3">
            <div><label>Date et heure du décès</label><input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Âge (années)</label><input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={ageDefunt} onChange={(e) => setAgeDefunt(e.target.value ? Number(e.target.value) : '')} disabled={isReadOnly} required /></div>
            <div><label>Sexe</label><select className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={sexeDefunt} onChange={(e) => setSexeDefunt(e.target.value)} disabled={isReadOnly} required><option value="">--</option><option value="Masculin">Masculin</option><option value="Féminin">Féminin</option></select></div>
            <div><label>Lieu du décès</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={lieuDeces} onChange={(e) => setLieuDeces(e.target.value)} disabled={isReadOnly} required /></div>
            <div><label>Cause</label><input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={causeDeces} onChange={(e) => setCauseDeces(e.target.value)} disabled={isReadOnly} required /></div>
          </div>
        )}

        {/* Signature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <canvas ref={canvasRef} width={400} height={120} className="w-full cursor-crosshair touch-none" onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw} />
          </div>
          <div className="flex gap-3 mt-3">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300" onClick={clearCanvas} disabled={isReadOnly}>🗑️ Effacer</button>
            <button type="button" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200" onClick={generateAutoSignature} disabled={isReadOnly}>✨ Générer automatique</button>
            {signature && <span className="text-sm text-green-600 self-center">✅ Signé</span>}
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-[#ff4d6d] text-white rounded-lg font-bold hover:bg-[#e0435e] transition disabled:opacity-50" disabled={isReadOnly}>
          Créer le document
        </button>
      </form>
    </div>
  );
};

// ============================================================
// 10. COMPOSANT VALIDATION (inchangé)
// ============================================================
const ValidationQueue = ({ pendingDocs, onValidate, onReject }: { pendingDocs: Document[], onValidate: (id: number) => void, onReject: (id: number, motif: string) => void }) => {
  const [motif, setMotif] = useState<Record<number, string>>({});
  const [showMotif, setShowMotif] = useState<number | null>(null);

  const handleReject = (id: number) => {
    const m = motif[id]?.trim();
    if (!m) { alert('Motif obligatoire.'); return; }
    onReject(id, m);
    setShowMotif(null);
    setMotif(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#1a3a6b]">✅ Validation</h2>
      {pendingDocs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-400">🎉 Aucun document en attente.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1e1e2f] text-white"><tr><th className="px-4 py-3 text-left">Réf.</th><th className="px-4 py-3 text-left">Employé</th><th className="px-4 py-3 text-left">Période</th><th className="px-4 py-3 text-left">Raison</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {pendingDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{doc.reference}</td>
                  <td className="px-4 py-3">{doc.employeeName}</td>
                  <td className="px-4 py-3">
                    {doc.type === 'naissance' ? `Naissance ${formatDateTime(doc.dateHeureNaissance || '')}` :
                     doc.type === 'deces' ? `Décès ${formatDateTime(doc.dateDebut)}` :
                     `${formatDate(doc.dateDebut)} → ${formatDate(doc.dateFin)}`}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{doc.raison}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700" onClick={() => { if (confirm('Valider définitivement ?')) onValidate(doc.id); }}>✅ Valider</button>
                      {showMotif === doc.id ? (
                        <div className="flex items-center gap-2">
                          <input type="text" className="px-2 py-1 border border-gray-300 rounded text-xs w-40" placeholder="Motif..." value={motif[doc.id] || ''} onChange={(e) => setMotif(prev => ({ ...prev, [doc.id]: e.target.value }))} autoFocus />
                          <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700" onClick={() => handleReject(doc.id)}>Confirmer</button>
                          <button className="px-3 py-1 bg-gray-300 rounded-lg text-xs" onClick={() => setShowMotif(null)}>Annuler</button>
                        </div>
                      ) : (
                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600" onClick={() => setShowMotif(doc.id)}>❌ Rejeter</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 11. COMPOSANT STATISTIQUES (inchangé)
// ============================================================
const Stats = ({ documents }: { documents: Document[] }) => {
  const validated = documents.filter(d => d.status === 'validated');
  const joursParDirection = computeJoursParDirection(documents);
  const directions = Object.keys(joursParDirection).length > 0 ? Object.keys(joursParDirection) : ['DTA', 'DRH', 'DSI', 'DG'];
  const chartData = {
    labels: directions,
    datasets: [{ label: 'Jours d\'absence validés', data: directions.map(dir => joursParDirection[dir] || 0), backgroundColor: ['#1a3a6b','#2a5a8b','#4a7aab','#ff4d6d','#7a5aab'], borderRadius: 4 }],
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3a6b]">📈 Statistiques</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-[#1a3a6b]"><div className="text-2xl font-bold text-[#1a3a6b]">{documents.length}</div><div className="text-sm text-gray-500">Total</div></div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-500"><div className="text-2xl font-bold text-green-600">{validated.length}</div><div className="text-sm text-gray-500">Validés</div></div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-yellow-500"><div className="text-2xl font-bold text-yellow-600">{validated.filter(d => d.dateDebut && d.dateFin).reduce((acc,d) => { const start = new Date(d.dateDebut); const end = new Date(d.dateFin); return acc + Math.max(1, Math.round((end.getTime() - start.getTime())/86400000) + 1); }, 0)}</div><div className="text-sm text-gray-500">Jours cumulés</div></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm"><h3 className="text-md font-semibold text-[#1a3a6b] mb-4">📊 Jours d&apos;absence par direction</h3><div className="h-64"><Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} /></div></div>
    </div>
  );
};

// ============================================================
// 12. COMPOSANT AIDE (inchangé)
// ============================================================
const Help = () => {
  const faqs = [
    { q: 'Comment créer un certificat médical ?', a: 'Allez dans "Nouveau document", choisissez le type, l\'employé, remplissez les dates et raison, signez et soumettez.' },
    { q: 'Comment valider un document ?', a: 'Dans la section "Validation", vous pouvez valider ou rejeter avec un motif.' },
    { q: 'Que signifie la bascule de site ?', a: 'Si vous avez la permission, vous pouvez changer de site (Mbandjock/Nkoteng) pour consulter ou créer des documents sur l\'autre site.' },
    { q: 'Puis-je modifier un document rejeté ?', a: 'Oui, dans la liste des documents, un bouton "Modifier" apparaît pour les documents rejetés.' },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3a6b]">❓ Aide</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-600 mb-6">Retrouvez les réponses aux questions les plus fréquentes.</p>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-100 pb-4 last:border-0"><h4 className="font-semibold text-[#1a3a6b]">{idx+1}. {faq.q}</h4><p className="text-gray-600 text-sm mt-1">{faq.a}</p></div>
        ))}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">💡 Besoin d&apos;aide supplémentaire ? Contactez la DSI.</div>
      </div>
    </div>
  );
};

// ============================================================
// 13. COMPOSANT PRINCIPAL (avec bascule de site et permissions)
// ============================================================
export default function GestMedicertDemo() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<Document | null>(null);

  // Gestion de l'utilisateur et des permissions
  const [userRole, setUserRole] = useState<'admin' | 'medecin' | 'direction' | 'secretaire'>('admin');
  const [userEntite, setUserEntite] = useState<'Mbandjock' | 'Nkoteng'>('Mbandjock');
  const [userHomeEntite, setUserHomeEntite] = useState<'Mbandjock' | 'Nkoteng'>('Mbandjock');
  const [peutBasculer, setPeutBasculer] = useState(true);
  const [peutModifierAutreSite, setPeutModifierAutreSite] = useState(false);

  // Filtrage des employés par site actif
  const filteredEmployees = mockEmployees.filter(emp => emp.site === userEntite);

  // Création
  const handleCreate = (newDoc: Document) => {
    setDocuments(prev => [newDoc, ...prev]);
    setCurrentPage('documents');
  };

  // Validation / rejet
  const handleValidate = (id: number) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: 'validated', medecin: 'Dr. Nisso' } : d));
  };
  const handleReject = (id: number, motif: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected', motifRejet: motif } : d));
  };

  // Bascule de site
  const handleChangeSite = (site: 'Mbandjock' | 'Nkoteng') => {
    if (!peutBasculer) return;
    setUserEntite(site);
    // Réinitialiser la page courante pour éviter les incohérences
    setCurrentPage('dashboard');
  };

  // Réinitialise entièrement la démo (utile après avoir testé la création/validation)
  const handleResetDemo = () => {
    setDocuments(initialDocuments);
    setUserRole('admin');
    setUserEntite('Mbandjock');
    setUserHomeEntite('Mbandjock');
    setPeutBasculer(true);
    setPeutModifierAutreSite(false);
    setCurrentPage('dashboard');
    setSelectedPdfDoc(null);
  };

  // Permission : l'utilisateur peut-il créer sur le site actuel ?
  const canCreateHere = userRole === 'admin' || (userEntite === userHomeEntite) || (peutBasculer && peutModifierAutreSite);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Bandeau démo — contexte pour les visiteurs du portfolio */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#ff4d6d] text-white text-xs font-medium text-center py-1.5 ml-64">
        🎭 Démo interactive — données 100% fictives — application réelle construite pour SOSUCAM (hors ligne, PHP/SQL Server)
      </div>

      {/* Barre supérieure avec bascule de site, rôle et infos utilisateur */}
      <div className="fixed top-7 left-0 right-0 z-40 bg-white shadow-md px-6 py-2 flex justify-between items-center border-b border-gray-200 ml-64">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm font-semibold text-[#1a3a6b] flex items-center gap-1">
            👤
            <select
              className="border border-gray-300 rounded px-1 py-0.5 text-sm font-semibold text-[#1a3a6b]"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as typeof userRole)}
              title="Essayer un autre rôle"
            >
              <option value="admin">Admin</option>
              <option value="medecin">Médecin</option>
              <option value="direction">Direction</option>
              <option value="secretaire">Secrétaire</option>
            </select>
          </label>
          <span className="text-sm text-gray-500">| Site : {userEntite}</span>
          {peutBasculer && (
            <select
              className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm"
              value={userEntite}
              onChange={(e) => handleChangeSite(e.target.value as 'Mbandjock' | 'Nkoteng')}
            >
              <option value="Mbandjock">Mbandjock</option>
              <option value="Nkoteng">Nkoteng</option>
            </select>
          )}
          {userEntite !== userHomeEntite && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {peutModifierAutreSite ? '✏️ Modification autorisée' : '🔒 Lecture seule'}
            </span>
          )}
          <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
            <input type="checkbox" checked={peutBasculer} onChange={(e) => setPeutBasculer(e.target.checked)} />
            Peut basculer
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
            <input type="checkbox" checked={peutModifierAutreSite} onChange={(e) => setPeutModifierAutreSite(e.target.checked)} />
            Modifier autre site
          </label>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('validation')}
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
            title="Documents en attente de validation"
          >
            <span className="text-xl">🔔</span>
            {documents.filter(d => d.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {documents.filter(d => d.status === 'pending').length}
              </span>
            )}
          </button>
          <span className="text-xs text-gray-400">Domicile : {userHomeEntite}</span>
          <button onClick={handleResetDemo} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-medium">
            ↺ Réinitialiser la démo
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} userRole={userRole} userEntite={userEntite} />

      {/* Contenu principal (avec marge pour la barre supérieure) */}
      <main className="ml-64 mt-24 p-6 min-h-screen">
        {currentPage === 'dashboard' && <Dashboard documents={documents} />}
        {currentPage === 'documents' && <DocumentList documents={documents} onViewPdf={setSelectedPdfDoc} />}
        {currentPage === 'new' && (
          <DocumentForm
            employees={filteredEmployees}
            onCreate={handleCreate}
            userEntite={userEntite}
            canModifyOtherSite={canCreateHere}
          />
        )}
        {currentPage === 'validation' && (
          <ValidationQueue
            pendingDocs={documents.filter(d => d.status === 'pending')}
            onValidate={handleValidate}
            onReject={handleReject}
          />
        )}
        {currentPage === 'stats' && <Stats documents={documents} />}
        {currentPage === 'help' && <Help />}
      </main>

      {/* PDF Viewer Modal */}
      {selectedPdfDoc && (
        <PdfViewer doc={selectedPdfDoc} onClose={() => setSelectedPdfDoc(null)} />
      )}
    </div>
  );
}