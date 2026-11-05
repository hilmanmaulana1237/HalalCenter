from PIL import Image

im_r = Image.open('scratch/rosihon_from_line7849.png')
print('im_r size:', im_r.size, im_r.mode)
print('im_r bbox:', im_r.getbbox())

im_t = Image.open('scratch/tri_from_line7930.png')
print('im_t size:', im_t.size, im_t.mode)

