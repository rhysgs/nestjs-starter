import JTMX from 'src/lib/jtmx';
import { RootComponent } from './root.component';
import { FooterComponent, NavbarComponent } from './layout';

interface IProps {
  title: string;
  children: JTMX.Node;
}

export const AuthenticatedRootComponent: JTMX.Component<IProps> = ({
  title,
  children,
}) => {
  return (
    <RootComponent title={title}>
      <NavbarComponent items={[{ label: 'Logout', href: '/logout' }]} />
      {children}
      <FooterComponent />
    </RootComponent>
  );
};
