const { PAGE_SIZE } = require('../configs/constants');

const getPage = (page) => {
  if (page < 1) page = 1;
  page = parseInt(page - 1);
  let start = PAGE_SIZE * page;
  let limit = PAGE_SIZE;

  return {
    start,
    limit,
  };
};

module.exports = getPage;
