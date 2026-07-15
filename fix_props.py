import sys

with open("src/components/Dashboard.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix Slide 4
content = content.replace("leads.filter(l => l.estado === 'Ganado')", "leads.filter(l => l.status === 'Ganado' && l.closingMonth === 'Julio')")
content = content.replace("ganados.filter(l => l.asesor.includes('Jineth'))", "ganados.filter(l => l.advisor.includes('Jineth'))")
content = content.replace("ganados.filter(l => l.asesor.includes('Yeisi'))", "ganados.filter(l => l.advisor.includes('Yeisi'))")
content = content.replace("{lead.nombre}", "{lead.name}")
content = content.replace("getUniversityColor(lead.universidad)", "getUniversityColor(lead.university)")
content = content.replace("{lead.universidad}", "{lead.university}")
content = content.replace("{lead.tituloInteres || lead.facultad}", "{lead.title || lead.faculty}")
content = content.replace("{lead.asesor}", "{lead.advisor}")
content = content.replace("{lead.fechaCreada?", "{lead.createdDate?")

# Fix Slide 5 (Cupones)
content = content.replace("leads.filter(l => l.pasaCupon)", "leads.filter(l => l.coupon === 'Sí')")
content = content.replace("cupones.filter(l => l.asesor.includes", "cupones.filter(l => l.advisor.includes")
content = content.replace("{lead.ciudad || '-'}", "{lead.city || '-'}")
content = content.replace("lead.estado.toLowerCase()", "lead.status.toLowerCase()")
content = content.replace("getStatusColor(lead.estado)", "getStatusColor(lead.status)")
content = content.replace("{lead.estado.replace('/Cupón', '')}", "{lead.status.replace('/Cupón', '')}")

with open("src/components/Dashboard.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("done")
