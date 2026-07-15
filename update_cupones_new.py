import sys

raw_input = """1	Valorando/Cupón	Jineth Janeth Sarmiento	Jackelin Maribel Epiayu Sijona	Digital	1856	+573202791619	UNIR	Otoño 2026	Maestría	Educación	Educación Emocional	Profesional/Licenciado	La Guajira	Fonseca		 jmepiayus@uniguajira.edu.co 	Financiado			Octubre	55%	$ 30.480.000	$ 13.716.000	Sí			No	No	No	No
2	Valorando/Cupón	Yeisi Gallego	Carlos Alexander Gruesso Andrade	Digital	1832	+573155485057	UNIR	Otoño 2026	Maestría	Educación	Didáctica de las Matemáticas. Secundaria y Bachillerato		Cauca	Guapi		cagruesso@outlook.com 								Sí			No	No	No	No
3	Valorando/Cupón	Jineth Janeth Sarmiento	Abraham Paul Morante Barrios	Digital	1775	+573004462479	FUNIR	Otoño 2026	Especialización	Ingeniería	Especialización en Dirección y Gestión de Proyectos	Ingeniero/Profesional	Bolívar	El Carmen de Bolívar		abrahammorante1@gmail.com								Sí			No	No	No	No
4	Valorando/Cupón	Jineth Janeth Sarmiento	Sol Merys Mattos 	Digital	1755	+573117922684	UNIR	Otoño 2026	Maestría	Educación						solmemattos81@gmail.com								Sí			No	No	No	No
5	Valorando/Cupón	Jineth Janeth Sarmiento	Herney Zemanate Mamian	Digital	1679	+573173495779	UNIR	Otoño 2026	Maestría				Risaralda	Dosquebradas		hzemanatem@ut.edu.co								Sí			No	No	No	No
6	Valorando/Cupón	Yeisi Gallego	Jefferson Cifuentes Vivas	Digital	1362	+573106964421	FUNIR	Otoño 2026	Especialización	Educación	Especialización en Pedagogía y Docencia		Valle del Cauca	Cali		cifuentesjefferson221@gmail.com								Sí			No	No	No	No
7	Valorando/Cupón	Jineth Janeth Sarmiento	Oscar Luis García Peñate	Digital	1667	+573206809296	UNIR	Otoño 2026	Maestría	Educación			Atlántico	Barranquilla		3184782960 oscarluis060671@gmail.com								Sí			No	No	No	No
8	Valorando/Cupón	Yeisi Gallego	Amanda Corpas	Digital	1643	+573172993893	UNIR	Otoño 2026	Maestría	Derecho		Profesional/Licenciado												Sí			No	No	No	No
9	Valorando/Cupón	Jineth Janeth Sarmiento	Maribel Jaimes	Digital	1601	+573214149650	UNIR	Otoño 2026	Maestría	Educación			Norte de Santander	Cúcuta		fonomaribelj20@gmail.com								Sí			No	No	No	No
10	Valorando/Cupón	Jineth Janeth Sarmiento	Nidia Ardila Marulanda	Digital	1501	+573182185333	UNIR	Otoño 2026	Maestría				Valle del Cauca											Sí			No	No	No	No"""

target_map = [0, 1, 2, 3, 6, 7, 4, 8, 5, 9, 10, 11, 14, 16, 15, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

lines = raw_input.strip().split('\n')
new_leads = {}
for line in lines:
    parts = line.split('\t')
    mapped = [""] * 33
    for i in range(len(parts)):
        if i < len(target_map):
            mapped[target_map[i]] = parts[i].strip()
    
    # # Digital is at index 7 in target
    digital_id = mapped[7]
    new_leads[digital_id] = mapped

with open("src/data.ts", "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "export const rawData = `"
end_marker = "`\n\nexport interface Lead {"
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

raw_data = content[start_idx + len(start_marker):end_idx]
lines = raw_data.strip().split('\n')
headers = lines[0]
data_lines = lines[1:]

final_lines = []
processed_ids = set()

for line in data_lines:
    if not line.strip():
        continue
    parts = line.split(';')
    if len(parts) >= 8:
        digital_id = parts[7]
        if digital_id in new_leads:
            new_data = new_leads[digital_id]
            # preserve created date and original Nº if not provided
            new_data[0] = parts[0]
            new_data[31] = parts[31] if len(parts) > 31 else ""
            new_data[32] = parts[32] if len(parts) > 32 else ""
            final_lines.append(";".join(new_data))
            processed_ids.add(digital_id)
        else:
            # Ensure "PASA CUPÓN" is NOT "Sí" for anything else, so exactly these 10 appear in Slide 5
            if len(parts) > 24 and parts[24] == "Sí":
                parts[24] = ""
            final_lines.append(";".join(parts))

# append those that are totally new
for digital_id, new_data in new_leads.items():
    if digital_id not in processed_ids:
        final_lines.append(";".join(new_data))

new_raw_data = headers + "\n" + "\n".join(final_lines)
new_content = content[:start_idx + len(start_marker)] + new_raw_data + content[end_idx:]

with open("src/data.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("done")
