import React from 'react';
import { connect } from 'react-redux';
import {
    fetchSection, addSection, removeSection, fetchItems, addItem, updateItem,
    updateItemImage, deleteItem
} from './actions/LoginActions'
import NavbarResturant from './NavbarResturant'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { element } from 'prop-types';
class Menu extends React.Component {


    componentDidMount = () => {
        this.props.fetchSection();
    }
    handleSection = (event) => {
        if (window.$('.nav-tabs .active').length == 0) {
            window.$('.nav-tabs')[0].firstElementChild.classList.toggle("active");
        }
        //remove active
        window.$('.nav-tabs .active')[0].classList.toggle("active");
        //add active
        event.target.parentNode.classList.toggle("active");
        this.props.fetchItems(event.target.value);
    }
    renderSection = () => {
        if(!this.props.sections){
            return null
        }
        let listItem = [];
        let sections = this.props.sections;
        let cls;
        for (let i = 0; i < sections.length; i++) {
            i == 0 ? cls = "nav-item active" : cls = "nav-item"
            let item = <li class={cls}>
                <button class="btn" value={sections[i].id} onClick={this.handleSection}>
                    {sections[i].section_text}
                </button>
            </li>
            listItem.push(item)
        }
        return listItem
    }
    setStyle = () => {
        if (this.props.sections && this.props.sections.length == 0) {
            return {
                visibility: "hidden"
            }
        }
    }
    handleSectionAdd = (event) => {
        let sectionText = document.getElementById("sectionText").value;
        if(sectionText){
            this.props.addSection(sectionText);
        }
        else{
            event.preventDefault();
            this.showAlert("Section text cannot be empty");
        }
            
    }
    openModal = () => {
        return (
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Enter the section text</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="sectionText" style={{ width: "100%" }} maxLength="15" required/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleSectionAdd}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    openImageUploader = (event) => {
        let item = event.target.parentNode.dataset.itemid
        this.refs[item].click();
    }
    handleImageUpload = (event) => {
        let file = event.target.files[0];
        const formData = new FormData()
        formData.append(
            'itemImage',
            file,
            file.name,
        );
        formData.append(
            'itemid',
            event.target.parentNode.dataset.itemid
        )
        this.props.updateItemImage(formData, window.$('.nav-tabs .active')[0].firstElementChild.value);
    }
    handleItemdelete = (event) => {
        let itemid = event.target.parentNode.parentNode.dataset.itemid;
        this.props.deleteItem(itemid, window.$('.nav-tabs .active')[0].firstElementChild.value)
    }
    renderItems = () => {
        let cards = [];
        let activeSection = window.$('.nav-tabs .active')[0];
        if (this.props.items && activeSection) {
            let items = this.props.items;
            items.forEach(item => {
                cards.push(<div class="card" data-itemid={item.id}>
                    <button type="button" class="close" aria-label="Close" onClick={this.handleItemdelete}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <input type="image" src={item.image_name} alt="Avatar" class="card-img-top"
                        onClick={this.openImageUploader} style={{ width: "150px", height: "150px", margin: "auto" }} />
                    <input type="file" ref={item.id} style={{ display: "none" }} onChange={this.handleImageUpload} />
                    <div class="card-body">
                        <p class="card-title editCard" data-name="name">{item.name}</p>
                        <p class="card-text editCard" data-name="description">{item.description}</p>
                        <p className="price editCard" data-name="price">$ {item.price}</p >
                        <button type="button" class="btn btn-primary" onClick={this.handleItemEdit} data-itemid={item.id}  >
                            Edit
                        </button>
                    </div >
                    <div class="card-footer">
                        <small class="text-muted">Last ordered {Math.floor(Math.random() * 10)} mins ago</small>
                    </div>
                </div >)
            });
            cards.push(<div class="card" >
                <img class="card-img-top" alt="" />
                <div class="card-body">
                    <p><input class="card-title" placeholder="Enter name" name="name" className="hide" maxLength="20"></input></p>
                    <p><input class="card-text" placeholder="Enter description" name="description" className="hide" maxLength="30"></input></p>
                    <p><input placeholder="Enter price" className="hide" name="price" type="number" max="100" min="1"
                        style={{ width: "10.6rem" }}></input></p>
                    <button type="button" class="btn btn-primary" onClick={this.handleItemAdd} >
                        Add item
                    </button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last ordered {Math.floor(Math.random() * 10)} mins ago</small>
                </div>
            </div>)

        }
        return cards;
    }
    handleItemEdit = (event) => {
        let action = event.target.textContent;
        let elements = event.target.parentNode.getElementsByClassName("editCard");
        let item = {};
        let isEditable;
        if (action === "Edit") {
            isEditable = true;
            event.target.textContent = "Save";
        }
        else {
            isEditable = false;
            event.target.textContent = "Edit";
        }
        for (let i = 0; i < elements.length; i++) {
            elements[i].contentEditable = isEditable;
            item[elements[i].dataset.name] = elements[i].textContent.replace("$", "");
        }

        setTimeout(() => elements[0].focus(), 10);

        if (action === "Save") {
            this.props.updateItem(item, window.$('.nav-tabs .active')[0].firstElementChild.value, event.target.dataset.itemid);
        }

    }
    handleItemAdd = (event) => {
        let action = event.target.textContent;
        let elements = document.getElementsByClassName("hide");
        let item = {};
        for (let i = 0; i < elements.length; i++) {
            item[elements[i].name] = elements[i].value
            if (item[elements[i].name] == "" && action == "save") {
                this.showAlert("Enter all the requred fields", "Error");
                return;
            }
            if(action == "save" && elements[i].name == "price" 
               && ( !parseFloat(elements[i].value) || parseFloat(elements[i].value) < 1)) {
                this.showAlert("Enter valid price", "Error");
                return;
            }
            elements[i].classList.toggle("show");
        }
        if (action === "save") {
            this.props.addItem(item, window.$('.nav-tabs .active')[0].firstElementChild.value);
        }

        action == "save" ? event.target.textContent = "Add item" : event.target.textContent = "save";

    }
    showAlert = (msg, title) => {
        confirmAlert({
            title: title,
            message: msg,
            buttons: [
                {
                    label: 'Ok',

                }
            ]
        });
    }
    handleRemoveSection = () => {
        if (window.$('.nav-tabs .active')[0])
            this.props.removeSection(window.$('.nav-tabs .active')[0].firstElementChild.value);
    }
    render() {
        return (
            <div>
                <NavbarResturant />
                <div class="card text-center" >
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            {this.renderSection()}
                            <div style={{ position: "absolute", right: "0" }} >
                                <button class="btn" data-toggle="modal" data-target="#exampleModalCenter"> Add Section</button>
                                <button class="btn" style={this.setStyle()} onClick={this.handleRemoveSection} >Remove Section</button>
                            </div>
                        </ul>

                    </div>
                    <br />
                    <div class="card-deck">
                        {this.renderItems()}
                    </div>
                    {this.openModal()}
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        sections: state.SectionReducer.sections,
        items: state.SectionReducer.items,
        isLoading: state.ErrorReducer.isLoading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSection: () => { dispatch(fetchSection()) },
        addSection: (section) => { dispatch(addSection(section)) },
        addItem: (item, section) => { dispatch(addItem(item, section)) },
        updateItem: (item, section, id) => { dispatch(updateItem(item, section, id)) },
        fetchItems: (section) => { dispatch(fetchItems(section)) },
        removeSection: (section) => { dispatch(removeSection(section)) },
        updateItemImage: (image, section) => { dispatch(updateItemImage(image, section)) },
        deleteItem: (item, section) => { dispatch(deleteItem(item, section)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
