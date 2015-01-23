test:

	@NODE_ENV=test ./node_modules/.bin/mocha --reporter xunit "test/server/**/*.js" | grep "<" > report.xml

.PHONY: test
