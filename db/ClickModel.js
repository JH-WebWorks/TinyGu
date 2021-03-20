require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const Link = require("./LinkModel");
const LinkModel = require("./LinkModel");

const Model = Sequelize.Model;
class Click extends Model {}

Click.init(
  {
    timestamp: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "click",
    createdAt: false,
    updatedAt: false,
    column: Sequelize.STRING + " CHARSET utf8 COLLATE utf8_unicode_ci",
  }
);

Click.belongsTo(LinkModel);

if (process.env.ENVIROMENT === "development") {
  Click.sync({ force: true });
} else {
  Click.sync();
}

module.exports = Click;
