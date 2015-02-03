
start: ;@echo "Starting Learntogether and logging to log/start.log...";
	@echo `date` > log/start.log
	@echo "Creating database..." | tee -a log/start.log
	@psql -h "$(db)" -f scripts/createDatabase.sql >>log/start.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!" | tee -a log/start.log
	@echo "Creating tables..." | tee -a log/start.log
	@psql -U root -d learntogether -h "$(db)" -f scripts/createTables.sql >>log/start.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!" tee -a start.log
	@nodemon server/server

install: ;@echo "Installing Learntogether and logging to log/install.log";
	@echo `date` > log/install.log
	@echo "Installing server packages..." | tee -a log/install.log
	@npm install >>log/install.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"
	@echo "Installing client packages..." | tee -a log/install.log
	@bower install --allow-root >>log/install.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

test-local:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

cleanup: ;@echo "Cleaning up and logging to log/cleanup.log...";
	@echo `date` > log/cleanup.log
	@rm -rf node_modules client/public/vendor
	@npm cache clear >>log/cleanup.log 2>&1
	@bower cache clean >>log/cleanup.log 2>&1
	@psql -U root -d postgres -h "$(db)" -f scripts/deleteDatabase.sql >>log/start.log 2>&1 && ([ $$? -eq 0 ] && echo "success!") || echo "failure!"


.PHONY: start test test-local cleanup
