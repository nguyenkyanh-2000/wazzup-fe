import React, { useState, useContext } from "react";
import { Stack } from "@mui/system";
import {
  IconButton,
  InputAdornment,
  Alert,
  Container,
  Link,
} from "@mui/material";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormProvider from "../components/FormProvider";
import FTextField from "../components/FTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../contexts/AuthContext";
import wait from "../utils/wait";
import { LoadingButton } from "@mui/lab";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

function LoginPage() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let { email, password } = data;
    await wait(2000);
    try {
      await auth.login({ email, password }, () => {
        navigate("/");
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container maxWidth="sm" sx={{ zIndex: 1 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.responseError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.responseError.message}
          </Alert>
        )}
        <Stack spacing={3} alignItems="center">
          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>

        <Alert severity="info" sx={{ my: 3 }}>
          New to Wazzup?
          <Link variant="subtitle2" component={RouterLink} to="/register">
            {" Join now"}
          </Link>
        </Alert>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
