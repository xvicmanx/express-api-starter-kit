const { handleMutation, handleQuery } = require('../helpers');

/**
*   Base controller
*/
class BaseController {
  constructor(service) {
    this.service = service;
  }

  /**
   * Finds items that satisfy a given condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  find(req, res) {
    handleQuery(req, res)(this.service.find(req.query));
  }

  /**
   * Counts items that satisfy a given condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  count(req, res) {
    handleQuery(req, res)(this.service.count(req.query));
  }

  /**
   * Finds one item that satisfies the condition
   * This condition comes in the request query object
   * @param {object} req - request
   * @param {object} res - response
   */
  findOne(req, res) {
    handleQuery(req, res)(this.service.findOne(req.query));
  }

  /**
   * Finds one item by its id
   * This condition comes in the params object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  findById(req, res) {
    handleQuery(req, res, ['params.id'])(this.service.findById(req.params.id));
  }

  /**
   * Creates a new item with the provided data
   * This data comes in the body object of the request
   * @param {object} req - request
   * @param {object} res - response
   */
  create(req, res) {
    handleMutation(req, res)(this.service.create(req.body));
  }

  /**
   * Updates items that satisfy condition with the provided data
   * The data comes in the body object of the request,
   * and the condition in the query object.
   * @param {object} req - request
   * @param {object} res - response
   */
  update(req, res) {
    handleMutation(req, res)(this.service.update(req.query, req.body));
  }

  /**
   * Deletes items that satisfy the condition
   * The condition in the query object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  delete(req, res) {
    handleMutation(req, res)(this.service.delete(req.query));
  }

  /**
   * Deletes one item that matches the id.
   * The id comes in the params object of the request.
   * @param {object} req - request
   * @param {object} res - response
   */
  deleteOne(req, res) {
    handleMutation(req, res, ['params.id'])(this.service.deleteOne(req.params.id));
  }
}

module.exports = BaseController;
