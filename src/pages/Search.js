import { TextField, Box, ListItem, ListItemText, List } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation} from 'react-router-dom';
import "../css/Search.css";
import axios from 'axios';
import {motion} from 'framer-motion';

export default function Search() {
   
    const navigate = useNavigate();
    const [userId,setUserId] = useState("");
    const [search, setSearch] = useState("");
    const [searchAll, setSearchAll] = useState([]);
    const [searchFilter, setSearchFilter] = useState([]);
    const [todos,setTodos] = useState([]);
 
    const onChange = (e) => {
        setSearch(e.target.value);
    };

    var a=[];

    useEffect(() => {

        axios.get("/isLogged/isLogged").then((res) => {
            var userData = res.data.user[0];
            if (res.status) {
              setUserId(userData.user_id);
            }
          });

        axios.get("/search/search").then((res) => {
            res.data.map((data)=> {
                if(data.do_content != null) {
                    a.push(data);
                    setSearchAll(a);
                }  
            });
            const searchFilter = searchAll.map(function (val, index) {
               return val['email'];
           }).filter(function (val, index, arr) {
               return arr.indexOf(val) === index;
           });
           setSearchFilter(searchFilter);
        });

         axios.get("/search/todos").then((res) => {
            setTodos(res.data);
         });

    }, [searchAll.length]);

    function moveOtherUser(data) {
        const userData = {
            data : data
        }
        axios.post("/user/otherUser", userData).then((res) => {
            navigate("/OtherUser", {
                state: {
                    userId : userId,
                    otherUser : res.data[0].user_id
                }
            })
        });
    };

    return (
        <motion.div className='search-list'
            initial={{ x: window.innerWidth }}
            animate={{ x: 0 }}
            transition={{duration:0.5}}
        >
            <div id="AppBar">
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
                    {searchFilter.filter((data) => {
                        if (search === "") {
                            return data
                        } else if (data.toLowerCase().includes(search.toLowerCase())) {
                            return data
                        }
                    }).map((data, key) => {
                        return (
                            <Box sx={{ width: '100%' }} key={key}>
                                <List>
                                    <ListItem>
                                        <img className='search-img' src={require('../img/profile1.jpeg')} />
                                        <ListItemText primary={data} onClick={() => moveOtherUser(data)} />
                                    </ListItem>
                                    {todos.map((todo, key) => {
                                        if (data === todo.email) {
                                            return (
                                                <ListItem key={key}>
                                                    <ListItemText primary={todo.do_content} />
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
        </motion.div>
    )
}