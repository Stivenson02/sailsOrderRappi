/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'orders',

  attributes: {
    id_status:{
      type: 'number',
      required: true
    },
    id_client:{
      type: 'number',
      required: true
    },
    id_responsible:{
      type: 'number'
    },
    name_responsible:{
      type: 'string',
    },
    address_send:{
      type: 'string'
    },
    mode_pay:{
      type: 'number',
    },
    price:{
      type: 'number',
    },
    propine:{
      type: 'number',
    },
    price_send:{
      type: 'number',
    },
    discont:{
      type: 'number'
    },
    total:{
      type: 'number',
    }
  },

};

