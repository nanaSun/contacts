import React, {Component} from 'react'
import ImageInput from './ImageInput'
import {Link} from 'react-router-dom'
import serializeForm from 'form-serialize'
class CreateContact extends Component {
	handleSubmit=(e)=>{
		//e.preventDefault()
		const values=serializeForm(e.target,{hash:true})
		if(this.props.onCreateContact)
			this.props.onCreateContact(values)
	}
	render() {
		return (
			<div>
				<Link className="close-route-cntact" to="/">close</Link>
				<form method="post" onSubmit={this.handleSubmit}>
					<ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
					<div className="create-contact-details">
						<input type="text" name="name" placeholder="name"/>
						<input type="text" name="email" placeholder="email"/>
						<button>Add Contact</button>
					</div>
				</form>
			</div>
		)
	}
}
export default CreateContact