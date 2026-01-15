#!/usr/bin/env python3
"""
Script to convert PRESENTATION_SLIDES.html to PDF with 1 slide per page format
"""

from weasyprint import HTML, CSS
import os

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))
html_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.html')
css_file = os.path.join(script_dir, 'presentation-slide-style.css')
pdf_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.pdf')

print(f"Converting {html_file} to PDF...")
print(f"Format: 1 slide per page (Landscape A4)")

try:
    # Convert to PDF with custom CSS
    HTML(filename=html_file).write_pdf(
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
