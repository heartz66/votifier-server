let NodeRSA = require('node-rsa');
let net = require('net');

require('util').inherits(VotifierServer, require('events').EventEmitter);

function VotifierServer(privateKey, port) {
    let self = this;

    this.key = new NodeRSA(privateKey, 'pkcs1-private-pem', {
        encryptionScheme: 'pkcs1'
    });

    this.server = net.createServer();

    this.server.on('connection', (socket) => {
        socket.setTimeout(5000);

        socket.on('error', function (err) {
            self.emit('error', err);
        });

        socket.on('timeout', function () {
            socket.end();
        });

        socket.on('data', function (data) {
            let message;

            try {
                message = self.key.decrypt(data, 'utf8');
            } catch (err) {
                self.emit('error', err);
            }

            message = message.split('\n');

            if (message[0] !== 'VOTE') {
                self.emit('error', new Error('Received invalid message.'));
            }

            self.emit('vote', message[2], message[1], message[3], new Date(message[4]));

            socket.end();
        });

        socket.write('VOTIFIER 1.9\n');
    });

    this.server.listen(port || 8192);
}

module.exports = VotifierServer;