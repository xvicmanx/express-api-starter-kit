const Controller = require('./controller');
const Service = require('./service');

module.exports = ({ router, db }) => {
  const service = new Service(db);
  const controller = new Controller(service);

  const route = router.route('/foo');
  const forSingleRoute = router.route('/foo/:id');

  /**
   * Gets some Foos
   * @route GET /test/foo
   * @operationId getFoos
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Gets some Foos
   *
   * @param {string} where.query - conditions
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  route.get((...args) => controller.find(...args));


  /**
   * Gets one Foo
   * @route GET /test/foo/:id
   * @operationId getFoo
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Gets one Foo
   *
   * @param {string} id.param.required - id of object
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.get((...args) => controller.findOne(...args));


  /**
   * Creates one Foo
   * @route POST /test/foo
   * @operationId createFoo
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Creates one Foo
   *
   * @param {string} data.body.required - data of Foo to create
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  route.post((...args) => controller.create(...args));

  /**
   * Updates some Foos
   * @route PUT /test/foo
   * @operationId updateFoos
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Updates some Foos
   *
   * @param {string} data.body.required - data of Foo to update
   * @param {string} where.query.required - condition to update the Foos
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  route.put((...args) => controller.update(...args));


  /**
   * Deletes one Foo
   * @route DELETE /test/foo/:id
   * @operationId deleteFoo
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Deletes one Foo
   *
   * @param {string} id.param.required - id of the Foo to delete
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  forSingleRoute.delete((...args) => controller.deleteOne(...args));


  /**
   * Deletes some Foos
   * @route DELETE /test/foo
   * @operationId deleteSomeFoos
   * @produces application/json application/xml
   * @consumes application/json application/xml
   * @group test::foo - Operations about foo
   * @summary Deletes some Foos
   *
   * @param {string} where.query.required - conditions to delete the Foos
   * @returns {Foo.model} 200 - Foo object
   * @returns {Error}  default - Unexpected error
   */
  route.delete((...args) => controller.delete(...args));
};
