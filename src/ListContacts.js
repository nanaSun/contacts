import React, { Component } from 'react';

import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from  'sort-by';
import {Link} from 'react-router-dom';
class ListContacts extends Component {

  static propTypes={
    contacts:PropTypes.array.isRequired,
    onDeleteContact:PropTypes.func.isRequired
  }
 
  state={
    query:""
  }
  updateQuery=(query)=>{
    this.setState({query:query.trim()})
  }
 
  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state
    let showingContacts
    if(query){
      const match=new RegExp(escapeRegExp(query),"i")
      showingContacts=contacts.filter((contact)=>match.test(contact.name))
    }else{
      showingContacts=contacts
    }
    showingContacts.sort(sortBy('name'));
    return (
      <div>
        {JSON.stringify(this.state)}
        <input type="text" placeholder="search" value={query} onChange={(event)=>this.updateQuery(event.target.value)}/>

        {showingContacts.length!==contacts.length&&(
          <div>
          <span>{showingContacts.length} at {contacts.length}</span>
          </div>
        )}

        <ol className='contact-list'>
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div className="contact-avatar">
              <img src={contact.avatarURL} alt=""/>
            </div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={()=>onDeleteContact(contact)} className="contact-remove">remove</button>
          </li>
        ))}
        </ol>
        <Link to="/create" className="add-contact">add contact</Link>
      </div>
    );
  }
}

export default ListContacts;
