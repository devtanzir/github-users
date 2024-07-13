const getUsername = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const mainContainer = document.querySelector(".main_container") as HTMLElement;

// lets define the contract of an object

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  url: string;
}

// reusable function

async function myCustomFetcher<Data>(
  url: string,
  options?: RequestInit
): Promise<Data> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// function to show user data

const showResult = (singleUser:UserData) => {

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
}

// default function called when page is loaded

function fetchUserData(url: string) {
myCustomFetcher<UserData[]>(url, {}).then((userInfo) => {
    for (const iterator of userInfo) {
        showResult(iterator)
    }
})

}

fetchUserData("https://api.github.com/users");

// add event listener to form submission
formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchItem = getUsername.value.toLocaleLowerCase();

  try {
    const url = "https://api.github.com/users"
   const allUserData = await myCustomFetcher<UserData[]>(url, {})
   const matchingUserData = allUserData.filter((user) => {
    return user.login.toLocaleLowerCase().includes(searchItem)
   })
   mainContainer.innerHTML = ""
   if (matchingUserData.length === 0) {
    mainContainer?.insertAdjacentHTML(
        "beforeend",
        `<p class="empty-msg">No users found with the name "${searchItem}"</p>
        <img src="../asset/Animation - 1720879115018.gif" alt="No data found" />
        `
  
    )
   }else{
    for (const iterator of matchingUserData) {
        showResult(iterator)
    }
   }
  } catch (error) {
    
  }
  
});