import * as React from "react";
import { Paper, Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Advocate } from "@/db/types";
import { toPhoneNumber } from "../utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value: any, row: any) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "city",
    headerName: "City",
    align: "left",
    headerAlign: "left",
    width: 110,
  },
  {
    field: "degree",
    headerName: "Degree",
    align: "center",
    headerAlign: "center",
    width: 70,
  },

  {
    field: "yearsOfExperience",
    headerName: "Years",
    type: "number",
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "specialties",
    headerName: "Specialties",
    align: "center",
    headerAlign: "center",
    width: 300,
    renderCell: (v: any) => {
      return (
        <Box
          sx={{
            maxHeight: 50,
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          {v.value.map((v: string) => {
            return (
              <Typography variant="caption" style={{ textAlign: "left" }}>
                {"-"}
                {v}
              </Typography>
            );
          })}
        </Box>
      );
    },
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 120,
    valueGetter: (value: any, row: any) => toPhoneNumber(value),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

interface AdvocatesTableProps {
  advocates: Advocate[];
  loading: boolean;
}

export default function AdvocatesTable({
  advocates,
  loading,
}: AdvocatesTableProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        height: 400,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={advocates}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
