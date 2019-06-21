function CreateOrder(req, res) {
  Order.create({id_status: 1, id_client: req.body.id_client, price: req.body.total, discont: 0, price_send:3000, total: req.body.total})
    .then(function (orders) {
      AddProducts(req, res);
    })
}

function AddProducts(req, res) {
  Order.findOne({
    id_client:req.body.id_client,
    id_status:1
  }).then(function (orders) {
    req.body['id_order']=orders.id;
    OrderDetail.create(req.allParams())
      .then( function (orders_detail) {
        CalcOrdersTotal(orders,res);
        return res.send({
          'success': true,
          'message': 'Producto agregado'
        },200)
      }).catch(function (err) {
      return res.send({
        'success':false,
        'message':'No fue posible agregar el producto',
        'error':err
      },500)
    })
  }).catch(function (err) {
    return res.send({
      'success':false,
      'message':'No fue encontrar la orden',
      'error':err
    },500)
  })
}

function SumAddProducts(req, res) {
  Order.findOne({
    id_client:req.body.id_client,
    id_status:1
  }).then(function (orders) {
    if (!orders){
      AddProducts(req, res);
    } else{
      OrderDetail.findOne({
        id_order: orders.id,
        id_product: req.body.id_product,
      }).then( function (orders_detail) {
        if (!orders_detail){
          AddProducts(req, res);
        }else {
          var units = orders_detail.units + req.body.units;
          var subtotal = orders_detail.price * units;
          var discount = (req.body.discount * subtotal) / 100;
          var total = subtotal - discount;
          OrderDetail.update({id:orders_detail.id},{units:units, total:total, discount:req.body.discount}).exec(function (err) {
            if (err){
              return res.send({
                'success':false,
                'message':'No fue actualizada la orden',
                'error':err
              })
            }
            return res.send({
              'success': true,
              'message': 'Producto agregado'
            },200)
          });
        }
      }).catch(function (err) {
        return res.send({
          'success':false,
          'message':'No fue posible agregar el producto',
          'error':err
        },500)
      });
    }

  }).catch(function (err) {
    return res.send({
      'success':false,
      'message':'No fue encontrar la orden',
      'error':err
    },500)
  })
}


function CalcOrdersTotal (orders,res){
  var price = 0;
  var total = 0;
  var discount = 0;
  OrderDetail.find({id_order:orders.id_order})
    .then( function (orders_detail) {
      orders_detail.map(function (data) {
        price = price + data.total
      });
      total = price + orders.propine + orders.price_send;
      discount = (orders.discont * total) / 100
      total = total - discount;

      Order.update({id: orders.id}, {price:price, total:total}).exec(function (err) {
        if (err){
          return res.send({
            'success':false,
            'message':'No fue actualizada la orden',
            'error':err
          })
        }
      });
    });
}


function addSendOfOrder(req, res, status) {
  Order.update({id: req.body.id_order}, {
    id_responsible: req.body.id_responsible,
    name_responsible: req.body.name_responsible,
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
        'message': 'Mensajero Agregado'
      }, 200)
    })
}

/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addProduct: function (req, res) {

    var subtotal = req.body.price * req.body.units;
    var discount = (req.body.discount * subtotal) / 100;
    req.body['total']= subtotal - discount;
    req.body['checkint']= 0;

    Order.findOne({
      id_client:req.body.id_client,
      id_status:1
    }).then(function (orders) {
      if (!orders){
        CreateOrder(req, res);
      }else {
        SumAddProducts(req, res);
      }

    }).catch(function (err) {
      return res.send({
        'error':err
      })
    })
  },
  confirmOrder: function (req, res){
    Order.update({id: req.body.id_order}, {mode_pay:req.body.mode_pay, propine:req.body.propine, discont:req.body.discount_order, address_send:req.body.address_send, id_status: 3 }).exec(function (err) {
      if (err){
        return res.send({
          'success':false,
          'message':'No fue actualizada la orden',
          'error':err
        })
      }
      Order.findOne({
        id:req.body.id_order,
      }).then(function (orders) {
        CalcOrdersTotal(orders, res)
        return res.send({
          'success':true,
          'message':'Orden Confirmada'
        },200)
      }).catch(function (err) {
        return res.send({
          'success':false,
          'message':'No fue encontrar la orden',
          'error':err
        },500)
      })
    })
  },
  addCourier: function (req, res) {
    Order.findOne({
      id: req.body.id_order
    }).then(function (orders) {
      if (orders.id_status == 1 ){
        addSendOfOrder(req, res,4);
      }else{
        addSendOfOrder(req, res, orders.id_status);
      }
    });

  }
};

