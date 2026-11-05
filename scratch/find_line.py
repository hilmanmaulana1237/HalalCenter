with open('TemplateDesain/Halal Center UIN Sunan Gunan Gunung Djati Bandung – Halal Center UIN Sunan Gunan Gunung Djati Bandung.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if '130314b' in line:
        print(f'Found at line {idx+1}')
        for j in range(max(0, idx-5), min(len(lines), idx+15)):
            print(f'{j+1}: {lines[j][:100]}...')

