import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
  return (
    <div className="sk-wave">
      <div className="sk-rect sk-rect1"></div>
      <div className="sk-rect sk-rect2"></div>
      <div className="sk-rect sk-rect3"></div>
      <div className="sk-rect sk-rect4"></div>
      <div className="sk-rect sk-rect5"></div>
    </div>
  )
}

const Dashboard = Loadable({
  loader: () => import('./view/Dashboard.js'),
  loading: Loading
});

const routes = [
  {path:'/dashboard', name: 'Dashboard', component: Dashboard}
];

export default routes;