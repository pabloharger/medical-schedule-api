# hodonto-api
NodeJS Medical Schedule CRUD API

#### Database
Configure ./config.json.

If you are using .ENV file, set the property "use_env_variable": "DATABASE_URL" and fill the environment var DATABASE_URL

run: npx sequelize-cli db:migrate

#### ENV
rename the file .ENV.SAMPLE to .ENV and fill the variables

### Heroku Deploy ###

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/pabloharger/hodonto-api)