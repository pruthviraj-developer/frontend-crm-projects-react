<h1 align="center"> <a href = "https://github.com/hopscotchin"><img src= https://static.hopscotch.in/hopscotch-story-book-icon_mJN5fuZyN.svg></a>
  </br> Frontend-monorepo</h1>

<p align="center">The monorepo for developing components and web pages for CRM and Hopsctoch main site</p>

<p align="center">
  <a aria-label="made with lerna" href="https://lerna.js.org/">
    <img alt="" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
  </a>
  <a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

</p>

## Node version

Use node version 12

## Packages

The Repo is a collection of these packages, which can be composed together on demand:

| Package             | Description                                |
| ------------------- | ------------------------------------------ |
| [@hs/ui-components] | React components Library for building SPAs |
| [@hs/services]      | Server-side Api calls                      |
| <a  href ="https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/icons"><img src="https://img.shields.io/badge/Package-@hs/icons-ED54A4"></a>        | App Icons                     |
| [web-apps]          | Microfrontend Apps using packages          |

##

[@hs/ui-components]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/react-lib/ui-components
[@hs/services]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/services
[web-apps]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/web-apps

## Usage

Below steps should be followed to run all the packages as well as the individual projects within web-apps,

### Project package dependencies for development

### 1. Homebrew

- To install homebrew, execute below command within the terminal

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```

- To check whether homebrew is installed properly, execute below command within the terminal,

```sh
brew --version

```

- For more information visit

	1. [https://brew.sh/](https://brew.sh/)

	2. [https://tecadmin.net/install-homebrew-macos/](https://tecadmin.net/install-homebrew-macos/)

### 2. NVM / NPM / Yarn

> #### A. NVM (to manage node version for each project)

- Install NVM using the commands

```sh
brew update

brew install nvm

```

- Create a directory for NVM in home, execute the command

```sh
mkdir ~/.nvm

```

- Edit the configuration file in home directory and add below lines to ~/.bash_profile ( or ~/.zshrc for macOS Catalina or later)

```sh
export NVM_DIR=~/.nvm

source $(brew --prefix nvm)/nvm.sh

```

- Now load the variable to the current shell environment using the below command

// From the next time, it will automatically load

```sh
source ~/.bash_profile

```


> #### B. Node and NPM

- Install node using NVM from the below command

```sh
nvm install node

------OR------

nvm install 12 (for specific node version)

```

- To switch between versions type below command in terminal

```sh
nvm use 12

```

- To check node version and npm version

```sh
node -v

npm -v

```

> #### C. Yarn

- To install yarn run the below command within terminal

```sh
npm install --global yarn

```

- To check installation run the below command

```sh
yarn --version

```

### 3. Lerna

- To install lerna run the below command within terminal, it must be installed globally,

```sh
npm install --global lerna

```

- After installing lerna run the below commands,

// To install package dependencies

```sh
lerna bootstrap

```

// To start debugging all the packages

```sh
lerna start

```

- For more information about lerna visit

	[https://lerna.js.org/](https://lerna.js.org/)


### Project running locally on system

### 4. After installation with the above packages

- Clone the project **_frontend-monorepo_** from github,

- Navigate to the root folder named **_frontend-monorepo_** and run the below command to clean build the project with updated packages,

```sh
./shellscript/cleanrun.sh

```

### 5. To start development,

- There are multiple projects within the path: **_frontend-monorepo/web-apps/_**
  * react-carousel-crm
  * react-finance-crm
  * react-merch-crm
  * react-merch-intelligence
  * react-reorder-crm
  * react-upload-screen


- Navigate within each project and check the ReadMe file of each project to start development,

- Navigate within each project in the terminal and run below command to run specific project locally on the system,

```sh
yarn start

```

- If a new project is to be built a new folder with the project name should be created within web-apps

### 6. To create new service for project,

- Navigate to **_frontend-monorepo/packages/services/src_**

- Create a new folder with a new project name **e.g. merch-intelligence**

- Navigate to the newly created project **i.e. merch-intelligence**

- Create the below files

```sh
  1) index.ts
      - This file is to export the service file

  2) <project-name>.service.ts
      - This is the actual service file,
      - Service file name should be in a format e.g. merch-intelligence.service.ts

  3) I<project-name>.service.ts
      - If required this file can be created to define the types
      - File name should be prefixed with I in a format
      	e.g. Imerch-intelligence.service.ts

```

- Now the newly created service would need to be exported,

```sh
  1) Navigate to frontend-monorepo/packages/services/src

  2) Add the export to index.ts present in the src folder

```

- Now within the terminal navigate to **_frontend-monorepo/packages/service_** and run the command

```sh
yarn start

```

### 7. To create a new component,

- Newly created component should be so generic to be used within multiple projects

- Navigate to **_frontend-monorepo/packages/react-lib/ui-components/src_**

- Create a new folder with a new project name **e.g. merch-progress-bars**

- Navigate to the newly created project **<merch-progress-bars>** and minimum four files would be created-

```sh
  1) index.ts
      - This file is to export the component,

  2) <ComponentName>.tsx
      - This is the actual react component to be created for use,
      -	Component file name should be in a format e.g. ProgressBar.tsx

  3) I<ComponentName>.tsx
      - Types can be defined inside this file,
      - Name of the file should be prefixed with I in a format e.g. IProgressBar.tsx

  4) <ComponentName>.stories.tsx
      - This file is created to test the component created before exporting,
      - Story file name should be in a format e.g. ProgressBar.stories.tsx   

```

- Now within the terminal navigate to the root folder **_i.e. frontend-monorepo/_** and run the command,

```sh
yarn storybook

```

- Now the newly created component needs to be exported at root level to be used globally within the projects,

```sh
  1) Navigate to frontend-monorepo/packages/react-lib/ui-components/src

  2) Add the export to index.ts present in the src folder

  3) Now within terminal run the command - yarn start

  4) Now the component is ready to import from projects  


```


## React cheatsheet

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)
