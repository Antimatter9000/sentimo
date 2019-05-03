const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        const data = JSON.parse(message);
        console.log(data.action);
        if (data.action === 'userUpdated') {
            console.log('better send an update');
            broadcast(JSON.stringify({
                action: 'update',
                data: data.data
            }));
        }
    });

    ws.send('something');
});