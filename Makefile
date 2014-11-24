test:
	@./node_modules/.bin/mocha --reporter spec "test/server/**/*.js"

.PHONY: test