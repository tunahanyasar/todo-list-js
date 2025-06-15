// ====================== Ekle butonuna tıklayınca çalışacak fonksiyon =====================
const input = document.getElementById("task");
const ekleBtn = document.getElementById("liveToastBtn");
ekleBtn.addEventListener("click", newElement);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newElement();
  }
});

function newElement() {
  const todoInput = input.value.trim(); // Input değerini al ve baştaki/sondaki boşlukları temizle

  // Eğer input boşsa, hata toast'ını göster
  if (todoInput === "") {
    $('#liveToastError').toast('show'); // Hata mesajını göster
    return; // Boş görev eklenmesini engelle
  }

  // li elemanı oluştur
  const newTodoEl = document.createElement("li");
  // fontawesome xMark için i elemanı oluştur
  const xMarkEl = document.createElement("i");
  // xMark için fontawesome ve bootstrap class ekle
  xMarkEl.classList.add("fa-solid", "fa-xmark", "float-right", "p-1", "px-2");
  // Metin nodu oluşturup todo input değerini içine at
  const textnode = document.createTextNode(todoInput);

  // Oluşturulan li elemanına input değerini ekle
  newTodoEl.appendChild(textnode);
  // li elemanının içine fontawesome xmark'i ekle
  newTodoEl.appendChild(xMarkEl);

  // Listeye yeni li elemanını ekle
  document.getElementById("list").appendChild(newTodoEl);

  // Toast ile başarı mesajı göster
  $('#liveToast').toast('show');

  // Input'u temizle
  input.value = "";

  // Local Storage'a yeni görev ekle
  updateLocalStorage();
}

// ================= Liste elemanlarına tıklanınca checked olması ===============
document.getElementById("list").addEventListener("click", function (event) {
  // Sadece li elemanlarına tıklanınca çalışsın
  if (event.target.tagName === "LI") {
    lineTodo(event.target);
  }
});

function lineTodo(todoEl) {
  todoEl.classList.toggle("checked");
  // Local Storage'ı güncelle
  updateLocalStorage();
}

// ================= Liste elemanlarını silmek ============================
const list = document.getElementById("list");

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-xmark")) {
    event.target.parentElement.remove(); // <li> elemanını sil
    // Local Storage'ı güncelle
    $('#removeToast').toast('show')
    updateLocalStorage();
  }
});

// ======================= Local Storage'ı Güncelleme =======================
function updateLocalStorage() {
  const todos = [];
  const listItems = document.querySelectorAll("#list li");

  listItems.forEach(item => {
    todos.push(item.textContent.trim()); // Her li elemanının metnini al ve todos dizisine ekle
  });

  // .Todos dizisini JSON formatında local storage'a kaydet
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ======================= Local Storage'dan Veri Yükleme =======================
function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    const todos = JSON.parse(storedTodos); // JSON verisini dizilere dönüştür

    todos.forEach(todo => {
      // li elemanı oluştur
      const newTodoEl = document.createElement("li");
      // fontawesome xMark için i elemanı oluştur
      const xMarkEl = document.createElement("i");
      // xMark için fontawesome ve bootstrap class ekle
      xMarkEl.classList.add("fa-solid", "fa-xmark", "float-right", "p-1", "px-2");
      // Metin nodu oluşturup todo input değerini içine at
      const textnode = document.createTextNode(todo);

      // Oluşturulan li elemanına todo metnini ekle
      newTodoEl.appendChild(textnode);
      // li elemanının içine fontawesome xmark'i ekle
      newTodoEl.appendChild(xMarkEl);

      // Listeye yeni li elemanını ekle
      document.getElementById("list").appendChild(newTodoEl);
    });
  }
}

// Sayfa yüklendiğinde, localStorage'dan verileri yükle
window.onload = function () {
  loadTodosFromLocalStorage();
};


