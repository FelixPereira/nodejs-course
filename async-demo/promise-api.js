/*
const p = Promise.reject(new Error('Reason for error'));
p.catch(error => console.log(error))
*/

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 1...');
    resolve(1);
  }, 2000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve(2);
  }, 2000);
});

Promise.race([promise1, promise2])
  .then(res => console.log(res))
  .catch(error => console.log(error.message));