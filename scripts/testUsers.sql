CREATE OR REPLACE FUNCTION add_testUsers (firstName, lastName, email, password, isAdmin, createdAt, updatedAt, isApproved, role)
RETURN void AS aAU
BEGIN
	INSERT INTO "Users" VALUES(firstName, lastName, email, password, isAdmin, createdAt, updatedAt, isApproved, role)
END;