import JTMX from 'src/lib/jtmx';
import { PublicRootComponent } from 'src/common/components';
import { RegistrationFormComponent } from './registration-form.component';
import { ContainerComponent } from 'src/common/components/layout';

interface IProps { }

export const RegisterPageComponent: JTMX.Component<IProps> = ({
}) => {
  return (
    <PublicRootComponent title="Register">
      <ContainerComponent>
        <h3>Register</h3>
        <p>Already have an account? <a href="/login">Login</a></p>
        <RegistrationFormComponent />
      </ContainerComponent>
    </PublicRootComponent>
  );
};
