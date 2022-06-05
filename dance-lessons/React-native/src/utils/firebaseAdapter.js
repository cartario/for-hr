const adapter = (response) => {
  const keys = Object.keys(response);
  return keys.map((key) => {
    return {
      id: key,
      ...response[key],
    };
  });
};

export default adapter;
