import React, { useState } from 'react';
import './general.css';
import { useAuth } from '../context/AuthContext';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';


function BookFilter() {
    const [selectedOption, setSelectedOption] = useState("Book Title");
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();
    const [dataWithoutQuotes, setDataWithoutQuotes] = useState([]);
    const [dataWithQuotes, setDataWithQuotes] = useState([]);

    const handleViewAllBookListingButtonClick = () => {
        navigate('/view-book-listings');
    }; 
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFilterTextChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected option:", selectedOption);
        console.log("Filter text:", filterText);
    
        // Convert the selected option to the parameter name expected by the backend
        const parameter = encodeURIComponent(selectedOption);

        let parameterValue;
        if (filterText.includes('"')) {
            parameterValue = encodeURIComponent(`"${filterText}"`);
        } else {
            parameterValue = encodeURIComponent(filterText);
        }
    
        // Inside the handleSubmit function after fetching data (We get the data with and without quotes and store them in state variables dataWithoutQuotes and dataWithQuotes respectively)
        Promise.all([
            fetch(`http://localhost:5000/filter_books?parameter=${parameter}&value=${parameterValue}`)
                .then(response => response.json()),
            fetch(`http://localhost:5000/filter_books?parameter=${parameter}&value="${parameterValue}"`)
                .then(response => response.json())
        ])
        .then(([data, dataWithQuotes]) => {
            console.log("Data without quotes:", data);
            console.log("Data with quotes:", dataWithQuotes);
            setDataWithoutQuotes(data);
            setDataWithQuotes(dataWithQuotes);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
        <div>
            <h1 className="title">Wrong Way?</h1>
            <button onClick={handleViewAllBookListingButtonClick} className="buttonMiddle">View All Book Listings</button>
            <h1 className="title">Book Search By Filter</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="filter-option">Filter Options:</label>
                    <select id="filter-option" value={selectedOption} onChange={handleOptionChange}>
                        <option value="bookTitle">Book Title</option>
                        <option value="listingType">Listing Type</option>
                        <option value="price">Price</option>
                        <option value="bookAuthor">Author</option>
                        <option value="bookCondition">Condition</option>
                        <option value="user">User</option>
                        <option value="availability">Availability</option>
                    </select>
                </div>
                <div>
                    <label className="topSpace" htmlFor="filter-text">Filter Text:</label>
                    <input type="text" id="filter-text" value={filterText} onChange={handleFilterTextChange} />
                </div>
                <MDBBtn type="submit" className="buttonMiddle">Search</MDBBtn>
            </form>
                   {/* Add this block to display the book listings */}
                   <div className="specialNavBar">
                {(dataWithoutQuotes.length > 0 || dataWithQuotes.length > 0)? (
                    <table>
                        <thead>
                            <tr>
                            <th className="cell">BOOK TITLE</th>
                            <th className="cell">LISTING TYPE</th>
                            <th className="cell"> ID</th>
                            <th className="cell">PRICE</th>
                            <th className="cell">AUTHOR</th>
                            <th className="cell">TYPE</th>
                            <th className="cell">DURATION</th>
                            <th className="cell">CONDITION</th>
                            <th className="cell">USER</th>
                            <th className="cell">AVAILABILITY</th>

                        </tr>
                        </thead>
                        <tbody>
                        {dataWithoutQuotes.map((listing, index) => (
                            <tr key={index}>
                                <td className="cell">{listing.bookTitle}</td>
                                <td className="cell">{listing.listingType}</td>
                                <td className="cell">{listing.id}</td>
                                <td className="cell">{listing.price}</td>
                                <td className="cell">{listing.bookAuthor}</td>
                                <td className="cell">{listing.bookType}</td>
                                <td className="cell">{listing.rentalDuration}</td>
                                <td className="cell">{listing.bookCondition}</td>
                                <td className="cell">{listing.user}</td>
                                <td className="cell">{listing.availability}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tbody>
                        {dataWithQuotes.map((listing, index) => (
                            <tr key={index}>
                                <td className="cell">{listing.bookTitle}</td>
                                <td className="cell">{listing.listingType}</td>
                                <td className="cell">{listing.id}</td>
                                <td className="cell">{listing.price}</td>
                                <td className="cell">{listing.bookAuthor}</td>
                                <td className="cell">{listing.bookType}</td>
                                <td className="cell">{listing.rentalDuration}</td>
                                <td className="cell">{listing.bookCondition}</td>
                                <td className="cell">{listing.user}</td>
                                <td className="cell">{listing.availability}</td>
                            </tr>
                        ))}
                    </tbody>

                    </table>
                ) : (
                    <p>No listings found</p>
                )}
            </div>
        <div className="topSpace"> <p>Go back to <Link to="/homepage" className="form-link">Homepage</Link></p> </div>

        </div>
        
        
    );
}

export default BookFilter;
