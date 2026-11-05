from PIL import Image

dt = Image.open('frontend/public/assets/images/uin_sgd/director_tri.webp')
dr = Image.open('frontend/public/assets/images/uin_sgd/director_rosihon.webp')

print('director_tri:', dt.size, dt.mode)
print('director_rosihon:', dr.size, dr.mode)

