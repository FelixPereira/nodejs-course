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

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from the database');
    callback({ id, gitHubUsername: 'Felix' });
  }, 2000);
};

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