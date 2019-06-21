/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'POST /api/add_product': 'OrdersController.addProduct',
  'POST /api/add_courier': 'OrdersController.addCourier',
  'POST /api/confirm_order': 'OrdersController.confirmOrder',

  'POST /api/check_product': 'ProcessOrdersController.checkProduct',
  'POST /api/change_status': 'ProcessOrdersController.changeState',
  'POST /api/add_target': 'TargetController.addTarget',

  'GET /api/get_all_orders/:id': 'GetsProcessController.getAllOrders',
  'GET /api/get_orders/:id': 'GetsProcessController.getOrders',
  'GET /api/get_orders_detail/:id': 'GetsProcessController.getOrdersDetail',
  'GET /api/get_all_orders_detail/:id': 'GetsProcessController.getAllOrdersDetail',
  'GET /api/get_all_orders_courrier/:id': 'GetsProcessController.getOrdersCourrier',
  'GET /api/get_all_status': 'GetsProcessController.getAllStatus',
  'GET /api/get_data_target/:id': 'GetsProcessController.getTarget'
};
