start:
	## run as: make start db=<hostname_of_postgres_server>
	psql -h "$(db)" -f scripts/createDatabase.sql
	psql -U root -d learntogether -h "$(db)" -f scripts/createTables.sql
	npm install
	bower install --allow-root
	nodemon server/server

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

test-local:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

cleanup:
	## run as: make start db=<hostname_of_postgres_server>
	rm -rf node_modules client/public/vendor
	npm cache clear
	bower cache clean
	psql -U root -d postgres -h "$(db)" -f scripts/deleteDatabase.sql


.PHONY: start test test-local cleanup