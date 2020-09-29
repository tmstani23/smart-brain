import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {
    
    state = {
        dropdownOpen: false
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    render() {
        return (
            <div className="pa2 ptc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle 
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib" alt="avatar" 
                    />
                </DropdownToggle>
                <DropdownMenu 
                    className="b--transparent shadow-5" 
                    style={{marginTop: '5px', backgroundColor: 'rgba(255,255, 255, 0.5'}}
                >
                    <DropdownItem>View Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Sign Out</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                
                
            </div>
            

        )
    }
}

export default ProfileIcon