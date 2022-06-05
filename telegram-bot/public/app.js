const test = document.querySelector('.test');
const form = document.querySelector('form');
const textarea = form.querySelector('textarea');

const onSubmit = (e) => {
  e.preventDefault();
  const pushMessage = textarea.value;

  fetch(`/push?msg=${pushMessage}`);
  textarea.value = '';
};

form.addEventListener('submit', onSubmit);

const fetchData = () =>
  fetch('/test')
    .then((res) => res.json())
    .then((data) => {
      const usersInfo = data.data;

      document.querySelectorAll('div').forEach((each) => each.remove());

      const user = document.createElement('div');

      user.innerHTML = usersInfo.map(({ userId, messages }) => {
        return `<h2>UserId: ${userId}</h2>
        <h3>Messages:</h3>
        <ul>          
          ${messages.map((msg) => `<li>${msg}</li>`)}
        </ul>
        <button onclick="fetch('/reset?userId=${userId}')">Reset</button>
      `;
      });

      document.body.insertBefore(user, test);
    });

fetchData();
// setInterval(fetchData, 6000);
//
