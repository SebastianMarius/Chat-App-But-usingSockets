import React from 'react';

export default function RenderConversations(props) {
    var checkIfReturn = false;

    return (
        <>
            {props.conversations.map((conv, index) => (
                <>
                    <div
                        className={
                            JSON.stringify(props.activeConv) ==
                            JSON.stringify(conv)
                                ? 'activeConv'
                                : 'unactiveConv'
                        }
                        key={index}
                        onClick={() => {
                            props.setActiveConv(conv);
                        }}>
                        {conv.recipients.map((r) => {
                            return props.contacts.map((contact) => {
                                if (contact.UID === r) {
                                    checkIfReturn = true;
                                    return contact.name;
                                }
                            });
                        })}

                        {checkIfReturn ? (
                            <div></div>
                        ) : (
                            <div>{conv.recipients}</div>
                        )}
                    </div>
                </>
            ))}
        </>
    );
}
