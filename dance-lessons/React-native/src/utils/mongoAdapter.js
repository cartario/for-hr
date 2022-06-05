const adapter = (response) => {
  return response.map((lesson) => ({
    ...lesson,
    id: lesson._id,
  }));
};

export default adapter;
