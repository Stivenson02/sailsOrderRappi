/**
 * TargetPay.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'target_pays',

  attributes: {
    name:{
      type: 'string',
      required: true
    },
    number:{
      type: 'number',
      required: true
    },
    code:{
      type: 'number',
      required: true
    },
    id_client:{
      type: 'number',
      required: true
    }
  },

};

