import { Box, TextField, Paper } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const CategoryCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <TextField
            {...register("title", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.title}
            helperText={(errors as any)?.title?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Title"}
            name="title"
          />
        </Box>
      </Paper>
    </Create>
  );
};