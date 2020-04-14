import {httpModule} from './HttpModule.js';
        class BookModule {
        printNewBookForm() {
        document.getElementById('content').innerHTML = `
<div class="row mt-5">
    <div class="col-sm-6 m-auto">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title w-100 text-center">Add Book</h5>
                <p class="card-text w-100 text-center">Fill the fields</p>
                <div class="input-group mb-3">
                    <input id="name" type="text" class="form-control" placeholder="Title of the book" aria-label="Title of the book">
                </div>
                <div class="input-group mb-3">
                    <input id="author" type="text" class="form-control" placeholder="Book author" aria-label="Book author">
                </div>
                <div class="input-group mb-3">
                    <input id="publishedYear" type="text" class="form-control" placeholder="The year of publishing" aria-label="The year of publishing">
                    <input id="quantity" type="text" class="form-control" placeholder="Quantity" aria-label="Quantity">
                    <input id="price" type="text" class="form-control" placeholder="Price" aria-label="Price">
                </div>
                <a id="btnAddBook" href="#" class="btn btn-primary w-100">Add book</a>
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
                if (name === null || name === undefined
                        || author === null || author === undefined
                        || publishedYear === null || publishedYear === undefined
                        || quantity === null || quantity === undefined
                        || price === null || price === undefined) {
        document.getElementById('info').innerHTML = 'Fill the all fields';
                return;
        }
        let newBook = {
        "name": name,
                "author": author,
                "publishedYear": publishedYear,
                "quantity": quantity,
                "price": price,
        }
        httpModule.http('createBook', 'POST', newBook)
                .then(function(response){
                if (response === null || response === undefined){
                document.getElementById('info').innerHTML = 'Server error';
                        return;
                }
                if (response.authStatus === 'false'){
                document.getElementById('info').innerHTML = 'Please log in';
                        return;
                }
                if (response.actionStatus === 'false'){
                document.getElementById('info').innerHTML = ' ';
                        return;
                }
                document.getElementById('info').innerHTML = 'Book added'
                        bookModule.printNewBookForm();
                })
        }
        }
let bookModule = new BookModule();
        export {bookModule}