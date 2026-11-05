from PIL import Image

dr = Image.open('frontend/public/assets/images/uin_sgd/director_rosihon.webp')
# Composite over white
white_bg = Image.new('RGBA', dr.size, (255, 255, 255, 255))
comp = Image.alpha_composite(white_bg, dr)
comp.save('scratch/rosihon_composite.png')

dt = Image.open('frontend/public/assets/images/uin_sgd/director_tri.webp')
comp_t = Image.alpha_composite(white_bg, dt)
comp_t.save('scratch/tri_composite.png')
print('Composited saved!')

