with open('src/data.ts', 'r') as f:
    lines = f.readlines()
for i in range(len(lines)):
    if 'Amanda Corpas' in lines[i]:
        lines[i] = "207;Valorando/Cupón;Yeisi Gallego;Amanda Corpas;+573172993893;Otoño 2026;Digital;1643;UNIR;Maestría;Derecho;;;;Profesional/Licenciado;;;;;;;;;;Sí;;;No;No;No;No;10/06/26 02:59pm;26/05/26 10:03am\n"
with open('src/data.ts', 'w') as f:
    f.writelines(lines)
