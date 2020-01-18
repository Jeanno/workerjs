function fib(n) {
    if (n <= 2) {
        return 1;
    }
    return fib(n - 1) + fib (n - 2);
}

function testSingleMainThread() {
    console.time("Single");
    for (let i = 0; i < 10; i++) {
        console.log(fib(40));
    }
    console.timeEnd("Single");
}

function testMultiWorker() {
    let workers = [];
    let numWorkerRunning = 0;
    for (let i = 0; i < 10; i++) {
        const newWorker = new Worker('fib-worker.js');
        newWorker.onmessage = function(e) {
            console.log(e.data);
            numWorkerRunning--;
            if (numWorkerRunning === 0) {
                console.timeEnd("Multi");
            }
        };
        workers.push(newWorker);
    }
    console.time("Multi");
    for (let i = 0; i < 10; i++) {
        numWorkerRunning++;
        workers[i].postMessage(40);
    }
}

var _consoleLog = console.log;

console.log = function() {
    _consoleLog.apply(null, arguments);
    // Append to TextArea Output
    const outputTextArea = document.getElementById("output");
    const newRow = document.createTextNode(Array.prototype.join.call(arguments, " ") + "\n");
    outputTextArea.appendChild(newRow);
    outputTextArea.scrollTop = 999999;
}

window.onload = function() {
    testSingleMainThread();
    testMultiWorker();
};

