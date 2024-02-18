import JTMX from 'src/lib/jtmx';

interface IForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

interface IProps {
  values?: IForm;
  error?: string;
  fieldErrors?: Partial<Record<keyof IForm, string[]>>;
}

export const RegistrationFormComponent: JTMX.Component<IProps> = ({
  values,
  fieldErrors,
  error,
}) => {

  return (
    <form
      hx-post='/register'
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
      <div class="grid">
        <div>
          <div>
            <label>First name</label>
          </div>
          <input
            type="text"
            name="firstName"
            value={values?.firstName?.toString()}
          />
          {fieldErrors?.firstName?.map(error => <p>{error}</p>)}
        </div>
        <div>
          <div>
            <label>Last name</label>
          </div>
          <input
            type="text"
            name="lastName"
            value={values?.lastName?.toString()}
          />
          {fieldErrors?.lastName?.map(error => <p>{error}</p>)}
        </div>
      </div>
      <div class="grid">
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
        <div>
          <div>
            <label>Confirm Password</label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={values?.confirmPassword?.toString()}
          />
          {fieldErrors?.confirmPassword?.map(error => <p>{error}</p>)}
        </div>
      </div>

      {error != null && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
