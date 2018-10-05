import React from 'react';
import Loadable from 'react-loadable';
import Layout from './container/layout/Layout.js';

function Loading() {
  return (
    <div>
      ...Loading
    </div>
  )
}

const Dashboard = Loadable({
  loader: () => import('./view/Dashboard.js'),
  loading: Loading
});

const Chat = Loadable({
  loader: () => import('./view/Chat.js'),
  loading: Loading
});

const routes = [
  {path: '/', exact: true, name: 'Home', component: Layout },
  {path:'/dashboard', name: 'Dashboard', component: Dashboard},
  {path:'/chat', name: 'Chat', component: Chat}
];

export default routes;