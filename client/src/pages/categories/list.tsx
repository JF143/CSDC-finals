import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { useDataGrid, List, EditButton, ShowButton, DeleteButton } from "@refinedev/mui"

export const CategoryList = () => {
  const { dataGridProps } = useDataGrid()

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      minWidth: 50,
    },
    {
      field: "title",
      flex: 1,
      headerName: "Title",
      minWidth: 200,
    },
    {
      field: "description",
      flex: 1,
      headerName: "Description",
      minWidth: 250,
    },
    {
      field: "createdAt",
      flex: 1,
      headerName: "Created At",
      minWidth: 250,
      renderCell: function render({ value }) {
        return new Date(value).toLocaleString()
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: function render({ row }) {
        return (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        )
      },
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
  ]

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
