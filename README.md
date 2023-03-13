# Getting Started with Top-Employees App

This project was bootstrapped with [Create React App].

In the project directory run:

### `npm install react-spring`

### `npm start`


In my code, I tried to take advantage of working with React. I used states to store data from my imputs there.

Each filled imput, even in the Editing mode, is a state change for each of the parameters.

Each imput has a check to fill in more reliable information about the project and the worker.


I processed the data array from the states using array methods.

From the data array of completed projects, I found projects corresponding to the current date and performed the filter method. After that, the filtered array of projects received a worker every time the worker fell into the project execution time condition.

Thus, sorting the object of workers by the largest number of projects, I brought out the top 5 workers.


Separately, I used the UseEffect and UseState hooks to create the loading page. With the use of the React-Spring library, I made a one-time rendering of the GIF image, which is executed after the SetTimeout promise has expired.
