const signup = document.querySelector(".signup");
const login = document.querySelector(".login");
const newJob = document.querySelector(".new-job");
const applyButtons = document.querySelectorAll(".apply");
const deleteButtons = document.querySelectorAll(".delete");

if (signup) {
  signup.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const name = inputArr[0].value;
    const email = inputArr[1].value;
    const password = inputArr[2].value;
    const phone = inputArr[3].value;
    const role = document.getElementById("role").value;
    // console.log(role);
    sendSignUp(name, email, password, phone, role);
  })
}


async function sendSignUp(name, email, password, phone, role) {
  try {
    const response = await axios.post("/api/users/signup", { name, email, password, phone, role });
    console.log(response);
    if (response.data.success) {
      alert("Successful sign up.");
      location.replace("/me");
    }
    else
      alert("Something went wrong.");
  } catch (err) {
    console.log(err)
  }
}

if (login) {
  login.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const email = inputArr[0].value;
    const password = inputArr[1].value;
    sendLogin(email, password);
  })
}

async function sendLogin(email, password) {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    if (response.data.success) {
      alert("User logged in");
      location.replace("/me");//location is an object of browser so it only works in frontend
    }
    else
      alert("Something went wrong");
  } catch (err) {
    console.log(err);
  }
}


if (newJob) {
  newJob.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const title = inputArr[0].value;
    const company = inputArr[1].value;
    const package = inputArr[2].value;
    const description = document.getElementById("description").value;
    postNewJob(title, package, company, description);
  })
}

async function postNewJob(title, package, company, description) {
  try {
    const response = await axios.post("/api/jobs/new", { title, package, company, description });
    if (response.data.success) {
      alert("Job successfully posted");
      location.replace("/me");//location is an object of browser so it only works in frontend
    }
    else
      alert("Something went wrong");
  } catch (err) {
    console.log(err);
  }
}

if (applyButtons) {
  for (let i = 0; i < applyButtons.length; i++) {
    let applyButton = applyButtons[i];
    applyButton.addEventListener("click", async function (e) {
      e.preventDefault();
      let job_id = applyButton.getAttribute("id");
      const response = await axios.post("/api/application/new", { job_id });
      // console.log(response)
      if (response.data.success) {
        alert("Successfully applied for the job.");
        location.reload();
      } else
        alert("Something went wrong.");
    })
  }
}

if (deleteButtons) {
  for (let i = 0; i < deleteButtons.length; i++) {
    let deleteButton = deleteButtons[i];
    deleteButton.addEventListener("click", async function (e) {
      e.preventDefault();
      let job_id = deleteButton.getAttribute("id");
      const response = await axios.delete(`/api/jobs/${job_id}`);
      // console.log(response)
      if (response.data.success) {
        alert("Successfully deleted the job.");
        location.reload();
      } else
        alert("Something went wrong.");
    })
  }
}