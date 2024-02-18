import JTMX from 'src/lib/jtmx';
import { AuthenticatedRootComponent } from 'src/common/components';
import { ContainerComponent } from 'src/common/components/layout';

interface IProps { }

export const DashboardPageComponent: JTMX.Component<IProps> = ({
}) => {
  return (
    <AuthenticatedRootComponent title="Dashboard">
      <ContainerComponent>
        <h3>Dashboard</h3>
        <a href="/user/edit" role="button">Edit User</a>
      </ContainerComponent>
    </AuthenticatedRootComponent>
  );
};
