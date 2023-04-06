/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { Roles } = sails.config.constant;

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
   
    role:
    {
      type: 'string',
      isIn: [Roles.Admin, Roles.User],
      defaultsTo: Roles.User
    }

    

  },

  


};

