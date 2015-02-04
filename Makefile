
fresh: cleanup install

start: ;@echo "Starting Learntogether and logging to log/start.log...";
	@nodemon server/server

install: db_build
	@echo "Installing Learntogether and logging to log/install.log";
	@echo `date` > log/install.log
	@echo "Installing server packages..." | tee -a log/install.log
	@npm install >>log/install.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"
	@echo "Installing client packages..." | tee -a log/install.log
	@bower install --allow-root >>log/install.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

clean: db_drop
	@echo "Cleaning up and logging to log/cleanup.log..."
	@echo `date` > log/cleanup.log
	@rm -rf node_modules client/public/vendor && \
	npm cache clear >>log/cleanup.log 2>&1 && \
	bower cache clean --allow-root >>log/cleanup.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

db_build: ;@echo "Building database and logging to log/db.log...";
	@echo `date` > log/db.log
	@echo "Creating database..." | tee -a log/db.log
	@psql -U postgres -h "$(db)" -f scripts/createDatabase.sql >>log/db.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"
	@echo "Creating tables..." | tee -a log/db.log
	@psql -U root -d learntogether -h "$(db)" -f scripts/createTables.sql >>log/db.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

db_drop: ;@echo "Destroying database and logging to log/db.log...";
	@echo `date` > log/db.log
	@psql -U postgres -d postgres -h "$(db)" -f scripts/deleteDatabase.sql >>log/db.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

test: 
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

test-local:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

.PHONY: start test test-local db_build db_drop
