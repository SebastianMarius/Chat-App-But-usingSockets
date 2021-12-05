import React, { useEffect, useState } from 'react';

export default function RenderMessages(props) {
    var friendExist = false;
    return (
        <>
            <div className='chatConv'>
                {props.activeConv.messages.map((conv) =>
                    props.uid === conv.sender ? (
                        <>
                            <div className='myMessage'>
                                <div className='userUIDdisplay'>You:</div>
                                <div className='userMessage'>{conv.text}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='theyMsg'>
                                <div className='receiveMsgUid'>
                                    {props.contact.map((contact) => {
                                        if (contact.UID === conv.sender) {
                                            friendExist = true;
                                            return contact.name;
                                        }
                                    })}
                                </div>
                                <div className='receiveMsg'>{conv.text}</div>
                            </div>
                        </>
                    )
                )}
            </div>
        </>
    );
}
