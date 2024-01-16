# NextJS Auth Example 3

Technologies used:

- tailwind css
- shandcn UI
- Drizzle
- Neon

Common Commands:

```bash
# push the db schema to the db
npx drizzle-kit push:pg
npx drizzle-kit studio
openssl rand -hex 32 # to generate an auth secret
```

## Code History

The code in this repository is based on:

- https://www.nexttonone.lol/part-1
  - 1/12/24 - Finished Part 2

## Creation History

```bash
npx create-next-app@latest
cd nextjs-auth-ex3/
npm i drizzle-orm
npm install -D drizzle-kit
npm install -D dotenv
# push the db schema to the db
npx drizzle-kit push:pg
# need the below for drizzle-kit studio
npm install -D pg
npx drizzle-kit studio
npm i @neondatabase/serverless
npm install next-auth@beta
```

## DB Setup And Use

```sql title="Migration Role"
-- Create a new role for migrations
CREATE ROLE migration_role WITH LOGIN PASSWORD 'password';
-- Grant permissions on the "neondb" database
GRANT ALL PRIVILEGES ON DATABASE "neondb" TO migration_role;
-- Grant usage on the "public" schema
GRANT USAGE, CREATE ON SCHEMA public TO migration_role;
-- Become a member of migration_role
GRANT migration_role TO current_user;
```

```sql title="App Role"
-- Create a new role for the application
CREATE ROLE app_role WITH LOGIN PASSWORD 'password';
-- Grant permissions on the "neondb" database
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_role;
-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES FOR ROLE migration_role IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_role;
-- Set default privileges for future sequences
ALTER DEFAULT PRIVILEGES FOR ROLE migration_role IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO app_role;
```

### Creating a new Migration Role

You don't need to run any of this code right now, but it's here as a reference for if you need it in the future.

If you've already performed a migration and need to create a new role to perform migrations, first delete the migration_role, then create a new one using the same [migration code][#migration-role] code as above. Then grant permission to the drizzle schema and transfer ownership of all tables to the new role.

```sql title="New Migration Role"
GRANT USAGE, CREATE ON SCHEMA public TO migration_role2;

DO $$
DECLARE
   table_name text;
BEGIN
   FOR table_name IN (SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public')
   LOOP
      EXECUTE 'ALTER TABLE ' || table_name || ' OWNER TO migration_user2;';
   END LOOP;
END $$;
-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES FOR ROLE migration_role2 IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_role;
-- Set default privileges for future sequences
ALTER DEFAULT PRIVILEGES FOR ROLE migration_role2 IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO app_role;
```
