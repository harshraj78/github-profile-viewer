// Function to fetch and display GitHub profile information
function fetchProfile() {
  const username = document.getElementById('usernameInput').value.trim();
  const profileElement = document.getElementById('profile');
  profileElement.innerHTML = '';

  if (username !== '') {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        if (data.message && data.message === 'Not Found') {
          profileElement.textContent = 'User not found.';
        } else {
          const avatar = document.createElement('img');
          avatar.src = data.avatar_url;
          avatar.alt = 'Profile Picture';
          profileElement.appendChild(avatar);

          const username = document.createElement('p');
          username.textContent = `Username: ${data.login}`;
          profileElement.appendChild(username);

          const name = document.createElement('p');
          name.textContent = `Name: ${data.name || 'N/A'}`;
          profileElement.appendChild(name);

          const bio = document.createElement('p');
          bio.textContent = `Bio: ${data.bio || 'N/A'}`;
          profileElement.appendChild(bio);

          const profileLink = document.createElement('a');
          profileLink.href = data.html_url;
          profileLink.textContent = 'View Profile on GitHub';
          profileElement.appendChild(profileLink);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        profileElement.textContent = 'An error occurred while fetching the profile.';
      });
  }
}
