console.log('Before');
getUser(1, displayUser);
console.log('After');

function displayUser(user) {
  console.log('User,', user);
  getRepos(user, displayRepos);
}

function displayRepos(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
};


getUser(1)
  .then(user => getRepos(user.gitHubUsername))
  .then(repos => getCommits(repos))
  .then(commit => console.log(commit))
  .catch(error => console.log(error.message));

// Async and Await
async function func() {
  const promise = await getUser(1);
  console.log('This is the promise', promise);
}

func();


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from the database');
      resolve({ id, gitHubUsername: 'Felix' });
    }, 2000);
  }); 
};

function getRepos(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000);
  })
};

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({desc: 'Commits desc'})
    }, 2000);
  })
};


function getProducts(dataBase, products) {
  return new Promise((resolve, reject) => {
    const products = dataBase.get(products);
    resolve(products);
  })
}

const userData = new Promise((resolve, reject) => {
  setTimeout(() => {{
    // resolve({name: 'Felix', age: 23});
    reject('Mensagen')
  }}, 2000);
});

userData
  .then(data => console.log(data))
  .catch(error => {
    console.log(error);
  })


/* 
USING CALLBACK FUNCTIONS 

function getRepos(userName, callback) {
  setTimeout(() => {
    callback(['repo1', 'repo2', 'repo3'])
  }, 2000);
};

function getCommits(repos, callback) {
  setTimeout(() => {
    callback({desc: 'Commits desc'})
  }, 2000);
}
*/