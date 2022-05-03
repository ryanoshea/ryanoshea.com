#!/bin/zsh

echo
echo "Creating production front-end build."
npm run build

echo
echo "Stopping ryanoshea.com server."
ssh ryanoshea.com "pkill -9 node"

# Backend
echo
echo "Deploying back-end assets."
rsync -avz -e "ssh" --progress ../backend/server.js ryanoshea.com:/home/ryan/ryanoshea.com/backend --delete
rsync -avz -e "ssh" --progress ../backend/app.js ryanoshea.com:/home/ryan/ryanoshea.com/backend --delete
rsync -avz -e "ssh" --progress ../backend/flickrAuth.js ryanoshea.com:/home/ryan/ryanoshea.com/backend --delete
rsync -avz -e "ssh" --progress ../backend/package.json ryanoshea.com:/home/ryan/ryanoshea.com/backend --delete
rsync -avz -e "ssh" --progress ../backend/package-lock.json ryanoshea.com:/home/ryan/ryanoshea.com/backend --delete

# Frontend
echo
echo "Deploying front-end assets."
rsync -avz -e "ssh" --progress ../frontend/build/ ryanoshea.com:/home/ryan/ryanoshea.com/frontend/build --delete

echo
echo "Restoring back-end dependencies and starting ryanoshea.com server."
ssh ryanoshea.com "./start.sh"
