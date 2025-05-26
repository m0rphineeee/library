let library = []

class Book {
    construcor(title, author, pages, read, cover) {
        this.id = crypto.randomUUID
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.cover = cover
    }
}

const addBookToLibrary = (title, author, pages, read, cover) => {
    const book = new Book(title, author, pages, read, cover)
    library.push(book)
} 

const container = document.getElementById('container') 
const loopThroughLibraryArr = () => {
    container.innerHTML = ''
    library.map((book) => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <div class="cover"> 
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>        
            <p><strong>Pages:</strong> ${book.pages}</p>
            <div class="card-btns">
                <button class="read">
                    ${book.read ? '<i class="mdi mdi-check"></i>' : '<i class="mdi mdi-close"></i>'}
                </button>
                <button class="delete">
                    <i class="mdi mdi-trash-can-outline"></i>
                </button>
            </div>
        `
        container.appendChild(card)
     
        const remove = card.querySelector('button.delete')
        remove.addEventListener('click', () => {
            deleteBookById(book.id)
            loopThroughLibraryArr()
        })

        const read = card.querySelector('button.read')
        read.addEventListener('click', () => {
            book.read = !book.read
            loopThroughLibraryArr()
        })

    })
}

/*add new book dialog*/
const add = document.getElementById('add')
const dialog = document.getElementById('dialog')
add.addEventListener('click', () => {
    dialog.showModal()    
})

/*close dialog*/
const cancel = document.getElementById('cancel')
cancel.addEventListener('click', () => {
    dialog.close()
})

/*add a new book*/
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    const cover = document.getElementById('cover').value

    addBookToLibrary(title, author, pages, read, cover)
    loopThroughLibraryArr()

    dialog.close()
    form.reset()
})

deleteBookById = (id) => {
    library = library.filter(book => book.id !== id)
}


/*test*/
addBookToLibrary('The Hobbit', 'J.J.R Tolkien', 300, false, 'https://i.harperapps.com/hcanz/covers/9780261103283/y648.jpg')
addBookToLibrary('El sabueso de los Baskervill', 'Arthur Conan Doyle', 200, false, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUW5rPaADI-Wxuh3ZwZ_w9ICz-PRBXW0dNQ&s')
addBookToLibrary('Metro 2033', 'Dmitri Glujovski', 600, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmjYROWkw9eEKmtAE56PYtGeOiXaNo1wZbQ&s')
addBookToLibrary('Blindsight', 'Peter Watts', 400, false, 'https://mpd-biblio-covers.imgix.net/9781250237484.jpg')
addBookToLibrary('Estudio en escarlata', 'Arthur Conan Doyle', 400, false, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZToMraxzwuKmOhg4vLIGk7d68Bpv1v-nyg&s')
addBookToLibrary('I Hav e No Mouth, and I Must Scream', 'Harlan Ellison', 20, true, 'https://upload.wikimedia.org/wikipedia/en/4/47/IHaveNoMouth.jpg')
addBookToLibrary('Python Crash Course', 'Eric Matthes', 200, true, 'https://images.cdn1.buscalibre.com/fit-in/360x360/ca/7f/ca7f7bff848bbbbde3c30f1fd5492abc.jpg')

loopThroughLibraryArr()