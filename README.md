# Pets and Owners
This is a solution for the AGL coding assignment. It calls an external API and outputs a list of all the cats in alphabetical order under a heading of the gender of their owner.

# Technology/Framework
AngularJS

# Libraries
The following libraries have been used for this project : 

**Development**
- `angular.js`

Development has been done using AngularJS framework, which is one of the most widely used and robust UI frameworks today. 

**Unit Testing**
- `boot.js`, `jasmine.js`, `jasmine-html.js`, `angular-mocks.js`

The solution is aligned with the TDD approach. Jasmine along with angular-mocks have been used to perform unit testing of the project.

# Running the solution 

1. Clone the repository and get the project or download as `.zip` file
2. Open the `index.html` in the web browser

# Testing the solution

1. Clone the repository and get the project or download as `.zip` file
2. Open the `test.html` in the web browser

# Additional Notes

Since the application uses AJAX calls to fetch data from a different domain (CORS - Cross Origin Resource Sharing), there can be a cross domain issue while running the program. Hence, as precursor, do the following depending on the browser used. 

- Google Chrome : Disable web security.
- Internet Explorer : "Allow blocked content" when prompted. 
- Safari : Under Safari's Develop preferences, select "Disable Local File Restrictions" .


