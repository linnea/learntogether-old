/* 
	List of Database Tables 
		- Users
		- Job
		- learningNode
		- learningMethod
		- learningItem
		- itemLevel
*/

/*
TODO:
	Add Learner to Schema (All Learners will be Users but not all Users are Learners)
	Add UserID to Learner and Leader tables
	Cache//Indexing database
	eval-learner is just an "attempt" at a specific challenge/problem -- each entry in here is a different attempt
	Add isDeleted/isActive flags for all tables for lazy delete
*/

CREATE SCHEMA IF NOT EXISTS "core";

-- Users Table 
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
-- Default values of columns if you don't specify during INSERT
ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Users" ALTER COLUMN "isAdmin" SET DEFAULT FALSE;
ALTER TABLE "Users" ALTER COLUMN "isApproved" SET DEFAULT FALSE;
ALTER TABLE "Users" ALTER COLUMN "role" SET DEFAULT 100;


-- Job Table 
CREATE TABLE IF NOT EXISTS "Job" (
	"id"   SERIAL, 
	"name" VARCHAR(45),
	"shortDecription" VARCHAR(300),
	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT




-- learningNode Table 
CREATE TABLE IF NOT EXISTS "learningNode" (
	"id"   SERIAL, 
	"prevNodeId" integer,
	"nextNodeId" integer,
	"jobId" integer,
	"order" integer,
	"parentNodeId" integer,
	"itemLevelId" integer,
	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT



-- learningMethod Table 
CREATE TABLE IF NOT EXISTS "learningMethod" (
	"id"   SERIAL, 
	"title" VARCHAR(45),
	"shapeFile" VARCHAR(45),
 	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT



-- learningItem Table 
CREATE TABLE IF NOT EXISTS "learningItem" (
	"id"   SERIAL, 
	"title" VARCHAR(45),
	--"xmlContent" VARCHAR(255),
	"type" integer,
 	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT



-- itemLevel Table 
CREATE TABLE IF NOT EXISTS "itemLevel" (
	"id"   SERIAL, 
	"title" VARCHAR(45),
	"contentItemID" integer,
	"levelNum" integer,
	"learningMethodID" integer,
 	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT


-- Inserts a superadmin, root, into the databse for access in the system. 
INSERT INTO "Users" ("firstName", "lastName", "email", "password", "isAdmin", "createdAt", "updatedAt", "isApproved", "role") 
VALUES ('root', 'root', 'root', '$2a$08$qOepzilN.F074dhepDHv8unJ2VWqBj9ctMCKUwqwrvad1.Qsd2Pcu', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 300);
GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;
