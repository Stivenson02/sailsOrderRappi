/**
 * TargetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addTarget: function (req, res) {
    TargetPay.findOne({
      id_client: req.body.id_client
    }).then(function (target_pays) {
      if (target_pays){
        TargetPay.update({id_client: req.body.id_client}, req.allParams()).then(function (target_pays) {
          return res.send({
            'success':true,
            'message':'Tarjeta Editada',
          },200)
        }).catch(function (err) {
          return res.send({
            'success':false,
            'message':'No fue actualizada la tarjeta',
            'error':err
          },500)
        })
      }else{
        TargetPay.create(req.allParams()).then(function (target_pays) {
          return res.send({
            'success':true,
            'message':'Tarjeta Creada',
          },200)
        }).catch(function (err) {
          return res.send({
            'success':false,
            'message':'No fue creada la tarjeta',
            'error':err
          },500)
        });
      }
    })
  }
};

