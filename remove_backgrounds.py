import os
from rembg import remove
from PIL import Image
import io

IMAGE_DIR = r"d:\python\profumi\public\images"
EXTENSIONS = {".jpg", ".jpeg", ".webp", ".png"}

def process_images():
    count = 0
    errors = 0
    
    # Walk through all directories
    for root, dirs, files in os.walk(IMAGE_DIR):
        for file in files:
            file_lower = file.lower()
            if any(file_lower.endswith(ext) for ext in EXTENSIONS):
                # Skip if it's already a processed png (check logic carefully)
                # We will overwrite or create new. Let's create new .png and remove old if different
                
                filepath = os.path.join(root, file)
                filename_no_ext = os.path.splitext(file)[0]
                new_filename = f"{filename_no_ext}.png"
                new_filepath = os.path.join(root, new_filename)
                
                # Validation: if standard png exists and is created by us, skip?
                # For now, let's just process everything that isn't already transparent maybe?
                # actually rembg is good.
                
                print(f"Processing: {file}...")
                
                try:
                    with open(filepath, 'rb') as input_file:
                        input_data = input_file.read()
                    
                    output_data = remove(input_data)
                    
                    # Verify it's valid image
                    img = Image.open(io.BytesIO(output_data))
                    img.save(new_filepath, format="PNG")
                    
                    print(f"Saved: {new_filename}")
                    
                    # If the original was not the new file (e.g. jpg -> png), delete original
                    if filepath != new_filepath:
                        try:
                            os.remove(filepath)
                            print(f"Deleted original: {file}")
                        except Exception as e:
                            print(f"Could not delete {file}: {e}")
                            
                    count += 1
                    
                except Exception as e:
                    print(f"FAILED {file}: {e}")
                    errors += 1

    print(f"\nDone. Processed {count} images. Errors: {errors}")

if __name__ == "__main__":
    process_images()
