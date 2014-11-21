CREATE USER root WITH PASSWORD 'root';
CREATE DATABASE learntogether;
GRANT ALL PRIVILEGES ON DATABASE learntogether to root;

\connect learntogether

CREATE SCHEMA IF NOT EXISTS "core";
CREATE TABLE IF NOT EXISTS "Users" (
	"id"   SERIAL, 
	"name" VARCHAR(255), 
	"email" VARCHAR(255) UNIQUE, 
	"password" VARCHAR(255), 
	"isAdmin" BOOLEAN,
	"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
	PRIMARY KEY ("id")
);
INSERT INTO "Users" (name, email, password, "isAdmin", "createdAt", "updatedAt") VALUES ('root', 'root', 'root', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;
