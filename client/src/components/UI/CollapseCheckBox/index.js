import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';

class CollapseCheckBox extends Component {
    state = {
        open: false,
        checked: []
    };

    componentDidMount() {
        if (this.props.initState)
            this.setState({open: this.props.initState});
    }

    clickHandler = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    renderListHandler = () => (
        this.props.list.length > 0 ?
            this.props.list.map((value) =>(
                <ListItem 
                    key={value._id}
                    style={{padding: '10px 0'}}
                >
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.checkboxToggleHandler(value._id)}
                            checked={this.state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        :
        <LinearProgress />
    )

    checkboxToggleHandler = id => () => {
        //const checked = this.state.checked;
        const { checked } = this.state;
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1)
            newChecked.push(id);
        else 
            newChecked.splice(currentIndex, 1);

        this.setState({checked: newChecked}, () => {
            this.props.filterHandler(newChecked)
        });
    }

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem 
                        onClick={this.clickHandler}
                        style={{padding: '10px 23px 10px 0'}}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        <FontAwesomeIcon 
                            icon={this.state.open ? faAngleUp : faAngleDown}
                            className="icon"
                        />
                    </ListItem>           
                    <Collapse
                            in={this.state.open}
                            timeout="auto"
                            unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            {this.renderListHandler()}
                        </List>
                    </Collapse>    
                </List>
            </div>
        );
    }
}

export default CollapseCheckBox;