import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function AddContact(props) {
    const [addConversation, setAddConversation] = useState([]);

    const addConvCheckbok = (contactUId) => {
        setAddConversation((prev) => {
            if (prev.includes(contactUId)) {
                return prev.filter((prevUID) => {
                    return contactUId !== prevUID;
                });
            } else {
                return [...prev, contactUId];
            }
        });
    };

    const createConversation = (recipients) => {
        props.setConversations((prevConv) => {
            return [
                ...prevConv,
                { recipients, messages: [], conversationID: Math.random() },
            ];
        });
        setAddConversation('');
    };

    return (
        <div>
            {props.addingConversation ? (
                <div className='addingConversation'>
                    <div className='addConvUi'>
                        {props.contacts.map((contact) => (
                            <div className='contactsCheckbox'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='checkedB'
                                            color='primary'
                                            onChange={() => {
                                                addConvCheckbok(contact.UID);
                                            }}
                                        />
                                    }
                                    label={contact.name}
                                />
                            </div>
                        ))}
                        <Button
                            onClick={() => {
                                createConversation(addConversation);
                                props.setAddingConv(false);
                            }}
                            variant='contained'
                            color='primary'
                            className='addConvButton'>
                            Click me{' '}
                        </Button>
                    </div>{' '}
                </div>
            ) : (
                <div>
                    <div
                        className='addConvBtn'
                        onClick={() => {
                            props.setAddingConv(true);
                        }}>
                        Add a conversation
                    </div>
                </div>
            )}
        </div>
    );
}
