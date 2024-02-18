import JTMX from 'src/lib/jtmx';

interface IProps {
  title: string;
  children: JTMX.Node;
}

export const RootComponent: JTMX.Component<IProps> = ({
  title,
  children,
}) => {
  return (
    <html>
      <head>
        <meta char-set="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="/public/dist/styles.css" />
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};
