let baseUrl = "https://64861ed1a795d24810b7ba35.mockapi.io/api";

const wrapper = document.querySelector(".cards");
let form = document.querySelector(".form");
let input = document.querySelector("input");
const serch = document.querySelector(".search");

/////////////   ADD Mehtod    ///////////

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let info = {
    name: input.value,
  };

  if (input.value) {
    let response = await fetch(`${baseUrl}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(info),
    });
    if (response.status === 201) {
      getData();
      form.reset();
    } else {
      alert(response.statusText);
    }
  } else {
    alert("strokani tuldiring");
  }
});

async function getData() {
  let response = await fetch(`${baseUrl}/users`);
  let data = await response.json();
  // console.log(data[0].name);
  // let url;
  // const name = data[0].name;
  // if (serch.value === data[0].name) {
  //   url = `https://64861ed1a795d24810b7ba35.mockapi.io/api/users&${name}`;
  //   console.log(url);
  // }
  // console.log(serch.value);

  wrapper.innerHTML = "";
  data.reverse().forEach((user) => {
    let userWraper = document.createElement("li");
    let userImg = document.createElement("img");
    let userName = document.createElement("h4");
    let userButtons = document.createElement("div");
    let userDelet = document.createElement("button");
    var userEdit = document.createElement("button");

    //////////  Delete method   //////
    try {
      userDelet.addEventListener("click", async () => {
        let response = await fetch(`${baseUrl}/users/${userName.dataset.id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          getData();
        } else {
          alert(response.statusText);
        }
      });
    } catch (error) {
      console.error(error);
    }
    try {
      userEdit.addEventListener("click", async () => {
        let newUser = {
          name: prompt("isim kiritng"),
        };
        let response = await fetch(`${baseUrl}/users/${userName.dataset.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (response.status === 200) {
          getData();
        } else {
          alert(response.statusText);
        }
      });
    } catch (error) {
      console.log(error);
    }
    const btn = document.querySelector(".btn");
    btn.addEventListener("click", () => {
      getData();
    });
    userName.textContent = user.name;
    userEdit.textContent = "Edit";
    userDelet.textContent = "Delete";
    userName.setAttribute("data-id", user.id);
    userImg.setAttribute("src", user.avatar);

    wrapper.append(userWraper);
    userWraper.append(userImg);
    userWraper.append(userName);
    userWraper.append(userButtons);
    userButtons.append(userEdit);
    userButtons.append(userDelet);
  });
}

getData();
