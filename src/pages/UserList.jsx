import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserRow from "../components/UserRow"; // Assuming UserRow component exists

export default function UserList() {
  // State for storing user data, loading status, and error
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const usersPerPage = 10; // Number of users to display per page

  // Get user token from Redux store
  const userToken = useSelector((state) => state.user.user);

  // Function to fetch users from the API
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const request = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/`,
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );
      setUsers(request.data.result.userdata);
    } catch (err) {
      console.error("Gagal mengambil data pengguna:", err);
      setError("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch users when the component mounts or userToken changes
  useEffect(() => {
    if (userToken) {
      getUsers();
    } else {
      setLoading(false);
      setError("Admin tidak terautentikasi.");
    }
  }, [userToken]);

  // Filter users based on the search term
  const filteredUsers = users.filter((user) => {
    const name = user.name || ""; // Default to empty string if undefined
    const email = user.email || ""; // Default to empty string if undefined
    const phone = user.phone || ""; // Default to empty string if undefined

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate the users to display on the current page (based on filtered users)
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages (based on filtered users)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Effect to reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200 p-4">
      <div className="flex flex-col items-center w-full max-w-4xl bg-neutral-800 p-6 rounded-lg shadow-lg my-32">
        <h1 className="text-3xl font-bold mb-6 text-white">DAFTAR PENGGUNA</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Cari pengguna..."
          className="mb-6 p-3 w-full max-w-md rounded-md bg-neutral-700 text-white placeholder-neutral-400 border border-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && (
          <p className="text-center text-neutral-400 text-lg">Memuat data...</p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {/* Pagination Controls */}
        {filteredUsers.length > usersPerPage && ( // Check filteredUsers for pagination display
          <nav className="my-6 flex justify-center items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === number
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-600 text-white hover:bg-neutral-700"
                } transition-colors duration-200`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </nav>
        )}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border-collapse border border-neutral-700 text-center text-lg bg-neutral-700 rounded-md overflow-hidden">
                <thead className="bg-neutral-600 text-neutral-100">
                  <tr>
                    <th className="border border-neutral-700 px-4 py-3">
                      Nama
                    </th>
                    <th className="border border-neutral-700 px-4 py-3">
                      Email
                    </th>
                    <th className="border border-neutral-700 px-4 py-3">
                      No. Telepon
                    </th>
                    <th className="border border-neutral-700 px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <UserRow key={user.email} {...user} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-neutral-400">
                        Tidak ada data pengguna.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredUsers.length > usersPerPage && ( // Check filteredUsers for pagination display
              <nav className="mt-6 flex justify-center items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === number
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-600 text-white hover:bg-neutral-700"
                    } transition-colors duration-200`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
