import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const BlogPostCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
 <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 600,
        mx: "auto",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "#23272f"
            : "linear-gradient(90deg, #e3f2fd 60%, #f8fafc 100%)",
      }}
    >
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Create Blog Post
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Title"}
          name="title"
          fullWidth
        />
        <TextField
          {...register("content", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.content}
          helperText={(errors as any)?.content?.message}
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Content"}
          name="content"
          rows={4}
          fullWidth
        />
        <Controller
          control={control}
          name={"category.id"}
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Category"}
                  variant="outlined"
                  error={!!(errors as any)?.category?.id}
                  helperText={(errors as any)?.category?.id?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </TextField>
            );
          }}
        />
      </Box>
    </Paper>
  </Create>
  
);
};
