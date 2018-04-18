const Controller = require('./controller');
const Service = require('./service');

module.exports = ({ router, db }) => {
  const service = new Service(db);
  const controller = new Controller(service);

  const route = router.route('/task');

  /**
   * This function comment is parsed by doctrine
   * @route GET /tasks-management/task
   * @name getTask
   * @group tasksManagement::task - Operations about task
   * @param {string} name.query.required - name
   * @returns {Task.model} 200 - A Task object
   * @returns {Error}  default - Unexpected error
   */
  route.get((...args) => controller.get(...args));

  /**
   * This function comment is parsed by doctrine
   * @route POST /tasks-management/task
   * @group tasksManagement::task - Operations about task
   * @param {string} name.query.required - name
   * @returns {Task.model} 200 - A Task object
   * @returns {Error}  default - Unexpected error
   */
  route.post((...args) => controller.post(...args));
};
