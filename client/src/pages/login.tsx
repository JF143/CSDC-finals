import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";

const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "center",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        margin: 0,
      }}
    >
      <Card
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#0f3460",
          color: "#fff",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="24px"
          >
            <ThemedTitleV2
              collapsed={false}
              wrapperStyles={{
                fontSize: "28px",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#fff",
              }}
              text="Welcome to Refine"
            />

            <GoogleButton />

            <Typography
              align="center"
              color={"#b0b0b0"}
              fontSize="14px"
              style={{ marginTop: "16px" }}
            >
              Powered by
              <img
                style={{ padding: "0 5px", verticalAlign: "middle" }}
                alt="Google"
                src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
              />
              Google
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};