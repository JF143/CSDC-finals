import { Edit } from "@refinedev/mui"
import { Box, TextField } from "@mui/material"
import { useForm } from "@refinedev/react-hook-form"

export const CategoryEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    formState: { errors },
  } = useForm()

  const categoryData = queryResult?.data?.data

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
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
          label="Title"
          name="title"
        />
        <TextField
          {...register("description")}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          rows={4}
          label="Description"
          name="description"
        />
      </Box>
    </Edit>
  )
}
