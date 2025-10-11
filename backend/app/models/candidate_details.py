# app/models/candidate_details.py
from sqlalchemy import Column, BigInteger, String, Text, Integer, ForeignKey, DateTime, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class CandidateDetails(Base):
    __tablename__ = "candidate_details"

    id = Column(BigInteger, primary_key=True, index=True)
    candidate_id = Column(BigInteger, ForeignKey("candidate.id", ondelete="CASCADE"), nullable=False)
    
    # Rating
    overall_rating = Column(Float, default=0.0)
    total_ratings = Column(Integer, default=0)
    
    # Keep these two as JSON
    past_elections = Column(JSON)  # [{year: number, position: string, result: string, votes: number}]
    social_links = Column(JSON)    # {facebook: string, twitter: string, instagram: string}

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    candidate = relationship("Candidate", back_populates="details")
    political_experiences = relationship(
        "PoliticalExperience", back_populates="candidate_details", cascade="all, delete-orphan"
    )
    campaign_focuses = relationship(
        "CampaignFocus", back_populates="candidate_details", cascade="all, delete-orphan"
    )
    contributions = relationship(
        "PositiveContribution", back_populates="candidate_details", cascade="all, delete-orphan"
    )
    controversies = relationship(
        "Controversy", back_populates="candidate_details", cascade="all, delete-orphan"
    )
    achievements = relationship(
        "Achievement", back_populates="candidate_details", cascade="all, delete-orphan"
    )


class PoliticalExperience(Base):
    __tablename__ = "political_experiences"

    id = Column(BigInteger, primary_key=True)
    candidate_details_id = Column(BigInteger, ForeignKey("candidate_details.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    year = Column(Integer)

    candidate_details = relationship("CandidateDetails", back_populates="political_experiences")


class CampaignFocus(Base):
    __tablename__ = "campaign_focuses"

    id = Column(BigInteger, primary_key=True)
    candidate_details_id = Column(BigInteger, ForeignKey("candidate_details.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    priority = Column(Integer)

    candidate_details = relationship("CandidateDetails", back_populates="campaign_focuses")


class PositiveContribution(Base):
    __tablename__ = "positive_contributions"

    id = Column(BigInteger, primary_key=True)
    candidate_details_id = Column(BigInteger, ForeignKey("candidate_details.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    date = Column(DateTime)
    impact = Column(String)

    candidate_details = relationship("CandidateDetails", back_populates="contributions")


class Controversy(Base):
    __tablename__ = "controversies"

    id = Column(BigInteger, primary_key=True)
    candidate_details_id = Column(BigInteger, ForeignKey("candidate_details.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    date = Column(DateTime)
    severity = Column(String)

    candidate_details = relationship("CandidateDetails", back_populates="controversies")


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(BigInteger, primary_key=True)
    candidate_details_id = Column(BigInteger, ForeignKey("candidate_details.id", ondelete="CASCADE"))
    description = Column(Text)

    candidate_details = relationship("CandidateDetails", back_populates="achievements")
