export interface Lead {
  id: string;
  status: string;
  advisor: string;
  name: string;
  phone: string;
  call: string;
  channel: string;
  digitalId: string;
  university: string;
  area: string;
  faculty: string;
  title: string;
  company: string;
  email: string;
  lastStudies: string;
  city: string;
  department: string;
  paymentMethod: string;
  reservePaymentDate: string;
  closingMonth: string;
  classStart: string;
  discount: string;
  initialValue: string;
  finalValue: string;
  coupon: string;
  directorComment: string;
  lastFollowUp: string;
  transferred: string;
  agreementInfo: string;
  financialInfo: string;
  homologation: string;
  lastUpdate: string;
  createdDate: string;
}

export const parseData = (): Lead[] => {
  const lines = rawData.trim().split('\n');
  const leads: Lead[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(';');
    if (parts.length >= 10) {
      leads.push({
        id: parts[0] || '',
        status: parts[1] || '',
        advisor: parts[2] || '',
        name: parts[3] || '',
        phone: parts[4] || '',
        call: parts[5] || '',
        channel: parts[6] || '',
        digitalId: parts[7] || '',
        university: parts[8] || '',
        area: parts[9] || '',
        faculty: parts[10] || '',
        title: parts[11] || '',
        company: parts[12] || '',
        email: parts[13] || '',
        lastStudies: parts[14] || '',
        city: parts[15] || '',
        department: parts[16] || '',
        paymentMethod: parts[17] || '',
        reservePaymentDate: parts[18] || '',
        closingMonth: parts[19] || '',
        classStart: parts[20] || '',
        discount: parts[21] || '',
        initialValue: parts[22] || '',
        finalValue: parts[23] || '',
        coupon: parts[24] || '',
        directorComment: parts[25] || '',
        lastFollowUp: parts[26] || '',
        transferred: parts[27] || '',
        agreementInfo: parts[28] || '',
        financialInfo: parts[29] || '',
        homologation: parts[30] || '',
        lastUpdate: parts[31] || '',
        createdDate: parts[32] || '',
      });
    }
  }
  return leads;
};

export const getKPISummary = (leads: Lead[]) => {
  const total = leads.length;
  const won = leads.filter(l => l.status.toLowerCase() === 'ganado').length;
  const lost = leads.filter(l => l.status.toLowerCase() === 'perdido').length;
  const active = total - won - lost;
  const conversionRate = total > 0 ? ((won / total) * 100).toFixed(1) : '0';
  
  return {
    total,
    totalLeads: total,
    wonLeads: won,
    lostLeads: lost,
    activeLeads: active,
    conversionRate: conversionRate + '%'
  };
};

const groupByCount = (leads: Lead[], keyFn: (l: Lead) => string) => {
  const counts: Record<string, number> = {};
  leads.forEach(l => {
    const key = keyFn(l) || 'Sin Dato';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getLeadsByStatus = (leads: Lead[]) => groupByCount(leads, l => l.status);
export const getLeadsByAdvisor = (leads: Lead[]) => groupByCount(leads, l => l.advisor);
export const getLeadsByFaculty = (leads: Lead[]) => groupByCount(leads, l => l.faculty);
export const getLeadsByArea = (leads: Lead[]) => groupByCount(leads, l => l.area);
export const getLeadsByTitle = (leads: Lead[]) => groupByCount(leads, l => l.title);
export const getLeadsByDepartment = (leads: Lead[]) => groupByCount(leads, l => l.department);
export const getLeadsByUniversity = (leads: Lead[]) => groupByCount(leads, l => l.university);

export const getAdvisorStats = (leads: Lead[]) => {
  const stats: Record<string, { total: number, won: number }> = {};
  leads.forEach(l => {
    const adv = l.advisor || 'Sin Asesor';
    if (!stats[adv]) stats[adv] = { total: 0, won: 0 };
    stats[adv].total++;
    if (l.status.toLowerCase() === 'ganado') {
      stats[adv].won++;
    }
  });
  return Object.entries(stats).map(([name, data]) => ({
    name,
    total: data.total,
    won: data.won,
    conversion: data.total > 0 ? ((data.won / data.total) * 100).toFixed(1) + '%' : '0%'
  })).sort((a,b) => b.total - a.total);
};
