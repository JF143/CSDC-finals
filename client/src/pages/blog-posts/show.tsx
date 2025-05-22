import { Stack, Typography, Paper, Divider, Box } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const BlogPostShow = () => {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Paper
        elevation={3}
        sx={{
          p:4,
          borderRadius: 4,
          maxWidth: 700,
          mx: "auto",
          background: (theme) =>
            theme.palette.mode === "dark" 
          ? "#23272f" 
          : "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
        }}
        >
      <Stack gap={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {record?.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Blog Post Details
          </Typography>
        </Box>
        <Divider />

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" minWidth={100}>
            ID
          </Typography>
          <TextField value={record?.id} />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" minWidth={100}>
            Content
          </Typography>
          <Box flex ={1}>
            <MarkdownField value={record?.content} />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" minWidth={100}>
            Category
          </Typography>
          {categoryIsLoading ? (
            <>Loading...</>
          ) : (
            <Typography>{categoryData?.data?.title}</Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" minWidth={100}>
          Created At
          </Typography>
          <DateField value={record?.createdAt} />
        </Stack>
      </Stack>
      </Paper>
    </Show>
  );
};
