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
- better error handling
- should we https?
- dave's "graceful shutdown"
- what happened to promises

#### Angular  
- install in project
- are we using bower?

#### Both
- should we use grunt/gulp to minify/concat stuff?
- testing