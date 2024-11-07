# Crypto Manager

## Getting started

This repo can be cloned using the comand:

```
git clone https://github.com/dhyeyshah28801/crypto-manager.git
```

since we are mainly using yarn as package manager for this repository we need to run the yarn comman to install
all the necessary modules

```
yarn ci
```

## Prettier Eslint

Prettier Eslint has also been configured for this repository such that **_multiple linting issues such as indentation, extra spaces etc will be rectified when file is saved_** so to enable that feature please add the Prettier Eslint Extension :

- Name: Prettier ESLint
- Id: rvest.vs-code-prettier-eslint
- Description: A Visual Studio Extension to format JavaScript and Typescript code using prettier-eslint package
- Version: 5.1.0
- Publisher: Rebecca Vest
- VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint

## Vue 3 Vuetify and Pinia

- We are using Vue 3 along with Vuetify components and Pinia instead of VueX for Store Management

## Serverless static website

To host this website we use a S3 Bucket and allow public access.

## Cloudfront Integration (Future Scope)

For distribution of the website we will use CloudFront CDN. To sync the Vue App and upload it to S3 Bucket we use the S3-Sync Plugin along with cloudfront invalidate plugin to frequently update the cached content so latest changes reaches the users effectively.

## Conventional Commits

To maintain proper and prettier commit history, conventional commits are used to specify the type and scope of the commits.

## Test and Deploy

To locally deploy the project use the yarn script

```
yarn serve
```

Then you need to visit http://localhost:8080/ to view the website

Currently the repository has static data sets available to populate the necessary fields and the filters for `User Management` page have been configured as well to work accordingly except the add user functionality.

## Repo structure of This Application

below structure is for reference only

```
src/
|-- assets/
|   |-- images/
|   |-- data/
|-- components/
|   |-- common/
|       |-- BaseButton.vue
|       |-- BaseInput.vue
|   |-- global/
|       |-- SideBar.vue
|       |-- Toolbar.vue
|   |-- views/
|       |-- HomeView.vue
|       |-- UserView.vue
|   |-- pages/
|       |-- Home.vue
|       |-- About.vue
|   |-- App.vue
|-- models/
|   |-- user/
|       |-- User.ts
|-- router/
|   |-- index.ts
|-- store/
|   |-- user/
|       |-- userStore.ts
|   |-- count/
|       |-- countStore.ts
|-- views/
|   |-- user/
|       |-- UserProfileView.vue
|   |-- product/
|       |-- ProductDetailsView.vue
|-- scripts/
|-- public/
|-- main.ts
|-- shims-vue.d.ts
|-- App.vue
|-- .eslintrc.js
|-- babel.config.js
|-- vue.config.js
|-- tsconfig.json
|-- package.json
|-- README.md
|-- serverless.yml
|-- yarn.lock
|-- .gitignore


```

### Assets

This folder is used to store static assets used over the Vue App. It consists of `Images` used in the application. It also includes the `Data` folder used to populate components in the application.

### Components

This folder is used to store reusable components. This allows more modular structure as well as reduces congesiton in view files. These components can also have Props that can be set using the view using them. They have been segregated into groups like common, special and global components to allow more segregation.

### Models

This folder is used to store the models or the DataTypes of the entities used int he application to maintain type rigidity and avoid any errors as well as guide the developers using these models

### Router

The router provides mapping of url path to the component/page that should be displayed. It has an interesting authorization mechanism that checks the user role before allowing the user to navigate to the page.

### Services

Services are mainly used to make API calls to the backend for various enitites present in the application.

### Stores

These stores have been created using the Pinia Store and used with Persist module to maintain data on the client side to allow quick and dynamic rendering of pages.

### Views

This folder contains the list of all the views that will be displayed in the application

### constants

This file has been used to store all the data that remains constant for the entire application.

## Authentication System

In this repository, we are not integrating any backend. Due to that, the authentication method could not be implemented otherwise we can implement an Auth0 mechanism to authenticate user during login and set an access + refresh token in the cookies. During each API call we can verify this token in the backend and if necessary we can replenish the access token with the help of refresh token. This method can be easily integrated over the `Login Page`

## Authorization Mechanism

This app has two level heirarchy of Users:

- Admin
- User

When you login as an admin, you can view some extra pages that are not visible to normal users on the sidebar. This has been setup using the side abr component and is worth a look

For routing authorization, we have implemented a similar mechanism that restricts the user from visiting any routes based on their roles.
