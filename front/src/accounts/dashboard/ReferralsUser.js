import React, { useEffect, useState } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const ReferralsUser = () => {
    const [friends, setFriends] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchFriedns(page);
    }, [page]);

    const fetchFriedns = async (page) => { //get the posts saved by the user
        const response = await axios.get(`http://127.0.0.1/api/accounts/referrals-user/?page=${page}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
        const data = response.data;
        setFriends((prevFriends) => [...prevFriends, ...data.results]);
        if(data.next === null) {
            setHasMore(false);
        }
    };

    return (
        <div className="content-bar flex flex-column">
            <div className="flex space-between">
                <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">groups</span>&nbsp;دوستان</h3>
            </div>                         

            <div className="line-horizontal-gold"></div>

            <div className="control-height">  
                {friends.length > 0 ? <>
                    <InfiniteScroll
                    dataLength={friends.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={""}
                    >
                        {friends.map((friends)=>(
                            
                            <div className="flex flex-row saved-post-card">
                                <div className="flex space-between padding-15 width-full align-center">
                                        <div className="flex flex-row align-center">
                                            <img src={friends.sub.image ? (friends.sub.image) : (`${process.env.PUBLIC_URL + "/static/images/icon/user.png"}`)} className="img-friend"></img>
                                            <h4 className="color-dark-blue margin-less margin-right-5">{friends.sub.first_name !== "" ? (`${friends.sub.first_name} ${friends.sub.last_name}`) : (friends.sub.username)}</h4>
                                        </div>
                                    <h4 className="margin-less color-light-blue-sky flex align-center"><span class="material-symbols-outlined color-gold">trophy</span>&nbsp;{friends.sub.score}</h4>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>    
                    </> : (<p className="flex flex-row align-center  padding-15 info-card rounded justify-content-center">
                        <img src={process.env.PUBLIC_URL + "/static/images/icon/sad.png"} width="40" />لیست دوستان شما خالی می باشد!</p>)
                }
            </div>
        </div>
    );
}

export default ReferralsUser;