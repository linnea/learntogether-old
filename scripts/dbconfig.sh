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
	"userFirstName" VARCHAR(255),
	"userLastName" VARCHAR(255),
	"email" VARCHAR(255) UNIQUE, 
	"password" VARCHAR(255), 
	"isAdmin" BOOLEAN,
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"isVerified" BOOLEAN,
	"role" integer NOT NULL
	PRIMARY KEY ("id")
);
INSERT INTO "Users" ("userOtherName", "userLastName", email, password, "isAdmin", "createdAt", "updatedAt", "isVerified", role) 
VALUES ('root', 'root', 'root', '$2a$08$qOepzilN.F074dhepDHv8unJ2VWqBj9ctMCKUwqwrvad1.Qsd2Pcu', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 5);
GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;
EOF
