const TaskController = require('./controller');
const TaskService = require('./service');

/**
 * @typedef TasksCount
 * @property {number} count - total of tasks
 */

module.exports = ({ router, db }) => {
  const service = new TaskService(db, 'task');
  const controller = new TaskController(service);

  const route = router.route('/task');
  const forSingleRoute = router.route('/task/:id');
  const countRoute = router.route('/task/get/count');
  const relatedRoute = router.route('/task/:id/:related');

  /**
   * Gets some Tasks
   * @route GET /tasks-management/task
   * @operationId getTasks
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Gets some Tasks
   *
   * @param {string} where.query - conditions
   * @returns {Task.model} 200 - Task object
   * @returns {Error}  default - Unexpected error
   */
  route.get((...args) => controller.find(...args));

  /**
   * Gets one Task by Id
   * @route GET /tasks-management/task/{id}
   * @operationId getTaskById
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Gets one Task by Id
   *
   * @param {string} id.path.required - id of object
   * @returns {Task.model} 200 - Task object
   * @returns {Error} 404 - item not found
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.get((...args) => controller.findById(...args));

  /**
   * Gets Task by Id related models
   * @route GET /tasks-management/task/{id}/{related}
   * @operationId getTaskByIdRelated
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Gets Task by Id related models
   *
   * @param {string} id.path.required - id of object
   * @param {string} related.path.required - related models
   * @returns {object} 200 - related model or models
   * @returns {Error} 404 - item not found
   * @returns {Error}  default - Unexpected error
   */
  relatedRoute.get((...args) => controller.findByIdRelated(...args));

  /**
   * Counts the Task that match condition
   * @route GET /tasks-management/task/get/count
   * @operationId countTasks
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Counts the Tasks for conditions
   *
   * @param {string} where.query - conditions
   * @returns {TasksCount.model} 200 - the total of tasks
   * @returns {Error}  default - Unexpected error
   */
  countRoute.get((...args) => controller.count(...args));

  /**
   * Creates one Task
   * @route POST /tasks-management/task
   * @operationId createTask
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Creates one Task
   *
   * @param {Task.model} data.body.required - data of Task to create
   * @returns {Task.model} 200 - Task object
   * @returns {Error}  default - Unexpected error
   */
  route.post((...args) => controller.create(...args));

  /**
   * Updates some Tasks
   * @route PUT /tasks-management/task
   * @operationId updateTask
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Updates task
   *
   * @param {Task.model} data.body.required - data of Task to update
   * @param {string} id.query.required - id
   * @returns {Task.model} 200 - Task object
   * @returns {Error}  default - Unexpected error
   */
  route.put((...args) => controller.update(...args));


  /**
   * Deletes one Task
   * @route DELETE /tasks-management/task/{id}
   * @operationId deleteTask
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Deletes one Task
   *
   * @param {string} id.path.required - id of the Task to delete
   * @returns {Task.model} 200 - Task object
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.delete((...args) => controller.deleteOne(...args));


  /**
   * Deletes some Tasks
   * @route DELETE /tasks-management/task
   * @operationId deleteSomeTasks
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group tasksManagement.task - Operations about task
   * @summary Deletes some Tasks
   *
   * @param {string} where.query.required - conditions to delete the Tasks
   * @returns {Task.model} 200 - Task object
   * @returns {Error}  default - Unexpected error
   */
  route.delete((...args) => controller.delete(...args));
};
