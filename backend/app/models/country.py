# app/models/country.py
from sqlalchemy import Column, BigInteger, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.base import Base

class Country(Base):
    __tablename__ = "country"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    code = Column(String(10), unique=True, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Add this relationship
    provinces = relationship("Province", back_populates="country", cascade="all, delete-orphan")
