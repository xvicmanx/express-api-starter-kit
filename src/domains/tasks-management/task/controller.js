class Controller {
  constructor(service) {
    this.service = service;
  }

  get(req, res) {
    this.service.getById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500);
        res.send('An error has occured while searching for foo', err);
      });
  }

  post(req, res) {
    this.service.getById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500);
        res.send('An error has occured while searching for foo', err);
      });
  }
}

module.exports = Controller;
