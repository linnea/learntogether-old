test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

test-local:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

.PHONY: test test-local
