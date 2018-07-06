const { isMainThread, parentPort, Worker } = require('worker_threads');

if (!isMainThread) {
  parentPort.on('message', ({ a, b, result }) => {
    console.log('WORKER: received request :', a, '+', b);

    setTimeout(() => {
      result[0] = a + b;

      console.log('WORKER: sending result =', a, '+', b);

      Atomics.wake(result, 0, 1);
    }, 1000);
  });
}

module.exports = function add (a, b) {
  const worker = new Worker(__filename);
  const result = new Int32Array(new SharedArrayBuffer(8));

  console.log('MASTER: sending request :', a, '+', b);

  worker.postMessage({ a, b, result });
  Atomics.wait(result, 0, 0);
  worker.terminate();

  console.log('MASTER: received result =', result[0]);

  return result[0];
}
