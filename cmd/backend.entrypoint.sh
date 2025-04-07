#!/bin/bash

echo "Writing environmental variables..."

echo RUN echo "DATABASE_URL=${DATABASE_URL}" >> ./packages/db/.env
echo RUN echo "API_KEY=${API_KEY}" >> ./apps/backend/.env
echo RUN echo "JWT_SECRET=${JWT_SECRET}" >> ./apps/backend/.env
echo RUN echo "SIGNING_SECRET=${SIGNING_SECRET}" >> ./apps/backend/.env
echo RUN echo "CLERK_ISSUER=${CLERK_ISSUER}" >> ./apps/backend/.env

exec "$@"