import os
import glob

DATA_DIR = r"d:\python\profumi\src\data"
EXTENSIONS_TO_REPLACE = [".jpg", ".jpeg", ".webp"]

def update_json_paths():
    json_files = glob.glob(os.path.join(DATA_DIR, "*.json"))
    
    for file in json_files:
        print(f"Updating {file}...")
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        new_content = content
        
        for ext in EXTENSIONS_TO_REPLACE:
            if ext in new_content: # crude check
                # Verify we don't break anything. 
                # We want to replace extension in values like "/images/...jpg"
                # Since we checked for http links and found none, simple replace is mostly safe
                # but let's be slightly more specific if possible?
                # No, global replace of .jpg" -> .png" is safe given our grep.
                
                # Replace .jpg" with .png"
                new_content = new_content.replace(f"{ext}\"", ".png\"")
                modified = True
                
        if modified and content != new_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  Updated references to .png")
        else:
            print(f"  No changes needed.")

if __name__ == "__main__":
    update_json_paths()
