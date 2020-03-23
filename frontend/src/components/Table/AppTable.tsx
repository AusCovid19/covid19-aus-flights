import React, { useEffect, useState } from "react";
import { Moment } from "moment";
import Fuse from "fuse.js";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { useApi } from "../../hooks/useApi";
import AirlineTail from "../../airlines/AirlineTail";

import { Flight } from "../../types";
import { HeadCell, Order, EnhancedTableProps } from "./types";

import useTableStyles from "./styles";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Moment },
  b: { [key in Key]: number | string | Moment }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells: HeadCell[] = [
  {
    id: "airline",
    numeric: false,
    disablePadding: true,
    label: "Airline"
  },
  {
    id: "flight_number",
    numeric: false,
    disablePadding: false,
    label: "Flight Number"
  },
  { id: "origin", numeric: false, disablePadding: false, label: "Origin" },
  {
    id: "destination",
    numeric: false,
    disablePadding: false,
    label: "Destination"
  },
  {
    id: "arrival_date",
    numeric: false,
    disablePadding: false,
    label: "Arrival Date"
  },
  {
    id: "symptoms_onset_date",
    numeric: false,
    disablePadding: false,
    label: "Symptoms onset up to"
  },
  {
    id: "close_contact_rows",
    numeric: false,
    disablePadding: false,
    label: "Close Contact Rows"
  },
  {
    id: "reporting_state",
    numeric: false,
    disablePadding: false,
    label: "Reporting State"
  }
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort, searchMode } = props;
  const createSortHandler = (property: keyof Flight) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => {
          const active = orderBy === headCell.id;
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={active ? order : false}
            >
              {searchMode ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={active}
                  direction={active ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {active ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const classes = useTableStyles();

  const [flightsData, setFlightsData] = useState<Flight[]>([]);
  const [searchMode, setSearchMode] = useState(false);
  const { data } = useApi();

  useEffect(() => {
    if (searchTerm === "") {
      setFlightsData(data);
      setSearchMode(false);
    } else {
      const search = new Fuse(data, {
        distance: 10,
        threshold: 0.4,
        keys: [
          { name: "destination", weight: 0.9 },
          { name: "origin", weight: 0.7 },
          { name: "airline", weight: 0.7 },
          { name: "flight_number", weight: 0.7 },
          { name: "reporting_state", weight: 0.4 }
        ]
      });
      const flights = search.search(searchTerm).map((res: any) => res.item);
      setFlightsData(flights);
      setSearchMode(true);
    }
  }, [data, searchTerm]);

  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Flight>("arrival_date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Flight
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, flightsData.length - page * rowsPerPage);

  const displayData = searchMode
    ? flightsData
    : stableSort(flightsData, getComparator(order, orderBy));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer style={{ maxHeight: "75vh" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              searchMode={searchMode}
            />
            <TableBody>
              {displayData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div style={{ display: "flex" }}>
                          <AirlineTail airline={row.airline} />{" "}
                          <Typography
                            variant="body2"
                            style={{ marginLeft: 10 }}
                          >
                            {row.airline}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell align="left">{row.flight_number}</TableCell>
                      <TableCell align="left">{row.origin}</TableCell>
                      <TableCell align="left">{row.destination}</TableCell>
                      <TableCell align="left">
                        {row.arrival_date.format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {row.symptoms_onset_date.format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {row.close_contact_rows}
                      </TableCell>
                      <TableCell align="left">{row.reporting_state}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={flightsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EnhancedTable;
