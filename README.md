# Weather API

## Installing

```shell
npm install
```

## Usage

In order to run the program you need to set up your configuration.
Place a development.js, a production.js and a test.js file to the config folder of the project. Use the config.js.tpl as sample.

Simply run the app. For production:

```shell
npm start
```

For development mode:

```shell
npm run dev
```

To run the tests locally:

```shell
npm test
```

To check your linting errors

```shell
npm run lint
```

To fill up your MongoDB with the cities (it takes a while, till all the 209579 records are saved)

```shell
node mongoSync.js
```
