# MRC-gen
Models Routes Controllers generator.
MRC-gen is a npm package for express app that can generate model, route or controller file with content, separately or all of them by cli command line.
- To install this package make sure that you are initialized your project (npm init) and you are in repository app.

1 - Install package:

$ npm install @medjs/mrc-gen

2 - To generate Model file:

$ npx create-model

=> then type the name of your file.

# - NB: The package will generate controllers, Models and Routes directories if they not exist with file inside it. 

3 - To generate controller file:

$ npx create-controller

=> then type the name of your file.

4 - To generate Route file:

$ npx create-route

=> then type the name of your file.

5 - To generate all files:

$ npx create-mrc

=> then type the name of your file.

# You can also install the package globaly:

$ npm i -g @medjs/mrc-gen

# You will able to use direct command:

$ create-model

$ create-controller

$ create-route

$ create-mrc
