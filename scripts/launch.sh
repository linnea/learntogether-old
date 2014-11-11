#! /bin/bash
# scripts/launch.sh

## DEPENDENCIES
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
npm install /vagrant
npm install -g supervisor


## LAUNCH LEARNTOGETHER APP w/ SUPERVISOR
supervisor -w /vagrant /vagrant/server/server.js