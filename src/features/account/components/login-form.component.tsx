import JTMX from 'src/lib/jtmx';

interface IForm {
  email?: string;
  password?: string;
}

interface IProps {
  values?: IForm;
  error?: string;
  fieldErrors?: Partial<Record<keyof IForm, string[]>>;
}

export const LoginFormComponent: JTMX.Component<IProps> = ({
  values,
  fieldErrors,
  error,
}) => {

  return (
    <form
      hx-post='/login'
      hx-swap='outerHTML'
    >
      <div>
        <div>
          <label>Email</label>
        </div>
        <input
          type="email"
          name="email"
          value={values?.email?.toString()}
        />
        {fieldErrors?.email?.map(error => <p>{error}</p>)}
      </div>
      <div>
        <div>
          <label>Password</label>
        </div>
        <input
          type="password"
          name="password"
          value={values?.password?.toString()}
        />
        {fieldErrors?.password?.map(error => <p>{error}</p>)}
      </div>
      {error != null && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
      <button type="submit">Log in</button>
    </form>
  );
};
