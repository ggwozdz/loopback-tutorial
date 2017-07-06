# Tools
- install node.js via nvm: https://github.com/creationix/nvm
- visual studio code is great free editor: [https://code.visualstudio.com/]
- loopback: ```npm install -g loopback-cli```

# Project setup
```bash
# create directory & run project generator - choose empty server
mkdir projectName
cd projectName
lb
```

Add ```.vscode``` to ```.gitignore```.

```
# create datasources
lb datasource  file   # create in-memory datasource
lb datasource  mysql  # create mysql datasource

# generate models
lb model Couple
lb model Tasks
lb model Vendors
lb model Guest
lb model WeddingBudget
lb model Expanse
lb model Inspiration
```
Your app is configured, has models to store data and APIs.

# Start
```bash
node .  # run the app
```
Go to ```http://localhost:3000/explorer``` to view API explorer.

# Relations
```bash
#configure relationship between couple and tasks
lb relation
```

Fetching model with relations:
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/couples?filter=%7B%22include%22%3A%22tasks%22%7D'
```


# Builds

# Testing
