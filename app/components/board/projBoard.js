var React = require('react'),
    Nav = require('./../nav'),
    List = require('./list/List'),
    Modal = require('react-materialize').Modal,
    helpers = require('./../utils/helpers'),
    // Packery = require('packery'),
    // Draggabilly = require('draggabilly'),
    Isotope = require('isotope-layout');

Modal.defaultProps = {
    actions: false
};

var ProjBoard = React.createClass({
    getInitialState: function() {
        return {
            listName: '',
            lists: [],
            users: []
        }
    },

    componentDidMount: function() {
        // Isotope intitialize
        var elem = document.querySelector('.grid');
        var iso = new Isotope(elem, {
            layoutMode: 'fitRows',
            itemSelector: '.grid-item',
            percentPosition: true,
            fitRows: {
                // options
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer'
            },
            getSortData: {
                title: '[data-title]', // value of attribute
            },
            sortBy: 'title'
        });
        // bind sort button click
        $(document.body).on( 'click', '#sorter', function() {
          var sortValue = $(this).attr('data-sort-value');
          $grid.isotope({ sortBy: 'title' });
        });
        // Trigger tooltip
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });
        // Make server call to get project
        helpers.getProject("bake-some-pies").then(function(data){
            this.setState({lists: data.lists, users: data.users});
            console.log(this.state)
        }.bind(this))
    },

    componentDidUpdate: function(prevProps, prevState) {
        // Isotope intitialize
        var elem = document.querySelector('.grid');
        var iso = new Isotope(elem, {
            layoutMode: 'fitRows',
            itemSelector: '.grid-item',
            percentPosition: true,
            fitRows: {
                // options
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer'
            },
            getSortData: {
                title: '[data-title]', // value of attribute
            },
            sortBy: 'title'
        });
        // bind sort button click
        $(document.body).on( 'click', '#sorter', function() {
          var sortValue = $(this).attr('data-sort-value');
          $grid.isotope({ sortBy: 'title' });
        });
        // Trigger tooltip
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });
    },

    handleChange: function(event){
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function(event){
        event.preventDefault();
        // Variables for incomplete app...
        var team = 'regulators';
        var project = 'bake-some-pies';
        helpers.addList(team, project, this.state.listName).then(function(data){
            this.state.listName = '';
            // Another server call to reload lists
            helpers.getProject("bake-some-pies").then(function(data){
                this.setState({lists: data.lists});
            }.bind(this))
        }.bind(this));
    },

    setParent: function(newLists){
        this.setState({
            lists: []
        })
        this.setState({
            lists: newLists
        })
        alert("Update successful.")
    },

    renderLists: function() {
        var parentFcn = this.setParent
        var users = this.state.users
        return this.state.lists.map(function(currentList,index){
            return (
                <List 
                    key={index}
                    id={"list-"+index}
                    listIndex={index}
                    title={currentList.title}
                    listId={currentList.listId}
                    tasks={currentList.tasks}
                    setParent={parentFcn}
                    users={users}
                />
            )
        });
    },

    render: function() {
        return (
            <div>
                
                {/* Nav */}
                <Nav />

                {/* Filter Dropdown */}
                <ul id="dropdown-filters" className="dropdown-content">
                    <li><a href="#!">All Tasks</a></li>
                    <li><a href="#!">My Tasks</a></li>
                    <li><a href="#!">Due Soon</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Remove Filter</a></li>
                </ul>

                {/* Board */}
                <main>
                    <div className="main-board">

                        {/* Filter */}
                        <div className="proj-buttons-div">
                             <div className="proj-buttons-inner">
                                 <a href="" className="tooltipped"data-delay="50" data-tooltip="Re-sort" id="sorter" data-sort-value="title"><i className="material-icons center">filter_list</i></a>
                             </div>

                            {/* Add a List */}
                             <div className="proj-buttons-inner">
                                <Modal
                                    trigger={
                                        <a href="#modal1" className="tooltipped" data-delay="50" data-tooltip="Add a List"><i className="material-icons center">add</i></a>
                                    }
                                >

                                    <div className="modal-content">
                                        <h4>Add a List</h4>
                                        <div className="row">
                                            {/* FORM WITH POST */}
                                            <form className="col s12" onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input 
                                                            id="listName" 
                                                            type="text" 
                                                            className="validate"
                                                            value={this.state.listName}
                                                            onChange={this.handleChange} 
                                                        />
                                                        <label htmlFor="listName">List Name</label>
                                                    </div>
                                                    <div className="col s12 right-align">
                                                        <button type="submit" className="modal-action modal-close waves-effect waves-green btn btn-modal">Save</button>
                                                        <a className="modal-action modal-close waves-effect waves-green btn" onClick={$('#modal1').modal('close')}>Cancel</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </Modal>

                             </div>
                        </div>

                        {/* Packery grid settings */}
                        <div className="grid">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>

                            {/* List Component */}

                            {this.renderLists.call(this)}

                        </div>
                    </div>
                </main>
            
            </div>
        );
    }
});

module.exports = ProjBoard;