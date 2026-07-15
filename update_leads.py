with open('src/data.ts', 'r') as f:
    content = f.read()

start_marker = "export const rawData = `"
end_marker = "`\n\nexport interface Lead {"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("rawData not found")
    exit(1)

raw_data = content[start_idx + len(start_marker):end_idx]
lines = raw_data.split('\n')
headers = lines[0]
data_lines = lines[1:]

new_leads = [
    ";Valorando/Cupón;Yeisi Gallego;Carlos Alexander Gruesso Andrade;+573155485057;Otoño 2026;Digital;1832;UNIR;Maestría;Educación;Didáctica de las Matemáticas. Secundaria y Bachillerato;;cagruesso@outlook.com ;;Guapi;Cauca;;;;;;;;Sí;;;No;No;No;No;28/06/26 03:31pm;26/06/26 03:18pm",
    ";Valorando/Cupón;Yeisi Gallego;Edgar andres Bernal garnica;+573042258220;Otoño 2026;Digital;1786;UNIR;Maestría;Educación;Tecnología Educativa y Competencias Digitales;;Andresmatiasbernal@gmail.com;;Bucaramanga;Santander;;;;;;;;Sí;;;No;No;No;No;19/06/26 11:32am;18/06/26 09:33am",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;Abraham Paul Morante Barrios;+573004462479;Otoño 2026;Digital;1775;FUNIR;Especialización;Ingeniería;Especialización en Dirección y Gestión de Proyectos;;abrahammorante1@gmail.com;Ingeniero/Profesional;El Carmen de Bolívar;Bolívar;;;;;;;;Sí;;;No;No;No;No;22/06/26 04:21pm;16/06/26 12:14pm",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;David Vanegas Albarracin ;+573054236166;Otoño 2026;Digital;1756;UNIR;Maestría;Ciencias Económicas y Administrativas;Dirección y Gestión Deportiva;;vanegas.52701@gmaiil.com;Profesional/Licenciado;Bogotá;Bogotá D.C.;;;;;;;;Sí;;;No;No;No;No;30/06/26 02:13pm;11/06/26 10:40am",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;Herney Zemanate Mamian;+573173495779;Otoño 2026;Digital;1679;UNIR;Maestría;;;;hzemanatem@ut.edu.co;;Dosquebradas;Risaralda;;;;;;;;Sí;;;No;No;No;No;05/06/26 06:54pm;03/06/26 11:52am",
    ";Valorando/Cupón;Yeisi Gallego;Jefferson Cifuentes Vivas;+573106964421;Otoño 2026;Digital;1362;FUNIR;Especialización;Educación;Especialización en Pedagogía y Docencia;;cifuentesjefferson221@gmail.com;;Cali;Valle del Cauca;;;;;;;;Sí;;;No;No;No;No;23/06/26 02:47pm;30/05/26 10:51am",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;Oscar Luis García Peñate;+573206809296;Otoño 2026;Digital;1667;UNIR;Maestría;Educación;;;3184782960 oscarluis060671@gmail.com;;Barranquilla;Atlántico;;;;;;;;Sí;;;No;No;No;No;20/06/26 01:02pm;30/05/26 10:11am",
    ";Valorando/Cupón;Yeisi Gallego;Amanda Corpas;+573172993893;Otoño 2026;Digital;1643;UNIR;Maestría;Derecho;;;;Profesional/Licenciado;;;;;;;;;Sí;;;No;No;No;No;10/06/26 02:59pm;26/05/26 10:03am",
    ";Valorando/Cupón;Yeisi Gallego;Andrés Guzmán;+573508107422;Otoño 2026;Digital;1623;UNIR;Maestría;MBA;MBA + P.S.U. en Business Intelligence;;afgo525@hotmail.com;;;;;;;;;;;Sí;;;No;No;No;No;10/06/26 02:59pm;21/05/26 10:40am",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;Maribel Jaimes;+573214149650;Otoño 2026;Digital;1601;UNIR;Maestría;Educación;;;fonomaribelj20@gmail.com;;Cúcuta;Norte de Santander;;;;;;;;Sí;;;No;No;No;No;25/05/26 02:46pm;20/05/26 09:45am",
    ";Valorando/Cupón;Jineth Janeth Sarmiento;Nidia Ardila Marulanda;+573182185333;Otoño 2026;Digital;1501;UNIR;Maestría;;;;;;;Valle del Cauca;;;;;;;;Sí;;;No;No;No;No;26/05/26 09:26am;18/05/26 05:40pm"
]

ids_to_add = ["1832", "1786", "1775", "1756", "1679", "1362", "1667", "1643", "1623", "1601", "1501"]

final_lines = []
for line in data_lines:
    if not line.strip():
        continue
    parts = line.split(';')
    if len(parts) > 7:
        lead_id = parts[7]
        if lead_id not in ids_to_add:
            if len(parts) > 24 and parts[24] == 'Sí':
                parts[24] = 'No'
            final_lines.append(";".join(parts))
        else:
            pass

for i, nl in enumerate(new_leads):
    final_lines.insert(0, str(200 + i) + nl)

new_raw_data = headers + "\n" + "\n".join(final_lines)
new_content = content[:start_idx + len(start_marker)] + new_raw_data + content[end_idx:]

with open('src/data.ts', 'w') as f:
    f.write(new_content)

print("Updated data.ts")
