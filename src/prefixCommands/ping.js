module.exports = {
  name: 'ping',
  description: 'Ping! Checks bot latency.',
  execute(message) {
    message.channel.send('Pinging...').then(sent => {
      const latency = sent.createdTimestamp - message.createdTimestamp;
      sent.edit(`Pong! Latency: ${latency}ms. API Latency: ${Math.round(message.client.ws.ping)}ms`);
    });
  },
}; 