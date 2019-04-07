const cypress = require('cypress');

cypress.run().then(
    () => {
    },
    (error) => {
        process.exit(1);
    },
);