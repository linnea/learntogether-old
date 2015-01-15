## Full set of different users specifically for testing. Inserts a set of static test users who have different roles.
## 		Static roles updated only by Database Admin
## For requests to add specific roles/users, please contact Francis Nguyen, fm.nguyen937@gmail.com

## Full documentation can be found in the Users document on Github // Google Drive

\connect learntogether

CREATE OR REPLACE FUNCTION add_testUsers (firstName, lastName, email, password, isAdmin, createdAt, updatedAt, isApproved, role)
RETURN void AS aAU
BEGIN
	INSERT INTO "Users" VALUES(firstName, lastName, email, password, isAdmin, createdAt, updatedAt, isApproved, role)
END;

## Users with 'Admin' // 300 Priveleges
SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 300);
SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 300);
SELECT add_testUsers('', '', '', 'pw', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 300);

## Users with 'Leader' // 200 Priveleges
SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 200);
SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 200);
SELECT add_testUsers('', '', '', 'pw', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 200);

## Users with 'User' // 100 Privleges

SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 100);
SELECT add_testUsers('', '', '', 'pw', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE, 100);
SELECT add_testUsers('', '', '', 'pw', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, 100);