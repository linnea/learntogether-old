### Vagrant Branch
This branch adds a Vagrant-powered Ubuntu virtual box for testing and development of LearnTogether.  
Advantages:
* Common OS environment makes for cohesive development
* Working with Linux gives us a headstart on deployment issues
* Change OS-level configs without screwing up your laptop

### How It Works:
Vagrant is wrapper for VirtualBox that allows for efficient config and boot of virtual machines.  By authoring a Vagrantfile (like the one in this repo), you can configure various aspects of a VM such as OS distro, networking, provisioning and virtual hardware (RAM, CPU, etc).  Then, it takes one simple command to boot the entire VM: `vagrant up`.

### Prereqs:
You will need to download and install both VirtualBox and Vagrant for your host OS to use the features in this branch:
* VirtualBox: https://www.virtualbox.org/wiki/Downloads
* Vagrant: https://www.vagrantup.com/downloads.html  

Then, in the command line, run `vagrant up` in the root of the repository.  Vagrant will pull the OS binaries, install dependencies, set up the database, and launch LearnTogether.  It will forward port 3001 through localhost, so `localhost:3001` in the web browser will bring up LearnTogether hosted on your own local Linux VM.  Saved changes will restart the server like usual.

Bingo, you're ready to develop in an environment consistent with the rest of the team.

### Issues:
* Nasty red text on npm install (no performance issues, just looks bad)
* Password entry on vagrant up for NFS share mounting: should be supressed
* Reload on save is kind of flakey

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
