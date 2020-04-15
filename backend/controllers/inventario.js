var sql = require("mssql");
var config = require("../config/db")();
var Inventario = require('../models/inventario');


function getInv(req, res, inventario) {

  sql.connect(config, function (err) {

    if (err) {
      console.log("ERROR IN CONNECT");
      console.log(err);
    }

    var request = new sql.Request()
      .input('i_id_suc', sql.VarChar, inventario.id_sucursal)
      .execute('dbo.API_GetOneInv', (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.returnValue == 0) {
          res.status(200).json(result.recordset);
        }
        sql.close()
      });
  });
};


var controller = {
  get: function (req, res) {
    var inventario = {
      id_sucursal: req.params.id
    }
    getInv(req, res, inventario);
  }
};

module.exports = controller;