
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});


// Async 
async function getCus() {
  try{
    const user = await getCustomer();
    const topMovies = await getTopMovies();
    const send = await sendEmail();
    
    console.log('Customer', user);
    if(user.isGold) {
      console.log('Top movies', topMovies);
      console.log(send);
    } else {
      console.log('Is not gold');
    }
  } catch(error) {
    console.log(error.message);
  }
}

getCus();


function getCustomer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);
  })  
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Email sent...');
    }, 4000);
  })
}