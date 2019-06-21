function CalcCheckOrder(data_orders_detail, res) {
  OrderDetail.find({
    id_order: data_orders_detail.id_order
  }).then( function (orders_detail) {
    var flag=0
    orders_detail.map(function (data) {
      if (data.checkint === 0){
        flag=1
      }});
    if (flag === 0){
      Order.update({id: data_orders_detail.id_order},{id_status:5}).exec(function (err) {
        if (err){
          return res.send({
            'success':false,
            'message':'No fue actualizada la orden',
            'error':err
          },500);
        }
        return res.send({
          'success':true,
          'message':'Orden Lista',
        },200);
      })
    }else{
      return res.send({
        'success':true,
        'message':'Producto Check pero la Orden aun no esta Lista',
      },200);
    }
  });
}

function addSendOfOrder(req, res, status) {
  Order.update({id: req.body.id_order}, {
    id_status: status
  }).exec(
    function (err) {
      if (err) {
        return res.send({
          'success': false,
          'message': 'No fue actualizada la orden',
          'error': err
        }, 500)
      }
      return res.send({
        'success': true,
        'message': 'Estado de orden cambiado'
      }, 200)
    })
}
/**
 * ProcessOrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  checkProduct: function (req, res) {
    req.body['check']= 1;
    OrderDetail.findOne({
      id: req.body.id_detail_order
    }).then( function (orders_detail) {
      Order.findOne({
        id:orders_detail.id_order
      }).then(function (orders) {
        if (orders.id_status == 3){
          OrderDetail.update({id: req.body.id_detail_order}, {checkint:req.body.check}).exec(function (err) {
            if (err){
              return res.send({
                'success':false,
                'message':'No fue actualizada la orden',
                'error':err
              },500)
            }
            CalcCheckOrder(orders_detail,res);
          });
        }else{
          if (orders.id_status > 4){
            return res.send({
              'success':false,
              'message':'La orden se encuentra en otro estado',
            },500)
          } else{
            return res.send({
              'success':false,
              'message':'La orden aun no ha sido confirmada',
            },500)
          }
        }
      });
    });
  },
  changeState: function (req, res) {
    Order.findOne({
      id: req.body.id_order
    }).then(function (orders) {
      sails.log.debug(orders);
      if (orders.id_status == 5){
        addSendOfOrder(req, res, 6);
      }else if (orders.id_status == 6){
        addSendOfOrder(req, res, 7);
      } else {
        return res.send({
          'success': false,
          'message': 'No fue actualizada la orden'
        }, 500)
      }
    })
  }

};

