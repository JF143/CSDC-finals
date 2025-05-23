"use client"

import { useLogin } from "@refinedev/core"
import { useForm } from "@refinedev/react-hook-form"
import type * as React from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import type { FieldValues } from "react-hook-form"

type ILoginForm = {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin<ILoginForm>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: FieldValues) => {
    login(data as ILoginForm)
  }

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
        }}
      >
        <Card elevation={8}>
          <CardContent sx={{ padding: "32px" }}>
            <Typography variant="h4" component="h1" align="center" color="primary" fontWeight={700} mb={4}>
              Welcome to Refine
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" mb={3}>
              Sign in to your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <TextField
                id="email"
                label="Email"
                type="email"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={(errors.email as any)?.message}

              />
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={(errors.password as any)?.message}
              />
              <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading} sx={{ mt: 2 }}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="textSecondary">
                Demo credentials: test@example.com / password123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Login
