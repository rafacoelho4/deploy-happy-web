import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Page404 from './pages/Page404';
import Logout from './pages/Logout';
import Registered from './pages/Registered';
import Dashboard from './pages/Dashboard';
import Delete from './pages/Delete';
import EditOrphanage from './pages/EditOrphanage';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/app" exact component={OrphanagesMap} />

      <Route path="/orphanages/create/:id" exact component={CreateOrphanage} />
      <Route path="/orphanages/:id" exact component={Orphanage} />
      <Route path="/success" component={Registered} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Cadastro} />
      <Route path="/logout" component={Logout} />

      <Route path="/user/:id" component={Dashboard} />
      <Route path="/delete/:user_id/:id" component={Delete} />
      <Route path="/edit/:user_id/:id" component={EditOrphanage} />

      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
