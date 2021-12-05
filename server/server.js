const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
});

io.on('connection', (socket) => {
    const userUID = socket.handshake.query.id;
    socket.join(userUID);

    socket.on('send-msg', ({ recipients, text }) => {
        recipients.forEach((recipient) => {
            const newRecipient = recipients.filter((r) => r !== recipient);
            newRecipient.push(userUID);
            socket.broadcast.to(recipient).emit('receive-msg', {
                recipients: newRecipient,
                sender: userUID,
                text,
            });
        });
    });
});
