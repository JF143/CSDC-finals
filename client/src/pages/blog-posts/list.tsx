import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const BlogPostList = () => {
  const { dataGridProps } = useDataGrid({});

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
        align:"center",
        headerAlign: "center",
      },
      {
        field: "content",
        flex: 1,
        headerName: "Content",
        minWidth: 250,
        headerAlign: "center",
        renderCell: function render({ value }) {
          if (!value) return "-";
          return (
            <Typography
              component="p"
              whiteSpace="pre"
              overflow="hidden"
              textOverflow="ellipsis"
              color="text.secondary"
              fontSize={14}
            >
              {value}
            </Typography>
          );
        },
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 200,
        align: "center",
        headerAlign: "center",
        valueGetter: (_, row) => {
          const value = row?.category;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            <Typography fontWeight={500}>
              {categoryData?.data?.find((item) => item.id === value?.id)?.title}
            </Typography>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 80,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "createdAt",
        headerName: "Created at",
        minWidth: 120,
        align: "center",
        headerAlign: "center",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "center",
        headerAlign: "center",
        minWidth: 140,
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <div style={{ display: "flex", gap: 8}}>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categoryData, categoryIsLoading]
  );

  return (
    <List>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === "dark" 
          ? "linear-gradient(90deg, #23272f 60%, #283046 100%)"
          : "linear-gradient(90deg, #e3f2fd 60%, #f8fafc 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Box sx={{ width: "100%", overflowX: "auto"}}>
          <div style={{ minWidth: 1300}}>
            <DataGrid
              {...dataGridProps}
              columns={columns}
              autoHeight
              sx={{
                borderRadius: 3,
                background: "transparent",
              "& .MuiDataGrid-cell":{
                  fontSize:15,
                  borderRight: "1px solid #b3c6e0"
                },
                "& .MuiDataGrid-columnHeaders": {
                background: (theme) =>
                theme.palette.mode === "dark" ? "#283046" : "#e3f2fd",
                fontWeight: 700,
                fontSize: 16,
                borderRight: "1px solid #b3c6e0",
                },
                "& .MuiDataGrid-columnHeader:last-of-type, & .MuiDataGrid-cell:last-of-type": {
                  borderRight: "none",
                },
                "& .MuiDataGrid-row": {
                transition: "background 0.2s",
                "&:hover": {
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(100,181,246,0.08)"
                    : "rgba(25, 118, 210, 0.04)",
                  },
                },
              "& .MuiDataGrid-footerContainer": {
                background: "transparent",
              },
              border: "none",
            }}
          />
          </div>
        </Box>
      </Paper>
    </List>
  );
};
