import React from 'react'
import styled from 'styled-components'
import { RP_RED, RP_WHITE, RP_DARK_GREY, RP_DDD, RP_SUPER_LIGHT } from 'Components'


export class Menu extends React.PureComponent {
  render() {
    return (
      <MenuContainer>
        {this.props.items.map((item, index) => {
          return (
            <MenuItem
              key={index}
              isSelected={item.isSelected}
              onClick={item.onClick}>
              <i className={item.icon}></i> &nbsp; {item.text}
            </MenuItem>
          )
        })}
      </MenuContainer>
    )
  }
}
export default Menu

const MenuContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 20vw;
  height: auto;
  margin: 0 1vw 0 0;
  background: ${RP_WHITE};

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    margin: 0 0 4vmin 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 100%;
    margin: 1vmin 0 4vmin 0;
    background: ${RP_SUPER_LIGHT};
    text-align: left;
  }
`
const MenuItem = styled.button`
  cursor: pointer;
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  padding: 1vmin 2vmin;
  background: ${(props) => props.isSelected ? RP_RED + '!important' : 'transparent'};

  color: ${(props) => props.isSelected ? 'white !important' : RP_DARK_GREY};
  font-size: 1.8vmin;
  text-align: left;

  border-radius: 0;
  border: none;
  transition: all 0.5s ease;

  i {
    width: 2vmin;
    height: 2vmin;
    text-align: center;
    line-height: 2vmin;
  }

  @media (min-width: 1025px) { 
    &:hover {
      background: ${RP_DDD};
      color: ${RP_RED};
    }
  }

  @media (max-width: 767px) and (orientation: portrait) { 
    display: inline-block;
    width: auto;
    border-radius: 0;
    background: ${(props) => props.isSelected ? RP_RED + '!important' : RP_SUPER_LIGHT};
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    display: inline-block;
    width: auto;
    border-radius: 0;
    background: ${(props) => props.isSelected ? RP_RED + '!important' : RP_SUPER_LIGHT};
  }
`