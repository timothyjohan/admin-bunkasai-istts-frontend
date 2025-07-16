import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// TODO: Replace with your actual backend URL.
// This base URL will be prepended to the image file paths.
// It's crucial that this matches the URL where your backend serves static files.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; // Fallback for local dev

// This component fetches and displays a combined list of tickets and their transfer proofs.
export default function TicketsPage() {
    // State for storing the array of combined ticket and proof data.
    const [tickets, setTickets] = useState([]);
    // State to handle the loading status while fetching data
    const [loading, setLoading] = useState(true);
    // State to store any potential errors during the API call
    const [error, setError] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const itemsPerPage = 8; // Number of tickets to display per page

    // In your actual application, you would get the user from your Redux store.
    const user = useSelector((state) => state.user.user);

    // useEffect hook to fetch data when the component is first rendered
    useEffect(() => {
        // This function fetches combined ticket and proof data from the API.
        const getTickets = async () => {
            // Ensure user auth token exists before making the request.
            if (!user) {
                setError("Authentication token not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                // The `import.meta.env` syntax is specific to Vite projects.
                // It has been replaced with a constant defined outside the component.
                const request = await axios.get(
                    `${API_BASE_URL}/api/ticket/`,
                    {
                        headers: {
                            "x-auth-token": user,
                        },
                    }
                );
                // Update the state with the fetched ticket data.
                setTickets(request.data);
            } catch (e) {
                // If the request fails, update the error state.
                setError(`Failed to fetch tickets: ${e.message}`);
                console.error("Fetch error:", e);
            } finally {
                // Stop the loading indicator regardless of success or failure.
                setLoading(false);
            }
        };

        getTickets();
        // The effect depends on the 'user' token. It will re-run if the user logs in or out.
    }, [user]);

    // Calculate the tickets to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

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

    // Function to handle image loading errors
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents future error loops
        // Replace the broken image with a placeholder
        e.target.src = 'https://placehold.co/600x400/262626/ffffff?text=Proof+Not+Available';
    };

    // Helper to get styling for the proof status badge
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'valid':
                return 'bg-green-500 text-white';
            case 'invalid':
                return 'bg-red-500 text-white';
            case 'checking':
            default:
                return 'bg-yellow-500 text-black';
        }
    }

    // Function to handle updating the status of a transfer proof
    const handleStatusChange = async (ulid, email, newStatus) => {
        try {
            await axios.put(
                `${API_BASE_URL}/api/ticket/${email}`,
                { status: newStatus },
                { headers: { "x-auth-token": user } }
            );

            // On success, update the local state to reflect the change immediately.
            setTickets(currentTickets =>
                currentTickets.map(t =>
                    t.ulid === ulid
                    ? { ...t, transferProof: { ...t.transferProof, status: newStatus } }
                    : t
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
            // Using alert() is discouraged. A toast notification or an inline error message is better.
            // For example: setError(`Failed to update ticket ${ulid}. Please try again.`);
        }
    };


    return (
        <>
            {/* The main container, centered with a dark background to match your app's theme */}
            <div className="min-h-screen w-full flex items-center justify-center text-neutral-200 p-4 sm:p-6 lg:p-8">
                {/* This inner container has the semi-transparent background and rounded corners */}
                <div className="bg-neutral-800 p-6 sm:p-8 md:p-10 bg-opacity-75 rounded-xl w-full max-w-6xl">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Ticket Transfer Proofs</h1>

                    {/* Display a loading message while data is being fetched */}
                    {loading && <p className="text-center text-lg">Loading tickets...</p>}

                    {/* Display an error message if the fetch failed */}
                    {error && <p className="text-center text-lg text-red-400">{error}</p>}

                    {/* Once loading is complete and there are no errors, display the tickets */}
                    {!loading && !error && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentTickets.length > 0 ? (
                                    // Map through the currentTickets array and create a card for each ticket
                                    currentTickets.map(ticket => {
                                        const imageUrl = ticket.transferProof?.filePath ? `${API_BASE_URL}/${ticket.transferProof.filePath.replace(/\\/g, '/')}` : null;
                                        return (
                                        <div key={ticket.ulid} className="bg-neutral-900 bg-opacity-80 p-4 rounded-lg shadow-lg flex flex-col transition-transform hover:scale-105">
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-lg mb-2 truncate" title={ticket.ulid}>ULID: ...{ticket.ulid.slice(-6)}</h3>
                                                <p className="text-sm text-neutral-400 mb-1">Name: {ticket.name || 'N/A'}</p>
                                                <p className="text-sm text-neutral-400 mb-4 truncate">Email: {ticket.email || 'N/A'}</p>
                                            </div>

                                            {/* Container for the image and status controls */}
                                            <div className="mt-auto">
                                                <p className="text-sm text-neutral-300 mb-2">Transfer Proof:</p>
                                                {imageUrl ? (
                                                    <>
                                                        <a href={imageUrl} target="_blank" rel="noopener noreferrer" title="Click to open image in new tab">
                                                            <img
                                                                src={imageUrl}
                                                                alt={`Transfer proof for ${ticket.name}`}
                                                                className="w-full h-auto object-cover rounded-md aspect-video cursor-pointer"
                                                                onError={handleImageError}
                                                            />
                                                        </a>
                                                        <div className={`mt-2 text-xs font-bold uppercase px-2 py-1 rounded-full text-center ${ticket.transferProof.status == "valid"? "bg-green-500 text-white" : ticket.transferProof.status == "invalid" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"} `}>
                                                            {ticket.transferProof.status || 'No Status'}
                                                        </div>

                                                        {/* Dropdown to change the status */}
                                                        <div className="mt-2">
                                                            <label htmlFor={`status-${ticket.ulid}`} className="sr-only">Update Status</label>
                                                            <select
                                                                id={`status-${ticket.ulid}`}
                                                                value={ticket.transferProof?.status || 'checking'} // Use optional chaining
                                                                onChange={(e) => handleStatusChange(ticket.ulid, ticket.email, e.target.value)}
                                                                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            >
                                                                <option value="checking">Checking</option>
                                                                <option value="valid">Valid</option>
                                                                <option value="invalid">Invalid</option>
                                                            </select>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full aspect-video bg-neutral-700 rounded-md flex items-center justify-center">
                                                        <p className="text-xs text-neutral-400">No Proof Submitted</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        )
                                    })
                                ) : (
                                    // Display a message if no tickets were found
                                    <p className="text-center col-span-full text-lg">No tickets found.</p>
                                )}
                            </div>

                            {/* Pagination Controls */}
                            {tickets.length > itemsPerPage && (
                                <nav className="mt-8 flex justify-center items-center space-x-2">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
                                    >
                                        Previous
                                    </button>
                                    {pageNumbers.map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`px-4 py-2 rounded-md font-medium ${
                                                currentPage === number
                                                    ? "bg-neutral-700 text-white shadow-inner"
                                                    : "bg-neutral-600 text-white hover:bg-neutral-700 shadow-md"
                                            } transition-colors duration-200`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
                                    >
                                        Next
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
