import re
import base64
from PIL import Image
import io

with open('TemplateDesain/Halal Center UIN Sunan Gunan Gunung Djati Bandung – Halal Center UIN Sunan Gunan Gunung Djati Bandung.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# search near Prof. Dr. H. Rosihon Anwar
pos = content.find('Prof. Dr. H. Rosihon Anwar')
print('Found pos:', pos)
# look before pos for <img ... src="data:image/webp;base64,...
snippet = content[pos-3000:pos+1000]
match = re.search(r'src="data:image/webp;base64,([^"]+)"', snippet)
if match:
    data = base64.b64decode(match.group(1))
    im = Image.open(io.BytesIO(data))
    print('Rosihon original template image size:', im.size, im.mode)
    im.save('scratch/original_rosihon_from_template.png')
else:
    print('No match found for Rosihon image in snippet')

