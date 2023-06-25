console.log('API script loaded')

let searchResult = []

let bookCart = []

const GOOGLE_API_KEY = '&key=AIzaSyAqJJP-5yEAuxfvup3Gdb95B0bC1XUAW_s'


fetch('https://www.googleapis.com/books/v1/volumes?q=keyword'+GOOGLE_API_KEY)
.then(res=>res.json())
.then(res=>{displayBooks(res.items)})


function searchBooks(){
  document.getElementById('booksortdropdown').value = ''
  const searchType = document.getElementById('booksearchdropdown').value
  let searchInputValue = document.getElementById('book-search-input').value  
  let API_END_POINT = 'https://www.googleapis.com/books/v1/volumes?q='
  if(searchType === 'title'){
    API_END_POINT = API_END_POINT+searchInputValue
  }else if(searchType === 'author'){
    API_END_POINT = API_END_POINT+'+inauthor:'+searchInputValue
  }
  fetch(API_END_POINT+GOOGLE_API_KEY)
  .then(res=>res.json())
  .then(res=>{displayBooks(res.items)})
}


function displayBooks(books){
  document.getElementById('book-count').innerHTML = Array.isArray(books) && books.length + ' books found...'
  document.getElementById('book-list').innerHTML = ''
  searchResult = books
  books.forEach((book)=>{
    const bookContainer = document.getElementById('book-list')
    const newBookDiv = document.createElement('div')
    const overlay = document.createElement('div')
    const wrapperBook = document.createElement('div')
    wrapperBook.className = 'book-wrapper'
    const newBookImg = document.createElement('img')
    overlay.className ='over-lay'
    newBookImg.className = 'book-img'
    newBookDiv.className = 'book-text'
    newBookImg.src = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail: '';
    newBookImg.alt = 'Book Image'
    newBookDiv.innerHTML = '<b>'+ book.volumeInfo.title+'</b>, ' + book.volumeInfo.authors
    // + book.volumeInfo.publishedDate + ', ' + book.volumeInfo.publisher
    overlay.appendChild(newBookDiv)
    wrapperBook.appendChild(newBookImg)
    wrapperBook.appendChild(overlay)
    wrapperBook.addEventListener('click', function(){
      addToCart(book.volumeInfo.title)
    })
    bookContainer.appendChild(wrapperBook)
  })
}

function sortBooks(e){
  const sortType = document.getElementById('booksortdropdown').value
  if(sortType === 'title'){
    searchResult.sort((bookX, bookY) => {
      if (bookX.volumeInfo.title < bookY.volumeInfo.title) return -1
      return bookX.volumeInfo.title > bookY.volumeInfo.title ? 1 : 0
    })
  }else if(sortType === 'author'){
    searchResult.sort((bookX, bookY) => {
      let bookXAuthor = Array.isArray(bookX.volumeInfo.authors) ? bookX.volumeInfo.authors[0] : bookX.volumeInfo.authors
      let bookYAuthor = Array.isArray(bookY.volumeInfo.authors) ? bookY.volumeInfo.authors[0] : bookY.volumeInfo.authors
      if (bookXAuthor < bookYAuthor) return -1
      return bookXAuthor > bookYAuthor ? 1 : 0
    })
  }
  console.log('After',searchResult)
  displayBooks(searchResult)
}


function addToCart(bookName){
  if(bookName){
    bookCart.push(bookName)
  }
  document.getElementById('book-cart').innerHTML = bookCart
}