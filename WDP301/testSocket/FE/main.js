let socket;

const el = (id) => document.getElementById(id);
const log = (text, who = 'info') => {
  const div = document.createElement('div');
  div.className = 'msg';
  const t = new Date().toLocaleTimeString();
  div.innerHTML = `<time>[${t}]</time><span class="who">${who}:</span> ${text}`;
  const container = el('log');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
};

const setConnected = (connected) => {
  el('btnConnect').disabled = connected;
  el('btnDisconnect').disabled = !connected;
  el('btnSend').disabled = !connected;
};

el('btnConnect').addEventListener('click', () => {
  const url = el('serverUrl').value.trim();
  if (!url) return;
  if (socket && socket.connected) return;

  log(`Connecting to ${url} ...`);
  socket = io(url, { transports: ['websocket', 'polling'] });

  socket.on('connect', () => {
    log(`Connected with id ${socket.id}`, 'client');
    setConnected(true);
  });

  socket.on('disconnect', (reason) => {
    log(`Disconnected: ${reason}`, 'client');
    setConnected(false);
  });

  socket.on('connect_error', (err) => {
    log(`Connect error: ${err.message}`, 'error');
  });

  socket.on('server_message', (payload) => {
    const text = typeof payload === 'string' ? payload : payload.text;
    log(text, 'server');
  });

  socket.on('chat_message', (payload) => {
    log(`${payload.id}: ${payload.text}`, 'chat');
  });

  socket.on('server_time', (payload) => {
    const t = new Date(payload.ts).toLocaleTimeString();
    log(`Server time: ${t}`, 'tick');
  });
});

el('btnDisconnect').addEventListener('click', () => {
  if (socket) socket.disconnect();
});

const send = () => {
  const msg = el('msg').value.trim();
  if (!msg || !socket || !socket.connected) return;
  socket.emit('chat_message', msg);
  el('msg').value = '';
};

el('btnSend').addEventListener('click', send);
el('msg').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    send();
  }
});
