import { TextField, Box, ListItem, ListItemText, List, ImageListItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import React, { useEffect, useState } from 'react'
import "../css/Search.css";
import axios from 'axios';


export default function Search() {

    const [search, setSearch] = useState("");
    const [searchName, setsearchName] = useState([]);
    const [searchAll, setSearchAll] = useState([]);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        axios.get("/search/search").then((res) => {
            
            setSearchAll(res.data);
            
             //이름 중복 제거
             const searchName = res.data.map(function (val, index) {
                 return val['name'];
             }).filter(function (val, index, arr) {
                 return arr.indexOf(val) === index;
             });
             setsearchName(searchName);
             console.log(searchName);
            

         });   
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

                {searchName.filter((data) => {
                     if (search === "") {
                        return data
                    } else if(data.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    }
                }).map((data,key) => {
                    console.log(data);
                    return (
                        <Box sx={{width: '100%'}} key={key}>
                            <List>
                                <ListItem>
                                    <img className='search-img' src={require('../img/profile1.jpeg')}/>
                                    <ListItemText primary={data}/>
                                </ListItem>
                                {searchAll.map((todos,key) => {
                                    if(data === todos.name) {
                                    return(
                                    <ListItem key={key}>
                                        <ListItemText primary={todos.do_content}/>
                                    </ListItem>
                                    )
                                    }
                                })}
                            </List>
                        </Box>
                    )
                }).filter((data,key,arr) => {
                    return arr.indexOf(data) === key;
                })}
            </React.Fragment>
        </div>
    )
}