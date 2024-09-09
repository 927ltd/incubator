## Incubator Monorepo

- Apps specific code lives in the /app/(app_name)/ folder.

### To use:

- create new app specific folder in /app/(app_name)/
- create config.ts file with default export of TIncubatorConfig type
- Copy env.example to env.local and configure supabase url, key and app_name for the app_name you want to load.
- Run npm run dev to develop with remote supabase
