const UserController = require('./controller');
const UserService = require('./service');

/**
 * @typedef UsersCount
 * @property {number} count - total of users
 */

module.exports = ({ router, db }) => {
  const service = new UserService(db, 'user');
  const controller = new UserController(service);

  const route = router.route('/user');
  const forSingleRoute = router.route('/user/:id');
  const countRoute = router.route('/user/get/count');

  /**
   * Gets some Users
   * @route GET /tasks-management/user
   * @operationId getUsers
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Gets some Users
   *
   * @param {string} where.query - conditions
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  route.get((...args) => controller.find(...args));

  /**
   * Gets one User by Id
   * @route GET /tasks-management/user/{id}
   * @operationId getUserById
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Gets one User by Id
   *
   * @param {string} id.path.required - id of object
   * @returns {User.model} 200 - User object
   * @returns {Error} 404 - item not found
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.get((...args) => controller.findById(...args));

  /**
   * Counts the User that match condition
   * @route GET /tasks-management/user/get/count
   * @operationId countUsers
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Counts the Users for conditions
   *
   * @param {string} where.query - conditions
   * @returns {UsersCount.model} 200 - the total of users
   * @returns {Error}  default - Unexpected error
   */
  countRoute.get((...args) => controller.count(...args));

  /**
   * Gets one User
   * @route GET /tasks-management/user
   * @operationId getUser
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Gets one User
   *
   * @param {string} where.query - condition to find
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.get((...args) => controller.findOne(...args));

  /**
   * Creates one User
   * @route POST /tasks-management/user
   * @operationId createUser
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Creates one User
   *
   * @param {User.model} data.body.required - data of User to create
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  route.post((...args) => controller.create(...args));

  /**
   * Updates some Users
   * @route PUT /tasks-management/user
   * @operationId updateUser
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Updates some Users
   *
   * @param {User.model} data.body.required - data of User to update
   * @param {string} id.query.required - id
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  route.put((...args) => controller.update(...args));

  /**
   * Deletes one User
   * @route DELETE /tasks-management/user/{id}
   * @operationId deleteUser
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Deletes one User
   *
   * @param {string} id.path.required - id of the User to delete
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.delete((...args) => controller.deleteOne(...args));

  /**
   * Deletes some Users
   * @route DELETE /tasks-management/user
   * @operationId deleteSomeUsers
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.user - Operations about user
   * @summary Deletes some Users
   *
   * @param {string} where.query.required - conditions to delete the Users
   * @returns {User.model} 200 - User object
   * @returns {Error}  default - Unexpected error
   */
  route.delete((...args) => controller.delete(...args));
};
