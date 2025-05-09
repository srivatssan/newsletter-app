import os
import json
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates

from app.schemas import SectionData

app = FastAPI()

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
    files = os.listdir("app/templates")
    return JSONResponse(files)

@app.get("/templates/{template_name}", response_class=HTMLResponse)
async def get_template(template_name: str):
    path = f"app/templates/{template_name}"
    if not os.path.exists(path):
        return HTMLResponse(status_code=404, content="Template not found")
    with open(path, "r") as f:
        return HTMLResponse(content=f.read(), media_type="text/html")

@app.post("/sections", response_class=JSONResponse)
async def save_section(
    title: str = Form(...),
    abstract: str = Form(...),
    link: str = Form(...),
    thumbnail: UploadFile = File(...)
):
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
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return JSONResponse(data)

@app.post("/preview/full", response_class=HTMLResponse)
async def preview_full(request: Request, template_name: str = Form(...)):
    with open(DATA_FILE, "r") as f:
        sections = json.load(f)
    return templates.TemplateResponse(template_name, {"request": request, "sections": sections})
