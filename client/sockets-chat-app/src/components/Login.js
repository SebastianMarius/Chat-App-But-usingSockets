import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { uid } from 'uid';

export default function Login(props) {
    let inputValue;

    const createNewUser = () => {
        props.userID(uid());
    };

    return (
        <div className='loginPg'>
            <Input
                onChange={(e) => {
                    inputValue = e.target.value;
                    console.log(inputValue);
                }}
                placeholder='Enter your id'
                inputProps={{ 'aria-label': 'description' }}
            />

            <div className='buttonsLogin'>
                <Button
                    onClick={() => {
                        props.userID(inputValue);
                    }}
                    variant='contained'
                    color='primary'
                    href='#contained-buttons'>
                    Login
                </Button>

                <Button variant='contained' onClick={createNewUser}>
                    Create a new id
                </Button>
            </div>
        </div>
    );
}
