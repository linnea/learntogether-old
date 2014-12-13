CREATE USER root WITH PASSWORD 'root';
CREATE DATABASE learntogether;
GRANT ALL PRIVILEGES ON DATABASE learntogether to root;

\connect learntogether

CREATE SCHEMA IF NOT EXISTS "core";
CREATE TABLE IF NOT EXISTS "Users" (
	"id"   SERIAL, 
	"firstName" VARCHAR(255),
	"lastName" VARCHAR(255),
	"email" VARCHAR(255) UNIQUE, 
	"password" VARCHAR(255), 
	"isAdmin" BOOLEAN,
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"isApproved" BOOLEAN,
	"role" integer NOT NULL,
	PRIMARY KEY ("id")
);
INSERT INTO "Users" ("firstName", "lastName", email, password, "isAdmin", "createdAt", "updatedAt", "isApproved", role) 
VALUES ('root', 'root', 'root', '$2a$08$qOepzilN.F074dhepDHv8unJ2VWqBj9ctMCKUwqwrvad1.Qsd2Pcu', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 5);
GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;