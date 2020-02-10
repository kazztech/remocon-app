#!/bin/bash
npm run build
 
scp -r ./build raspi:/var/www/html