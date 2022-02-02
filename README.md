# Car-Rental
Welcome to the car-rental application

To run this application you need to have "node" and "npm" installed on your system.

I have removed the dependency folders as the size of those folders was quite large.

This application need three servers to run in background

First server: For authentication process
Second server:  For Data maniplulation
Third server: React server


below are the steps to run the servers.
Just run the following command in respected directory using Command Promt or visual studio provided terminal

>>Car-Rental-project> cd server
>>Car-Rental-project>server> npm i
wait for the process to complete
>>Car-Rental-project>server> npm run auth

>>Car-Rental-project> cd car-rental-client
>>Car-Rental-project>car-rental-client> npm i
wait for the process to complete
>>car-Rental-project>car-rental-client> npx json-server --watch db.json

>>Car-Rental-project> cd car-rental-client
>>Car-Rental-project>car-rental-client> npm start

while running the React Server you will probably get a promt that any other server is running on localhost:3000 . Enter y in that case so that react server will start on localhost:3001 (NOTE:Two servers on same localhost will conflict so react promts to run it's server on another port)
