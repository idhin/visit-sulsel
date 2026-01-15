#!/usr/bin/env python3
"""
Render HTML to PDF using Playwright
Optimized for exact A4 Landscape, 1 slide per page
"""

import asyncio
import os
from playwright.async_api import async_playwright

script_dir = os.path.dirname(os.path.abspath(__file__))
html_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.html')
pdf_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.pdf')

async def render_pdf():
    print(f"Opening {html_file}...")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # Set viewport to A4 landscape dimensions (297mm x 210mm at 96dpi)
        page = await browser.new_page(viewport={'width': 1123, 'height': 794})
        
        await page.goto(f'file://{html_file}', wait_until='networkidle')
        
        print("Loading fonts...")
        await page.wait_for_timeout(2000)
        
        print(f"Generating PDF: {pdf_file}")
        await page.pdf(
            path=pdf_file,
            width='297mm',
            height='210mm',
            print_background=True,
            margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'},
            scale=1.0,
            prefer_css_page_size=True
        )
        
        await browser.close()
    
    file_size = os.path.getsize(pdf_file) / 1024
    
    print(f"✅ PDF created: {pdf_file}")
    print(f"   Format: A4 Landscape (297mm x 210mm)")
    print(f"   Size: {file_size:.1f} KB")

if __name__ == '__main__':
    asyncio.run(render_pdf())
