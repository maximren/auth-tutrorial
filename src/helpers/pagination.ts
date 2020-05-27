const paginationOptions = (query) => {
  const skip = query.skip ? { skip: parseInt(query.skip, 10) } : {};
  const limit = query.limit ? { limit: parseInt(query.limit, 10) } : {};

  return {
    ...skip,
    ...limit,
  };
};

export default paginationOptions;