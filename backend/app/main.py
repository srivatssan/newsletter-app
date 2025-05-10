import os
import json
from fastapi import FastAPI, UploadFile, File, Form, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
from typing import List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Mount static directory for images
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")
DATA_FILE = "app/data/newsletter_data.json"

# Ensure data file exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

@app.get("/templates", response_class=JSONResponse)
async def list_templates():
    """List all available templates."""
    files = os.listdir("app/templates")
    return JSONResponse(files)

@app.get("/templates/{template_name}", response_class=HTMLResponse)
async def get_template(template_name: str):
    """Fetch a specific template."""
    path = f"app/templates/{template_name}"
    if not os.path.exists(path):
        return HTMLResponse(status_code=404, content="Template not found")
    with open(path, "r") as f:
        return HTMLResponse(content=f.read(), media_type="text/html")

@app.get("/templates/{template_name}/sections", response_class=JSONResponse)
async def get_template_sections(template_name: str):
    """Dynamically extract sections from the specified template."""
    template_path = f"app/templates/{template_name}"
    
    # Check if the template exists
    if not os.path.exists(template_path):
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Parse the HTML file
    with open(template_path, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    
    # Extract sections dynamically
    sections = []
    for section in soup.find_all("section"):
        category = section.find("h2").text.strip() if section.find("h2") else "Unknown Category"
        sections.append({
            "category": category,
            "title": "",
            "abstract": "",
            "link": "",
            "thumbnail_url": ""
        })
    
    return JSONResponse(sections)

from typing import List

@app.post("/save-template", response_class=JSONResponse)
async def save_template(data: List[dict]):
    """Save the filled template data as JSON."""
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    return JSONResponse({"status": "success", "message": "Template data saved successfully"})

@app.get("/get-template-data", response_class=JSONResponse)
async def get_template_data():
    """Fetch the saved template data."""
    if not os.path.exists(DATA_FILE):
        return JSONResponse({"status": "error", "message": "No data found"}, status_code=404)
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return JSONResponse(data)

@app.post("/sections", response_class=JSONResponse)
async def save_section(
    title: str = Form(...),
    abstract: str = Form(...),
    link: str = Form(...),
    thumbnail: UploadFile = File(...)
):
    """Save a section with its data."""
    # Save uploaded image
    static_dir = "app/static"
    os.makedirs(static_dir, exist_ok=True)
    file_path = os.path.join(static_dir, thumbnail.filename)
    with open(file_path, "wb") as img:
        img.write(await thumbnail.read())

    # Load existing data
    with open(DATA_FILE, "r") as f:
        data = json.load(f)

    entry = {"title": title, "abstract": abstract, "link": link, "thumbnail_url": f"/static/{thumbnail.filename}"}
    data.append(entry)

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

    return JSONResponse({"status": "success", "entry": entry})

@app.get("/sections", response_class=JSONResponse)
async def get_sections():
    """Fetch all sections."""
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return JSONResponse(data)

@app.post("/preview/full", response_class=HTMLResponse)
async def preview_full(request: Request, template_name: str = Form(...)):
    """Render a full preview of the template with sections."""
    with open(DATA_FILE, "r") as f:
        sections = json.load(f)
    return templates.TemplateResponse(template_name, {"request": request, "sections": sections})
