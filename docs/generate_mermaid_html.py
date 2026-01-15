#!/usr/bin/env python3
"""
Generate Professional HTML for presentation slides
Each slide = exactly 1 A4 Landscape page
"""

import re
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
md_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.md')
html_file = os.path.join(script_dir, 'PRESENTATION_SLIDES.html')

print(f"Reading {md_file}...")

with open(md_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Split content by slides (h1 tags)
slides = re.split(r'^# ', md_content, flags=re.MULTILINE)
slides = [s for s in slides if s.strip()]

def convert_markdown_to_html(content):
    """Convert markdown content to HTML"""
    html = content
    
    # Headers
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    
    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    
    # Italic  
    html = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', html)
    
    # Images
    html = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<div class="screenshot"><img src="\2" alt="\1"></div>', html)
    
    # Links
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)
    
    # Blockquotes
    html = re.sub(r'^> (.+)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)
    
    # Convert code blocks to title boxes
    html = re.sub(
        r'```\n(.*?)\n```',
        r'<div class="title-box">\1</div>',
        html,
        flags=re.DOTALL
    )
    
    # Convert tables
    def convert_table(match):
        lines = match.group(0).strip().split('\n')
        if len(lines) < 2:
            return match.group(0)
        
        result = '<table><thead><tr>'
        headers = [cell.strip() for cell in lines[0].split('|')[1:-1]]
        for header in headers:
            result += f'<th>{header}</th>'
        result += '</tr></thead><tbody>'
        
        for line in lines[2:]:
            if '|' in line:
                cells = [cell.strip() for cell in line.split('|')[1:-1]]
                result += '<tr>'
                for cell in cells:
                    result += f'<td>{cell}</td>'
                result += '</tr>'
        
        result += '</tbody></table>'
        return result

    table_pattern = r'(\|[^\n]+\|\n)+'
    html = re.sub(table_pattern, convert_table, html)
    
    # Convert unordered lists
    def convert_list(text):
        lines = text.split('\n')
        result = []
        in_list = False
        
        for line in lines:
            if re.match(r'^- ', line):
                if not in_list:
                    result.append('<ul>')
                    in_list = True
                item = re.sub(r'^- ', '', line)
                result.append(f'<li>{item}</li>')
            else:
                if in_list:
                    result.append('</ul>')
                    in_list = False
                result.append(line)
        
        if in_list:
            result.append('</ul>')
        
        return '\n'.join(result)
    
    html = convert_list(html)
    
    # Convert numbered lists
    def convert_numbered_list(text):
        lines = text.split('\n')
        result = []
        in_list = False
        
        for line in lines:
            if re.match(r'^\d+\. ', line):
                if not in_list:
                    result.append('<ol>')
                    in_list = True
                item = re.sub(r'^\d+\. ', '', line)
                result.append(f'<li>{item}</li>')
            else:
                if in_list:
                    result.append('</ol>')
                    in_list = False
                result.append(line)
        
        if in_list:
            result.append('</ol>')
        
        return '\n'.join(result)
    
    html = convert_numbered_list(html)
    
    # Remove horizontal rules
    html = re.sub(r'^---+$', '', html, flags=re.MULTILINE)
    
    # Convert paragraphs
    lines = html.split('\n')
    result = []
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith('<') and not stripped.startswith('*'):
            result.append(f'<p>{stripped}</p>')
        else:
            result.append(line)
    html = '\n'.join(result)
    
    return html

# Build slides HTML
slides_html = ''
for i, slide in enumerate(slides):
    lines = slide.strip().split('\n')
    title = lines[0].strip()
    content = '\n'.join(lines[1:])
    
    slide_num = i + 1
    content_html = convert_markdown_to_html(content)
    
    slides_html += f'''<div class="slide">
    <div class="header">
        <span class="num">{slide_num}</span>
        <h1>{title}</h1>
    </div>
    <div class="body">{content_html}</div>
    <div class="footer">
        <span>Visit Sulsel</span>
        <span>Explore The Easiest Way</span>
        <span>Slide {slide_num}/10</span>
    </div>
</div>
'''

html_template = f'''<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Visit Sulsel - Materi Presentasi</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

@page {{
    size: A4 landscape;
    margin: 0;
}}

body {{
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    line-height: 1.3;
    color: #222;
    background: #fff;
}}

.slide {{
    width: 297mm;
    height: 210mm;
    padding: 8mm 12mm;
    display: flex;
    flex-direction: column;
    page-break-after: always;
    page-break-inside: avoid;
    background: #fff;
    position: relative;
    overflow: hidden;
}}

.header {{
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 5mm;
    border-bottom: 2px solid #14B8A6;
    margin-bottom: 5mm;
    flex-shrink: 0;
}}

.num {{
    background: linear-gradient(135deg, #1E3A8A, #3B82F6);
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 11pt;
}}

h1 {{
    color: #1E3A8A;
    font-size: 16pt;
    font-weight: 700;
}}

.body {{
    flex: 1;
    overflow: hidden;
    column-count: 2;
    column-gap: 10mm;
    column-rule: 1px solid #e5e7eb;
}}

/* Single column slides */
.slide:nth-child(1) .body,
.slide:nth-child(2) .body,
.slide:nth-child(8) .body,
.slide:nth-child(10) .body {{
    column-count: 1;
}}

h2 {{
    color: #1E3A8A;
    font-size: 10pt;
    font-weight: 600;
    margin: 6px 0 4px 0;
    padding: 3px 0 3px 8px;
    border-left: 3px solid #F59E0B;
    background: linear-gradient(90deg, #f0f9ff 0%, transparent 100%);
    break-after: avoid;
}}

h3 {{
    color: #1E3A8A;
    font-size: 9pt;
    font-weight: 600;
    margin: 5px 0 3px 0;
    break-after: avoid;
}}

p {{
    margin: 3px 0;
    font-size: 8pt;
    line-height: 1.4;
}}

ul, ol {{
    margin: 3px 0;
    padding-left: 14px;
    font-size: 8pt;
}}

li {{
    margin: 2px 0;
    line-height: 1.35;
    break-inside: avoid;
}}

table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 7.5pt;
    margin: 4px 0;
    break-inside: avoid;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
}}

th {{
    background: #1E3A8A;
    color: #ffffff !important;
    padding: 5px 8px;
    text-align: left;
    font-weight: 600;
    font-size: 7.5pt;
    border-bottom: 2px solid #14B8A6;
}}

th strong {{
    color: #ffffff !important;
}}

td {{
    padding: 4px 8px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 7.5pt;
    background: #fff;
}}

tr:nth-child(even) td {{
    background: #f8fafc;
}}

tr:hover td {{
    background: #f0f9ff;
}}

blockquote {{
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border-left: 4px solid #F59E0B;
    padding: 6px 10px;
    margin: 5px 0;
    border-radius: 0 6px 6px 0;
    font-style: italic;
    font-size: 8pt;
    break-inside: avoid;
    color: #92400E;
}}

.title-box {{
    background: linear-gradient(135deg, #1E3A8A, #3B82F6);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 11pt;
    font-weight: 600;
    margin: 5px 0;
    text-align: center;
    box-shadow: 0 2px 4px rgba(30, 58, 138, 0.3);
}}

.screenshot {{
    text-align: center;
    margin: 5px 0;
    break-inside: avoid;
}}

.screenshot img {{
    max-height: 120px;
    max-width: 100%;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    border: 1px solid #e5e7eb;
}}

.footer {{
    display: flex;
    justify-content: space-between;
    padding-top: 3mm;
    margin-top: auto;
    border-top: 1px solid #e5e7eb;
    font-size: 7pt;
    color: #6b7280;
    flex-shrink: 0;
}}

.footer span:first-child {{
    font-weight: 600;
    color: #1E3A8A;
}}

.footer span:nth-child(2) {{
    color: #14B8A6;
    font-style: italic;
}}

strong {{
    color: #1E3A8A;
    font-weight: 600;
}}

td strong {{
    color: #059669;
}}

a {{
    color: #2563EB;
    text-decoration: none;
}}

em {{
    font-size: 7pt;
    color: #6b7280;
    font-style: italic;
    display: block;
    margin: 2px 0;
}}

@media print {{
    .slide {{
        box-shadow: none;
    }}
}}
</style>
</head>
<body>
{slides_html}
</body>
</html>'''

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"✅ HTML created: {html_file}")
print(f"   Total slides: {len(slides)}")
