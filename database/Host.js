const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const hostSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: String,
  reviews: {type: Number, default: 0},
  verified: Boolean,
  superhost: Boolean,
  superhostIcon: String,
  coHost: [Number],
  duringStay: String,
  description: String,
  location: String,
  provided: {
    email: {type: Boolean, default: false},
    phone: {type: Boolean, default: false},
    id: {type: Boolean, default: false}
  },
  joined_at: Date,
  languages: String,
  responseTime: String,
  responseRate: {type: Number, max: 100, default: 100},
  avatarUrl: String
});

const Host = mongoose.model('Host', hostSchema);

const getHostData = (id, callback) => {
  let query = id ? {id: id} : {};
  Host.find(query).exec((err, data) => {
    if (err) {
      return console.error(err);
    }
    callback(data);
  });
}

const getCoHostData = (id, callback) => {
  Host.find({id: id}).exec((err, data) => {
    if (err) {
      return console.error(err);
    }
    Host.find().where('id').in(data[0].coHost).select('name avatarUrl id superhost').exec((err, records) => {
      if (err) {
        return console.error(err);
      }
      callback(records);
    })
  })
}

const createNewHost = (hostData, callback) => {
  var host = new Host(hostData);
  host.save(function (err) {
    if (err) {
      return console.error(err);
    }
    callback();
  });
}

const updateHost = (id, data) => {
  Host.update({ id: id }, { data });
}

const deleteHost = (id, callback) => {
  Host.deleteOne({ id: id }, function (err) {
    if (err) {
      return console.error(err);
    }
    callback();
  } );
}

const seedDatabase = (data) => {
  // Host.remove({})
  //   .then(()=> {
      Host.insertMany(data)
        .then(() => console.log('test'))
        .catch(err => console.log(err));
    //})
}

module.exports.getHostData = getHostData;
module.exports.getCoHostData = getCoHostData;
module.exports.seedDatabase = seedDatabase;
module.exports.createNewHost = createNewHost;
module.exports.updateHost = updateHost;
module.exports.deleteHost = deleteHost;