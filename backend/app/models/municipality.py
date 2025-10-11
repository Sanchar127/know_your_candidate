from sqlalchemy import Column, BigInteger, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base
import enum

class MunicipalityCategoryEnum(enum.Enum):
    METROPOLITAN = "Metropolitan"
    SUB_METROPOLITAN = "Submetropolitan"
    MUNICIPALITY = "Municipality"
    RURAL_MUNICIPALITY = "Rural Municipality"

class Municipality(Base):
    __tablename__ = "municipalities"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    district_id = Column(BigInteger, ForeignKey("district.id", ondelete="CASCADE"), nullable=False)
    category = Column(Enum(MunicipalityCategoryEnum), nullable=False)
    area_sq_km = Column(String(50), nullable=True)
    website = Column(String(255), nullable=True)

    # Relationships
    district = relationship("District", back_populates="municipalities")
    wards = relationship("Ward", back_populates="municipality", cascade="all, delete-orphan")
    # Add this line inside District class
    # candidates = relationship("Candidate", back_populates="district", cascade="all, delete-orphan")
