import React from 'react';

export default function RenderContacts(props) {
    return (
        <>
            {props.contacts.map((contact) => (
                <>
                    <div className='contactBuble'>{contact.name}</div>
                </>
            ))}
        </>
    );
}
