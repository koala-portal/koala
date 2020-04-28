# Koala

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Linting

Modify ESLint rules in .eslintrc.json under "rules"

Modify Prettier rules in .eslintrc.json under "rules" -> "prettier/prettier"

### Enable automatic linting in VSCode

- Install ESLint VSCode extension
- Install Prettier VSCode extension
- run `npm i -g prettier eslint @typescript-eslint`
- Add the following to your settings.json file

```json
{
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}
```
### Getting Into The EC2 Instance
 - First you must have the pem file in order to SSH in securely.
 - If you're running on a Windows box you'll need to download a utility like Putty, otherwise move onto the next step (read here https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html).
 - Make sure you set the correct permissions on the key ("chmod 400 <pem file>")
 - Once you have that run the following command:
     "ssh -i <pem file> ec2-user@<ip-address>"
 - So for example, go to the directory with the pem file and run: "ssh -i k_portal.pem ec2-user@54.90.122.118"
 - You'll find the portal app running under /apps
 - You can run "ps -ef | grep portal" to see if it's running and under what pid
