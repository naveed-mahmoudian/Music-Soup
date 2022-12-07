const logoutBtn = document.getElementById("logoutBtn");

const handleLogout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    }
  } catch (error) {
    console.error(error);
  }
};

logoutBtn.addEventListener("click", handleLogout);
