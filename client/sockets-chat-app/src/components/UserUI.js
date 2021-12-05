import React from 'react';
import AddConversation from './AddConversation';
import { useState, useEffect, useCallback } from 'react';
import AddContact from './AddContact';
import useLocalStorageHook from '../storage/useLocalStorageHook';
import RenderConversations from './RenderConversations';
import RenderContacts from './RenderContacts';
import UserChats from './UserChats';

export default function UserUI(props) {
    const [activeButton, setAcctiveButton] = useState({
        conv: { active: false },
        friends: { active: false },
    });
    const [addingContact, setAddingContact] = useState(false);
    const [addingConversation, setAddingConv] = useState(false);
    const [activeConv, setActiveConv] = useState(null);
    const [contacts, setContacts] = useLocalStorageHook('contacts', []);
    const [conversations, setConversations] = useLocalStorageHook(
        'conversations',
        []
    );

    const addMsgToConversation = useCallback(
        ({ recipients, text, sender }) => {
            setConversations((prevConv) => {
                let madeChange = false;
                const newMsg = { sender, text };
                const newConversations = prevConv.map((conv) => {
                    console.log(conv);
                    if (arrayEquality(conv.recipients, recipients)) {
                        madeChange = true;

                        return {
                            ...conv,
                            messages: [...conv.messages, newMsg],
                        };
                    }

                    return conv;
                });

                if (madeChange) {
                    return newConversations;
                } else {
                    return [...prevConv, { recipients, messages: [newMsg] }];
                }
            });
            setActiveConv((prevState) => ({
                ...prevState,
                messages: [
                    ...prevState.messages,
                    {
                        sender: sender,
                        text: text,
                    },
                ],
            }));
        },
        [setConversations]
    );

    useEffect(() => {
        if (props.socket == null) return;

        props.socket.on('receive-msg', addMsgToConversation);

        return () => props.socket.off('receive-msg');
    }, [props.socket, addMsgToConversation]);

    const sendMsg = (recipients, text) => {
        props.socket.emit('send-msg', { recipients, text });

        addMsgToConversation({ recipients, text, sender: props.uid });
    };

    return (
        <>
            <div className='userPage'>
                <div className='leftDetailsPart'>
                    <div className='navBar'>
                        <div className='buttons'>
                            <button
                                className={
                                    activeButton.conv.active
                                        ? 'convFriendsACTIVEbtn'
                                        : 'convFriendsBtns'
                                }
                                onClick={() => {
                                    setAcctiveButton({
                                        friends: { active: false },
                                        conv: { active: true },
                                    });
                                }}>
                                Conversations
                            </button>
                            <button
                                className={
                                    activeButton.friends.active
                                        ? 'convFriendsACTIVEbtn'
                                        : 'convFriendsBtns'
                                }
                                onClick={() => {
                                    setAcctiveButton({
                                        friends: { active: true },
                                        conv: { active: false },
                                    });
                                }}>
                                Friends
                            </button>
                        </div>
                        <div className='conversationsOrFriends'>
                            {activeButton.conv.active ? (
                                <RenderConversations
                                    conversations={conversations}
                                    setActiveConv={setActiveConv}
                                    activeConv={activeConv}
                                    contacts={contacts}
                                />
                            ) : (
                                <RenderContacts contacts={contacts} />
                            )}
                        </div>
                        <div className='navBarFooter'>
                            {' '}
                            <div className='userUID'>Your id: {props.uid} </div>
                            {activeButton.conv.active ? (
                                <AddConversation
                                    addingConversation={addingConversation}
                                    setAddingConv={setAddingConv}
                                    contacts={contacts}
                                    setConversations={setConversations}
                                />
                            ) : (
                                <AddContact
                                    addingContact={addingContact}
                                    setAddingContact={setAddingContact}
                                    contacts={contacts}
                                    setContacts={setContacts}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='userConversation'>
                    <UserChats
                        conversations={conversations}
                        activeConv={activeConv}
                        setActiveConv={setActiveConv}
                        sendMsg={sendMsg}
                        uid={props.uid}
                        contacts={contacts}
                    />
                </div>
            </div>
        </>
    );
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    });
}
