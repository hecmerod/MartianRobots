# Martian Robots a Dockerized API REST.
Based on NodeJS + ExpressJS uses Node-Cache for storage. That means data erases on rebuild and after 600s a document has been created.

## It has several endpoints:

- /grid/create/"X"/"Y"


The only way to create a Grid, X being the horizontal axis and Y the vertical one.
    
- /deploy/"X"/"Y"/"FACING"


The way a robot can be deployed on the grid. Being X and Y the coordinates of the robot and FACING the position to which the robot will do its next move, beign N, S, W ,E.
    
- /move/"INSTRUCTIONS"

The way we send instructions to the robot. Being the only possilbe ones, R which turns 90º to the right, L 90º to the left and forward which would move the robot straight to where it is facing.

## Installing
At first it was supposed to be launched on a EC2 instance from AWS but still having some problems with ssh

To install we just have to run some commands (docker, docker-compose and git should be installed):

- ***$ git clone https://github.com/hecmerod/MartianRobots.git***
- ***$ docker-compose up -d --build***

## Usage
We should now be able to access it on *localhost:3000*.
All the endpoints are GET http requests, it was thought this way because no frontend was going to be implemented and doing it through a POST request with a JSON attached to the body would be harder and would need a program like Postman to try it out.
In conclusion all the enpoints return HTML responses with the errors or information about the grid/robot.
