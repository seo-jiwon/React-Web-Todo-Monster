import { TextField, Box, ListItem, ListItemText, List, ImageListItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import React, { useState } from 'react'
import "../css/Search.css";


/**
 * 테스트 data
 */
const userTest = [
    {
        "id":"1",
        "name":"test",
        "category":"카테고리",
        "todos":"할일1",
    },
    {
        "id":"2",
        "name":"test2",
        "category":"카테고리2",
        "todos":"할일2",
    },
    {
        "id":"3",
        "name":"test3",
        "category":"카테고리3",
        "todos":"할일3",
    },
]


export default function Search() {

    const [search, setSearch] = useState("");

    const onChange = (e) => {
        setSearch(e.target.value);
    };

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
                  {/**
                   * 나중에 조회 목록 컴포넌트 따로 만들어서
                   * 조회한 목록.length > 0 ? 목록 없음 표시 할 수 있으면 하기
                   */}
            <React.Fragment>
                {userTest.filter((data) => {
                    if (search == "") {
                        return data
                    } else if(data.name.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    } else if(data.todos.toLowerCase().includes(search.toLowerCase())) {
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
                                {/*
                                 * 다시 map 으로 돌리기
                                 * 조회 시 불러오는 todolist들의 기준이 애매하므로
                                 * 최근 할 일의 등록 날짜를 조회해서 뽑을까?
                                */}
                                <ListItem>
                                    <ListItemText primary={data.todos}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={data.todos}/>
                                </ListItem>
                            </List>
                        </Box>
                    )
                })}
            </React.Fragment>
        </div>
    )
}