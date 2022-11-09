import { TextField, Box, ListItem, ListItemText, List, ImageListItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import React, { useEffect, useState } from 'react'
import "../css/Search.css";
import axios from 'axios';


export default function Search() {

    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState([]);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/search/search").then((res) => {
            setSearchUser(res.data);
        })        
    }, []);
    

    return (
        <div className='search-list'>
            <TextField className='search-bar' id="filled-basic" variant="outlined" fullWidth
                        type='text' size='small' placeholder='할 일 키워드 또는 ID를 검색해주세요'
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
                {searchUser.filter((data) => {
                    if (search == "") {
                        return data
                    } else if(data.name.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    }
                }).map((data,key) => {
                    return (
                        <Box sx={{width: '100%'}} key={key}>
                            <List>
                                <ListItem>
                                    <img className='search-img' src={require('../img/profile1.jpeg')}/>
                                    <ListItemText primary={data.name}/>
                                </ListItem>
                            </List>
                        </Box>
                    )
                })}
            </React.Fragment>
        </div>
    )
}