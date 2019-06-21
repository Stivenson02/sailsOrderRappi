/**
   * OrderDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'orders_detail',

  attributes: {
    id_order:{
      type: 'number',
      required: true
    },
    id_supplier:{
      type: 'number',
      required: true
    },
    id_product:{
      type: 'number',
      required: true
    },
    price:{
      type: 'number',
      required: true
    },
    units:{
      type: 'number',
      required: true
    },
    discount:{
      type: 'number',
      required: true
    },
    total:{
      type: 'number',
      required: true
    },
    checkint:{
      type: 'number',
      required: true
    }
  },

};

