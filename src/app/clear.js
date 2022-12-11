const send = document.getElementById('send');

send.addEventListener('click', function handleClick(event) {
  event.preventDefault();

  const msgInput = document.getElementById('msg');

  console.log(msgInput.value);

  msgInput.value = '';
});
