import re
from PIL import Image
import base64
import io

with open('TemplateDesain/Tentang LPPOM - LPH LPPOM.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

matches = re.findall(r'box-director.*?<img\s+src="data:image/webp;base64,([^"]+)"', html, re.DOTALL)
print('Found box-director webp images:', len(matches))
for i, m in enumerate(matches):
    data = base64.b64decode(m)
    im = Image.open(io.BytesIO(data))
    print(f'Director {i}:', im.size, im.mode)
    im.save(f'frontend/public/assets/images/template_director_{i}.png')

