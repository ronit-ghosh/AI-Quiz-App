#!/bin/bash

echo "Writing environmental variables..."

echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}" >> ./apps/frontend/.env.local
echo "CLERK_SECRET_KEY=${CLERK_SECRET_KEY}" >> ./apps/frontend/.env.local

exec "$@"