import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import RenderMessages from '../components/RenderMessages';
import SendIcon from '@mui/icons-material/Send';

export default function UserChats(props) {
    const [text, setText] = useState();
    const [activeConvUpdate, setActiveConvUpdate] = useState([]);

    useEffect(() => {
        console.log(JSON.stringify(props.activeConv) + ' aaaaaa' + props.uid);
    }, [props.activeConv]);

    const handleSubmit = () => {
        setActiveConvUpdate(props.activeConv);
        props.sendMsg(
            props.activeConv.recipients.map((r) => r),
            text
        );
        setText('');

        console.log(props.activeConv);
        console.log(activeConvUpdate + '  active');
    };

    return (
        <>
            <div className='revinLater'>
                {' '}
                {props.activeConv ? (
                    <>
                        <RenderMessages
                            activeConv={props.activeConv}
                            uid={props.uid}
                            contact={props.contacts}
                        />

                        <div className='msgInput'>
                            <form className='field'>
                                <div class='outlined-input'>
                                    <input
                                        type='text'
                                        name='test'
                                        placeholder='Write here...'
                                        value={text}
                                        onChange={(e) => {
                                            setText(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit();
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {/* <label for='test'>First name</label> */}
                                </div>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit}>
                                    <SendIcon />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}
