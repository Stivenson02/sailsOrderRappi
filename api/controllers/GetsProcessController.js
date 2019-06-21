/**
 * GetsProcessController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getAllOrders: function (req, res) {
    Order.find({
      id_client: req.param('id')
    }).then(function (orders) {
      return res.send({
        "data":orders
      })
    }).catch(function (err) {
      return res.send({
        "error":err
      })
    })
  },
  getOrders: function (req, res) {
    Order.findOne({
      id: req.param('id')
    }).then(function (orders) {
      return res.send({
        "data":orders
      })
    }).catch(function (err) {
      return res.send({
        "error":err
      })
    })
  },
  getAllOrdersDetail: function (req, res) {
    OrderDetail.find({
      id_order: req.param('id')
    }).then(function (orders) {
      return res.send({
        "data":orders
      })
    }).catch(function (err) {
      return res.send({
        "error":err
      })
    })
  },
  getOrdersDetail: function (req, res) {
    OrderDetail.findOne({
      id: req.param('id')
    }).then(function (orders) {
      return res.send({
        "data":orders
      })
    }).catch(function (err) {
      return res.send({
        "error":err
      })
    })
  },
  getOrdersCourrier: function (req, res) {
    Order.find({
      id_responsible: req.param('id')
    }).then(function (orders) {
      return res.send({
        "data":orders
      })
    }).catch(function (err) {
      return res.send({
        "error":err
      })
    })
  },
  getAllStatus: function (req, res) {
    StatusOrder.find()
      .then(function (statusorder) {
        return res.send({
          "data": statusorder
        })
      })
  },
  getTarget : function (req ,res) {
    TargetPay.findOne({
      id_client: req.param('id')
    }).then(function (target_pays) {
      return res.send({
        "data":target_pays
      })
    })
  }
};

