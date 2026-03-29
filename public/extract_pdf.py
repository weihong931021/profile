import sys
import subprocess
try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

reader = pypdf.PdfReader("/Users/weihong/Documents/profolio/public/resume.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("/Users/weihong/Documents/profolio/public/resume-text.txt", "w") as f:
    f.write(text)
print("Extracted to resume-text.txt")
