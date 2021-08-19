module.exports = {
  port: process.env.PORT || 8080,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb+srv://root:c4Qw$g4StGpY3i2@cluster0.v9bwa.mongodb.net/test',
    test: 'mongodb://localhost/stackoverflow-test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};


// module.exports = {
//   port: process.env.PORT || 8080,
//   db: {
//     prod: process.env.DATABASE_URL || 'mongodb://localhost/stackoverflow-clone',
//     test: 'mongodb://localhost/stackoverflow-test',
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     }
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET || 'development_secret',
//     expiry: '7d'
//   }
// };
