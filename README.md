# Bookstore Automation System

A Node.js-based bookstore management system for inventory tracking, product management, order processing, and user registration
## Prerequisites
 Node.js v20.12.2 or later - install from https://nodejs.org/
##  Run our bookstore automation application !

1. Download the repository

  Open your terminal:
- For Linux & MacOS, use the Terminal app.
- For Windows, use PowerShell.

bash
  git clone https://github.com/onurjr29/KitapeviOtomasyon

2. Navigate to your project folder:

  Use the cd command followed by the path to your project directory. For example, if your project folder is called "KitapeviOtomasyon" on your desktop, you might type:

bash
cd ~/Desktop/KitapeviOtomasyon

3. Install dependencies:

  - write on terminal npm install  and 
  - write on terminal npm start
 
4. Access the app:

Open a web browser and visit http://localhost:5000/. This should bring you to your bookstore automation app is login page.

## How to use it 📖

When you log in to the automation system, you will be directed to the home page.

## Code Organization

|  Folder | Content | Responsability| 
| --- | --- | --- |
|/CSS| |		It includes font settings, color codes, general design codes of the site.|
|/JS| | This code uses Chart.js to create a line chart displaying data for each day of the week. It selects the canvas element with the ID myChart, defines the chart type, data, and appearance, and configures options to hide the legend and customize tooltips.|
|/middleware|	|	This middleware function verifies a JWT token from the cookies to authenticate a user. If the token is valid, it retrieves user details from the database using the email in the token and attaches the user ID to the request object for further processing.|
|/views||creates pages of automation|
|/Client||	This class defines a MySQL client that handles the connection to a MySQL database and provides a method for executing SQL queries. It establishes the connection using the provided configuration details.|
|.|/app.js| Renders dashboard page|

## Technologies

#### Backend

#### Frontend

#### Bcrypt Password Hashing 

#### Database Schemas
