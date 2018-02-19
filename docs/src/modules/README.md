## Redux's Modules Styleguide
- One folder is for one new redux state
- For each modules:
  - index.js is the core module
  - Create new .js file only if necessary
  - List all the ACTION constants in the beginning of the file
  - ** All action value should be unique globally **
  - For complete styleguide please read
    > https://github.com/erikras/ducks-modular-redux
  - Use switch for every action logic.
