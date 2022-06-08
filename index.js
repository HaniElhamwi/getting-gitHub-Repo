let inputValue = document.querySelector(".repo-container input");
let buttoni = document.querySelector(".get-button");
let showData = document.querySelector(".show-data");
let rotate = document.getElementById("rotate");
console.log(rotate);

buttoni.onclick = function () {
  showData.innerHTML = "";
  getRepo();
};
console.log(showData);
function getRepo() {
  //   console.log("hani is the best");

  if (inputValue.value === "") {
    showData.innerHTML = "<span>please whrite gitHub userName </span>";
  } else {
    rotate.classList.add("cycle");
    fetch(`https://api.github.com/users/${inputValue.value}/repos`)
      .then((result) => {
        if (result.status == 404) {
          alert("user name is false");
        }
        let repos = result.json();
        return repos;
      })
      .then((reposetry) => {
        rotate.classList.remove("cycle");
        console.log(reposetry);
        for (let i = 0; i < reposetry.length; i++) {
          console.log(reposetry[i].clone_url);
          let newDiv = document.createElement("div");
          let nameDiv = document.createElement("div");
          let fatherDiv = document.createElement("div");

          let divLink = document.createElement("a");
          let starts = document.createElement("span");

          divLink.innerHTML = `<a href=${reposetry[i].clone_url}>visit</a>`;
          let textStars = document.createTextNode(
            `Stars  ${reposetry[i].stargazers_count}`
          );

          starts.appendChild(textStars);
          nameDiv.innerHTML = reposetry[i].name;
          newDiv.appendChild(divLink);
          newDiv.appendChild(starts);
          newDiv.classList.add("newDiv");
          fatherDiv.classList.add("fDiv");
          fatherDiv.appendChild(nameDiv);
          fatherDiv.appendChild(newDiv);

          showData.appendChild(fatherDiv);
          //   showData.appendChild(nameDiv);
        }
      })
      .catch(function (err) {
        alert("Fetch Error : ", err);
      });
  }
}

inputValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttoni.click();
  }
});
window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttoni.click();
    // console.log("hani");
  }
});
