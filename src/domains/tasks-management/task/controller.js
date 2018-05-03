const { queryValue } = require('../../../core/helpers');
/**
*   Handler function
*/
const handleQuery = (req, res, expectedArgs = []) => {
  expectedArgs.forEach((arg) => {
    if (!queryValue(req, arg)) {
      res.status(400).send(`Missing argument ${arg.split('.')[0]}`);
    }
  });
  return promise => promise.then((result) => {
    if (!result || (Array.isArray(result) && !result.length)) {
      res.status(404);
    }
    res.send(result);
  }).catch((err) => {
    res.status(500);
    res.send('An error has occured while executing the search', err);
  });
};

const handleMutation = (req, res, expectedArgs = []) => {
  expectedArgs.forEach((arg) => {
    if (!queryValue(req, arg)) {
      res.status(400).send(`Missing argument ${arg}`);
    }
  });
  return promise => promise.then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500);
    res.send('An error has occured while executing the search', err);
  });
};

/**
*   Task controller
*/
class Controller {
  constructor(service) {
    this.service = service;
  }

  /**
   * Finds tasks that satisfy a given condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  find(req, res) {
    handleQuery(req, res)(this.service.find(req.query));
  }

  /**
   * Finds one task that satisfies the condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  findOne(req, res) {
    handleQuery(req, res)(this.service.findOne(req.query));
  }

  /**
   * Finds one task by its id
   * This condition comes in the params object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  findById(req, res) {
    handleQuery(req, res, ['params.id'])(this.service.findById(req.params.id));
  }

  /**
   * Creates a new task with the provided data
   * This data comes in the body object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  create(req, res) {
    handleMutation(req, res)(this.service.create(req.body));
  }

  /**
   * Updates tasks that satisfy condition with the provided data
   * The data comes in the body object of the request,
   * and the condition in the query object.
   * @param {object} req - request
   * @param {object} res - response
   */
  update(req, res) {
    handleMutation(req, res)(this.service.update(req.query, req.body));
  }

  /**
   * Deletes tasks that satisfy the condition
   * The condition in the query object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  delete(req, res) {
    handleMutation(req, res)(this.service.delete(req.query));
  }

  /**
   * Deletes one task that matches the id.
   * The id comes in the params object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  deleteOne(req, res) {
    handleMutation(req, res, ['params.id'])(this.service.deleteOne(req.params.id));
  }
}

module.exports = Controller;
