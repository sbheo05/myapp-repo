import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";
import axios from "axios";
const Home = (props) => {
  const [open, setOpen] = React.useState([false, false, false, false]);

  const handleClick = (index) => () => {
    const newValues = [...open];
    newValues[index] = !open[index];
    setOpen(newValues);
  };

  const [pRvalues, setPRvalues] = useState([false, false, false, false]);
  const [pIvalues, setPIvalues] = useState([false, false, false, false]);
  const pRChange = (index) => (event) => {
    const newValues = [...pRvalues];
    newValues[index] = !newValues[index];
    setPRvalues(newValues);
  };
  const pIChange = (index) => (event) => {
    const newValues = [...pIvalues];
    newValues[index] = !newValues[index];
    setPIvalues(newValues);
  };

  const [dumpList, setDumpList] = useState(async () => {
    const response = await axios.get("/api/dump/all");
    setDumpList(response.data);
  });

  if (!Array.isArray(dumpList)) return null;

  return (
    <>
      <Stack
        direction="column"
        sx={{ width: "100%", margin: 0, padding: 0, maxWidth: 800 }}
      >
        <Typography
          variant="button"
          component="div"
          ml={2}
          mt={2}
          mb={1}
          sx={{ color: "#8C8C8C" }}
        >
          DumpList
        </Typography>
        <List sx={{ width: "100%" }}>
          <Divider sx={{ marginTop: 0 }} />
          {dumpList.map((value, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText primary={value.full_title} />
              </ListItem>
              <ListItem
                secondaryAction={
                  <>
                    <FormControlLabel
                      control={
                        <Switch
                          size="large"
                          checked={pRvalues[index]}
                          onClick={pRChange(index)}
                        />
                      }
                      label="문제섞기"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          size="large"
                          checked={pIvalues[index]}
                          onClick={pIChange(index)}
                        />
                      }
                      label="보기섞기"
                    />
                  </>
                }
              >
                {open[index] ? (
                  <ExpandLess onClick={handleClick(index)} />
                ) : (
                  <ExpandMore onClick={handleClick(index)} />
                )}
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                  >
                    <ListItemText>
                      <b>Certification Provider : </b>
                      {value.provider}
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                  >
                    <ListItemText>
                      <b>Updated Date : </b>
                      {value.update_date}
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                  >
                    <ListItemText>
                      <b>출처 : </b>
                      {value.from}
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ paddingTop: 0, paddingBottom: 0 }}
                  >
                    <ListItemText>
                      <b>한국어 번역 문제 / 총 문제 : </b>
                      {value.korean_prbl_cnt} / {value.full_prbl_cnt}
                    </ListItemText>
                  </ListItem>
                  {value.comment !== null && (
                    <ListItem
                      alignItems="flex-start"
                      sx={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                      <ListItemText>
                        <b>비고 : </b>
                        {value.comment}
                      </ListItemText>
                    </ListItem>
                  )}
                </List>
              </Collapse>
              <Divider sx={{ marginTop: 1 }} />
            </div>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default Home;
