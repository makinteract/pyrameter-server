import { Server, Socket } from 'socket.io';
import { parseCode } from './parser';

const PORT = 3000;

const io = new Server(PORT, { cors: { origin: '*' } });
console.info(`listening on port ${PORT}`);

io.on('connection', function (socket) {
  emitInfo(socket, 'Client connected to server');
  console.log('connected');

  // On disconnect
  socket.on(
    'parseCode',
    ({ sourceCode, language }: { sourceCode: string; language: string }) => {
      console.log(sourceCode, language);
      const matches = parseCode(sourceCode);
      socket.emit('parse', matches);
    }
  );
});

// Helpers

function emitError(socket: Socket, message: unknown) {
  const m = {
    message,
    success: false,
  };
  socket.emit('error', m);
  console.error('error:', m);
}

function emitInfo(socket: Socket, message: unknown, others: {} = {}) {
  const m = {
    message,
    success: true,
    ...others,
  };
  socket.emit('info', m);
  console.info('info:', m);
}
