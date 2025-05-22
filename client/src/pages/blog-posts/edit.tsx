import { Autocomplete, Box, Select, TextField, } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import Paper from "@mui/material/Paper";

export const BlogPostEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const blogPostsData = queryResult?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 700,
        mx: "auto",
        background: (theme) =>
          theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #23272 60%, #283046 100%)"
          : "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
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
          <TextField
            {...register("content", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.content}
            helperText={(errors as any)?.content?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            multiline
            label={"Content"}
            name="content"
            rows={4}
          />
          <Controller
            control={control}
            name={"category.id"}
            rules={{ required: "This field is required" }}
            // eslint-disable-next-line
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
                  margin="normal"
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
              <Select
                {...field}
                value={field?.value || "draft"}
                label={"Status"}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            );
          }}
        />
      </Box>
      </ Paper>
    </Edit>
  );
};
