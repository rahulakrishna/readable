/**
 * Created by rahul on 13/9/17.
 */
import React from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {green500,white} from 'material-ui/styles/colors'

import {openNav,closeNav} from '../actions/homeActions'
import {Link} from 'react-router-dom'

class RenderedAppBar extends React.Component{
    render(){
        const categoryLinks=this.props.categories.map((cat)=>(
            <Link to={`/${cat.path}/posts`} key={cat.path}>
                <MenuItem primaryText={cat.name}/>
            </Link>
        ))
        console.log(this.props.categories)
        return(
            <div>
                <AppBar
                    title='Readable'
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={{background:green500}}
                     onClick={(e)=>{
                       e.preventDefault()
                       this.props.openNav(e)
                     }}
                />
                <Popover
                    open={this.props.homeState.navOpen}
                    anchorEl={this.props.homeState.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={()=>{this.props.closeNav()}}
                >
                    <Menu>
                        <Link to="/"><MenuItem primaryText="Home"/></Link>
                    </Menu>
                    {categoryLinks}
                </Popover>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        homeState:state.homeReducer.homeState,
        categories:state.categoryReducer.categories
    }
}

function mapDispatchToProps(dispatch){
    return{
        closeNav:()=>dispatch(closeNav()),
        openNav:(e)=>dispatch(openNav(e))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RenderedAppBar)