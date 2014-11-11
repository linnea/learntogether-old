LearnTogether
===========

Modular LMS platform designed for the next generation of online learning.
  
### Installation

**Prerequisites**

Install Homebrew, Node.js, Bower, Nodemon
```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install node
$ npm install -g bower
$ npm install -g nodemon
```

Install PostgreSQL 
- Mac  
  - [Postgres.app](http://postgresapp.com/) (PG server) + [add CLI tools](http://postgresapp.com/documentation/cli-tools.html)
  - [PG Commander](https://eggerapps.at/pgcommander/) (GUI client)  
- Other
  - [Postgres downloads](http://www.postgresql.org/download/) (various OS options)  

**Local**

Clone git repo, setup db, install node/bower packages
```
$ git clone https://github.com/alexburner/synthergize.git
$ cd synthergize
$ ./scripts/dbconfig.sh
$ npm install
$ bower install
```

Setup PostgreSQL
- If you have a pre-existing PostgreSQL database named "learntogether" run the tear down script first `./scripts/dbteardown.sh`
- Then run the build script: `./scripts/dbconfig.sh`



### Run

From project folder root
```
$ nodemon server/server.js
```


TODO
===========  

#### Node  
- ~~better error handling~~
- even better error handling
- ~~should we https?~~ yes
- dave's "graceful shutdown"
- ~~what happened to promises~~ they'll come when they're needed
- ~~what is up with favicon~~
- ~~right now routers are peppered with "users.requiresLogin"~~
	- ~~would it be better to separate into "public" & "secure" folders?~~
	- yes it would! the switch has been made

#### Angular  
- install in project
- are we using bower?

#### General
- testing
- should we use grunt/gulp to minify/concat stuff?
- how to names (first, middle, last, full, display)

Notes
===========  

#### Node  
- three node apps served as the main inspiration
	- Dave's 343 app @ https://bitbucket.org/drstearns/info343/src
	- MEAN.JS starter app @ http://meanjs.org/
	- generator-angular-fullstack @ https://github.com/DaftMonk/generator-angular-fullstack
- most of the magic starts in a few files and branches out from there:
	- server/server.js: start the node server
	- server/config/express.js: setup express middleware
- any folder with index.js is owned by index.js
	- `require('./path/to/folder');` will execute index.js
	- index.js can be expected to handle all other files in folder
	- (currently index.js can also be expected to handle all folders within too, but that's open to debate)
- "Middleware" is used by the Express request handling chain
	- normal middleware looks like `function (req, res, next) { ... }`
	- continue chain by calling `next();`
	- "throw" error by passing anything to next (like `next(err);`)
	- error handline middleware has 4 arguments instead of three
		- `function (err, req, res, next) { ... }`
		- Express is chain, so "thrown" error hits whatever error handler follows next in the chain
		- Error handler can do three things: 
			- continue normal chain with `next();`
			- pass to next error handler with `next(err);`
			- halt request chain by sending response (like `res.json(obj);`)
- "Endpoints" are used to handle http requests
	- look like `function (req, res) { ... }`
	- method is decided by router
		- GET: `router.get('/thing', thing.anEndpointFunction)`
		- POST: `router.post('/thing', thing.anotherEndpointFunction)`
