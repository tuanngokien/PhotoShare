import React from 'react';
import Loadable from 'react-loadable';
import Layout from './container/layout/Layout.js';
import Profile from './view/Profile.js';
import UpLoad from'./view/UpLoad.js';
import Following from'./view/Following.js';
import Followers from'./view/Followers.js';
import EditProfile from './view/EditProfile.js'

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
  {path:'/pts/following', name: 'Following', component: Following},
  {path:'/pts/followers', name: 'Followers', component: Followers},
  {path:'/pts/profile/:id', name: 'Profile', component: Profile},
  {path:'/pts/edit/:id', name: 'EditProfile', component: EditProfile},
  {path: '/pts/upload', name: 'UpLoad', component: UpLoad},
];

export default routes;