start:
	## run as: make start db=<hostname_of_postgres_server>
	psql -d learntogether -h "$(db)" -f scripts/createTables.sql
	npm install
	bower install --allow-root
	nodemon server/server

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

test-local:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

cleanup:
	@rm -r node_modules client/public/vendor
	@node cache clear
	@bower cache clean


.PHONY: start test test-local cleanup