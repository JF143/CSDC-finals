import { useShow } from "@refinedev/core"
import { Show, TextFieldComponent as TextField } from "@refinedev/mui"
import { Typography, Stack } from "@mui/material"

export const CategoryShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={record?.id} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <TextField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <TextField value={new Date(record?.createdAt).toLocaleString()} />
      </Stack>
    </Show>
  )
}
