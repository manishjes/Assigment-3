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

  
  'POST /signup': { action: 'Authcontroller/signup' },
  'POST /login': { action: 'Authcontroller/login' },
  'POST /logout': { action: 'Authcontroller/logout' },
  

  
  'POST /addcategory':'MenuCategoryController.addcategory',
  'GET /getcategory':'MenuCategoryController.category',
  'PATCH /updatecategory/:id':'MenuCategoryController.updatecategory',
  'DELETE /deletecategory/:id':'MenuCategoryController.deletecategory',
    
  'POST /additems':'MenuItemController.additems',
  'GET /items':'MenuItemController.items',
  'PATCH /items/:id':'MenuItemController.updateItems',
  'DELETE /items/:id':'MenuItemController.deleteitem',
  
  'GET /menu': 'MenuCategoryController.menu',


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


};
