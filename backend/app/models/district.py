# app/models/district.py
from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class District(Base):
    __tablename__ = "district"

    id = Column(BigInteger, primary_key=True, index=True)
    province_id = Column(BigInteger, ForeignKey("province.id", ondelete="CASCADE"), nullable=False)

    name = Column(String(255), nullable=False)
    area_sq_km = Column(String(50), nullable=True)
    website = Column(String(255), nullable=True)
    headquarter = Column(String(255), nullable=True)

    # Relationships
    province = relationship("Province", back_populates="districts")
    municipalities = relationship("Municipality", back_populates="district", cascade="all, delete-orphan")

    # Candidate relationship defined as a string reference to avoid circular import issues
    candidates = relationship("Candidate", back_populates="district", cascade="all, delete-orphan")
