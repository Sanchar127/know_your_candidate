from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.district import District
from app.schemas.district import DistrictSchema
from app.core.logger import logger

router = APIRouter(prefix="/districts", tags=["Districts"])


@router.get("/", response_model=List[DistrictSchema])
def get_all_districts(db: Session = Depends(get_db)):
    """
    Fetch all districts.
    """
    districts = db.query(District).all()
    if not districts:
        logger.warning("No districts found in the database")
        raise HTTPException(status_code=404, detail="No districts found")
    
    logger.info(f"Fetched {len(districts)} districts")
    return districts
