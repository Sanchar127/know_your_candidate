# app/services/candidate_service.py

from typing import List, Dict
from app.database.base import SessionLocal
from app.models.candidate import Candidate
from app.models.province import Province
from app.models.district import District
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="candidate_parser.log",
    filemode="w",
)
logger = logging.getLogger(__name__)


def save_candidates_to_db(candidates: List[Dict]):
    """Store parsed candidates into the database."""
    session = SessionLocal()
    inserted, skipped = 0, 0

    try:
        for data in candidates:
            province = (
                session.query(Province)
                .filter(Province.name.ilike(data["province"]))
                .first()
            )
            district = (
                session.query(District)
                .filter(District.name.ilike(data["district"]))
                .first()
            )

            if not province and not district:
                skipped += 1
                continue

            existing = (
                session.query(Candidate)
                .filter(
                    Candidate.name == data["name"],
                    Candidate.constituency == data["constituency"],
                    Candidate.election_type == data["election_type"],
                )
                .first()
            )
            if existing:
                skipped += 1
                continue

            candidate = Candidate(
                election_type=data.get("election_type", ""),
                name=data.get("name", ""),
                age=int(data["age"]) if str(data["age"]).isdigit() else None,
                gender=data.get("gender", ""),
                nationality=data.get("nationality", "Nepali"),
                party=data.get("party", ""),
                constituency=data.get("constituency", ""),
                source_file=data.get("source_file", ""),
                province_id=province.id if province else None,
                district_id=district.id if district else None,
            )

            session.add(candidate)
            inserted += 1

        session.commit()
        logger.info(f"✅ Inserted {inserted} candidates, skipped {skipped} duplicates or unmatched.")
        print(f"✅ Inserted {inserted} candidates, skipped {skipped}.")
    except Exception as e:
        logger.error(f"❌ Failed to save candidates: {e}")
        session.rollback()
    finally:
        session.close()
