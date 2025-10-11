"""create candidate_details and related tables

Revision ID: 2f46fe4977d6
Revises: d5272fe13e84
Create Date: 2025-10-08 12:44:05.776116

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2f46fe4977d6'
down_revision: Union[str, Sequence[str], None] = 'd5272fe13e84'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    """Upgrade schema."""
    # CandidateDetails table
    op.create_table(
        "candidate_details",
        sa.Column("id", sa.BigInteger(), primary_key=True, index=True),
        sa.Column("candidate_id", sa.BigInteger(), sa.ForeignKey("candidate.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("overall_rating", sa.Float(), server_default="0.0"),
        sa.Column("total_ratings", sa.Integer(), server_default="0"),
        sa.Column("past_elections", sa.JSON(), nullable=True),
        sa.Column("social_links", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), onupdate=sa.func.now()),
    )

    # PoliticalExperience table
    op.create_table(
        "political_experiences",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("candidate_details_id", sa.BigInteger(), sa.ForeignKey("candidate_details.id", ondelete="CASCADE"), index=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("year", sa.Integer(), nullable=True),
    )

    # CampaignFocus table
    op.create_table(
        "campaign_focuses",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("candidate_details_id", sa.BigInteger(), sa.ForeignKey("candidate_details.id", ondelete="CASCADE"), index=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("priority", sa.Integer(), nullable=True),
    )

    # PositiveContribution table
    op.create_table(
        "positive_contributions",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("candidate_details_id", sa.BigInteger(), sa.ForeignKey("candidate_details.id", ondelete="CASCADE"), index=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("date", sa.DateTime(), nullable=True),
        sa.Column("impact", sa.String(), nullable=True),
    )

    # Controversy table
    op.create_table(
        "controversies",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("candidate_details_id", sa.BigInteger(), sa.ForeignKey("candidate_details.id", ondelete="CASCADE"), index=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("date", sa.DateTime(), nullable=True),
        sa.Column("severity", sa.String(), nullable=True),
    )

    # Achievement table
    op.create_table(
        "achievements",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("candidate_details_id", sa.BigInteger(), sa.ForeignKey("candidate_details.id", ondelete="CASCADE"), index=True),
        sa.Column("description", sa.Text(), nullable=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("achievements")
    op.drop_table("controversies")
    op.drop_table("positive_contributions")
    op.drop_table("campaign_focuses")
    op.drop_table("political_experiences")
    op.drop_table("candidate_details")
