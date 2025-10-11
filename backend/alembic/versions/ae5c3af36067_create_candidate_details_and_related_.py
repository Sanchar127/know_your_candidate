"""create candidate_details and related tables

Revision ID: ae5c3af36067
Revises: 2f46fe4977d6
Create Date: 2025-10-08 12:48:11.035822

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ae5c3af36067'
down_revision: Union[str, Sequence[str], None] = '2f46fe4977d6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
