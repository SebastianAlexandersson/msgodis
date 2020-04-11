/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import * as React from 'react';
import {
  Route, Switch, Redirect, RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Admin from '../admin/Admin';
import Consumer from '../consumer/Consumer';
import Producer from '../producer/Producer';
import CandyStock from '../candy_stock/CandyStock';
import CandyList from '../candy_stock/CandyList';
import Checkout from '../checkout/Checkout';
import { AppState } from '../../redux';
import { selectUser } from '../../redux/auth/aut.selector';
import { IUserData } from '../../redux/auth/auth.types';

interface Props {
  user: IUserData | null;
}

interface PrivetRoutesProp {
  path: string;
  exact?: boolean;
  user?: IUserData | null;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  // component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

}

const PrivateRoute: React.FC<PrivetRoutesProp> = ({
  component, exact, path, user,
}) => {
  const finalComponent = user ? component : Login;
  return <Route exact={exact} path={path} component={finalComponent} />;
};

const Router: React.FC<Props> = ({ user }) => (
  <Switch>
    {/* <Redirect from="/" to="/login" /> */}
    <PrivateRoute user={user} exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute user={user} exact path="/admin" component={Admin} />
    <Route exact path="/user" component={Consumer} />
    <Route exact path="/producer" component={Producer} />
    <Route exact path="/add-candy" component={CandyStock} />
    <Route exact path="/candy-list" component={CandyList} />
    <Route exact path="/checkout" component={Checkout} />
  </Switch>
);

const mapStateToProps = (state: AppState) => ({
  user: selectUser(state),
});
export default connect(mapStateToProps)(Router);