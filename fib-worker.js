function fib(n) {
    if (n <= 2) {
        return 1;
    }
    return fib(n - 1) + fib (n - 2);
}

onmessage = function(e) {
    let workerResult = fib(e.data);
    postMessage(workerResult);
}
