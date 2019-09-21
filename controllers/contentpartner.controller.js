// const { Company } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require("../models/index");

const getAll = async function(req, res){
    // let user = req.user;
          models.sequelize.query("SELECT * FROM `contentpartners`", { type: models.sequelize.QueryTypes.SELECT})
      .then(contentpartners => {
          return ReS(res, {contentpartners:contentpartners});
      })
}
module.exports.getAll = getAll;


const remove = async function(req, res, next){
    let cp_id = req.id;
   
    [err, results] = await to(models.sequelize.query("DELETE FROM contentpartners WHERE id ="+cp_id));
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {message:`Deleted ${results[0].affectedRows} row(s)`}, 200);
   
} 
module.exports.remove = remove;