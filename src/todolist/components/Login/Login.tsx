import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { useDispatchWithType, useSelectorWithType } from "../../../redusers/ActionThunkDispatchType";
import { loginTC } from "../../../redusers/auth-reducer";
import { Navigate } from "react-router";
import { LoginType, ResponseTypeApI} from "api/todolistApi";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const isLogin = useSelectorWithType<boolean>((state) => state.login.isLoggedIn);

  const urlCaptch = useSelectorWithType<null | string>((state) => state.login.urlCaptch);

  const dispatch = useDispatchWithType();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters";
      }

      return errors;
    },
    onSubmit: (values: LoginType, formikHelpers: FormikHelpers<LoginType>) => {
      dispatch(loginTC({ data: values}))
      .unwrap()
      .then()
        .catch((data: ResponseTypeApI) => {
          const { fieldsErrors } = data
          // проверку на fieldsErrors
          if (fieldsErrors) {
          fieldsErrors.forEach(element => {
            formikHelpers.setFieldError(element.field, element.error)
          });
        }
      })
        
    },
});

  if (isLogin) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                // name="email"
                // onChange={formik.handleChange}
                // value={formik.values.email}
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>
                  <div>{formik.errors.email}</div>
                </div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              {urlCaptch && (
                <>
                  <img src={urlCaptch} alt="captcha"></img>
                  <TextField
                    label="Captcha"
                    margin="normal"
                    {...formik.getFieldProps("captcha")}
                    onBlur={formik.handleBlur}
                  />
                </>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                name="rememberMe"
                onChange={formik.handleChange}
                value={formik.values.rememberMe}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
