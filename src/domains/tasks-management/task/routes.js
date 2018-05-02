const Controller = require('./controller');
const Service = require('./service');

module.exports = ({ router, db }) => {
  const service = new Service(db);
  const controller = new Controller(service);

  const route = router.route('/task');

  /**
   * This function comment is parsed by doctrine
   * @route GET /tasks-management/task
   * @operationId retrieveTasks
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.Task-Operations about task
   * @summary Retrieves some tasks
   *
   * @param {string} where.query - conditions
   * @returns {Task.model} 200 - A Task object
   * @returns {Error}  default - Unexpected error
   */
  route.get((...args) => controller.find(...args));
};
