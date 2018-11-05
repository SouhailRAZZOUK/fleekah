/**
 * Heavily infulenced by https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
 * Basicly it's a copy/paste with minor changes on logic and styles
 * */

import React, { PureComponent } from "react";
import MaterialIcon from "@material/react-material-icon";
import onClickOutside from "react-onclickoutside";

import './styles.css';

class ColorSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  handleClickOutside(e) {
    this.setState({
      listOpen: false
    })
  }

  selectItem(item) {
    let { onChange, itemsKey } = this.props;
    this.props.colors.forEach(color => {
      color.selected = false;
    });
    item.selected = true;
    onChange ?
      this.setState({
        headerTitle: item.value,
        listOpen: false
      }, onChange(item, itemsKey)) :
      this.setState({
        headerTitle: item.value,
        listOpen: false
      });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const { colors, title } = this.props
    const { listOpen, headerTitle } = this.state;

    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">{
            headerTitle === title ?
              headerTitle :
              <span style={{
                display: "inline-block",
                height: "1.5em",
                width: "50%",
                backgroundColor: headerTitle,
                verticalAlign: "middle"
              }}></span>
          }</div>
          {listOpen
            ? <MaterialIcon icon="expand_less" />
            : <MaterialIcon icon="expand_more" />
          }
        </div>
        {listOpen && <ul className="dd-list">
          {colors.map((item, index) => (
            <li className="dd-list-item" key={index} onClick={() => this.selectItem(item)}>
              <span style={{
                display: "inline-block",
                height: "1.5em",
                width: "50%",
                backgroundColor: item.value
              }}></span>
              <span>{item.selected && <MaterialIcon icon="check" />}</span>
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(ColorSelect);
