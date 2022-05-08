
# HomeDirect 

## About 
HomeDirect is a platform that enables `transparent` real estate deals by offering buyers and sellers an option to interact `directly`. Think about it as the [Rent Faster](https://www.rentfaster.ca/) for property buyers. We believe that houses should be available for purchase at advertised rates. The aim is to address the wide-spread bid wars and resultant upward pressure on the prices of real estate properties in Canada.

Completed over a two-week duration by [Harshbir Singh](https://github.com/SinghH01), [Edgar Sargsyan](https://github.com/Edgarsar) and [yours truly](https://www.linkedin.com/in/seun-oshitade-53001120b/), this was an opportunity to experience web development in a collaborative environment. Learning outcomes include:

* Translating requirements into user stories and features for development
* Wireframing and planning of frontend architecture
* Considerations for technology options and decisions around Multi Page Applicaiton (MPA) versus Single Page Application (SPA)
* Planning the data requirements for the application, building a relational databse and integrate the database with server and frontend
* Using SASS/ SCSS preprocessor
* Creating routes on `Express` and manipluating the DOM  
* Writing Asynchronous JavaScript using `jQuery` and supporting dynamic interaction of users with the application while ensuring data persistence
* Using APIs from third party providers
* Responsive web design
* Using the collaborative features of git and github
* Project delivery in an agile environment
* Team work and coordination

## Tech Stack
* Frontend - HTML, CSS, SCSS/SASS Pre-proprcessor, Bootstrap, jQuery
* Backend - Express, Embedded JavaScript, Nodejs
* Database - PostgreSQL

## Features
* Login as buyer/seller and explore property listings
* Search for properties based on criteria such as location, price, number of beds/baths
* View map and satellite image of selected property dynamically
* Logged-in users can fav properties and view them later 
* Contact property owners directly 
* Admin can create, delete and edit property listings
* Responsive design for different screen sizes
* Featured properties on the main feed
* Detailed view of selected properties using carousel

## Minimum Viable Product
### Overview
![GIF](https://media2.giphy.com/media/05ynbd8pt9RBtPumGb/giphy.gif?cid=790b7611cba71ae1dcafa1a95619da91387ef51d7cb2c928&rid=giphy.gif&ct=g)

---

### Landing Page
![Welcome page](https://raw.githubusercontent.com/s-oshitade/home-direct/61a03d2b5419aa0915ec4742d1cd6c7ba7d0c17c/docs/Screen%20Shot%202022-05-06%20at%202.43.44%20PM.png)


![Welcome Page2](https://github.com/s-oshitade/home-direct/blob/master/docs/Screen%20Shot%202022-05-06%20at%203.05.01%20PM.png?raw=true)

---

### Favorites
![Favorites](https://raw.githubusercontent.com/s-oshitade/home-direct/f2788ea56f67b31dab016fbf654745bd49696500/docs/07627B1F-F638-4FF5-856B-7CCE13EEB0BD_1_105_c.jpeg)

---

### Mobile View
![Mobile Page](https://raw.githubusercontent.com/s-oshitade/home-direct/61a03d2b5419aa0915ec4742d1cd6c7ba7d0c17c/docs/Screen%20Shot%202022-05-06%20at%202.38.10%20PM.png)

---

### Individual Listing
![Individual listing](https://github.com/s-oshitade/home-direct/blob/master/docs/Screen%20Shot%202022-05-06%20at%202.29.21%20PM.png?raw=true)

---

### Map
![map](https://raw.githubusercontent.com/s-oshitade/home-direct/f2788ea56f67b31dab016fbf654745bd49696500/docs/4C017A98-E20C-452D-A480-E145DAAD452A_1_105_c.jpeg)

---
 
## Dependencies
* cookie-session
* dotenv
* ejs
* express
* morgan
* nodemailer
* pg
* sass


## Continuous Improvement
* Automated (unit) testing
* Toggle light and dark view
* More robust implementation of favorites and messaging features
* Incorporate google maps in the property listings
* Enhanced considerations for user data privacy
* Host application on Heroku or order hosting platforms


## Getting Started
1. Create the `.env` by using `.env.example` as a reference. Update the .env file with your correct local information
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Reset database: `npm run db:reset`
5. Run the server: `npm run local`
6. Visit `http://localhost:8080/`


## Commercial
``` 
Although this project was completed primarily for eductational purposes, we know that the value proposition is real and the project can be implemented/ commercialized. If you wish to discuss this or similar platform-based opportunities, please send an email to seun.oshitade@gmail.com. 
```
## Acknowledgement
Credit to [Ian Bentley](https://github.com/idbentley) and the community of mentors at Lighthouse Labs for providing needed guidance in the course of this project.


## License
Selected aspects of this project may be subject to intellectual property rights.






