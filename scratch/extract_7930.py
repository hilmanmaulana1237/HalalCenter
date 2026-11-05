with open('TemplateDesain/Halal Center UIN Sunan Gunan Gunung Djati Bandung – Halal Center UIN Sunan Gunan Gunung Djati Bandung.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

line7930 = lines[7929] # 0-indexed
import re
import base64
from PIL import Image
import io

m = re.search(r'data:image/webp;base64,([^\"]+)', line7930)
if m:
    b64 = m.group(1)
    data = base64.b64decode(b64)
    im = Image.open(io.BytesIO(data))
    print('Found Tri line 7930 image:', im.size, im.mode)
    im.save('scratch/tri_from_line7930.png')
else:
    print('Not found')

