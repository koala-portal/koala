# Koala

The front end for this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

The back end for this project was generated with [Spring Initializer] (https://start.spring.io/) version no-idea....

## To Run in Development Mode
 - Go into your assigned properties file which is located in src/main/resources and is called application-[your name].properties.  Open it and make sure all of the values are correct, and that the path for your keystores are valid.
- Notice that all the certs you'll need to develop over SSL are located in ./src/main/resources/keys/localhost including the key/trust store you'll need to run your server and the p12 certs you'll need to load into your browser (more on this later).
- Once your properties file is updated open a command prompt at the root of the project and run 'gradle clean bootRun -Dspring.profiles.active=matt' (@TODO - I'll work on generating a gradle wrapper here in a bit).
- You should see Tomcat start up with a message of `Tomcat started on port(s): 8443 (https) with context path ''`.  Go to https://localhost:8443/api/whoami to make sure it's up (you won't be able to get in because you haven't loaded your certs yet, but at least you can see if it's up).
- Now import the required certs into the browser.  They're called admin.p12 and viewer.p12 and are located in ./src/main/resources/keys/localhost.  If you're using a Mac follow the steps here (https://medium.com/@niral22/2-way-ssl-with-spring-boot-microservices-2c97c974e83) under "To import this .p12 file on mac, you will need to import this on login keychain".  If you're using a Windows machine and Chrome use this (https://support.globalsign.com/digital-certificates/digital-certificate-installation/install-client-digital-certificate-windows-using-chrome) or if using a Windows machine and Firefox use this (https://knowledge.digicert.com/solution/SO5437.html).  If you're using I.E. you're fired.  The password for all certs is `portal`.
- Restart your browser and hit https://localhost:8443/api/whoami again.  It should prompt you to pick one of the two certs.  Pick one and you should see a JSON response similar to this: "{"userName":"John Doe","userCreds":"John Doe","role":"ADMIN"}".
- You can now go to https://localhost:8443/swagger-ui.html and see what the API looks like.
- Now you need to start up the front end.  To do this open a second command prompt and navigate to ./frontend (the root of your front-end application).
- Once there run `ng serve` to start your Angular front-end.  Open up `http://localhost:4200/` in your browser.  If everything went as planned you should have a pop-up that says something like: "John Doe is logged in as a(n) [ADMIN/VIEWER]".


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
