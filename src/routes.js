import React from 'react';
import Loadable from 'react-loadable';
import Layout from './container/layout/Layout.js';
import Login from './view/Login.js';
import Firstlogin from './view/First_login.js'

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
  {path:'/chat', name: 'Chat', component: Chat},
  {path:'/login', name: 'Login', component: Login},
  {path:'/Firstlogin', name:'Firstlogin', component: Firstlogin}
];

export default routes;