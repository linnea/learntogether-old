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
	"shortDecription" LONGTEXT,
	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT
ALTER TABLE "Job" ALTER COLUMN "name" SET DEFAULT "Job";
ALTER TABLE "Job" ALTER COLUMN "shortDecription" SET "Job";



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
ALTER TABLE "learningNode" ALTER COLUMN "prevNodeId" SET DEFAULT 0;
ALTER TABLE "learningNode" ALTER COLUMN "nextNodeId" SET DEFAULT 1;
ALTER TABLE "learningNode" ALTER COLUMN "jobId" SET DEFAULT 1;
ALTER TABLE "learningNode" ALTER COLUMN "order" SET DEFAULT 0;
ALTER TABLE "learningNode" ALTER COLUMN "parentNodeId" SET DEFAULT 1;
ALTER TABLE "learningNode" ALTER COLUMN "itemLevelId" SET DEFAULT 1;



-- learningMethod Table 
CREATE TABLE IF NOT EXISTS "learningMethod" (
	"id"   SERIAL, 
	"title" VARCHAR(45),
	"shapeFile" VARCHAR(45)
 	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT
ALTER TABLE "learningMethod" ALTER COLUMN "title" SET DEFAULT "Title";
ALTER TABLE "learningMethod" ALTER COLUMN "shapeFile" SET DEFAULT "Shape";





-- learningItem Table 
CREATE TABLE IF NOT EXISTS "learningItem" (
	"id"   SERIAL, 
	"title" VARCHAR(45),
	--"xmlContent" VARCHAR(255),
	"type" integer,
 	PRIMARY KEY ("id")
);
-- Default values of columns if you don't specify during INSERT
ALTER TABLE "learningItem" ALTER COLUMN "title" SET DEFAULT "Title";
ALTER TABLE "learningItem" ALTER COLUMN "type" SET DEFAULT 1;



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
ALTER TABLE "itemLevel" ALTER COLUMN "title" SET DEFAULT "Title";
ALTER TABLE "itemLevel" ALTER COLUMN "contentItemID" SET DEFAULT 1;
ALTER TABLE "itemLevel" ALTER COLUMN "levelNum" SET DEFAULT 0;
ALTER TABLE "itemLevel" ALTER COLUMN "learningMethodID" SET DEFAULT 1;




-- Inserts a superadmin, root, into the databse for access in the system. 
INSERT INTO "Users" ("firstName", "lastName", email, password, "isAdmin", "createdAt", "updatedAt", "isApproved", role) 
VALUES ('root', 'root', 'root', '$2a$08$qOepzilN.F074dhepDHv8unJ2VWqBj9ctMCKUwqwrvad1.Qsd2Pcu', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 300);

GRANT ALL PRIVILEGES ON TABLE "Users" TO root;
GRANT ALL PRIVILEGES ON "Users_id_seq" TO root;