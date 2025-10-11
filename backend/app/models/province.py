from sqlalchemy import Column, BigInteger, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base


class Province(Base):
    __tablename__ = "province"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    area_sq_km = Column(String(50), nullable=True)
    website = Column(String(255), nullable=True)
    headquarter = Column(String(255), nullable=True)

    country_id = Column(BigInteger, ForeignKey("country.id", ondelete="CASCADE"), nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    country = relationship("Country", back_populates="provinces")
    districts = relationship("District", back_populates="province", cascade="all, delete-orphan")
    # Add this line inside Province class
    candidates = relationship("Candidate", back_populates="province", cascade="all, delete-orphan")
