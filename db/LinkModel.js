require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const loadTestData = require("./loadTestData");

const Model = Sequelize.Model;
class Link extends Model {}

Link.init(
  {
    keyword: {
      type: Sequelize.STRING(200),
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "link",
    createdAt: false,
    updatedAt: false,
    column: Sequelize.STRING + " CHARSET utf8 COLLATE utf8_unicode_ci",
  }
);

if (process.env.ENVIROMENT === "development") {
  Link.sync({ force: true }).then(() => {
    console.log("insert testdata");
    Link.bulkCreate(loadTestData("db/smalltestdata.csv")).then(() =>
      console.log("test data inserted")
    );
  });
} else {
  Link.sync();
}

module.exports = Link;
