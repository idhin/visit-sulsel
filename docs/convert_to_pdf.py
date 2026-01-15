#!/usr/bin/env python3
"""
Script to convert PRESENTATION_SLIDES.html to PDF
"""

from weasyprint import HTML
import os

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))
html_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.html')
pdf_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.pdf')

print(f"Converting {html_file} to PDF...")

try:
    HTML(filename=html_file).write_pdf(
        pdf_file,
        presentational_hints=True
    )
    print(f"✅ Success! PDF created: {pdf_file}")
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
