from rembg import remove
import easygui
from PIL import Image
import os

# Step 1: Select input image
input_path = easygui.fileopenbox(title="Select Image to Remove Background")

# Step 2: Choose output save location
# Default output file name, automatically using .webp
default_name = os.path.splitext(os.path.basename(input_path))[0] + "_no_bg.webp"
output_path = easygui.filesavebox(title="Save Image As", default=default_name)

# Step 3: Open the input image
input_image = Image.open(input_path)

# Step 4: Remove background
output_image = remove(input_image)

# Step 5: Convert to WebP and save
output_image.save(output_path, "WEBP", quality=80, method=6)


print(f"✅ Background removed and saved as: {output_path}")