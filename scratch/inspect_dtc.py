from PIL import Image

dtc = Image.open('frontend/public/assets/images/uin_sgd/director_tri_clean.webp')
print('dtc size:', dtc.size, dtc.mode)
print('dtc bbox:', dtc.getbbox())

