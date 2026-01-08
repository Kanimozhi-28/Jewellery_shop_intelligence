from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..models.database import get_db
from ..models.models import Session, JewelleryScan

router = APIRouter()

@router.get("/summary")
async def get_analytics_summary(db: AsyncSession = Depends(get_db)):
    # 1. Total Interactions (Scans)
    scan_count = await db.execute(select(func.count(JewelleryScan.id)))
    total_scans = scan_count.scalar() or 0
    
    # 2. Revenue Estimate (Sum of scanned items price)
    revenue_res = await db.execute(select(func.sum(JewelleryScan.price)))
    total_rev = revenue_res.scalar() or 0
    
    return {
        "total_interactions": total_scans,
        "conversion_rate": 24.5, # Logic for conversion needs business rules
        "revenue_estimate": total_rev,
        "active_salespersons": 12
    }

@router.get("/jewellery-stats")
async def get_jewellery_stats(db: AsyncSession = Depends(get_db)):
    # Groups scans by barcode to get performance per item
    query = select(
        JewelleryScan.barcode,
        JewelleryScan.name,
        func.count(JewelleryScan.id).label("viewed"),
        func.sum(JewelleryScan.price).label("potential_revenue")
    ).group_by(JewelleryScan.barcode, JewelleryScan.name)
    
    result = await db.execute(query)
    stats = []
    for row in result:
        stats.append({
            "barcode": row.barcode,
            "name": row.name,
            "viewed": row.viewed,
            "sold": int(row.viewed * 0.2), # Mocking sales for now
            "price_sum": row.potential_revenue
        })
    return stats

@router.get("/scans/{barcode}/comments")
async def get_item_comments(barcode: str, db: AsyncSession = Depends(get_db)):
    query = select(JewelleryScan).where(JewelleryScan.barcode == barcode).order_by(JewelleryScan.scanned_at.desc())
    result = await db.execute(query)
    scans = result.scalars().all()
    return scans
