# Tests

Before running the tests:
1. From the root of the repository, navigate to 'tests' (Terminal `cd tests`). (Note: not to 'tests/tests'.)
2. Execute `npm ci` to install all test dependencies.

Then execute the tests:
```
npx playwright test --headed
```

The app will be tested on Chrome, Firefox and Safari for the tests in the folder 'tests/tests'.