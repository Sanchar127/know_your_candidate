#!/bin/sh
# wait-for-all.sh

set -e

host_postgres="$1"
host_rabbit="$2"
host_redis="$3"
shift 3

# Wait for Postgres
until pg_isready -h "$host_postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "Waiting for Postgres at $host_postgres..."
  sleep 2
done

# Wait for RabbitMQ
until nc -z "$host_rabbit" 5672; do
  echo "Waiting for RabbitMQ at $host_rabbit..."
  sleep 2
done

# Wait for Redis (Dragonfly)
until nc -z "$host_redis" 6379; do
  echo "Waiting for Redis at $host_redis..."
  sleep 2
done

exec "$@"
