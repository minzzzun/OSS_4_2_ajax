function getData() {
  const xhr = new XMLHttpRequest(); 
  xhr.open("GET", "https://672af8d4976a834dd025108e.mockapi.io/book"); 
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);  
      let books = JSON.parse(xhr.responseText);
      sessionStorage.setItem("booksData", JSON.stringify(books));
      let tableBody = document.getElementById("bookTable");
      $("#bookTable").html("");

      books.forEach((book) => {
        const row = `
          <tr>
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

function viewBookDetails(bookId) {
  // 선택한 도서 ID를 sessionStorage에 저장
  if (!bookId) {
      alert("유효한 도서 ID가 아닙니다.");
      return;
  }

  sessionStorage.setItem("selectedBookId", bookId);
  
  // GET 요청을 통해 선택한 도서의 세부 정보를 불러오고, 수정 모달에 값을 채웁니다.
  fetch(`https://672af8d4976a834dd025108e.mockapi.io/book/${bookId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`도서 ID ${bookId}가 존재하지 않습니다.`);
        }
        return response.json();
    })
    .then(data => {
        $("#edit_book_number").val(data.count);
        $("#edit_book_title").val(data.title);
        $("#edit_book_author").val(data.author);
        $("#edit_book_pub").val(data.publisher);
        $("#edit_book_year").val(data.year);
        $('#editBookModal').modal('show'); // 수정 모달을 표시
    })
    .catch(error => {
        console.error("Error loading book details:", error);
        alert("도서 정보를 불러오는 데 실패했습니다.");
    });
}

function postData() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://672af8d4976a834dd025108e.mockapi.io/book");
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
        window.location.href = "./my_ajax.html";
    } else {
        alert("도서 추가에 실패했습니다. 상태: " + xhr.status);
    }
  };

  xhr.onerror = function () {
      alert("네트워크 오류가 발생했습니다.");
  };

  xhr.send(JSON.stringify(newBook));
}

// function updateData() {
//   const id = sessionStorage.getItem("selectedBookId");
//   if (!id) return alert("수정할 도서를 선택해주세요.");

//   let count = $("#edit_book_number").val();
//   let title = $("#edit_book_title").val();
//   let author = $("#edit_book_author").val();
//   let publisher = $("#edit_book_pub").val();
//   let year = $("#edit_book_year").val();

//   let updatedBook = {
//       count: parseInt(count),
//       title: title,
//       author: author,
//       publisher: publisher,
//       year: parseInt(year)
//   };

//   fetch(`https://672af8d4976a834dd025108e.mockapi.io/book/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(updatedBook)
//   })
//   .then(response => {
//     if (response.ok) {
//         alert("도서 정보가 성공적으로 수정되었습니다.");
//         $('#editBookModal').modal('hide');
//         getData();
//     } else {
//         alert("도서 정보 수정에 실패했습니다.");
//     }
//   })
//   .catch(error => console.error("Error:", error));
// }

// function deleteData() {
//   const id = sessionStorage.getItem("selectedBookId");
//   if (!id) return alert("삭제할 도서를 선택해주세요.");

//   fetch(`https://672af8d4976a834dd025108e.mockapi.io/book/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   .then(response => {
//     if (response.ok) {
//         alert("도서 정보가 성공적으로 삭제되었습니다.");
//         getData();
//     } else {
//         alert("도서 정보 삭제에 실패했습니다.");
//     }
//   })
//   .catch(error => console.error("Error:", error));
// }
function updateData() {
  const id = sessionStorage.getItem("selectedBookId");
  if (!id) {
      alert("수정할 도서를 선택해주세요.");
      return;
  }

  console.log("Updating book with ID:", id); // 디버깅 메시지
  let count = $("#edit_book_number").val();
  let title = $("#edit_book_title").val();
  let author = $("#edit_book_author").val();
  let publisher = $("#edit_book_pub").val();
  let year = $("#edit_book_year").val();

  let updatedBook = {
      count: parseInt(count),
      title: title,
      author: author,
      publisher: publisher,
      year: parseInt(year)
  };

  fetch(`https://672af8d4976a834dd025108e.mockapi.io/book/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedBook)
  })
  .then(response => {
      if (response.ok) {
          console.log("Book updated successfully:", response);
          alert("도서 정보가 성공적으로 수정되었습니다.");
          $('#editBookModal').modal('hide'); // 모달 닫기
          getData(); // 테이블 갱신
      } else {
          console.error("Failed to update book. Status:", response.status, response.statusText);
          alert("도서 정보를 수정하는 데 실패했습니다.");
      }
  })
  .catch(error => console.error("Error during update request:", error));
}

function deleteData() {
  const id = sessionStorage.getItem("selectedBookId");
  if (!id) {
      alert("삭제할 도서를 선택해주세요.");
      return;
  }

  console.log("Deleting book with ID:", id); // 디버깅 메시지

  fetch(`https://672af8d4976a834dd025108e.mockapi.io/book/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
      if (response.ok) {
          console.log("Book deleted successfully:", response);
          alert("도서 정보가 성공적으로 삭제되었습니다.");
          getData(); // 테이블 갱신
      } else {
          console.error("Failed to delete book. Status:", response.status, response.statusText);
          alert("도서 정보를 삭제하는 데 실패했습니다.");
      }
  })
  .catch(error => console.error("Error during delete request:", error));
}
