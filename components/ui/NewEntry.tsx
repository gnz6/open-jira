import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { ChangeEvent, useState, useContext } from "react";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(target.value);
    // setTouched(true)
  };

  const { addEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const handleSaveEntry = () => {
    if (!inputValue.length) return;
    setIsAddingEntry(true)
    addEntry(inputValue);
    setIsAddingEntry(false)

  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && "Add Entry..."}
            error={inputValue.length <= 0 && touched}
            onChange={handleInputChange}
            value={inputValue}
            onBlur={() => setTouched(true)}
          />

          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="outlined"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSaveEntry}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          variant="outlined"
          fullWidth
          onClick={() => setIsAddingEntry(true)}
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};
