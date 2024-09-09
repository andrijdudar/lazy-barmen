// Ініціалізація Google API
function start() {
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: '175403963155-qg3ma8d95h6lck440svfkrf4mtm60nb3.apps.googleusercontent.com',
    });
  });
}

// Обробка входу
document.getElementById('signinButton').addEventListener('click', function () {
  auth2.grantOfflineAccess().then(signInCallback);
});

// Обробка виходу
document.getElementById('signoutButton').addEventListener('click', function () {
  auth2.signOut().then(function () {
    console.log('User signed out.');
    document.getElementById('signinButton').style.display = 'block';
    document.getElementById('signoutButton').style.display = 'none';
  });
});

// Обробка результатів входу
function signInCallback(authResult) {
  if (authResult['code']) {
    document.getElementById('signinButton').style.display = 'none';
    document.getElementById('signoutButton').style.display = 'block';
    fetch('https://200a-194-44-160-206.ngrok-free.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: authResult['code']
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.error('Authorization failed');
  }
}
