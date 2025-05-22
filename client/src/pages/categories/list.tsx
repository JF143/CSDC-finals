import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import Paper from "@mui/material/Paper";

export const CategoryList = () => {
  const { dataGridProps } = useDataGrid({});

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "center",
        headerAlign: "center",
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
        display: "flex",
        align: "center",
        headerAlign: "center",  
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "center",
        headerAlign: "center",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <Paper
        elevation={0}
        sx={{
          p: 0,
          borderRadius: 4,
          maxWidth: 900,
          mx: "auto",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #23272f 60%, #283046 100%)"
              : "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
          boxShadow: "0 4px 24px rgba(30, 136, 229, 0.08)",
          transition: "background 0.3s",
        }}
      >

        <DataGrid
          {...dataGridProps}
          columns={columns}
          autoHeight
          sx={{
            background: "transparent",
            borderRadius: 4,
            "& .MuiDataGrid-columnHeaders": {
              background: "transparent",
              borderBottom: "2px solid #e3f2fd",
            },
            "& .MuiDataGrid-footerContainer": {
              background: "transparent",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #bbdefb",
            },
          }}
        />
      </Paper>
    </List>
  );
};