from pydantic import BaseModel
from typing import Optional, List
from app.schemas.district import DistrictSchema

class ProvinceSchema(BaseModel):
    id: int
    name: str
    area_sq_km: Optional[str] = None
    website: Optional[str] = None
    headquarter: Optional[str] = None

    # 👇 Include related districts here
    districts: Optional[List[DistrictSchema]] = None

    class Config:
        orm_mode = True
