import { Stack, Typography, Paper } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const CategoryShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 500,
          mx: "auto",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #23272f 60%, #283046 100%)"
              : "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
          boxShadow: "0 4px 24px rgba(30, 136, 229, 0.08)",
          transition: "background 0.3s",
        }}
      >
        <Stack gap={2}>
          <Typography variant="body1" fontWeight="bold">
            {"ID"}
          </Typography>
          <TextField value={record?.id} />
          <Typography variant="body1" fontWeight="bold">
            {"Title"}
          </Typography>
          <TextField value={record?.title} />
        </Stack>
      </Paper>
    </Show>
  );
};