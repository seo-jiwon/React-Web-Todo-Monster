import * as React from 'react';
import {useEffect,useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { ListItemText,List,ListItem } from '@mui/material';
import { useNavigate} from 'react-router-dom';

export default function LabTabs(follow) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  
  const userId = follow.follow.userId;
  const follower = follow.follow.followerList;
  const following = follow.follow.followingList;
  const isFollowList = true;
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const data = {
      userId:userId
    }
    
    axios.post("/follow/followingList" , data).then((res) => {
      setFollowingList(res.data);
    });
    axios.post("/follow/followerList" , data).then((res) => {
      setFollowerList(res.data);
    });
  },[userId]);

  function moveOtherUser(data) {
    navigate("/OtherUser", {
         state: {
            userId : userId,
            otherUser : data,
            isFollowList : isFollowList
        }
    })
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} TabIndicatorProps={{sx:{backgroundColor : 'black', height : 2}}}>
            <Tab sx={{ width: '50%' }} label={<span style={{ color: 'black' }}>{follower} 팔로워</span>} value="1" />
            <Tab sx={{ width: '50%' }} label={<span style={{ color: 'black' }}>{following} 팔로잉</span>} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {followerList.map((data,key) => {
            return (
              <List key={key}>
                <ListItem>
                <img className='search-img' src={require('../img/profile1.jpeg')} />
                  <ListItemText primary={data.email} onClick={() => moveOtherUser(data.user_id)}/>
                </ListItem>
              </List>
            )
          })}
        </TabPanel>
        <TabPanel value="2">
          {followingList.map((data,key) => {
              return (
                <List key={key}>
                  <ListItem>
                  <img className='search-img' src={require('../img/profile1.jpeg')} />
                    <ListItemText primary={data.email} onClick={() => moveOtherUser(data.user_id)}/>
                  </ListItem>
                </List>
              )
            })}
        </TabPanel>
      </TabContext>
    </Box>
  );
}