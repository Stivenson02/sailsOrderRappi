/**
 * SupplierOrder.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    checkint:{
      type: 'number',
      required: true
    },
    supplier_id:{
      type: 'number',
      required: true
    },
    id_oder:{
      type: 'number',
      required: true
    },
    value:{
      type: 'string',
      required: true
    }
  },

};

