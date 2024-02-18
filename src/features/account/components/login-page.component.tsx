import JTMX from 'src/lib/jtmx';
import { PublicRootComponent } from 'src/common/components';
import { LoginFormComponent } from './login-form.component';
import { ContainerComponent } from 'src/common/components/layout';

interface IProps { }

export const LoginPageComponent: JTMX.Component<IProps> = ({
}) => {
  return (
    <PublicRootComponent title="Login">
      <ContainerComponent>
        <h3>Login</h3>
        <p>Don't have an account? <a href="/register">Register</a></p>
        <LoginFormComponent />
      </ContainerComponent>
    </PublicRootComponent>
  );
};
