import sys

ids_to_add = ["1856", "1832", "1775", "1755", "1362", "1643", "1679", "1667", "1601", "1501"]

with open("src/data.ts", "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "export const rawData = `"
end_marker = "`\n\nexport interface Lead {"
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Not found")
    sys.exit(1)

raw_data = content[start_idx + len(start_marker):end_idx]
lines = raw_data.strip().split('\n')
headers = lines[0]
data_lines = lines[1:]

final_lines = []
for line in data_lines:
    if not line.strip():
        continue
    parts = line.split(';')
    if len(parts) > 24:
        digital_id = parts[7]
        if digital_id in ids_to_add:
            parts[24] = "Sí"
        else:
            parts[24] = "No"
    final_lines.append(";".join(parts))

new_raw_data = headers + "\n" + "\n".join(final_lines)
new_content = content[:start_idx + len(start_marker)] + new_raw_data + content[end_idx:]

with open("src/data.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("done")
