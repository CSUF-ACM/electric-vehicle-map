# Electric Vehicle Map


[![GitHub issues](https://img.shields.io/github/issues/CSUF-ACM/electric-vehicle-map.svg)](https://github.com/CSUF-ACM/electric-vehicle-map/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/CSUF-ACM/electric-vehicle-map.svg)](https://github.com/CSUF-ACM/electric-vehicle-map/pulls)  

![GitHub repo size in bytes](https://img.shields.io/github/repo-size/CSUF-ACM/electric-vehicle-map.svg)
[![GitHub contributors](https://img.shields.io/github/contributors/CSUF-ACM/electric-vehicle-map.svg)](https://github.com/CSUF-ACM/electric-vehicle-map/graphs/contributors)
[![GitHub license](https://img.shields.io/github/license/CSUF-ACM/electric-vehicle-map.svg)](https://github.com/CSUF-ACM/electric-vehicle-map/blob/master/LICENSE)


A map that shows electric charging stations on the way to the destination, telling the user if they would be able to make it to the destination and back with or without charging, and the total time it would take to get there if a charge was needed. Ideally when mapping the route, hills and freeways will be taken into account as they change the rate at which the car battery drains. The project would be implemented as a website that the user could visit. The project will use the Google Maps API to implement the maps.

## The Project Team

### Team Lead
Lonnie Hansen lghansen@csu.fullerton.edu

#### Team Members
  1. Arthi Ramesh
  2. Kizar Cassiere
  3. Robert Ruiz
  4. Rushi Sharma
  5. Yu Kou (Yuki)


## How to start helping
*Please make sure you have git installed on your computer before you begin to help. To install git, please visit [Git](https://git-scm.com/downloads)*

To begin open your terminal (if using Linux/Mac) or git bash (if Windows), and navigate to the folder that you would like to save this project

*If you need help navigating the terminal please refer to this link: [Linux Command Tutorial](https://maker.pro/linux/tutorial/basic-linux-commands-for-beginners)*

*If you need help creating a workflow for fork repositories: [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

use `git clone https://github.com/CSUF-ACM/electric-vehicle-map.git` to clone the repository into your folder

To work on the project without disrupting the work of others or having your work disturbed, use `git branch <branchname>` to create a new branch, then use `git checkout <branchname>` to start working on your new branch

### Saving your progress

To check the status of your repository, seeing what files have been modified or added, use `git status` to print a status message

After you've made some changes or created new files, use `git add <file>` or `git add *` to add all of your new/modified files to the stage

Once those files have been added, use `git commit -m "Commit message here"` to create the commit, then use `git push origin <branchname>` to push your commit to the remote repository

### Merging your work

If you would like to have the code on your branch merged with the master, please submit a pull request on the git hub page https://github.com/CSUF-ACM/electric-vehicle-map/pulls

If the pull request is accepted, your branch will be merged with the master branch

### Additional help

If you need some more help with git commands, please visit [Git Command Tutorial](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

If you have any questions or need more help, please contact the Project Lead, Lonnie Hansen lghansen@csu.fullerton.edu

### Prerequisites:
* Node 8.11.3
* nvm

### Installation
It is important to install Node 8.11.3, you can use [nvm](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/) to keep multiple versions of node in your system and switch easily. Node 8.11.3 is supported by Google App Engine in the standard environment.
``` bash
#Install nvm:
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
#Check if installed:
nvm --version
#Install specific node version:
nvm install 8.11.3
#Use this command inside the project.
nvm use
```

After install node, it's time to install the packages required to start the project. After that, you can test locally!
``` bash
#Installs all packages:
npm install
```

### Testing Locally:
```bash
npm start
```
