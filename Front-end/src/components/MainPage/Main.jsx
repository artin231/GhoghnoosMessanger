import { useEffect } from "react";
import { CenterMainPart, RightMainPart, RightUpDiv, RightLogoImg, ChatList, ItemChatList, RightLogoDiv, ItemChatPic, ItemChatTextTitle, ItemChatTextDiv, ItemChatTextP, CenterInputDiv, CenterInputItem, CenterChatMessageList, CenterChatMessageItemSelf, CenterChatMessageItemUser, CenterChatMessageItem, CenterChatMessageItemSelfTextMain, CenterChatMessageItemSelfTextBelow ,CenterChatMessageItemUserTextMain,CenterChatMessageItemUserTextBelow} from "../../styled_components/StyledMainPage";
import { io } from 'socket.io-client';
import { redirect, useNavigate } from "react-router-dom";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faMessage, faComments, faUsers, faPhone, faBoxArchive, faGear, faSearch, faMicrophone,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

let Main = () => {
    // const socket = io(`http://${window.location.host}`);
    // socket.on('connect',() => {
    //     console.log('connected');
    // })
    // socket.on('disconnect',() => {
    //     console.log('disconnected');
    // })
    // console.log(socket.id);

    // socket.on('chat:message',(message) => {
    //     console.log(message);
    // })
    // let data = {'message':'i am not ali'}
    // socket.emit('chat:message', data)
    let storedName = JSON.parse(sessionStorage.getItem('user'));
    let login = false;
    let navigate = useNavigate();
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/account/profile/', {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                return res.json();
            })
            .then((dt) => {
                console.log(dt);

                if (dt.error === 'You must be logged in.') {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [navigate]);

    return (
        <>
            <div className="holder">
                <CenterMainPart>
                    <CenterChatMessageList>
                        <CenterChatMessageItem>
                            <CenterChatMessageItemSelf>
                                <CenterChatMessageItemSelfTextMain>
                                    شایان واقعا روانیه
                                </CenterChatMessageItemSelfTextMain>
                                <CenterChatMessageItemSelfTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemSelfTextBelow>
                            </CenterChatMessageItemSelf>
                        </CenterChatMessageItem>

                        <CenterChatMessageItem>
                            <CenterChatMessageItemUser>
                                <CenterChatMessageItemUserTextMain>
                                    شایا واقا روانیهinmweofngqegbiqewbgiwfewfefreeeeeeeeeeub2igb4i2ewbfguy4eb2uo4bvtguoy24byg
                                </CenterChatMessageItemUserTextMain>
                                <CenterChatMessageItemUserTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemUserTextBelow>
                            </CenterChatMessageItemUser>
                        </CenterChatMessageItem>

                        <CenterChatMessageItem>
                            <CenterChatMessageItemSelf>
                                <CenterChatMessageItemSelfTextMain>
                                    شایان واقعا روانیه
                                </CenterChatMessageItemSelfTextMain>
                                <CenterChatMessageItemSelfTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemSelfTextBelow>
                            </CenterChatMessageItemSelf>
                        </CenterChatMessageItem>

                        <CenterChatMessageItem>
                            <CenterChatMessageItemSelf>
                                <CenterChatMessageItemSelfTextMain>
                                    شایان واقعا روانیه
                                </CenterChatMessageItemSelfTextMain>
                                <CenterChatMessageItemSelfTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemSelfTextBelow></CenterChatMessageItemSelf>
                        </CenterChatMessageItem>

                        <CenterChatMessageItem>
                            <CenterChatMessageItemUser>
                                <CenterChatMessageItemUserTextMain>
                                    شایان واقعا روانیه
                                </CenterChatMessageItemUserTextMain>
                                <CenterChatMessageItemUserTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemUserTextBelow></CenterChatMessageItemUser>
                        </CenterChatMessageItem>

                        <CenterChatMessageItem>
                            <CenterChatMessageItemSelf>
                                <CenterChatMessageItemSelfTextMain>
                                    شایان واقعا روانیه
                                </CenterChatMessageItemSelfTextMain>
                                <CenterChatMessageItemSelfTextBelow>
                                    ۱۷:۴۵
                                </CenterChatMessageItemSelfTextBelow>
                            </CenterChatMessageItemSelf>
                        </CenterChatMessageItem>

                    </CenterChatMessageList>
                    <CenterInputDiv>
                        <FontAwesomeIcon icon={faPaperPlane} id="inSideInputCenter" />
                        <CenterInputItem type="text" placeholder="پیام خود را بنویسید ..." />
                    </CenterInputDiv>
                </CenterMainPart>
                <RightMainPart>
                    <RightUpDiv>
                        <img className="mainpage_avatar" src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        <RightLogoDiv>
                            <h1 style={{ 'fontSize': '50px' }}>سیمرغ</h1>
                        </RightLogoDiv>

                        <div className="iconHandler">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </RightUpDiv>
                    <ChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>اکبر</ItemChatTextTitle>
                                <ItemChatTextP>اکبر : امروز وضعیت چطوریه gwrgwrgwrgwrgwrg؟ </ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>اصغر</ItemChatTextTitle>
                                <ItemChatTextP> اصغر : داش چرا نیومدیاصعابهثابهضثالهعثضهلاثهضلاذهع؟ </ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>ممد</ItemChatTextTitle>
                                <ItemChatTextP>ممد :  داش زنده ای؟ </ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>آرین</ItemChatTextTitle>
                                <ItemChatTextP>آرین : برو بابا من بهترینم</ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>شایان</ItemChatTextTitle>
                                <ItemChatTextP>شایان :  واقعا آرین بهترینه؟ </ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>نقطه</ItemChatTextTitle>
                                <ItemChatTextP>نقطه : نه کد هام خطاش مضرب ۵ نی</ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>سلام</ItemChatTextTitle>
                                <ItemChatTextP>سلام : خداحافظ</ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>مرتضی</ItemChatTextTitle>
                                <ItemChatTextP>مرتضی : پیام رسان بدی هست</ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>
                        <ItemChatList>

                            <ItemChatTextDiv>

                                <ItemChatTextTitle>ناشناس</ItemChatTextTitle>
                                <ItemChatTextP>ناشناس : غرییبب آشناااا</ItemChatTextP>
                            </ItemChatTextDiv>

                            <ItemChatPic src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </ItemChatList>


                    </ChatList>
                </RightMainPart>
            </div>
        </>
    )

}

export default Main;
