#!/usr/bin/env python3
"""
Process HTML and convert to PDF with proper slide structure
"""

from weasyprint import HTML, CSS
import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
html_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.html')
css_file = os.path.join(script_dir, 'presentation-slide-style.css')
pdf_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.pdf')

print(f"Processing {html_file}...")

# Read HTML
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find body section
body_match = re.search(r'(<body[^>]*>)(.*?)(</body>)', html_content, re.DOTALL)
if not body_match:
    print("Error: Could not find body tag")
    exit(1)

body_start_tag = body_match.group(1)
body_content = body_match.group(2)
body_end_tag = body_match.group(3)

# Split content by h1 tags (each h1 is a new slide)
# Pattern: Match h1 and everything until next h1 or end
h1_pattern = r'(<h1[^>]*>.*?</h1>)'
parts = re.split(h1_pattern, body_content, flags=re.DOTALL)

processed_body = ''
current_slide = ''

for i, part in enumerate(parts):
    if re.match(r'<h1[^>]*>', part):
        # Save previous slide if exists
        if current_slide.strip():
            processed_body += f'<div class="slide">{current_slide}</div>\n'
        # Start new slide
        current_slide = part
    else:
        if part.strip():
            current_slide += part

# Add last slide
if current_slide.strip():
    processed_body += f'<div class="slide">{current_slide}</div>\n'

# Reconstruct HTML
processed_html = html_content.replace(
    body_start_tag + body_content + body_end_tag,
    body_start_tag + processed_body + body_end_tag
)

slide_count = len(re.findall(r'<div class="slide"', processed_html))
print(f"Found {slide_count} slides")
print(f"Converting to PDF...")

try:
    HTML(string=processed_html, base_url=script_dir).write_pdf(
        pdf_file,
        stylesheets=[CSS(filename=css_file)],
        presentational_hints=True
    )
    print(f"✅ Success! PDF created: {pdf_file}")
    print(f"   Format: Landscape A4, 1 slide per page")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
