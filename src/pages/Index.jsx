import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", status: false });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);

    const queryParams = new URLSearchParams(location.search);
    const savedPage = parseInt(queryParams.get("page")) || 1;
    const savedQuery = queryParams.get("query") || "";
    setCurrentPage(savedPage);
    setSearchQuery(savedQuery);
  }, [location.search, navigate]);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title) return alert("Book title must be filled!");
    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = newBook;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, newBook]);
    }
    setNewBook({ title: "", status: false });
  };

  const handleEditBook = (index) => {
    setNewBook(books[index]);
    setEditingIndex(index);
  };

  const handleDeleteBook = (index) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((_, i) => i !== index));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.set("query", searchQuery);
    if (currentPage > 1) queryParams.set("page", currentPage);

    const newSearch = queryParams.toString();
    const currentSearch = location.search;

    if (newSearch !== currentSearch) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [searchQuery, currentPage, location.search, navigate]);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen-custom flex flex-col items-center justify-between">
        <div className="w-full max-w-3xl mx-auto p-6">
          <Card>
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingIndex !== null ? "Edit Book" : "Add Book"}
            </h1>
            <form>
              <div className="space-y-3 mb-6">
                <Input
                  type="text"
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                />
                <label className="flex items-center text-gray-900 dark:text-white">
                  <Input
                    type="checkbox"
                    checked={newBook.status}
                    onChange={(e) =>
                      setNewBook({ ...newBook, status: e.target.checked })
                    }
                    className="mr-3 w-4 h-4"
                  />
                  Has Been Read
                </label>
              </div>
              <Button
                onClick={handleAddBook}
                variant="primary"
                fullWidth={true}
              >
                {editingIndex !== null ? "Update Book" : "Add Book"}
              </Button>
            </form>
          </Card>

          <Card>
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Book List
            </h1>

            <form className="mb-6">
              <Input
                type="text"
                placeholder="Search Book..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedBooks.map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg outline outline-1 outline-gray-200 dark:bg-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {book.title}
                  </h3>
                  <p
                    className={`font-semibold text-lg ${
                      book.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Status: {book.status ? "Has Been Read" : "Not Read Yet"}
                  </p>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      onClick={() => handleEditBook(index + startIndex)}
                      variant="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBook(index + startIndex)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? "primary" : "secondary"}
                    className="mx-2"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
