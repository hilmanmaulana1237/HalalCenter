from PIL import Image
import numpy as np

im13 = Image.open('scratch/uin_13_raw.png')
im14 = Image.open('scratch/uin_14_raw.png')

print("im13 size:", im13.size)
print("im14 size:", im14.size)

# check background colors around corners
arr13 = np.array(im13)
arr14 = np.array(im14)

print("im13 top-left corner color:", arr13[10, 10])
print("im13 top-right corner color:", arr13[10, -10])
print("im14 top-left corner color:", arr14[10, 10])
print("im14 top-right corner color:", arr14[10, -10])

