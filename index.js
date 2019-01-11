let NodeRSA = require('node-rsa');
let net = require('net');

require('util').inherits(VotifierServer, require('events').EventEmitter);

function VotifierServer(privateKey, port) {
    let self = this;

    this.key = new NodeRSA(privateKey, 'pkcs1-private-pem', {
        encryptionScheme: 'pkcs1'
    });

    this.server = net.createServer();

    this.server.on('connection', function (socket) {
        socket.setTimeout(5000);

        socket.on('error', function (err) {
            self.emit('error', err);
        });

        socket.on('timeout', function () {
            socket.end();
        });

        socket.on('data', function (data) {
            if (data.length !== 256) {
                self.emit('error', new Error('Invalid length.'));
                socket.end('Invalid length.');
                socket.destroy();
            }

            let message;

            try {
                message = self.key.decrypt(data, 'utf8');
            } catch (err) {
                self.emit('error', err);
                socket.end('Received invalid message.');
                socket.destroy();
            }

            message = message.split('\n');

            if (message[0] !== 'VOTE') {
                self.emit('error', err);
                socket.end('Received invalid message.');
                socket.destroy();
            }

            self.emit('vote', message[2], message[1], message[3], new Date(message[4]));
            socket.end();
            socket.destroy();
        });

        socket.write('VOTIFIER 1.9\n');
    });

    this.server.listen(port || 8192);
}

module.exports = VotifierServer;