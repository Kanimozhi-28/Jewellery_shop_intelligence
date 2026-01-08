from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import management, analytics
from .models.database import engine, Base

app = FastAPI(title="Jewellery Intelligence - Admin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # For PoC, we ensure tables exist
        await conn.run_sync(Base.metadata.create_all)

app.include_router(management.router, prefix="/api/management", tags=["Management"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def read_root():
    return {"msg": "Admin Intelligence Backend Online"}
