## Real course sign up front end

This project consists of the react front end for the course registration exercise

Other than the provided boilerplate this project makes use of the Material framework and uses MomentJs for date parsing/formatting

To pull in all project dependencies run `yarn`

This project can be run with the below described, `yarn start`

Coming from a few years of Angular development I tried to keep the file structure here as simplistic as possible while abstracting away the service/api layer as best I could.

Looking back, I would put more thought into the use of the `user` prop as the primary re-render trigger. Right now the source of truth for component data is mixed between `user` and `course`. It would be potentially beneficial for maintenance and readability to more clearly scope the roles and responsibilities of these objects in the DOM.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

