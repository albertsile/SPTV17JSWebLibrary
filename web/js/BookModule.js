import {httpModule} from './HttpModule.js';
import {userModule} from './UserModule.js';

class BookModule {
    printNewBookForm() {
      document.getElementById('info').innerHTML='&nbsp;';
        document.getElementById('content').innerHTML = 
            `<div class="row mt-5">
                 <div class="col-sm-6 m-auto">
                   <div class="card">
                     <div class="card-body">
                       <h5 class="card-title w-100 text-center">Добавить книгу</h5>
                       <p class="card-text w-100 text-center">Заполните все поля</p>
                          <div class="input-group mb-3">
                            <input id="name" type="text" class="form-control" placeholder="Название книги" aria-label="Название книги">
                          </div>
                          <div class="input-group mb-3">
                            <input id="author" type="text" class="form-control" placeholder="Автор книги" aria-label="Автор книги">
                          </div>
                          <div class="input-group mb-3">
                            <input id="publishedYear" type="text" class="form-control" placeholder="Год изнания" aria-label="Год изнания">
                            <input id="quantity" type="text" class="form-control" placeholder="Количество" aria-label="Количество">
                            <input id="price" type="text" class="form-control" placeholder="Цена" aria-label="Цена">
                          </div>
                       <a id="btnAddBook" href="#" class="btn btn-primary w-100">Добавить книгу</a>
                     </div>
                   </div>
                 </div>
              </div>`;
        document.getElementById('btnAddBook').addEventListener('click', bookModule.createBook);
}
createBook(){
          let name = document.getElementById('name').value;
          let author = document.getElementById('author').value;
          let publishedYear = document.getElementById('publishedYear').value;
          let quantity = document.getElementById('quantity').value;
          let price = document.getElementById('price').value;
          
          if(name === null || name === undefined
                || author === null || author === undefined 
                || publishedYear === null || publishedYear === undefined 
                || quantity === null || quantity === undefined 
                || price === null || price === undefined) {
           document.getElementById('info').innerHTM='Fill all fields';
           return;
          }
          let newBook = {
              "name": name,
              "author": author,
              "publishedYear": publishedYear,
              "quantity": quantity,
              "price": price
          }
          httpModule.http('createBook', 'POST', newBook)
                  .then(function(response){// response содержит ответ от сервера
                      if(response === null || response === undefined){
                          document.getElementById('info').innerHTML = 'Server error';
                          return;
                      }
                      if(response.authStatus === 'false'){
                          document.getElementById('info').innerHTML = 'Sign in';
                          return; 
                      }
                      if(response.actionStatus === 'false'){
                          document.getElementById('info').innerHTML = '';
                          return; 
                      }
                      document.getElementById('info').innerHTML = 'Book was added';
                      bookModule.printNewBookForm();
                  });
         
      }
  }
let bookModule = new BookModule();
export {bookModule};