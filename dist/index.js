"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main_container");
// reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
// function to show user data
const showResult = (singleUser) => {
    const { login, avatar_url } = singleUser;
    console.log(singleUser);
    mainContainer.insertAdjacentHTML("beforeend", `<div class='card'> 
        <img src=${avatar_url} alt=${login} />
        <hr />
        <div class="card-footer">
          <img src="${avatar_url}" alt="${login}" /> 
          <h3 class="username">${login}</h3>
          <a href="https://github.com/${login}" target="_blank"> Github </a>
        </div>
        </div>
        `);
};
// default function called when page is loaded
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const iterator of userInfo) {
            showResult(iterator);
        }
    });
}
fetchUserData("https://api.github.com/users");
// add event listener to form submission
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchItem = getUsername.value.toLocaleLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUserData = allUserData.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchItem);
        });
        mainContainer.innerHTML = "";
        if (matchingUserData.length === 0) {
            mainContainer?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No users found with the name "${searchItem}"</p>
        <img src="../asset/Animation - 1720879115018.gif" alt="No data found" />
        `);
        }
        else {
            for (const iterator of matchingUserData) {
                showResult(iterator);
            }
        }
    }
    catch (error) {
    }
});
