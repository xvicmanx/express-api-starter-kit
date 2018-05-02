const handle = res => promise => promise.then((result) => {
  res.send(result);
}).catch((err) => {
  res.status(500);
  res.send('An error has occured', err);
});

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
    handle(res)(this.service.find(req.query));
  }

  /**
   * Finds one task that satisfies the condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  findOne(req, res) {
    handle(res)(this.service.findOne(req.query));
  }

  /**
   * Finds one task by its id
   * This condition comes in the params object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  findById(req, res) {
    handle(res)(this.service.findById(req.params.id));
  }

  /**
   * Creates a new task with the provided data
   * This data comes in the body object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  create(req, res) {
    handle(res)(this.service.create(req.body));
  }

  /**
   * Updates tasks that satisfy condition with the provided data
   * The data comes in the body object of the request,
   * and the condition in the query object.
   * @param {object} req - request
   * @param {object} res - response
   */
  update(req, res) {
    handle(res)(this.service.update(req.query, req.body));
  }

  /**
   * Deletes tasks that satisfy the condition
   * The condition in the query object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  delete(req, res) {
    handle(res)(this.service.delete(req.query));
  }

  /**
   * Deletes one task that matches the id.
   * The id comes in the params object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  deleteOne(req, res) {
    handle(res)(this.service.deleteOne(req.params.id));
  }
}

module.exports = Controller;
