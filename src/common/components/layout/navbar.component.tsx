import { requestContext } from '@fastify/request-context';
import JTMX from 'src/lib/jtmx';

type NavBarItem = {
  label: JTMX.Node;
  href: string;
}

interface IProps {
  items: NavBarItem[];
}

export const NavbarComponent: JTMX.Component<IProps> = ({
  items,
}) => {
  const session = requestContext.get('session');

  return (
    <nav>
      <ul>
        <li><strong>Company name</strong></li>
      </ul>
      <ul>
        {items.map(item => (
          <li>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        <li>Hello {session.user.firstName}</li>
      </ul>
    </nav>
  );
};
