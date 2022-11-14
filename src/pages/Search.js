import { TextField, Box, ListItem, ListItemText, List } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import "../css/Search.css";
import axios from 'axios';


export default function Search() {
   
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchAll, setSearchAll] = useState([]);
    const [todos,setTodos] = useState([]);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        axios.get("/search/search").then((res) => {
            const newArray = [...new Set(res.data.map(JSON.stringify))].map(JSON.parse);
            setSearchAll(newArray) 
         });

         axios.get("/search/todos").then((res) => {
            setTodos(res.data);
         });

    }, []);


    function moveOtherUser(data) {
        navigate("/OtherUser", {
             state: {
                otherUser : data
            }
        })
    }

    return (
        <div className='search-list'>
             <button
                    id="backBtn"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    {"<"}
                </button>
            <TextField className='search-bar' id="filled-basic" variant="outlined"
                        type='text' size='small' placeholder='email을 검색해주세요'
                        value={search} onChange={onChange} 
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                  />
            <React.Fragment>
                {searchAll.filter((data) => {
                    if (search === "") {
                        return data
                    } else if(data.email.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    }
                }).map((data,key) => {
                    return (
                        <Box sx={{width: '100%'}} key={key}>
                            <List>
                                <ListItem>
                                    <img className='search-img' src={require('../img/profile1.jpeg')}/>
                                    <ListItemText primary={data.email} onClick={() => moveOtherUser(data.user_id)}/>
                                </ListItem>
                                {todos.map((todo,key) => {
                                    if(data.user_id===todo.user_id) {
                                        return (
                                            <ListItem key={key}>
                                                <ListItemText primary={todo.do_content}/>
                                            </ListItem>
                                        )
                                    }
                                })}
                            </List>
                        </Box>
                    )
                })}
            </React.Fragment>
        </div>
    )
}