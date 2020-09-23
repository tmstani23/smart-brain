-- run fresh db tables from docker entrypoint
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- seed an entry user on build
\i '/docker-entrypoint-initdb.d/seed/seed.sql'