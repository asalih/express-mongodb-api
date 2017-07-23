# Example express api and mongodb geonear

Example for searching for nearest driver of your point

## Install
    $ git clone https://github.com/asalih/express-mongodb-api.git
    $ cd express-mongodb-api
    $ npm install

#### 4. Before you go;
You must set your mongodb connection string into
`./helpers/config` `config.mongodb.connectionString`

    $ npm start


navigate to http://localhost:1337

## Module Used
  - express
  - mongoose
  - mocha
  - chai
  
## API
  `POST /ride` waits coordinates in request body, like below. if you send maxDistance then searchs with this distance but if you don't, distance will be setting up with `config.settings.defaultMaxDistance`. 
  ```javascript
  //ride endpoint post boy
  {
	"maxDistance": 1000, //optional
	"coordinates": [40.993017, 29.072253]
	}
  ```
  you can set the result size `config.settings.defaultNearDriverCount`.
  

  `GET /drivers` List of drivers. If has more than `config.settings.defaultResultLimit` then result will be `{hasNextPage:true, drivers:[...]}`. For next page `GET /drivers/1`. Default page is 0.
 
   ```javascript
   //Driver Model
  {
	"fullName": "Ahmet Salih",
	"rate": 4.7,
	"car": "Toyota",
	"location": {
      "type": "Point",
		"coordinates": [40.993017, 29.072253]
	}
}
  ```
  - `POST /driver` Creates new driver with posted body.
  - `GET /driver/:id` Gets driver with the given id.
  - `PUT /driver/:id` Updates driver with posted body.
  - `DELETE /driver/:id` Deletes driver with the given id.
  
## Test
Testing for few scenarios `npm test`
