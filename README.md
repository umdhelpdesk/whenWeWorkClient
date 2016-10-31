# WhenWeWorkClient
This is the client side code for the scheduler project

[Demo](http://williamkwao.com/hdsp/#/signin)

##INSTALLATION GUIDE
1. Fork repo as personal repo
2. Clone the fork to local repository
3. run `npm install `

##How to run locally


The angular app need to run on a server for it to function. You can run it on a mamp server.

You can also run it using http-server
  1. Install http server by running ` npm install http-server -g`
  2. Navigate to project directory and run `http-server` 

##Connecting to cloud data api
This can be done by changing the url in the `constants.js` file in the constants folder.

AWS URL= `http://ec2-35-162-0-205.us-west-2.compute.amazonaws.com:8080/api`

##TODO
 1. ~~Show user a message when signin cridentials are wrong ~~
 2.  ~~Show message when creating a user fails or is successful ~~
 3. Add angular calendar to dashboard
 4. Add UI for user to add Availability


