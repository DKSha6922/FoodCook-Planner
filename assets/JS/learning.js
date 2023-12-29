const formEl = document.forms.feedback


const handleSubmit = event => {
  event.preventDefault();

  const formData = new FormData(formEl);
  alert("Thank You For FeedBack!");
}

formEl.addEventListener('submit', handleSubmit)

