# app/apis/candidate_details.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.candidate_details import (
    CandidateDetails,
    PoliticalExperience,
    CampaignFocus,
    PositiveContribution,
    Controversy,
    Achievement
)
from app.schemas.candidate_details import (
    CreateCandidateDetailsSchema,
    UpdatePoliticalExperience,
    UpdateCampaignFocus,
    UpdateContributions,
    UpdateControversies,
    UpdateAchievements
)

router = APIRouter(prefix="/candidate-details", tags=["Candidate Details"])

# -----------------------------
# Helper: Get or Create CandidateDetails
# -----------------------------
def get_or_create_candidate(candidate_id: int, db: Session) -> CandidateDetails:
    candidate = db.query(CandidateDetails).filter(CandidateDetails.candidate_id == candidate_id).first()
    if not candidate:
        candidate = CandidateDetails(
            candidate_id=candidate_id,
            overall_rating=0.0,
            total_ratings=0,
            past_elections={},
            social_links={}
        )
        db.add(candidate)
        db.commit()
        db.refresh(candidate)
    return candidate

# -----------------------------
# Update Sections
# -----------------------------
@router.post("/political-experience")
def update_political_experience(payload: UpdatePoliticalExperience, db: Session = Depends(get_db)):
    candidate = get_or_create_candidate(payload.candidate_id, db)
    candidate.political_experiences = [PoliticalExperience(**exp.dict()) for exp in payload.political_experiences]
    db.commit()
    db.refresh(candidate)
    return candidate

@router.post("/campaign-focus")
def update_campaign_focus(payload: UpdateCampaignFocus, db: Session = Depends(get_db)):
    candidate = get_or_create_candidate(payload.candidate_id, db)
    candidate.campaign_focuses = [CampaignFocus(**focus.dict()) for focus in payload.campaign_focuses]
    db.commit()
    db.refresh(candidate)
    return candidate

@router.post("/contributions")
def update_contributions(payload: UpdateContributions, db: Session = Depends(get_db)):
    candidate = get_or_create_candidate(payload.candidate_id, db)
    candidate.contributions = [PositiveContribution(**c.dict()) for c in payload.contributions]
    db.commit()
    db.refresh(candidate)
    return candidate

@router.post("/controversies")
def update_controversies(payload: UpdateControversies, db: Session = Depends(get_db)):
    candidate = get_or_create_candidate(payload.candidate_id, db)
    candidate.controversies = [Controversy(**c.dict()) for c in payload.controversies]
    db.commit()
    db.refresh(candidate)
    return candidate

@router.post("/achievements")
def update_achievements(payload: UpdateAchievements, db: Session = Depends(get_db)):
    candidate = get_or_create_candidate(payload.candidate_id, db)
    candidate.achievements = [Achievement(**a.dict()) for a in payload.achievements]
    db.commit()
    db.refresh(candidate)
    return candidate

# -----------------------------
# Get Candidate Details
# -----------------------------
@router.get("/{candidate_id}", response_model=CreateCandidateDetailsSchema)
def get_candidate_details(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(CandidateDetails).filter(CandidateDetails.candidate_id == candidate_id).first()
    if not candidate:
        # Return empty default structure
        return CreateCandidateDetailsSchema(
            candidate_id=candidate_id,
            political_experiences=[],
            campaign_focuses=[],
            contributions=[],
            controversies=[],
            achievements=[]
        )
    return candidate
