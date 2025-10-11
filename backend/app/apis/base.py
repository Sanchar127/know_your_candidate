from fastapi import APIRouter

# Import all routers
from app.apis.province import router as province_router
from app.apis.district import router as district_router
from app.apis.candidate import router as candidate_router
from app.apis.candidate_details import router as candidate_details_router
from app.apis.user import router as user_router  # ✅ Added this

# Create main API router
api_router = APIRouter()

# Include sub-routers
api_router.include_router(province_router)
api_router.include_router(district_router)
api_router.include_router(candidate_router)
api_router.include_router(candidate_details_router)
api_router.include_router(user_router)  # ✅ Added this
