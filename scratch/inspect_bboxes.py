from PIL import Image
import numpy as np

dr = Image.open('frontend/public/assets/images/uin_sgd/director_rosihon.webp')
print('dr size:', dr.size, dr.mode)
bbox = dr.getbbox()
print('dr bbox:', bbox)

dt = Image.open('frontend/public/assets/images/uin_sgd/director_tri.webp')
print('dt size:', dt.size, dt.mode)
print('dt bbox:', dt.getbbox())

