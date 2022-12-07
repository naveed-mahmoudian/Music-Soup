const submitBtn = document.getElementById("submitBtn");

const validateInput = () => {
  const brief = document.getElementById("brief").value;

  if (!brief) {
    alert("Please paste or type your brief");
  } else {
    handleBrief();
  }
};

const handleBrief = async () => {
  try {
    const brief = document.getElementById("brief").value;

    const response = await fetch("/api/keywords", {
      method: "POST",
      body: JSON.stringify({ brief }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

submitBtn.addEventListener("click", validateInput);
