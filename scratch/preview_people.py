from PIL import Image

im_t = Image.open('scratch/tri_from_line7930.png')
# let's crop top half and check
print("im_t size:", im_t.size)
# save a resized preview
im_t.resize((300, 400)).save('scratch/im_t_preview.png')
im_r = Image.open('scratch/rosihon_from_line7849.png')
im_r.save('scratch/im_r_preview.png')

