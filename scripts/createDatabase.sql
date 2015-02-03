CREATE USER root WITH PASSWORD 'root';
CREATE DATABASE learntogether;
ALTER DATABASE learntogether OWNER TO root;
GRANT ALL PRIVILEGES ON DATABASE learntogether to root;