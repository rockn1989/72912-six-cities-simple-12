
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateLoginProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateLogin:FC<PrivateLoginProps> = ({authorizationStatus, children}) => (
  authorizationStatus !== AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Root} />
);

export default PrivateLogin;
