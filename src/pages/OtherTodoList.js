import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'; // 빈
import CheckBoxIcon from '@mui/icons-material/CheckBox'; // 꽉찬
import '../css/OtherUser.css';
import { ListItem, ListItemText, List } from '@mui/material';
import moment from 'moment';

export default function OtherTodoList({followData,cateName,clickDate}) {


  return (
    <div>
      {cateName.map((data,key) => {
        return (
          <Accordion key={key}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography><span><FileCopyIcon fontSize="small"/>{data}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
            {followData.map((todo, key) => {
                  const dbDate = moment(todo.do_date).format("YYYY-MM-DD");
                  if(clickDate===dbDate && data===todo.cate_name) {
                    return(
                      <List key={key}>
                        <ListItem>
                          {todo.do_isDone > 0 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}<ListItemText primary={todo.do_content}/>
                        </ListItem>
                      </List>
                    )
                  }
                })}
            </AccordionDetails>
          </Accordion>
        )
      })}
      
    </div>
  );
}
