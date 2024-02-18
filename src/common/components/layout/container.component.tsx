import JTMX from 'src/lib/jtmx';

interface IProps {
  children: JTMX.Node;
  fluid?: boolean;
}

export const ContainerComponent: JTMX.Component<IProps> = ({
  children,
  fluid
}) => {
  return (
    <main class={fluid ? 'container-fluid' : 'container'}>{children}</main>
  );
};
