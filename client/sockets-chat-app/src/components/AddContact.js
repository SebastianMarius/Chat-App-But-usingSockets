import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function AddContact(props) {
    const [addContact, setAddContact] = useState({
        UID: null,
        name: null,
    });

    const addAcontact = () => {
        props.setContacts((prevCont) => {
            return [...prevCont, addContact];
        });
    };

    console.log('addcontact');
    return (
        <div>
            {props.addingContact ? (
                <div className='addContactFile' onClick={() => {}}>
                    {' '}
                    <div className='addContactUI'>
                        <TextField
                            className='text'
                            id='outlined-basic'
                            label='UID'
                            variant='outlined'
                            onChange={(e) => {
                                setAddContact({
                                    ...addContact,
                                    UID: e.target.value,
                                });
                            }}
                        />
                        <TextField
                            onChange={(e) => {
                                setAddContact({
                                    ...addContact,
                                    name: e.target.value,
                                });
                            }}
                            className='text'
                            id='outlined-basic'
                            label='NAME'
                            variant='outlined'
                            style={{ marginTop: '30px' }}
                        />
                        <Button
                            onClick={() => {
                                addAcontact();
                                props.setAddingContact(false);
                            }}
                            variant='contained'
                            color='primary'
                            style={{ marginTop: '30px' }}>
                            Add contact
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className='addConvBtn'
                    onClick={() => {
                        props.setAddingContact(true);
                    }}>
                    Add contact
                </div>
            )}
        </div>
    );
}
