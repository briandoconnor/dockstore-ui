# dockstore-ui
[![Build Status](https://travis-ci.org/CancerCollaboratory/dockstore-ui.svg?branch=develop)](https://travis-ci.org/CancerCollaboratory/dockstore-ui)

AngularJS UI for the Dockstore Web Service.

### Configuration Parameters
All configuration for the Dockstore UI is done in the `app/scripts/services/webservice.js` file.

1. For development, the server name should be `http://localhost:9000`, on a production environment, replace this URI with a fully-qualified domain name (e.g. `https://www.dockstore.org:8443`).
  ```
  API_URI: 'http://localhost:8080',
  API_URI_DEBUG: 'http://localhost:8090/tests/dummy-data',
  ```

2. Replace `GITHUB_CLIENT_ID` with the client id for your GitHub Dockstore application.
  ```
  GITHUB_AUTH_URL: 'https://github.com/login/oauth/authorize',
  GITHUB_CLIENT_ID: 'a70739297a7d67f915de',
  GITHUB_REDIRECT_URI: 'http://localhost:9000/login',
  GITHUB_SCOPE: 'read:org',
  ```

3. Replace `QUAYIO_CLIENT_ID` with the client id for your Quay.io Dockstore application. Use `http://localhost:9000` only for development.
  ```
  QUAYIO_AUTH_URL: 'https://quay.io/oauth/authorize',
  QUAYIO_CLIENT_ID: 'RWCBI3Y6QUNXDPYKNLMC',
  QUAYIO_REDIRECT_URI: 'http://localhost:9000/onboarding',
  QUAYIO_SCOPE: 'repo:read,user:read'
  ```

### Third-Party API Integration
Dockstore currently integrates with GitHub and Quay.io, in the following steps, replace `http://localhost:9000` with a fully-qualified domain name on a production environment.

1. On GitHub, create an application and enter the following for `Authorization callback URL`: `http://localhost:9000/login`.
2. On Quay.io, create an application and enter the following for `Redirect/Callback URL Prefix`: `http://localhost:9000/onboarding`.

### Setting Up the Build Environment
1. Install Node.js and NPM on your workstation, specific instructions will vary depending on the operating system distribution. The use of [nvm](https://github.com/creationix/nvm) is encouraged in supported environments.
2. Install the principal build dependencies globally:
  ```
  npm install --global grunt-cli bower yo generator-karma generator-angular toaster
  ```

3. Install Compass, on Ubuntu 14.04 LTS run (use brew on Mac OS X):
  ```
  sudo apt-get install -y ruby ruby-dev
  gem install compass
  ```

4. Update NPM and Bower packages:
  ```
  npm update
  bower update
  ```

5. Attempt to build the project by running: `grunt` from the root directory of the dockstore-ui repository. On Mac OS X, use NPM to install any missing dependencies indicated by the output of the build tool until it succeeds (it may be necessary to install some packages locally).

### Running the Dockstore UI (Development)
1. The Dockstore web service and database should be running, and the API accessible on `http://localhost:8080`.
2. All the configuration in the JavaScript and on GitHub/Quay.io should be set to use `http://localhost:9000`.
3. In the dockstore-ui repository root directory, run `grunt serve`.
4. You should be automatically navigated to `http://localhost:9000` in a web browser.

### Deploying the Dockstore UI (Production)
1. The Dockstore web service and database should be running, and the API accessible on `https://www.dockstore.org:8080` (the API may use a different server name if desired).
2. All the configuration in the JavaScript and on GitHub/Quay.io should be set to use `https://www.dockstore.org/`.
3. In the dockstore-ui repository root directory, run `grunt` to build the project, this will execute unit tests, compile all the HTML templates and JavaScript source files, and copy over all the required dependencies.
4. Copy the contents of the `dockstore-ui/dist` folder to the root directory of your web server (e.g. NGINX, Apache, AWS S3, ...).
5. Navigate to `https://www.dockstore.org/` in your web browser.

### Adding Documentation
Documents written in Markdown should be placed in the `app/docs/` directory, they will be visible from the Documentation page in UI after adding an object like this to the `docObjs` array in `app/scripts/services/documentationservice.js`:
```
{
  slug: 'getting-started',
  name: 'Getting Started',
  path: 'docs/getting-started.md'
}
```

### Resources
+ [Getting Started with Grunt](http://blog.teamtreehouse.com/getting-started-with-grunt)
