#!/bin/bash

## DESTROY ALL MONSTERS
psql -h localhost << EOF
DROP DATABASE learntogether;
DROP USER root;
\q
EOF