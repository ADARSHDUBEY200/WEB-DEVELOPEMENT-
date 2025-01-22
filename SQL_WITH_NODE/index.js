const { faker } = require('@faker-js/faker');
const mySql = require("mysql2");

let  getRandomUser= ()=> {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password : "adarsh@123",
  });

try {
    
  connection.query('SHOW TABLES',(err ,result)=>{

    if(err) throw err;
    console.log(result);
});
    
} catch (error) {

    console.log("THERE IS SOMETHING ERROR IN IT "+error);
    
}