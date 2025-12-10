const darkBtn = document.querySelector(".darkBtn");
const darkIcon = document.querySelector(".darkIcon");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const censel = document.querySelector(".censel");
const modalForm = document.querySelector(".modalForm");
const addNote = document.querySelector(".addNote");
const searchAllBtn = document.querySelector(".searchAllBtn");
const menuBtn = document.querySelector(".menuBtn");
const allBtn = document.querySelector(".allBtn");
const ol = document.querySelector("ol");
const inputText = document.querySelector(".inputText");
const delBtns = document.querySelectorAll(".delBtn");
const search = document.querySelector(".search");
const submitBtn = document.querySelector(".submitBtn");
const formTitle = document.querySelector(".formTitle");

let darkMode = localStorage.getItem("mode");

const mode = () => {
  if (darkMode == "tun") {
    body.classList.add("dark");
    darkIcon.classList.remove("fa-moon");
    darkIcon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark");
    darkIcon.classList.remove("fa-sun");
    darkIcon.classList.add("fa-moon");
  }
};
mode();

darkBtn.addEventListener("click", () => {
  if (darkMode == "kun") {
    darkMode = "tun";
  } else {
    darkMode = "kun";
  }
  mode();
  localStorage.setItem("mode", darkMode);
});

searchAllBtn.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  menuBtn.classList.toggle("active");
});
window.addEventListener("click", () => {
  menuBtn.classList.remove("active");
});
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
});
allBtn.addEventListener("click", (e) => {
  e.stopPropagation();
});

addNote.addEventListener("click", () => {
  modal.style.transform = "scale(1)";
  submitBtn.textContent = "apply";
  formTitle.textContent = "new note";
  editId = null;
});

censel.addEventListener("click", () => {
  modal.style.transform = "scale(0)";
});

let plans = JSON.parse(localStorage.getItem("plans")) || [];

localStorage.setItem("plans", JSON.stringify(plans));

const writeData = (data) => {
  ol.innerHTML = "";
  data.forEach((item) => {
    ol.innerHTML += `<div class="row">
        <li>
          <input ${
            item.isDone ? "checked" : ""
          } type="checkbox" onchange="toggleDone(${item.id})" />
          <span>${item.title}</span>
        </li>
        <div class="btns">
          <i onclick="edit(${item.id})" class="editBtn fa-solid fa-pen"></i>
          <i onclick="delet(${item.id})" class="delBtn fa-solid fa-trash"></i>
        </div>
      </div>`;
  });
};
writeData(plans);

const toggleDone = (id) => {
  plans = plans.map((item) => {
    if (item.id === id) {
      return { ...item, isDone: !item.isDone };
    }
    return item;
  });
  localStorage.setItem("plans", JSON.stringify(plans));
  writeData(plans);
};

const delet = (id) => {
  const filterData = plans.filter((item) => {
    return item.id !== id;
  });

  plans = filterData;
  localStorage.setItem("plans", JSON.stringify(plans));
  writeData(plans);
};

let editId = null;

const edit = (id) => {
  const filterFind = plans.find((item) => {
    return item.id == id;
  });
  editId = id;
  inputText.value = filterFind.title;
  submitBtn.textContent = "edit";
  formTitle.textContent = "edit note";
  modal.style.transform = "scale(1)";
};

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputText.value.trim() === "") {
    return;
  }

  if (editId !== null) {
    plans = plans.map((item) => {
      if (item.id == editId) {
        return { ...item, title: inputText.value };
      }
      return item;
    });
    localStorage.setItem("plans", JSON.stringify(plans));
    writeData(plans);

    editId = null;
    modal.style.transform = "scale(0)";
    inputText.value = "";
    return;
  }

  const myPlans = {
    id: Math.floor(Math.random() * 1000000),
    title: inputText.value,
    isDone: false,
  };

  plans.push(myPlans);
  localStorage.setItem("plans", JSON.stringify(plans));
  writeData(plans);

  inputText.value = "";
  inputText.blur();
  modal.style.transform = "scale(0)";
});

search.addEventListener("input", () => {
  const text = search.value.toLowerCase().trim();

  const searchFilter = plans.filter((item) => {
    return item.title.toLocaleLowerCase().includes(text);
  });
  writeData(searchFilter);
});
