const localhost = {
  username: "root",
  password: null,
  database: "sqlnode",
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: true,
  },
};

const test = {
  username: "",
  password: "",
  database: "db",
  dialect: "sqlite",
  storage: "./test.sqlite",
  define: {
    timestamps: true,
    underscored: true,
  }
};

module.exports = test

