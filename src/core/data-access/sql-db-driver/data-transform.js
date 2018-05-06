const extractId = (target) => {
  if (typeof target === 'number') return target;
  if (typeof target === 'object') return target.id;
  return null;
};

const dataTransformProxy = (target, definition) => Object.assign(
  {},
  target,
  {
    create: (data) => {
      const result = data;
      const { fields } = definition;

      Object.keys(fields)
        .filter(k => fields[k].model && !fields[k].many)
        .forEach((f) => {
          if (data[f]) {
            const name = `${fields[f].model}Id`;
            result[name] = extractId(data[f]);
            delete result[f];
          }
        });
      return target.create(result);
    },
    update: data => target.update(data),
  },
);

module.exports = { dataTransformProxy };
