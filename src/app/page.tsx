"use client";

import { useEffect, useState } from "react";
import { AdvocatesAPI } from "./services/Advocates";
import { useDebounce } from "./hooks/useDebouce";
import AdvocatesTable from "./components/AdvocatesTable";
import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Replay } from "@mui/icons-material";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Debouncing - a technique used to not trigger too many state changes
  // we use it here to not send too many calls to the backend while the ure types
  const debouncedInputValue = useDebounce(query, 500); // 500ms delay

  useEffect(() => {
    getAdvocates();
  }, [debouncedInputValue]);

  const getAdvocates = async () => {
    try {
      setLoading(true);
      const as = await AdvocatesAPI.search(query);
      setAdvocates(as);
    } catch (error) {
      // TODO: use existing error setup
      // alert(error);
    } finally {
      setLoading(false);
    }
  };

  // get advocates initially on page load
  useEffect(() => {
    getAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const onReset = () => {
    setQuery("");
  };

  return (
    <main style={{}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Solace Advocates
          </Typography>
        </Toolbar>
      </AppBar>

      <br />
      <br />
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          sx={{ width: 400, marginLeft: "10px" }}
          value={query}
          onChange={onChange}
          placeholder="Search by name, city, degree, years, or specialty"
        />
        <Tooltip title="Reset">
          <IconButton onClick={onReset} disabled={query.length === 0}>
            <Replay />
          </IconButton>
        </Tooltip>
      </Box>
      <br />
      <AdvocatesTable advocates={advocates} loading={loading} />
      <br />
    </main>
  );
}
