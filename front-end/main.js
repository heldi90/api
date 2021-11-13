const postsList = document.querySelector('.card');
const judul = document.getElementById('exampleInputEmail1');
const subJudul = document.getElementById('exampleInputPassword1');
let output = '';
const addPost = document.querySelector('.add-form');
const btnUpdate = document.querySelector('.cc');
// render post itu seperti READ / membaca data dari database
const renderPost = (posts) => {
  posts.forEach((post) => {
    output += `
    <div class="card d-flex align-items-center" style="width: 18rem;">
    <div class="card-body" data-id="${post.id}">
      <h5 class="card-title">${post.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${post.body}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link" id="edit">edit</a>
      <a href="#" class="card-link" id="hapus">Hapus</a>
    </div>
  </div>
        `;
  });
  postsList.innerHTML = output;
};

const url = 'http://localhost:8000/api/posts';

fetch(url)
  .then((res) => res.json())
  .then((data) => renderPost(data));
// melakukan tambag data
addPost.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: judul.value,
      body: subJudul.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    })
    .then(() => location.reload());
});

// DELETE
postsList.addEventListener('click', (e) => {
  e.preventDefault();

  const delButtonIsPressed = e.target.id === 'hapus';
  const editButtonIsPressed = e.target.id === 'edit';
  const { id } = e.target.parentElement.dataset;
  if (delButtonIsPressed) {
    console.log(`${url}/${id}`);
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())

      .then((data) => console.log(data))
      .then(() => location.reload());
  }

  // memasukan edit
  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    const judulkontent = parent.querySelector('.card-title').textContent;
    const subjudulkontent = parent.querySelector('.card-subtitle').textContent;

    judul.value = judulkontent;
    subJudul.value = subjudulkontent;
  }
});

// melakukan Update
btnUpdate.addEventListener('click', (e) => {
  e.preventDefault();
  const { id } = e.target.parentElement.dataset;
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: judul.value,
      body: subJudul.value,
    }),
  })
    .then((res) => res.json())
    .then(() => location.reload());
});
