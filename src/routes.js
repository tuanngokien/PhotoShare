import React from 'react';
import Loadable from 'react-loadable';
import Layout from './container/layout/Layout.js';
import Profile from './view/Profile.js';

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
  {path: '/pts', exact: true, name: 'Home', component: Layout },
  {path:'/pts/dashboard', name: 'Dashboard', component: Dashboard},
  {path:'/pts/chat', name: 'Chat', component: Chat},
  {path:'/pts/profile', name: 'Profile', component: Profile},
];

export default routes;