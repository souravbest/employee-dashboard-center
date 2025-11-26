# Steps to run the project 

# EmployeeDashboardCenter

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Assumptions made 

1. The user interacting with the application has basic knowledge of adding and managing employee records.
2. Each employee record must contain the following mandatory fields:
        a> Name
        b> Email
        c> Department
        d> Date of Joining


3. The application runs in a modern web browser that supports Angular features (e.g., Chrome, Edge, Firefox).
4. Data persistence in this version is handled in Local memory (not stored in a database), and data will reset on     page refresh.

5. No authentication or login is required for this basic version of the application.
6. User input is assumed to be genuine and not malicious; advanced validation and security checks are not included at this stage.


## List of bonus features (if implemented) 

1.  Export employee list as CSV. >> Implemented
2. Follow best practices for folder structure and clean code.  >> Implemented
3. Use Git for version control (commit regularly).  >> Implemented
4.  UI/UX (responsiveness, user experience, attention to detail).  >> Implemented
5. Problem Solving (handling requirements like persistence, search, validations).  >> Implemented
6. Use Angular (v10+) and TypeScript.  >> Implemented

