const signupBtn = document.getElementById("signupBtn");

const validateSignup = () => {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const reenter_password = document
    .getElementById("reenter_password")
    .value.trim();

  if (!first_name || !last_name || !email || !password || !reenter_password) {
    alert("Please fill out all fields");
    return;
  }

  if (password !== reenter_password) {
    alert("Passwords must match");
    return;
  }

  handleSignup();
};

const handleSignup = async (event) => {
  try {
    // event.preventDefault();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
};

signupBtn.addEventListener("click", validateSignup);
