from PIL import Image
import numpy as np

dtc = Image.open('frontend/public/assets/images/uin_sgd/director_tri_clean.webp')
arr = np.array(dtc)
print('dtc alpha min, max, mean:', arr[:, :, 3].min(), arr[:, :, 3].max(), arr[:, :, 3].mean())
print('Corner alpha values:', arr[0, 0, 3], arr[0, -1, 3])
print('Corner RGB values:', arr[0, 0, :3], arr[0, -1, :3])

