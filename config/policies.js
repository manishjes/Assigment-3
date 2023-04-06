/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */



module.exports.policies = {   


  
    
  
   AuthcontrollerController : {
    "logout": "isAuthenticated",
  
 },

  // MenuCategoryController: {
  //   'addcategory':  "isAdmin",
  //   'getcategory': "isAuthenticated",
  //   'updatecategory': "isAdmin",
  //   "deletecategory": "isAdmin",

  //     'menu': "isAuthenticated",
  //  },



//   MenuItemController:{
//     '*': "isAdmin",
//   },
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
