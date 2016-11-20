
import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

const importList = (nextState, cb) => {
  System.import('../components/List')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importCreate = (nextState, cb) => {
  System.import('../components/Create')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importEdit = (nextState, cb) => {
  System.import('../components/Edit')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
}

const importStats = (nextState, cb) => {
  System.import('../components/Stats')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
}


// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={importList} />
    <Route path="create" getComponent={importCreate} />
    <Route path="edit/:itemId" getComponent={importEdit} />
    <Route path="stats/:id" getComponent={importStats} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/List');    // eslint-disable-line global-require
  require('../components/Create');
  require('../components/Edit');
}

export default routes;
