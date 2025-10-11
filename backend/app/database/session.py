from sqlalchemy.orm import Session
from app.database.base import SessionLocal

# Dependency
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
