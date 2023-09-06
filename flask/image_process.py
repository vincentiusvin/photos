import glob
from PIL import Image
import time
import os
from hurry.filesize import size

# Optimize images and generate thumbnails.
# ./images/[name]/images.jpg and ./images/[name]/thumb.jpg
def compress_and_cache():
    proc = 0
    total_new = 0
    total_old = 0
    total_thumb = 0

    folder = os.path.abspath("/mnt/Photos")
    paths = glob.glob(folder + '/**', recursive=True)
    paths = [p for p in paths if p.endswith(".jpeg") or p.endswith(".jpg") or p.endswith(".png")]
    total = len(paths)

    for old_path in paths:
        im = Image.open(old_path)
        im.convert("RGB")
        name = os.path.splitext(os.path.basename(old_path))[0]
        folder = os.path.join("./images", name)
        os.makedirs(folder, exist_ok=True)

        image_path = os.path.join(folder, "image.jpg")
        im.save(image_path, optimize=True)
        os.utime(image_path, times=(time.time(), os.path.getmtime(old_path)))

        thumbnail_path = os.path.join(folder, "thumb.jpg")
        im.thumbnail([256, 256])
        im.save(thumbnail_path, optimize=True)

        proc += 1
        total_old += os.stat(old_path).st_size
        total_new += os.stat(image_path).st_size
        total_thumb += os.stat(thumbnail_path).st_size
        print(f"\rProcessed {proc}/{total} images [{round(proc/total*100, 2)}% done]", end="")

    print(f"Processed {proc} images.")
    print(f"Final size of images is {size(total_new)}. Saved {size(total_old - total_new)}.")
    print(f"Final size of thumbnails is {size(total_thumb)}.")

if __name__ == "__main__":
    compress_and_cache()
