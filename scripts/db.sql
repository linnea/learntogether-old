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

### Default values of columns if you don't specify during INSERT
ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Users" ALTER COLUMN "isAdmin" SET DEFAULT FALSE;
ALTER TABLE "Users" ALTER COLUMN "isApproved" SET DEFAULT FALSE;
ALTER TABLE "Users" ALTER COLUMN "role" SET DEFAULT 100;

### Inserts a superadmin, root, into the databse for access in the system. 
INSERT INTO "Users" ("firstName", "lastName", email, password, "isAdmin", "createdAt", "updatedAt", "isApproved", role) 
VALUES ('root', 'root', 'root', '$2a$08$qOepzilN.F074dhepDHv8unJ2VWqBj9ctMCKUwqwrvad1.Qsd2Pcu', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 300);

GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;