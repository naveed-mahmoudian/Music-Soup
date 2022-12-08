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

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderData(data);
    }
  } catch (error) {
    console.error(error);
  }
};

const renderData = (data) => {
  const renderDataList = document.getElementById("renderDataList");
  for (let i = 0; i < data.length; i++) {
    const liEl = document.createElement("li");
    liEl.innerHTML = `<a href=${data[i].permalink_url} target=_blank>${data[i].title}</a>`;

    renderDataList.append(liEl);
  }
};

submitBtn.addEventListener("click", validateInput);
