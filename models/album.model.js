const { TE, to } = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Album', {
    name: DataTypes.STRING,
    trackPath: DataTypes.STRING,
    userId: DataTypes.INTEGER

  });

  Model.associate = function (models) {
    this.Album = this.belongsTo(models.User, { foreignKey: "userId" });
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
