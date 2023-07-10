<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://webxwiz.site/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Postfordollars</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

Welcome to PostForDollars - the ultimate platform that connects posters and brands for mutually beneficial collaborations! Whether you're a brand looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![MongoDB][Mongodb.com]][Mongodb-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

## Installation

To run this code project on both Windows and macOS, please follow these steps:

### Server part
1. Open a terminal (PowerShell for Windows or Terminal for macOS).
2. Navigate to the directory where you want to clone the repository.  For example:
   ```sh
   cd path/to/directory
   ```
3. Clone the repository by running the following commandЖ
   ```sh
   git clone https://github.com/programist78/buy_sub18_05_23
   ```
4. Open the  `api` folder.  You can use the cd command again to navigate into the folder:
   ```sh
   cd buy_sub18_05_23/api
   ```
5. Install the required NPM packages by running the following command:
   ```sh
   npm install
   ```
6. Create a new file named `.env` in the `api` folder. You can use the following command to create the file:
   ```sh
   touch .env
   ```
7. Open the `.env` file with a text editor. You can use the following command to open the file in Notepad:
   ```sh
   open -e .env
   ```
8. Add the following keys:
   ```js
   NODE_ENV='development/production'
   SECRET_KEY='******'
   JWT_SECRET='******'
   HOST='http://localhost:4000 / Your server link'
   MONGO_DB='your mondoDB database'
   ACCESS_KEY_ID='YOUR KEY ID for https://aws.com'
   ACCESS_KEY_SECRET='YOUR KEY SECRET for https://aws.com'
   SENDGRID_APIKEY='Your API KEY from https://app.sendgrid.com'
   FROM_EMAIL='email@gmail.com(your email from https://app.sendgrid.com)'
   DEFAULT_FROM_EMAIL='email@gmail.com(your default email from https://app.sendgrid.com)'
   CLIENT='* - (acess for all frontend) / Your client link'
   ```
### Client part
1. Open another terminal window (PowerShell for Windows or Terminal for macOS).
2. Navigate to the directory where you cloned the repository. For example:
   ```sh
   cd path/to/directory/buy_sub18_05_23/app
   ```
3. Install the required NPM packages by running the following command:
   ```sh
   npm install
   ```
4. Create a new file named`.env` in the`app` folder. You can use the following command to create the file:
   ```sh
   touch .env
   ```
5. Open the `.env` file with a text editor 
   ```sh
   open -e .env
   ```
6. Add the following keys:
   ```js
   API_URI='http://localhost:4000/graphql'
   GOOGLE_MAP_API_KEY=""
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
   ```

Once you have completed all these steps, you will be able to run the code project on both Windows and macOS without any programming knowledge.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage/Launc

### Server part
1. Open another terminal window (PowerShell for Windows or Terminal for macOS).
2. Navigate to the directory where you have the `api` folder. For example:
   ```sh
   cd path/to/directory/buy_sub18_05_23/api
   ```
3. Type this in your terminal:
   ```sh
   npm run dev
   ```

### Client part
1. Open another terminal window (PowerShell for Windows or Terminal for macOS).
2. Navigate to the directory where you have the `app` folder. For example:
   ```sh
   cd path/to/directory/buy_sub18_05_23/app
   ```
3. Type this in your terminal:
   ```sh
   npm run dev
   ```

Open a web site in your browser: <a href="http://localhost:3000">localhost:3000</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Code changing

How to interact with the code 

### Installing Visual Studio Code:

1. Download Visual Studio Code by visiting the download page at: https://code.visualstudio.com/download.
2. Follow the on-screen instructions to install VSCode on your computer.

### Installing Git:

1. Go to the Git download page at: https://git-scm.com/downloads.
2. Follow the on-screen instructions to install Git on your computer.

### Creating a GitHub Account:

1. Visit the GitHub website at: https://github.com.
2. Click on the "Sign up" button and follow the instructions to create a new account.
3. Creating a Repository on GitHub:

4. After signing in to your GitHub account, click on the "New" button in the top-left corner of the page.
5. Enter a repository name and description (optional).
6. Click the "Create repository" button to complete the creation process.
7. Cloning the Repository to the Local Machine:

8. Open the command line or terminal on your computer.
9. Navigate to the folder where you want to save the project.
10. Enter the following command to clone the repository to your local machine:
   ```sh
   bash git clone <repository URL>
   ```
(where <repository URL> is the URL of the repository, which can be found on the GitHub repository page)
### Opening the Project in Visual Studio Code:

1. Launch Visual Studio Code.
2. Click on "Open Folder" in the VSCode menu.
3. Select the project folder you cloned in the previous step and click "Open".
### Editing Text and Code:

1. In the left panel of VSCode, you will see the project structure.
2. Click on a file you want to edit to open it in the editor.
3. Make the necessary changes to the text or code in the file.
### Saving Changes:

1. In VSCode, click the "Save" button in the top menu or use the "Ctrl + S" (Windows) or "Cmd + S" (Mac) keyboard shortcut to save the file.
Adding Changes and Creating Commits:

2. In VSCode, open the integrated terminal by selecting "View" in the top menu and clicking on "Terminal".
3. In the terminal, enter the following command to add the changes to the Git index:
   ```sh
   git add .
   ```
(the dot signifies adding all modified files, you can also specify specific files by using their names)
4. Then, create a commit with a description of the changes by entering the following command:
   ```sh
   git commit -m "Description of the changes"
   ```
### Pushing Changes to GitHub:

1. In the terminal, enter the following command to push the changes to the GitHub server:
   ```sh
   git push origin <branch name>
   ```
(where <branch name> is the name of the branch you want to push the changes to, usually "master" or "main")
2. Now you have instructions on how to use Visual Studio Code for editing text and code, as well as instructions on using Git and GitHub to manage changes and collaborate on the project.

## Folder documentation

### Server part (api folder)
config - folder for configurations (now we have only import)
helpers - accessory folder
helpers/FileRenamer.js - changes in image or file name
helpers/handler.js - authorization check
helpers/index.js - tokens processing
helpers/validatePassword.js - validate password

models - folder with all schemes for mongoDB
models/PosterPost.js - document schema(mongoDB) for Posts by Posters
models/User.js - document schema(mongoDB) for Users

modules - modules for access to the AWS
modules/bucket.js - module for bucket connection
modules/strems.js - module for bucket stream connection

node_modules - all modules for the project

schema - Apollo Graphql Connection Scheme
schema/index.mjs - Apollo Graphql Connection for Resolver & Typedefs
schema/resolvers.mjs - resolvers for server queries with Apollo Graphql
schema/typeDefs.mjs - types for server type processing thanks to Apollo Graphql

uploads - folder for images & files 

.env - file for saving keys

package.json - configuration file with all packages

server.mjs - one of the important files for file saving

### Client part (app)
.next - folder to configure Next that can not be touched

apollo - folder with queries to the apolllo server
apollo/admin.jsx - file with queries to the apolllo server for admin
apollo/auth.jsx - file with queries to the apolllo server for authentification
apollo/brands.jsx - file with queries to the apolllo server for businesses
apollo/posters.jsx - file with queries to the apolllo server for posters

components - folder with components for pages(here you can change text)
pages - folder with all pages for the website(here you can change text)
public - all images for the website

redux - redux folder for proccessing information
redux/slice - folder with all slices for proccessing information
redux/store.jsx - configuration file for all slices

static - all static images & files for the website

styles - folder for styles of the website

.env - file for saving keys

next.config.js - configuration file for nextjs

package.json - configuration file with all packages

Open a web site in your browser: <a href="http://localhost:3000">localhost:3000</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@my_telegram](https://t.me/webXwizard) - web.wizard.ui.ux@gmail.com

Project Link: [https://github.com/programist78/buy_sub18_05_23](https://github.com/programist78/buy_sub18_05_23)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Mongodb.com]: https://img.shields.io/badge/-MongoDB-brightgreen
[Mongodb-url]: https://www.mongodb.com 
