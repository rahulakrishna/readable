import React from 'react'
import {getPosts,postAPost} from '../actions'
import {updateField,clearValues,disableButton,enableButton,getCategoryPosts} from '../actions/categoryPageActions'
import axios from 'axios'
import {connect} from 'react-redux'
import {Row,Col} from 'react-flexbox-grid'
import {Card,CardTitle,CardText,CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {green500,white} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom'
import {toDate} from '../utils/helper'
import PropTypes from 'prop-types'

const textStyles={
    underlineStyle:{
        borderColor:green500
    }
}

const NoPostsYet=(props)=>(
    <Col xs={12} md={12} sm={12} lg={12}>
        <Card>
            <CardTitle
                title={`No posts yet in ${props.category}. Check back later. Or...`}
            />
        </Card>
    </Col>
)

class CategoryPage extends React.Component{
    static propTypes={
        posts:PropTypes.array.isRequired,
        post:PropTypes.func.isRequired,
        getAllPosts:PropTypes.func.isRequired
    }
    state={
        category:''//I need this to determine the route change. ComponentDidMount Won't get called if you change the route to this component from this component itself. And ComponentWillReceiveProps gets called too many times.
    }
    componentDidMount(){
        this.getCategoryPosts()
        this.setState({
            category:this.props.match.params.category
        })
    }
    componentWillReceiveProps(){
        this.setState({
            category:this.props.match.params.category
        })
    }
    getCategoryPosts=()=>{
        const {match}=this.props
        this.props.getCategoryPosts(match.params.category)
    }
    handlePost=()=>{
        const {title,body,author}=this.props.fields
        this.props.post(title,body,author,this.props.match.params.category)
        this.props.clearFields()
        this.props.disableButton()
        setTimeout(()=>{this.props.enableButton()},1000)
    }
    render(){
        const {posts,match}=this.props
        const category=match.params.category
        if(this.state.category!==category){
            this.getCategoryPosts()
        }
        const mappedPosts=posts.map((post)=>(
            <Col xs={12} md={12} sm={12} lg={12} key={post.id} style={{marginBottom:'20px'}}>
                <Link to={`posts/${post.id}`}>
                    <Card>
                        <CardHeader
                            title={post.author}
                            subtitle={`posted in ${post.category}`}
                        />
                        <CardTitle title={post.title} subtitle={`posted on ${toDate(post.timestamp)}`} />
                        <CardText>{post.body}</CardText>
                    </Card>
                </Link>
            </Col>
        ))
        return(
            <div className="container-fluid">
                <Row style={{marginTop:'20px'}}>
                    <Col xs={12} md={12} sm={12} lg={12}>
                        <h1>Posts in /{match.params.category}</h1>
                        <hr/>
                    </Col>
                    {(mappedPosts.length>0)?mappedPosts:<NoPostsYet category={match.params.category}/>}
                </Row>
                <Row>
                    <Col xs={12} md={12} sm={12} lg={12}>
                        <Card>
                            <CardTitle
                                title="Add a new post!"
                            />
                            <CardText>
                                <TextField
                                    fullWidth={true}
                                    placeholder="Title of the post"
                                    name="title"
                                    underlineFocusStyle={textStyles.underlineStyle}
                                    onChange={(e)=>{this.props.updateField(e,'title')}}
                                    value={this.props.fields.title}
                                />
                                <TextField
                                    fullWidth={true}
                                    placeholder="Your name"
                                    name="author"
                                    underlineFocusStyle={textStyles.underlineStyle}
                                    onChange={(e)=>{this.props.updateField(e,'author')}}
                                    value={this.props.fields.author}
                                />
                                <TextField
                                    fullWidth={true}
                                    placeholder="Content"
                                    name="body"
                                    multiLine={true}
                                    rows={4}
                                    underlineFocusStyle={textStyles.underlineStyle}
                                    onChange={(e)=>{this.props.updateField(e,'body')}}
                                    value={this.props.fields.body}
                                />
                                <RaisedButton
                                    label="Submit"
                                    fullWidth={true}
                                    backgroundColor={green500}
                                    labelColor={white}
                                    onClick={this.handlePost}
                                    disabled={this.props.fields.buttonDisabled}
                                />
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        posts:state.categoryPostReducer.posts,
        fields:state.categoryPageReducer.details
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getAllPosts:(data)=>dispatch(getPosts(data)),
        post:(title,body,author,category)=>dispatch(postAPost(title,body,author,category)),
        updateField:(parameter,e)=>dispatch(updateField(parameter,e)),
        clearFields:()=>dispatch(clearValues()),
        enableButton:()=>dispatch(enableButton()),
        disableButton:()=>dispatch(disableButton()),
        getCategoryPosts:(category)=>dispatch(getCategoryPosts(category))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryPage)