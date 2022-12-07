const getStartedBtn = document.getElementById("getStartedBtn");

const showLoginModal = () => {
  $("#loginModal").modal("show");

  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", handleLogin);
};

const handleLogin = async (event) => {
  try {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter a valid username and password");
      return;
    }

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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

getStartedBtn.addEventListener("click", showLoginModal);
