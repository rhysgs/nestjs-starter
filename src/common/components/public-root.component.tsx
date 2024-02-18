import JTMX from 'src/lib/jtmx';
import { RootComponent } from './root.component';

interface IProps {
  title: string;
  children: JTMX.Node;
}

export const PublicRootComponent: JTMX.Component<IProps> = ({
  title,
  children,
}) => {
  return (
    <RootComponent title={title}>{children}</RootComponent>
  );
};
