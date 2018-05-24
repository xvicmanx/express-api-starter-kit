const extractId = (target) => {
  if (typeof target === 'number') return target;
  if (typeof target === 'object') return target.id;
  return null;
};

const transformData = (data, fields) => {
  const result = data;
  Object.keys(fields)
    .filter(k => fields[k].model && !fields[k].many)
    .forEach((f) => {
      if (data[f]) {
        const name = `${fields[f].model}Id`;
        result[name] = extractId(data[f]);
        delete result[f];
      }
    });
  return result;
};


const dataTransformProxy = (target, definition) => Object.assign(
  {},
  target,
  {
    create: (data) => {
      const result = transformData(data, definition.fields);
      return target.create(result);
    },
    update: (condition, data) => {
      const result = transformData(data, definition.fields);
      return target.update(condition, result);
    },
  },
);

module.exports = { dataTransformProxy };
