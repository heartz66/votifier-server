[![npm version](https://img.shields.io/npm/v/votifier-server.svg)](https://npmjs.com/package/votifier-server)
[![npm downloads](https://img.shields.io/npm/dm/votifier-server.svg)](https://npmjs.com/package/votifier-server)
[![dependencies Status](https://david-dm.org/Heartz66/votifier-server/status.svg)](https://david-dm.org/Heartz66/votifier-server)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# votifier-server
`votifier-server` is a Node.js module that emulates a Bukkit Votifier server.

# Documentation
### Constructor(privateKey[, port])
- `privateKey` - Private key of the public key used on voting websites.
- `port` - Default 8192 if omitted.

# Events

### vote
- `username` - Minecraft username used for voting
- `server` - Voting website used
- `ip` - Voters IP address
- `date` - Date of vote

Emitted when you successfully received a Votifier vote.

### error
- `err` - An `Error` object

Emitted when an error occurs. If this event isn't handled, the program will crash.

**Example:**

```js
let VotifierServer = require('votifier-server');

let votifier = new VotifierServer('MIIEpAIBAAKCAQEAyOewHlkQKClCGBcrgI26VXoamOj9ju6NAZixelkzDZiPlP1X\n' +
    'TUqfqnI72HAcEIzpe9GV1V2yB0Ystw3JJda8I9+TKmTFmYdgPrA0JZmdHMUmtUT9\n' +
    'WcfeEXNa3LQq7YTXjnzn+VcUDT/+qdrvTiscLm6cyu0dMy5dkb2qp4mV5MBZBoJ+\n' +
    'rlnB0k4BAYohA5UcRzXGBKe/mI0tXxA1SZqBTbUWotTT7m30Xe7VlxDwcXaKsy5F\n' +
    '8MpAehVtr048NQ49O/Klg0D/YYZ+G1TA66fBcMiAUl6SfyI7ckUotE0KPNBlqRgR\n' +
    'IHyWasMbkPULicYjHne9jiORBKnLqy7CVTR/awIDAQABAoIBAGEf+PnC7terkoNY\n' +
    '+DPu0I0wOZmA0cv+sXZ7Hhna8554CbnqfAEmuWfKT/pDwJ2TsfClEv2SjVWM7GMW\n' +
    'rA658Dybgmb1Tr35P2MvBhbDW7wj56Gsl5qG0Gm5Tczy4Onw1dDRu8fD/DKnpHLz\n' +
    'H8u3dalQ2kYUOZCbsqqZed4C2s85/l6KrVGOL+jrs4eoLh3/gWyTl8QGaJUTzrEe\n' +
    'MuExTOy6I8yZ9hoAdNeiAu7HiQ996o9cVMxCKGntnJtw+gfyXAo4Opbrc3ANt+YV\n' +
    '1eBZKqrWP0s681RLVNTYBfscLHhVndRiorJ+xHexx0BlNp3LQOSNQLORS11t5c4v\n' +
    '16X3GeECgYEA8TQkpYwtwB/HRxfNFIpmUkUUjYUoBy7JrK6Y2F13s4+SHuVIla32\n' +
    'UfX7HG/fHMMSUleADy4rCL7zxRkg14mLfrQBWizdixACggYqyTidM6CRQAoX+FR9\n' +
    'q+qmO5PVLtbdpDx+xvcoQYPrSu4BlXCNwi+MrDRh+HvDF4FBQJHHIJECgYEA1Tqy\n' +
    'G6WCSBTtnSUrZlJvFi+xaAMEMBEKql3lrgjoU9Sv/hfqvd5KUJAFrCuP6YV3XIGJ\n' +
    'UbPR1W/CuMdS0PFyy1uCGzpJKLWaD0xxEG5P4W8FjLlIAv69FSPTS2EjvTUDy4hG\n' +
    '+kXjfG8DlcOQ/3FqOhonQxWwoulqSQ3WF54PHjsCgYBBDSoRB9RS638oOlASCR19\n' +
    'dKoNXOslvMWhb9lDCTo+UCs9b+L6k1dKVYfq7HUE4ctwL68W6QGsMyu1bYiA+NSJ\n' +
    'UGzI8C6z0ZaLkLQ7Xqxu/xANcGt0ivz1v6wjh0RIhKR0JeifKotN2BE+PSBqOFfT\n' +
    'FlXfH6WIiYBdN3vsuSQ2MQKBgQDS61OhC0/a83CzoD/U4DfoT1cCVvF+hmzxZx45\n' +
    'z6/YtKs+AfR+yfLizAQAcbrSOOaAB9aIjgJDSWDpHKmr6xotVCBXxIj3juOMvIWe\n' +
    'xi+YBBUORXyZEdiBn8Vza+xJTbaqTuw+xoEm5j06mI/GTi7QuGwb7Mmj7JXpG5mq\n' +
    'FPxJXwKBgQDpE2eQoBVy0YDYXI+swFw9Zp5O0Zzir8XZ81codvkeeQF/a1YE+EPV\n' +
    'HTLd5sYBpzzGQ6pKgWVbaiSjwSgiZCI7giICNEtmwC22v5EK7DGFNhqDPljRbu8V\n' +
    'Sz1qo9K+KAzwvbu13jnMH3drkfPiOsKea0vrV3ZG9JMoIRRUSkQE+Q==');

votifier.on('vote', function (username, server, ip, date) {
    console.log(username);
    console.log(server);
    console.log(ip);
    console.log(date);
});

votifier.on('error', function (err) {
    console.error(err);
});