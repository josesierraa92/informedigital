import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, TrendingUp, UserCheck, UserX, Clock, ChevronDown,
  ChevronLeft, ChevronRight, Presentation, MapPin, BookOpen,
  GraduationCap, Building, Phone, Calendar, PieChart as PieChartIcon,
  Award, Star, Ticket, ArrowRight, ShieldCheck, Megaphone, Wrench,
  Headset, ExternalLink, MessageCircle
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LabelList
} from 'recharts';
import { cn } from '../utils';
import {
  parseData, getGanados, getCupones, getKPISummary, getLeadsByAdvisor, getLeadsByStatus,
  getLeadsByFaculty, getLeadsByArea, getLeadsByTitle, getLeadsByDepartment,
  getLeadsByUniversity, getAdvisorStats
} from '../data';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#64748b', '#f43f5e', '#0ea5e9'];

const getUniversityColor = (university: string, index: number = 0) => {
  const normalized = university.toLowerCase();
  if (normalized.includes('unir') && !normalized.includes('funir')) return '#0ea5e9'; // azul agua marina
  if (normalized.includes('funir')) return '#06b6d4'; // cyan
  if (normalized.includes('asturias')) return '#f59e0b'; // amarillo
  return COLORS[index % COLORS.length];
};

const getStatusColor = (status: string, index: number = 0) => {
  const normalized = status.toLowerCase();
  if (normalized.includes('ganado')) return '#10b981';
  if (normalized.includes('perdido')) return '#ef4444';
  if (normalized.includes('valorando') || normalized.includes('cupón') || normalized.includes('cupon')) return '#a855f7'; // morado
  if (normalized.includes('por contactar')) return '#3b82f6'; // azul
  if (normalized.includes('siguiente convocatoria')) return '#14b8a6'; // azul verdoso
  if (normalized.includes('contactando')) return '#f97316'; // naranja
  if (normalized.includes('ilegible')) return '#64748b';
  if (normalized.includes('spam')) return '#334155';
  if (normalized.includes('doble')) return '#94a3b8';
  return COLORS[index % COLORS.length];
};

const getInterestColor = (level: string) => {
  const normalized = level.toLowerCase();
  if (normalized === 'alto') return '#10b981';
  if (normalized === 'medio') return '#f59e0b';
  if (normalized === 'bajo') return '#64748b';
  return '#475569';
};

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const leads = useMemo(() => parseData(), []);
  const ganadosMes = useMemo(() => getGanados(), []);
  const cuponesMes = useMemo(() => getCupones(), []);
  const kpis = useMemo(() => getKPISummary(leads), [leads]);
  const leadsByStatus = useMemo(() => getLeadsByStatus(leads), [leads]);
  const advisorStats = useMemo(() => getAdvisorStats(leads, ganadosMes), [leads, ganadosMes]);
  const leadsByFaculty = useMemo(() => getLeadsByFaculty(leads), [leads]);
  const leadsByArea = useMemo(() => getLeadsByArea(leads), [leads]);
  const leadsByTitle = useMemo(() => getLeadsByTitle(leads), [leads]);
  const leadsByDepartment = useMemo(() => getLeadsByDepartment(leads), [leads]);
  const leadsByUniversity = useMemo(() => getLeadsByUniversity(leads), [leads]);

  const slides = [
    // Slide 1: Portada
    () => (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-1000">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00a672] to-[#00df9a] flex items-center justify-center shadow-2xl shadow-[#00df9a]/20 mb-4">
          <Presentation className="text-white w-12 h-12" />
        </div>
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-sm uppercase tracking-[0.4em] text-[#00df9a] font-bold">Reporte Ejecutivo • Mes de Julio</h1>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
            Informe y Proyección <br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00df9a] to-[#5cffd6]">Canal Digital</span>
          </h2>
        </div>
        <div className="pt-12 border-t border-[#053629] w-64">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">Actualizado</p>
          <p className="text-white font-mono mt-2">{new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
    ),

    // Slide 2: Leads y Universidades
    () => (
      <div className="h-full flex flex-col space-y-8">
        <div className="flex justify-between items-end shrink-0">
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <Building className="text-[#00df9a] w-8 h-8" /> Leads totales Unieduca
            </h2>
            <p className="text-slate-400">Informe de los leads totales y su distribución por institución educativa.</p>
          </div>
          <div className="flex items-end gap-8 md:gap-16">
            <div className="flex flex-col items-end">
              <div className="relative mr-2">
                <div className="absolute -inset-4 bg-purple-500/20 blur-xl rounded-full"></div>
                <div className="relative text-6xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] tracking-tighter">748</div>
              </div>
              <div className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold mt-2 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">Leads Total Otoño 2026</div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="relative mr-2">
                <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full"></div>
                <div className="relative text-6xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] tracking-tighter">{kpis.total}</div>
              </div>
              <div className="text-xs text-blue-400 uppercase tracking-[0.2em] font-bold mt-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">Total Leads (Julio)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 min-h-0 pb-4">
          {leadsByUniversity.map((uni, index) => {
            const color = getUniversityColor(uni.name, index);
            
            const getInstitutionType = (name: string) => {
              const n = name.toUpperCase();
              if (n.includes('FUNIR')) return 'Pregrados y Especializaciones';
              if (n.includes('UNIR')) return 'Maestrías Universitarias';
              if (n.includes('ASTURIAS')) return 'Pregrados, Especializaciones y Maestrías';
              if (n.includes('IEP')) return 'Doctorados';
              return 'Institución Educativa';
            };
            
            return (
              <div key={uni.name} className="bg-[#032018]/40 border border-[#053629]/80 rounded-2xl p-8 flex flex-col hover:bg-[#053629]/50 transition-all h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: color }} />
                
                <div className="flex flex-col items-center text-center mb-8 shrink-0">
                  <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold shadow-xl" style={{ backgroundColor: `${color}15`, color: color, border: `1px solid ${color}30` }}>
                    {uni.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{uni.name}</h3>
                  <p className="text-slate-400 text-sm">{getInstitutionType(uni.name)}</p>
                </div>
                
                <div className="mt-auto flex flex-col justify-end">
                  <div className="w-full flex justify-between items-end mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Volumen</span>
                    <span className="text-4xl font-bold text-white leading-none">{uni.value}</span>
                  </div>
                  <div className="w-full bg-[#02120e]/50 h-2 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full" style={{ width: `${(uni.value / kpis.total) * 100}%`, backgroundColor: color }} />
                  </div>
                  <div className="w-full text-right text-xs font-bold uppercase tracking-wider" style={{ color: color }}>
                    {((uni.value / kpis.total) * 100).toFixed(1)}% del total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    // Slide 3: Distribución Estado de Leads
    () => {
      // Los Ganados del mes (6) incluyen cierres de convocatorias previas que
      // no están en el pipeline principal, por eso se sobreescribe el conteo.
      const adjustedByStatus = leadsByStatus.map(s =>
        s.name.toLowerCase().includes('ganado') ? { ...s, value: ganadosMes.length } : s
      );
      const sortedLeadsByStatus = [...adjustedByStatus].sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        const getOrder = (name: string) => {
          if (name.includes('ganado')) return 100;
          if (name.includes('valorando') || name.includes('cupón')) return 95;
          if (name.includes('contactando')) return 90;
          return 0;
        };
        
        const orderA = getOrder(aName);
        const orderB = getOrder(bName);
        
        if (orderA !== orderB) return orderA - orderB;
        return b.value - a.value;
      });

      return (
        <div className="h-full flex flex-col space-y-6">
          <div className="space-y-2 shrink-0">
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <PieChartIcon className="text-[#00df9a] w-8 h-8" /> Distribución Estado de Leads
            </h2>
            <p className="text-slate-400">Análisis del estado actual de todos los prospectos ingresados.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 min-h-0">
            <div className="lg:col-span-3 bg-[#032018]/40 border border-[#053629]/80 rounded-2xl p-8 relative overflow-hidden flex flex-col h-full">
              <h3 className="text-lg font-medium text-white mb-6 shrink-0">Volumen por Estado</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedLeadsByStatus} layout="vertical" margin={{ top: 0, right: 40, left: 60, bottom: 0 }}>
                    <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={120} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {sortedLeadsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getStatusColor(entry.name, index)} />
                      ))}
                      <LabelList dataKey="value" position="right" fill="#94a3b8" fontSize={12} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-2 bg-[#032018]/40 border border-[#053629]/80 rounded-2xl p-6 flex flex-col h-full overflow-hidden">
              <h3 className="text-lg font-medium text-white mb-6 shrink-0">Desglose Detallado</h3>
              <div className="flex flex-col justify-between flex-1 min-h-0 pb-2">
                {sortedLeadsByStatus.map((status, i) => {
                  const color = getStatusColor(status.name, i);
                  const isGanado = status.name.toLowerCase().includes('ganado');
                  const isValorando = status.name.toLowerCase().includes('valorando') || status.name.toLowerCase().includes('cupón');

                  return (
                    <div key={status.name} className={cn("py-2.5 px-4 rounded-xl border flex justify-between items-center w-full transition-all shrink-0", isGanado ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02] z-10" : "bg-[#02120e]/40 border-[#053629] hover:bg-[#053629]/40")}>
                      <div className="flex items-center gap-3">
                        {isGanado ? (
                          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-3 h-3 rounded-full shrink-0 shadow-lg ml-2" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}></div>
                        )}
                        <div className="flex flex-col">
                          <span className={cn("text-sm line-clamp-1", isGanado ? "text-emerald-400 font-bold" : "text-slate-200 font-medium")}>{status.name}</span>
                          {isValorando && (
                            <span className="text-xs text-amber-500 mt-0.5 font-medium flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" /> {cuponesMes.length} pasan a cupón
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", isGanado ? "text-emerald-500/80" : "text-slate-400")}>{(status.value / kpis.total * 100).toFixed(1)}%</span>
                        <span className={cn("text-xl font-bold w-12 text-right", isGanado ? "text-emerald-400" : "text-white")}>{status.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    },

    // Slide 4: Ganados del Mes
    () => {
      const ganados = ganadosMes;
      
      const advisorCards = [
        { 
          name: 'Jineth Janeth Sarmiento', 
          count: ganados.filter(l => l.advisor.includes('Jineth')).length,
          bgClass: 'from-emerald-500/20 to-[#032018] border-emerald-500/30 shadow-emerald-500/5',
          textClass: 'text-emerald-400',
          iconBgClass: 'bg-emerald-500/20 border-emerald-500/30',
          icon: <Star className="text-emerald-400 w-8 h-8" />
        },
        { 
          name: 'Yeisi Gallego', 
          count: ganados.filter(l => l.advisor.includes('Yeisi')).length,
          bgClass: 'from-blue-500/20 to-[#032018] border-blue-500/30 shadow-blue-500/5',
          textClass: 'text-blue-400',
          iconBgClass: 'bg-blue-500/20 border-blue-500/30',
          icon: <Award className="text-blue-400 w-8 h-8" />
        },
        { 
          name: 'Yesica Marcela Giraldo', 
          count: ganados.filter(l => l.advisor.includes('Yesica')).length,
          bgClass: 'from-purple-500/20 to-[#032018] border-purple-500/30 shadow-purple-500/5',
          textClass: 'text-purple-400',
          iconBgClass: 'bg-purple-500/20 border-purple-500/30',
          icon: <UserCheck className="text-purple-400 w-8 h-8" />
        },
        { 
          name: 'Nathaly Rojas Barreiro', 
          count: ganados.filter(l => l.advisor.includes('Nathaly')).length,
          bgClass: 'from-orange-500/20 to-[#032018] border-orange-500/30 shadow-orange-500/5',
          textClass: 'text-orange-400',
          iconBgClass: 'bg-orange-500/20 border-orange-500/30',
          icon: <TrendingUp className="text-orange-400 w-8 h-8" />
        }
      ];
      
      return (
        <div className="h-full flex flex-col space-y-8">
          <div className="space-y-2 shrink-0">
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <Award className="text-[#00df9a] w-8 h-8" /> Cierres del Mes (Ganados)
            </h2>
            <p className="text-slate-400">Detalle de los {ganados.length} estudiantes confirmados en el periodo actual.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8 shrink-0">
            {advisorCards.map(card => (
              <div key={card.name} className={`bg-gradient-to-br ${card.bgClass} border rounded-xl p-6 flex items-center justify-between shadow-2xl`}>
                <div>
                  <p className={`${card.textClass} text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-2`}>{card.name}</p>
                  <p className="text-4xl lg:text-5xl font-bold text-white">{card.count} <span className="text-base lg:text-xl text-slate-400 font-light tracking-normal">Ganado{card.count !== 1 ? 's' : ''}</span></p>
                </div>
                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full ${card.iconBgClass} flex items-center justify-center border shrink-0`}>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#032018]/50 border border-[#053629] rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto w-full h-full p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-[1fr]">
                {ganados.map(lead => (
                  <div key={lead.id} className="p-5 bg-[#053629]/40 border border-[#084f3c] rounded-lg flex justify-between items-center hover:border-[#00df9a]/50 transition-all h-full">
                    <div>
                      <h4 className="text-lg font-bold text-white">{lead.name}</h4>
                      <p className="text-sm">
                        <span style={{ color: getUniversityColor(lead.university) }} className="font-semibold">{lead.university}</span>
                        <span className="text-slate-400"> • {lead.title || lead.faculty}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-400">{lead.advisor}</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">{lead.createdDate?.split(' ')[0] || '-'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    },

    // Slide 6: Oportunidades con Cupón
    () => {
      const cupones = cuponesMes;
      return (
        <div className="h-full flex flex-col space-y-8">
          <div className="space-y-2 shrink-0 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
                <Ticket className="text-[#00df9a] w-8 h-8" /> Leads con Cupón (Alta Intención)
              </h2>
              <p className="text-slate-400">Prospectos marcados como prioritarios ("Pasa Cupón").</p>
              <div className="flex gap-4 mt-4 text-sm font-medium">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg">
                  Jineth Sarmiento: <span className="text-white font-bold text-lg ml-1">{cupones.filter(l => l.advisor.includes('Jineth')).length}</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-lg">
                  Yeisi Gallego: <span className="text-white font-bold text-lg ml-1">{cupones.filter(l => l.advisor.includes('Yeisi')).length}</span>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="relative mr-2 mt-2">
                <div className="absolute -inset-4 bg-[#00df9a]/20 blur-xl rounded-full"></div>
                <div className="relative text-6xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,223,154,0.5)] tracking-tighter">{cupones.length}</div>
              </div>
              <div className="text-xs text-[#00df9a] uppercase tracking-[0.2em] font-bold mt-2 bg-[#00df9a]/10 px-4 py-1.5 rounded-full border border-[#00df9a]/20">Total Cupones</div>
            </div>
          </div>
          
          <div className="bg-[#032018]/50 border border-[#00df9a]/30 rounded-xl overflow-hidden flex flex-col flex-1 min-h-0 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <div className="overflow-x-auto overflow-y-auto w-full h-full">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-[#00df9a] uppercase tracking-widest bg-amber-950/40 font-bold sticky top-0 backdrop-blur-md z-10 border-b border-amber-900/50">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Asesor</th>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Programa</th>
                    <th className="px-6 py-4">Ciudad</th>
                    <th className="px-6 py-4">Interés</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#053629]/80">
                  {cupones.map((lead, index) => (
                    <tr key={lead.id} className="hover:bg-amber-900/20 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{index + 1}</td>
                      <td className="px-6 py-4 text-[#5cffd6]/80 text-xs font-bold">{lead.advisor}</td>
                      <td className="px-6 py-4 font-medium text-slate-200">{lead.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs max-w-[200px] truncate" title={lead.title || lead.faculty}>{lead.title || lead.faculty}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{lead.city || '-'}</td>
                      <td className="px-6 py-4">
                        {lead.interestLevel ? (
                          <span
                            className="px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase whitespace-nowrap border w-fit"
                            style={{
                              backgroundColor: `${getInterestColor(lead.interestLevel)}15`,
                              borderColor: `${getInterestColor(lead.interestLevel)}30`,
                              color: getInterestColor(lead.interestLevel)
                            }}
                          >
                            {lead.interestLevel}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className={cn(
                            "px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase whitespace-nowrap border flex items-center gap-1 w-fit",
                            lead.status.toLowerCase().includes('ganado') ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : ""
                          )}
                          style={!lead.status.toLowerCase().includes('ganado') ? {
                            backgroundColor: `${getStatusColor(lead.status)}15`,
                            borderColor: `${getStatusColor(lead.status)}30`,
                            color: getStatusColor(lead.status)
                          } : undefined}
                        >
                          {lead.status.toLowerCase().includes('ganado') && <Award className="w-3 h-3" />}
                          {lead.status.replace('/Cupón', '')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    },

    // Slide 7: Detalle de Asesores (Tabla)
    () => (
      <div className="h-full flex flex-col space-y-8">
        <div className="space-y-2 shrink-0">
          <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
            <UserCheck className="text-[#00df9a] w-8 h-8" /> Eficiencia Comercial
          </h2>
          <p className="text-slate-400">Desglose de conversiones y efectividad por cada asesor educativo.</p>
        </div>

        <div className="bg-[#032018]/50 border border-[#053629] rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="overflow-x-auto overflow-y-auto w-full h-full">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-slate-400 uppercase tracking-widest bg-[#053629]/80 font-bold sticky top-0 backdrop-blur-md z-10">
                <tr>
                  <th className="px-6 py-5">Asesor Educativo</th>
                  <th className="px-6 py-5 text-center">Leads Totales</th>
                  <th className="px-6 py-5 text-center text-emerald-400">Ganados</th>
                  <th className="px-6 py-5 text-center text-[#5cffd6]">En Proceso</th>
                  <th className="px-6 py-5 text-center text-red-400">Perdidos</th>
                  <th className="px-6 py-5 text-center">Conversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#053629]">
                {advisorStats.map((advisor) => (
                  <tr key={advisor.name} className="hover:bg-[#053629]/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">{advisor.name}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-300">{advisor.total}</td>
                    <td className="px-6 py-4 text-center font-mono text-emerald-400">{advisor.won}</td>
                    <td className="px-6 py-4 text-center font-mono text-[#5cffd6]">{advisor.evaluating}</td>
                    <td className="px-6 py-4 text-center font-mono text-red-400">{advisor.lost}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-white">{advisor.conversion}%</span>
                        <div className="w-16 h-1.5 bg-[#053629] rounded-full overflow-hidden">
                          <div className="h-full bg-[#00df9a]" style={{ width: `${advisor.conversion}%` }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),

    // Slide 8: Facultades y Áreas
    () => (
      <div className="h-full flex flex-col space-y-8">
        <div className="space-y-2 shrink-0">
          <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
            <BookOpen className="text-[#00df9a] w-8 h-8" /> Intereses Académicos
          </h2>
          <p className="text-slate-400">Distribución de demanda por Facultades y Grandes Áreas de Estudio.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
          <div className="bg-[#032018]/50 border border-[#053629] rounded-xl p-8 relative overflow-hidden flex flex-col">
            <h3 className="text-lg font-medium text-white mb-6">Top Facultades</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsByFaculty.slice(0, 7)} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                  <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={140} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {leadsByFaculty.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />)}
                    <LabelList dataKey="value" position="right" fill="#94a3b8" fontSize={11} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#032018]/50 border border-[#053629] rounded-xl p-8 relative overflow-hidden flex flex-col">
            <h3 className="text-lg font-medium text-white mb-6">Áreas de Estudio</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={leadsByArea.slice(0, 6)} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value" label={({ value }) => value} labelLine={false} stroke="none" style={{ outline: 'none' }}>
                    {leadsByArea.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                  <Legend verticalAlign="bottom" height={80} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    ),


    // Slide 9: Programas Específicos
    () => (
      <div className="h-full flex flex-col space-y-8">
        <div className="space-y-2 shrink-0">
          <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
            <GraduationCap className="text-[#00df9a] w-8 h-8" /> Programas de Mayor Demanda
          </h2>
          <p className="text-slate-400">Títulos y maestrías específicas con mayor cantidad de prospectos.</p>
        </div>

        <div className="bg-[#032018]/50 border border-[#053629] rounded-xl p-8 flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leadsByTitle.slice(0, 14).map((title, i) => (
              <div key={title.name} className="flex items-center justify-between p-5 bg-[#053629]/40 border border-[#053629]/80 rounded-lg hover:border-[#00df9a]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-[#053629] flex items-center justify-center font-bold text-slate-400 text-xs">
                    #{i + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-200 line-clamp-2 pr-4">{title.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-white">{title.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    // Slide 11: Ganados por Mes
    () => {
      const ganadosMesData = [
        { name: 'Abril', value: 6 },
        { name: 'Mayo', value: 3 },
        { name: 'Junio', value: 5 },
        { name: 'Julio', value: 9 },
      ];

      return (
        <div className="h-full flex flex-col space-y-6">
          <div className="space-y-2 shrink-0">
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <Calendar className="text-[#00df9a] w-8 h-8" /> Tendencia de Ganados por Mes
            </h2>
            <p className="text-slate-400">Evolución de matrículas confirmadas (Abril, Mayo, Junio, Julio).</p>
          </div>

          <div className="bg-gradient-to-b from-[#032018]/80 to-transparent border border-[#00df9a]/20 rounded-xl p-8 flex-1 min-h-0 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(0,223,154,0.05)]">
            <h3 className="text-xl font-medium text-white mb-8 shrink-0 text-center">Matrículas Confirmadas (Ganados)</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ganadosMesData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={14} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={14} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(0, 223, 154, 0.2)', strokeWidth: 2 }} 
                    contentStyle={{ backgroundColor: '#02120e', border: '1px solid #00df9a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#00df9a', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Ganados"
                    stroke="#00df9a" 
                    strokeWidth={4}
                    dot={{ r: 6, fill: '#00df9a', stroke: '#02120e', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#fff', stroke: '#00df9a', strokeWidth: 2 }}
                  >
                    <LabelList dataKey="value" position="top" fill="#00df9a" fontSize={16} fontWeight="bold" offset={15} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      );
    },

    // Slide 12: Tarifas de WhatsApp Business Platform
    () => {
      const categories = [
        {
          name: 'Autenticación',
          icon: <ShieldCheck className="w-6 h-6" />,
          color: '#3b82f6',
          description: 'Códigos de verificación para confirmar la identidad del usuario (OTP, doble factor).',
          example: '"Tu código de verificación Unieduca es 482910. No lo compartas con nadie."',
          price: '$2,9455',
        },
        {
          name: 'Marketing',
          icon: <Megaphone className="w-6 h-6" />,
          color: '#a855f7',
          description: 'Promociones, ofertas y anuncios para atraer nuevos leads o reactivar prospectos.',
          example: '"🎓 Últimos cupos para la Maestría en Educación. ¡20% de descuento esta semana!"',
          price: '$46,0227',
        },
        {
          name: 'Utilidad',
          icon: <Wrench className="w-6 h-6" />,
          color: '#00df9a',
          description: 'Actualizaciones sobre una transacción o solicitud en curso (confirmaciones, recordatorios).',
          example: '"Tu inscripción a la Especialización fue confirmada. ¡Bienvenido a Unieduca!"',
          price: '$2,9455',
        },
        {
          name: 'Servicio',
          icon: <Headset className="w-6 h-6" />,
          color: '#64748b',
          description: 'Conversación iniciada por el usuario y respondida dentro de la ventana de atención (24h).',
          example: '"Hola, quiero información sobre la Maestría en Derecho."',
          price: 'Gratis',
          isFree: true,
        },
      ];

      return (
        <div className="h-full flex flex-col space-y-6">
          <div className="space-y-2 shrink-0">
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <MessageCircle className="text-[#00df9a] w-8 h-8" /> Tarifas de WhatsApp Business Platform
            </h2>
            <p className="text-slate-400">
              Meta cobra por categoría de mensaje enviado. Referencia de tarifas para Colombia (COP) por conversación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1 min-h-0">
            {categories.map(cat => (
              <div
                key={cat.name}
                className="bg-[#032018]/50 border rounded-2xl p-6 flex flex-col shadow-lg"
                style={{ borderColor: `${cat.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
                    style={{ backgroundColor: `${cat.color}15`, borderColor: `${cat.color}30`, color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">{cat.description}</p>

                <div className="bg-[#02120e]/60 border border-[#053629] rounded-lg p-3 mb-4 flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Ejemplo</p>
                  <p className="text-xs text-slate-300 italic leading-relaxed">{cat.example}</p>
                </div>

                <div className="mt-auto">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Tarifa por mensaje (COP)</p>
                  <p
                    className={cn("text-3xl font-bold tracking-tight", cat.isFree ? "text-[#00df9a]" : "text-white")}
                  >
                    {cat.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 flex items-center justify-between bg-[#032018]/40 border border-[#053629]/80 rounded-xl px-6 py-3">
            <p className="text-xs text-slate-500">Fuente: tarifas oficiales de Meta para Colombia (COP), consultadas en el comparador de WhatsApp Business Platform.</p>
            <a
              href="https://whatsappbusiness.com/es-la/products/platform-pricing/?country=Colombia&currency=Peso%20colombiano%20(COP)&category=Marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-[#00df9a] hover:text-[#5cffd6] transition-colors shrink-0 ml-4"
            >
              Ver comparador oficial <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      );
    },

    // Slide 13: Gracias
    () => (
      <div className="h-full flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00df9a]/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00df9a]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="z-10 text-center space-y-6">
          <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-[#00df9a] drop-shadow-[0_0_30px_rgba(0,223,154,0.3)] py-4 pr-8">
            Gracias
          </h1>
          <p className="text-xl md:text-2xl text-[#00df9a]/80 font-light tracking-wide max-w-2xl mx-auto">
            Por su atención.
          </p>
        </div>

        <div className="z-10 mt-12 flex gap-4">
          <div className="flex items-center gap-2 text-slate-400 bg-[#053629]/40 px-4 py-2 rounded-full border border-[#00df9a]/10">
            <Award className="w-4 h-4 text-[#00df9a]" />
            <span className="text-sm">Unieduca 2026</span>
          </div>
        </div>
      </div>
    ),
  ];

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="h-screen w-full bg-[#02120e] text-slate-200 font-sans flex flex-col overflow-hidden selection:bg-[#00df9a]/30">
      {/* Header Fijo */}
      <header className="shrink-0 border-b border-[#053629]/60 bg-[#02120e]/80 backdrop-blur-xl z-50 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-unieduca.png" alt="Unieduca" className="h-9 w-auto" />
          </div>
          <div className="h-8 border-l border-[#053629] ml-2"></div>
          <span className="text-sm font-bold tracking-widest text-slate-300 uppercase">Canal Digital <span className="text-[#00df9a] ml-2 border-l border-[#084f3c] pl-3">Informe Mes de Julio</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentSlide === i ? "w-8 bg-[#00df9a]" : "w-2 bg-[#053629] hover:bg-[#084f3c]"
              )}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Diapositiva <span className="text-white">{currentSlide + 1}</span> / {slides.length}
        </div>
      </header>

      {/* Contenido de la Diapositiva */}
      <main className="flex-1 min-h-0 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#032018]/40 via-[#02120e] to-[#02120e]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#00df9a]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
        
        <div className="h-full w-full px-8 py-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Controles de Navegación Inferiores */}
      <footer className="shrink-0 border-t border-[#053629]/60 bg-[#02120e]/80 backdrop-blur-xl z-50 p-4 flex justify-between items-center px-8">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#053629] text-slate-300 font-medium hover:bg-[#053629]/50 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Anterior
        </button>
        
        <div className="text-xs font-mono text-slate-600">Confidencial — Uso Interno</div>

        <button
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00df9a] text-[#02120e] font-bold hover:bg-[#5cffd6] transition-all disabled:opacity-30 disabled:hover:bg-[#00df9a] disabled:cursor-not-allowed group shadow-lg shadow-[#00df9a]/10"
        >
          Siguiente
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}

function KpiCard({ title, value, icon, trend, color = 'amber' }: { title: string, value: string | number, icon: React.ReactNode, trend: string, color?: 'amber' | 'blue' | 'emerald' | 'purple' | 'red' }) {
  
  const colorMap = {
    amber: 'bg-[#00df9a] text-[#00df9a] border-[#00df9a]/20 from-amber-500/10',
    blue: 'bg-blue-500 text-blue-500 border-blue-500/20 from-blue-500/10',
    emerald: 'bg-emerald-500 text-emerald-500 border-emerald-500/20 from-emerald-500/10',
    purple: 'bg-purple-500 text-purple-500 border-purple-500/20 from-purple-500/10',
    red: 'bg-red-500 text-red-500 border-red-500/20 from-red-500/10',
  };

  const selectedColor = colorMap[color];
  const bgClass = selectedColor.split(' ')[0];
  const textClass = selectedColor.split(' ')[1];
  const gradientClass = selectedColor.split(' ')[3];

  return (
    <div className="bg-[#032018] border border-[#053629] p-6 rounded-xl flex flex-col justify-between hover:bg-[#053629]/50 transition-colors relative overflow-hidden group h-40">
      <div className={`absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-gradient-to-bl ${gradientClass} to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex justify-between items-start mb-1 relative z-10">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">{title}</p>
        <div className={textClass}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-3 mb-5 relative z-10">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
        <span className={`text-[10px] uppercase font-bold tracking-widest truncate ${textClass}`}>{trend}</span>
      </div>
      <div className="w-full bg-[#053629] h-1.5 rounded-full overflow-hidden relative z-10">
        <div className={`${bgClass} h-full w-[70%]`} />
      </div>
    </div>
  );
}
