import sys

raw_input = """Ganado	Yeisi Gallego	Maribel Cecilia Narváez Hernández 	Digital	1886	+573234822480	UNIR	Otoño 2026	Maestría	Educación	Liderazgo y Dirección de Centros Educativos		Antioquia	Arboletes		maribelcecilianarvaez@gmail.com 		2026-07-14	Julio					Sí			No	No	No	No
Ganado	Yesica Marcela Giraldo	Jose Santos España Males	Digital	1866	+573147248119	Asturias	Otoño 2026	Especialización	Educación	Especialización en Innovación Educativa en Docencia Universitaria		Nariño	Pasto	Digital	joescolombia@gmail.com		2026-07-04	Julio			$ 7.500.000	$ 7.500.000	Sí	1994598	2026-07-03	No	No	No	No
Ganado	Jineth Janeth Sarmiento	Lina Maria Rojas Osorio	Digital	1830	+573228577207	FUNIR	Otoño 2026	Especialización	Administración de la Salud	Especialización en Auditoría en Salud	Profesional/Licenciado				linamary2158@gmail.com	Financiado	2026-07-30	Julio	Agosto	50%	$ 13.147.500	$ 6.573.750	Sí			No	No	No	No
Ganado	Jineth Janeth Sarmiento	Sandra Gutiérrez Jaramillo	Digital	1825	+573202356988	UNIR	Otoño 2026	Maestría	Derecho	Derecho de Familia	Profesional/Licenciado	Meta	Villavicencio		abgsandragutierrezjaramillo@gmail.com	Financiado	2026-07-07	Julio	Noviembre	50%	$ 30.444.000	$ 15.222.000	Sí			No	No	No	No
Ganado	Nathaly Rojas Barreiro	Sulema Simón	Digital	1687	+573102728070	UNIR	Otoño 2026	Maestría	Educación	Didáctica de la lengua Infantil y Primaria	Profesional/Licenciado	Vaupés	Mitú		Sulemarce@gmail.com		2026-07-08	Julio					Sí			No	No	No	No"""

mapping = {
    1: 0, 2: 1, 3: 2, 4: 5, 5: 7, 6: 3, 7: 4, 8: 6, 9: 8, 10: 9, 11: 10,
    12: 14, 13: 15, 14: 11, 15: 13, 16: 12, 17: 16, 18: 17, 19: 18,
    20: 19, 21: 20, 22: 21, 23: 22, 24: 23, 25: 24, 26: 25, 27: 26,
    28: 27, 29: 28, 30: 29
}

lines = raw_input.strip().split('\n')
new_leads = {}
for line in lines:
    parts = line.split('\t')
    mapped = [""] * 33
    for target_idx, source_idx in mapping.items():
        if source_idx < len(parts):
            mapped[target_idx] = parts[source_idx]
    
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
            # preserve some fields
            new_data[0] = parts[0] # Nº
            new_data[31] = parts[31] if len(parts) > 31 else ""
            new_data[32] = parts[32] if len(parts) > 32 else ""
            final_lines.append(";".join(new_data))
            processed_ids.add(digital_id)
        else:
            final_lines.append(line)

# append those that are totally new
for digital_id, new_data in new_leads.items():
    if digital_id not in processed_ids:
        final_lines.append(";".join(new_data))

new_raw_data = headers + "\n" + "\n".join(final_lines)
new_content = content[:start_idx + len(start_marker)] + new_raw_data + content[end_idx:]

with open("src/data.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("done")
