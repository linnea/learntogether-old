#!/bin/bash

## ADD ROOT USER, CREATE SYNTHERGIZEDB DATABASE, GRANT ALL PRIVILEGES
psql -h localhost << EOF
CREATE USER root WITH PASSWORD 'root';
CREATE DATABASE learntogether;
GRANT ALL PRIVILEGES ON DATABASE learntogether to root;
\q
EOF

psql learntogether << EOF
CREATE SCHEMA IF NOT EXISTS "core";
CREATE TABLE IF NOT EXISTS "Users" (
	"id"   SERIAL, 
	"name" VARCHAR(255), 
	"email" VARCHAR(255) UNIQUE, 
	"password" VARCHAR(255), 
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	PRIMARY KEY ("id")
);
GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;
EOF
