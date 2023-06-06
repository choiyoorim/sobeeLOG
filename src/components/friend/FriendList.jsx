import React, { useState, useEffect } from "react";
import { client } from "../../libs/api";
import './Friend.css'
import { ICProfile } from '../../assets';
import styled from "styled-components";

function FriendList({info}){
    const [userName, setUserName] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const fetchFriendList = async () => {
        try {
            const userID = user.userID; //TODO: 로그인 한 사용자의 아이디를 가져오도록 바꾸기
            const response = await client.get(`/friends/${userID}`);
            const friendList = response.data.data.friendsList;
            const nicknames = friendList.map(friend => friend.nickname);
            setUserName(nicknames);
        } catch (error) {
            console.log(error);
        }};

        fetchFriendList();
    }, []);

    return (
        <div className='grid'>
            <p>친구 목록</p>
            <MyFriendList>
                {userName.map((userNameElem, index) => {
                    return (
                        <div className='myFriends_profile' key = {index}>
                            <ProfileUl><ICProfile/></ProfileUl>
                            <ProfileUl>{userNameElem}</ProfileUl>
                        </div>
                    );
                })}
            </MyFriendList>
        </div>
    );
}

export default FriendList;

const ProfileUl = styled.ul`
    display: flex;
    justify-content: center;
    padding: 1.25rem;
    font-size: 15px;
`;

const MyFriendList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1em;
    margin: 1.25rem;
`;