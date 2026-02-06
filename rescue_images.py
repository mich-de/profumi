import os
import requests
from rembg import remove
from PIL import Image
import io

IMAGES = {
    r"d:\python\profumi\public\images\originals\gucci_guilty_new.png": "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1545326106/563057_99999_0099_001_100_0000_Light-gucci-guilty-pour-homme-90ml-eau-de-toilette.jpg",
    r"d:\python\profumi\public\images\originals\invictus_new.png": "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/32425961_fpx.tif?wid=1000&hei=1200&fmt=jpeg",
    r"d:\python\profumi\public\images\originals\santal_33.png": "https://lelabo.ips.photos/lelabo-java/images/skus/100PS33100__PRODUCT_01--IMG_1200--SANTAL33-1687759440.jpg"
}

def rescue_images():
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})

    for filepath, url in IMAGES.items():
        print(f"Rescuing: {filepath} from {url}...")
        try:
            # Download
            response = session.get(url, verify=False)
            response.raise_for_status()
            input_data = response.content
            
            # Process
            try:
                print("  Removing background...")
                output_data = remove(input_data)
                img = Image.open(io.BytesIO(output_data))
                print("  Background removed successfully.")
            except Exception as e:
                print(f"  rembg failed ({e}), saving as standard PNG...")
                img = Image.open(io.BytesIO(input_data)).convert("RGBA")
            
            # Save
            img.save(filepath, format="PNG")
            print(f"  Saved: {filepath}")
                
        except Exception as e:
            print(f"  CRITICAL FAILURE for {filepath}: {e}")

if __name__ == "__main__":
    rescue_images()
