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

        socket.on('timeout', () => {
            socket.end();
        });

        socket.on('data', function (data) {
            let message = self.key.decrypt(data, 'utf8');

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