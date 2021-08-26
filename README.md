# P2P Wallet (Pay) System
    A Simple app that convert currencies from USD to EUR and vice-versa.

## Tech Specifications
	- "nodejs": "12"
	- "npm" : "6"
	- "core-js": "^3.6.5".
    - "vue": "^2.6.11".
    - "vue-router": "^3.2.0".
    - "vuetify": "^2.2.11".
    - "vuex": "^3.4.0".


### Features
	1. Authentication, warning messages and success messages
	2. Sign in page with front end validation
	3. Log out functionalities with api integration
	4. Transaction module with data tables and pagination
	5. Currency Conversion form with success message
    6. Currency Conversion with authentication
	7. Accessing All 3 required reports on home page with third highest conversion without authentication.
    8. Fully respnsive design
    9. Layered based project structured.

## Project setup
	Project setup details are described below step by step: The backend api for this project is [here](https://github.com/zrshishir/currency-conversion)
		1. Download or clone the project from [Currency Conversion Frontend](git@github.com:zrshishir/currency-conversion-frontend.git). 
		2. Go to the project's root directory and run the command `npm install`
		3. Go to the `/src/api` directory and edit the `cconversion-frontend.js`. Assign your domain name with `ROOT_URL`. 
			`const ROOT_URL = 'your-domain-name/api'`
		4. Go to your root direcotory and run `npm run serve`


### Screenshots of project setup details
	The working procedure is described below with screenshots:
	1. To install this project you will have node installed. I will describe it using `npm`. You can install this project two ways
		- Download the zip file from the repository and extract it on your pc

		- clone the project using git and the command is `git clone git@github.com:zrshishir/currency-conversion-frontend.git`. 

![git clone](/screenshots/git_clone.png)

	2. Go to the project's root directory and run the command `npm install`

![go to root directory](/screenshots/go_to_root_directory.png)

![npm install](/screenshots/npm_install.png)

	3. Go to the `/src/api` directory and edit the `cconversion-frontend.js`. Assign your domain name with `ROOT_URL`. 
			`const ROOT_URL = 'your-domain-name/api'`

![root url setting](/screenshots/root_url_setup.png)

	4. Go to your root direcotory and run `npm run serve`

![run the project](/screenshots/npm_run_serve.png)

### Some screenshots of the project
	1. Home page & Reports accessing without authentication

![home page](/screenshots/home_report_page.png)

	2. Third highest conversion for specifc user or receiver. To see this click on receiver email.

![sign up](/screenshots/report_data_3.png)

	3. Login or Sign in page

![sign in page](/screenshots/signin_menu.png)
![sign in page](/screenshots/login_page.png)

	4. login message on home page with log out button and Project menu

![message home page](/screenshots/home_report_page.png)

	5. Currency Conversion page

![product page](/screenshots/currency_conversion_page.png)

	6. Balance Transfer Form

![product creation page](/screenshots/balance_transfer_form.png)

	7. Balance Transfer Form with user data

![product edit page](/screenshots/with_user_data.png)

