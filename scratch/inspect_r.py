from PIL import Image
import numpy as np

im_r = Image.open('scratch/im_r_preview.png')
print('im_r size:', im_r.size)
arr = np.array(im_r)
# check top 20 rows alpha
print('Top 10 rows alpha max:', [arr[y, :, 3].max() for y in range(10)])
print('Alpha > 0 min y:', np.where(arr[:, :, 3] > 0)[0].min())
print('Alpha > 0 max y:', np.where(arr[:, :, 3] > 0)[0].max())
print('Alpha > 0 min x:', np.where(arr[:, :, 3] > 0)[1].min())
print('Alpha > 0 max x:', np.where(arr[:, :, 3] > 0)[1].max())

