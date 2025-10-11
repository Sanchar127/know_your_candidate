from celery import Celery
from app.config import settings

celery_app = Celery(
    "app",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.task_routes = {
    "app.tasks.code_review_tasks.run_code_review": {"queue": "code_reviews"},
}
