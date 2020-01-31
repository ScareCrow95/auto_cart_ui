# In Cart UI for self driving cart

Handles the user I/O and communicates with server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node.js
```

### Installing

How to install the project

Clone the git repo

```
git clone https://github.com/ScareCrow95/auto_cart_ui.git
```

change to the project directory and install node packages

```
npm install
npm install -g npx
```

Run the App

```
npm start
```

### Building for Release

Export the react project, this will create a new directory in project called builds

```
npm run build
```

Server the build

```
npx serve -s build -l 4000
```

this will run the UI on http://localhost:4000

```
npm start
```

### Setting the Endpoing

Modify the URL in the App.js to either connect to localserver or the gCloud Server.

## Authors

- **Mridul Pareek** - _Initial work_ - [Scarecrow95](https://github.com/ScareCrow95)
