# app/api/province/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db

from app.models.province import Province
from app.schemas.province import ProvinceSchema
from app.core.logger import logger

router = APIRouter(prefix="/provinces", tags=["Provinces"])


@router.get("/", response_model=List[ProvinceSchema])
def get_all_provinces(db: Session = Depends(get_db)):
    provinces = db.query(Province).all()
    if not provinces:
        logger.warning("No provinces found in the database")
        raise HTTPException(status_code=404, detail="No provinces found")
    
    logger.info(f"Fetched {len(provinces)} provinces")
    return provinces

