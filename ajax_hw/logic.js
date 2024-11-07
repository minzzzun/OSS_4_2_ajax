
function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://672cc4affd89797156401d7c.mockapi.io/book");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send();

  xhr.onload = () => {
      if (xhr.status === 200) {
          let books = JSON.parse(xhr.responseText);
          sessionStorage.setItem("booksData", JSON.stringify(books));
          let tableBody = document.getElementById("bookTable");
          $("#bookTable").html("");

          books.forEach((book) => {
              const row = `
                <tr>
                  <td>${book.id}</td> <!-- ID 열 표시 -->
                  <th scope="row">${book.count}</th>
                  <td class="td_title" onclick="viewBookDetails('${book.id}')">${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.publisher}</td>
                  <td>${book.year}</td>
                </tr>
              `;
              tableBody.innerHTML += row;
          });
      } else {
          alert("데이터 불러오는데 실패함!");
      }
  }
}





function postData() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://672cc4affd89797156401d7c.mockapi.io/book");
  xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");

  let count = $("#create_book_number").val();
  let title = $("#create_book_title").val();
  let author = $("#create_book_author").val();
  let publisher = $("#create_book_pub").val();
  let year = $("#create_book_year").val();

  let newBook = {
      count: parseInt(count),
      title: title,
      author: author,
      publisher: publisher,
      year: parseInt(year)
  };

  xhr.onload = function () {
    if (xhr.status === 201) {
        alert("도서가 성공적으로 추가되었습니다!");
        window.location.href = "./index.html";
    } else {
        alert("도서 추가에 실패했습니다. 상태: " + xhr.status);
    }
  };

  xhr.onerror = function () {
      alert("네트워크 오류가 발생했습니다.");
  };

  xhr.send(JSON.stringify(newBook));
}



function updateData() {
  const id = $("#edit_book_id").val(); 
  const xhr = new XMLHttpRequest();

  xhr.open("PUT", "https://672cc4affd89797156401d7c.mockapi.io/book/"+ id);
  xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");

  // 수정할 도서 정보
  let updatedBook = {
    count: parseInt($("#edit_book_number").val()),
    title: $("#edit_book_title").val(),
    author: $("#edit_book_author").val(),
    publisher: $("#edit_book_pub").val(),
    year: parseInt($("#edit_book_year").val())
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("도서가 성공적으로 수정되었습니다!");
      getData(); 
      $('#editBookModal').modal('hide'); 
    } else {
      alert("도서 수정에 실패했습니다. 상태: " + xhr.status);
    }
  };

  xhr.onerror = function () {
    alert("네트워크 오류가 발생했습니다.");
  };

  xhr.send(JSON.stringify(updatedBook));
}


function deleteData() {
  const id = $("#delete_book_id").val(); 

  const xhr = new XMLHttpRequest();

  xhr.open("DELETE", "https://672cc4affd89797156401d7c.mockapi.io/book/"+ id);
  xhr.setRequestHeader("content-type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("도서가 성공적으로 삭제되었습니다!");
      getData();
      $('#deleteBookModal').modal('hide'); 
    } else {
      alert("도서 삭제에 실패했습니다. 상태: " + xhr.status);
    }
  };

  xhr.onerror = function () {
    alert("네트워크 오류가 발생했습니다.");
  };

  xhr.send();
}
