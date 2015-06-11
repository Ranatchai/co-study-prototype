module.exports = function fetchData(routes, params) {
	let data = {};

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(resp => {
        data = resp;
      })
    })
  ).then(() => data, console.error);
}