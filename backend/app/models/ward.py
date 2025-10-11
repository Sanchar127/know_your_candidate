# app/models/ward.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base


class Ward(Base):
    __tablename__ = "wards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    number = Column(Integer, nullable=False)

    municipality_id = Column(Integer, ForeignKey("municipalities.id"), nullable=False)

    municipality = relationship("Municipality", back_populates="wards")
