
# Project Outline

This project is divided into two parts, the APi and the Fronted, as detailed below and all instructions are for a MacOs setup. This guide assumes that you have installed Homebrew and are familliar with how to use it. We will use Foreman to boot up all three components but I have also included a Docker-compose setup which I will detail as an alternate setup.

1. The API which is called BarTab, it is built in ruby and requires a Postgres DB
2. A Frontend UI, built using ReactJS.

## Code

First clone the repo git clone git@github.com:sanjuro/rentoza.git and enter the project folder

## Database ( Postgres )

### Setup
1. Install postgres with homebrew
    ```shell
    brew install postgresql@14
    brew services start postgresql@14
    ```

## API ( Ruby )

This is the API which will be consumed by the Frontend. It makes use of a postgres database and is a Graphql API.

### Setup
1. First we will install RVM, to manage our ruby.
    ```shell
    \curl -sSL https://get.rvm.io | bash -s stable
    ```
2. Next we install ruby 2.7.0
    ```shell
    rvm install 2.7.0
    ```
3. We create a bartab environment and init it
    ```shell
    rvm gemset create bartab
    rvm gemset use bartab
    ```
4. From the main project folder enter the "bartab" folder and continue the following steps to setup the gems and database migrations.
    ```shell
    gem install bundler
    bundle install
    ```
5. Once all the gems have been installed, we will use need to setup the DB. You should already have the Postgress DB and running at this point. We will now create and initialize the DB for the API
    ```shell
    bin/rails db:migrate RAILS_ENV=development
    ```
6. The DB migrations would hvae run at this point and the API is ready but we will boot up all three facets of the app with using Foreman


## Frontend ( ReactJS )

The Frontend application uses ReactJS and is a very simple setup that uses yarn

### Setup
1. From the root folder of the project enter the "frontend" folder and install yarn using homebrew.
    ```shell
    brew install yarn
    ```
2. Once yarn has been installed, we use it to install all the JS packages
    ```shell
    yarn install
    ```
2. Once that is all done we are nearly ready to start

## Foreman

Foreman is a ruby gem that will boot up all the components to run the app. There should only be one modifiation that you would need to make and that would be the "Procfile" that can be found in the bartab folder. In this file you will need to add the postgres data folder location, usually it is "/usr/local/var/postgres".

### Setup
1. From the root folder of the project goto the bartab folder and run the following.
    ```shell
    foreman start
    ```
If everything is successful you should see an output similar to what I have added below, your browser would open with a new window with the BarTab UI running

    ```shell
    foreman start
    20:32:09 api.1  | started with pid 28251
    20:32:09 web.1  | started with pid 28252
    20:32:09 web.1  | yarn run v1.22.21
    20:32:09 web.1  | $ react-scripts start
    ^[[A20:32:10 api.1  | => Booting Puma
    20:32:10 api.1  | => Rails 7.0.8 application starting in development
    20:32:10 api.1  | => Run `bin/rails server --help` for more startup options
    20:32:11 api.1  | Puma starting in single mode...
    20:32:11 api.1  | * Puma version: 5.6.8 (ruby 2.7.0-p0) ("Birdie's Version")
    20:32:11 api.1  | *  Min threads: 5
    20:32:11 api.1  | *  Max threads: 5
    20:32:11 api.1  | *  Environment: development
    20:32:11 api.1  | *          PID: 28251
    20:32:11 api.1  | * Listening on http://127.0.0.1:5000
    20:32:11 api.1  | * Listening on http://[::1]:5000
    20:32:11 api.1  | Use Ctrl-C to stop
    20:32:11 web.1  | (node:28255) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
    20:32:11 web.1  | (Use `node --trace-deprecation ...` to show where the warning was created)
    20:32:11 web.1  | (node:28255) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
    20:32:11 web.1  | Starting the development server...
    20:32:11 web.1  |
    20:32:15 web.1  | Compiled successfully!
    20:32:15 web.1  |
    20:32:15 web.1  | You can now view frontend in the browser.
    20:32:15 web.1  |
    ```


