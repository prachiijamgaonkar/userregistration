import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { ContactServices } from './ContactServices';
import { Link} from 'react-router-dom'

const HomePage = () => {
  const [query, setQuery] = useState({
    text: ""
  });

  const [state, setState] = useState({
    loading: true,
    contacts: [],        
    filteredContacts: [], 
    errorMessage: ''
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true, contacts: [] }));
        const response = await ContactServices.getAllContacts();

        if (Array.isArray(response.data)) {
          setState(prevState => ({
            ...prevState,
            loading: false,
            contacts: response.data,          
            filteredContacts: response.data   
          }));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: 'Data not found'
        }));
      }
    };

    fetchContacts();
  }, []);

  // Search contact
  const searchContact = (event) => {
    const searchText = event.target.value;
    setQuery({ ...query, text: searchText });

    const theContacts = state.contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setState(prevState => ({ ...prevState, filteredContacts: theContacts }));
  };

  const { loading, filteredContacts, errorMessage } = state;

  return (
    <>
      <section className='contact-search'>
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className='fst-italic'>WELCOME TO HOME..</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form action="" className='row'>
                <div className="col">
                  <div className="mb-2">
                    <input 
                      type="text" 
                      name='text' 
                      onChange={searchContact} 
                      value={query.text} 
                      placeholder='Search name' 
                      className=' form-control' 
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className='contact-list '>
          <div className="container ">
            <div className="row">
              {filteredContacts.length > 0 ? filteredContacts.map(contact => {
                const { name, dateofbirth, email, id } = contact;
                return (
                  <div className=" col-md-6 mb-4" key={id}>
                    <div className="card d-flex justify-content-around">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-12">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">Name: {name}</li>
                              <li className="list-group-item list-group-item-action">Date of Birth: {dateofbirth}</li>
                              <li className="list-group-item list-group-item-action">Email: {email}</li>
                            </ul>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="col-md-12">
                  <p>No contacts found.</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <Link to={'/'} className='btn btn-warning btn-action'>LogOut</Link>
          </div>
        </section>
        
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  );
};

export default HomePage;
