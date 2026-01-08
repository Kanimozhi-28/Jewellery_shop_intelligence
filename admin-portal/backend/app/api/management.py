from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models.database import get_db
from ..models.models import Salesperson, Zone
from pydantic import BaseModel
from typing import List

router = APIRouter()

class SalespersonCreate(BaseModel):
    id: str
    name: str
    password: str

class ZoneCreate(BaseModel):
    id: str
    name: str
    floor: int
    color: str

@router.post("/salespersons")
async def create_salesperson(sp: SalespersonCreate, db: AsyncSession = Depends(get_db)):
    db_sp = Salesperson(**sp.dict())
    db.add(db_sp)
    await db.commit()
    return {"status": "success", "id": sp.id}

@router.get("/salespersons")
async def get_salespersons(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Salesperson))
    return result.scalars().all()

@router.post("/zones")
async def create_zone(zone: ZoneCreate, db: AsyncSession = Depends(get_db)):
    db_zone = Zone(**zone.dict())
    db.add(db_zone)
    await db.commit()
    return {"status": "success", "id": zone.id}

@router.get("/zones")
async def get_zones(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Zone))
    return result.scalars().all()
