
const pool = require('./pool.js');

const getHostData = (id, callback) => {
  //let query = id ? {id: id} : {};

  pool.query('SELECT * FROM hosts WHERE id = $1', [id], (error, data) => {
    if (error) {
      return console.error(error);
    }
    callback(data.rows);
  });
}


const getCoHostData = (id, callback) => {

  pool.query('SELECT string_agg(cohostId::text, ',') FROM cohosts WHERE userId = $1', [id], (error, cohostId) => {
    if (error) {
      return console.error(error);
    }
    pool.query('SELECT name avatarUrl id superhost FROM hosts WHERE id in ($1)', [cohostId], (error, data) => {
      if (error) {
        return console.error(error);
      }
    callback(data.rows);
    })
  });

}

const createNewHost = (hostData, callback) => {

  const {
    name, reviews, verified, superhost, duringstay, description, location, joined_at, languages, responsetime, responserate, avatarurl
  } = hostData;

  pool.query(
    "INSERT INTO hosts (name, reviews, verified, superhost, duringstay, description, location, joined_at, languages, responsetime, responserate, avatarurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;",
    [
      name, reviews, verified, superhost, duringstay, description, location, joined_at, languages, responsetime, responserate, avatarurl
    ],
    (error, results) => {
      if (error) {
        //console.log("not sure what happened ", reviews, typeof reviews, typeof responserate)
        return console.error(error);
      }
      //console.log("not sure what happened ", reviews, typeof reviews, typeof responserate)
      callback(results.rows);
    }
  );

  // data = JSON.stringify(hostData);

  // pool.query('INSERT INTO hosts(name, reviews, verified, superhost, duringStay, description, location, joined_at, languages, responseTime, responseRate, avatarUrl) SELECT name, reviews, verified, superhost, duringStay, description, location, joined_at, languages, responseTime, responseRate, avatarUrl FROM json_populate_record (NULL::hosts, \'' + data + '\')', (error, data) => {
  //   if (error) {
  //     return console.error(error);
  //   }
  //   callback();
  // });
}

const updateHost = (id, data, callback) => {

  const {
    name, reviews, verified, superhost, duringStay, description, location, joined_at, languages, responseTime, responseRate, avatarUrl
  } = data;

  pool.query(
    "UPDATE hosts SET name = $1, reviews = $2, verified = $3, superhost = $4, duringStay = $5, description = $6, location = $7, joined_at = $8, languages = $9, responseTime = $10, responseRate = $11, avatarUrl = $12 WHERE id = $13 RETURNING *;",
    [
      name, reviews, verified, superhost, duringStay, description, location, joined_at, languages, responseTime, responseRate, avatarUrl, id
    ],
    (error, results) => {
      if (error) {
        return console.error(error);
      }
      callback(results.rows);
    }
  );
}

const deleteHost = (id, callback) => {
  pool.query('DELETE FROM hosts WHERE id = $1', [id], (error, data) => {
    if (error) {
      return console.error(error);
    }
    callback();
  });
}

const seedDatabase = () => {

  pool.query(`\COPY hosts FROM '/Users/Anush/HR/sdc/data.csv' DELIMITER ',' CSV HEADER;`, (error, data) => {
    if (error) {
      return console.error(error);
    }
    console.log('successfully seeded the db')
  });


  // // Host.remove({})
  // //   .then(()=> {
  //     Host.insertMany(data)
  //       .then(() => console.log('test'))
  //       .catch(err => console.log(err));
  //   //})
}



module.exports.getHostData = getHostData;
module.exports.getCoHostData = getCoHostData;
module.exports.seedDatabase = seedDatabase;
module.exports.createNewHost = createNewHost;
module.exports.updateHost = updateHost;
module.exports.deleteHost = deleteHost;

