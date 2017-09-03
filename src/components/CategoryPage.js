import React from 'react'
import {getPosts,postAPost} from '../actions'
import axios from 'axios'

import {connect} from 'react-redux'


import {Row,Col} from 'react-flexbox-grid'
import {Card,CardTitle,CardText,CardHeader} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {green500,white} from 'material-ui/styles/colors'

import {Link} from 'react-router-dom'

import {toDate} from '../utils/helper'

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
    constructor(props){
        super(props)
        this.state={
            title:'',
            author:'',
            body:'',
            buttonDisabled:false
        }
    }
    componentDidMount(){
        const {match}=this.props
        axios({
            method:'get',
            url:`http://localhost:5001/${match.params.category}/posts`,
            headers:{
                'Authorization':'Do I love cats?'
            }
        }).then((data)=>{
            this.props.getAllPosts(data.data)
        })
    }
    handleValueChange=(parameter)=>{
        return (e)=> {
            const state={}
            state[parameter]=e.target.value
            this.setState(state)
        }
    }
    handlePost=()=>{
        this.setState({
            buttonDisabled:true
        },()=>{
            window.setTimeout(this.setState({
                buttonDisabled:false
            }),1000)
        })

        this.props.post(this.state.title,this.state.body,this.state.author,this.props.match.params.category)
    }
    render(){
        const {posts,match}=this.props
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
                                    onChange={this.handleValueChange('title')}
                                />
                                <TextField
                                    fullWidth={true}
                                    placeholder="Your name"
                                    name="author"
                                    underlineFocusStyle={textStyles.underlineStyle}
                                    onChange={this.handleValueChange('author')}
                                />
                                <TextField
                                    fullWidth={true}
                                    placeholder="Content"
                                    name="body"
                                    multiLine={true}
                                    rows={4}
                                    underlineFocusStyle={textStyles.underlineStyle}
                                    onChange={this.handleValueChange('body')}
                                />
                                <RaisedButton
                                    label="Submit"
                                    fullWidth={true}
                                    backgroundColor={green500}
                                    labelColor={white}
                                    onClick={this.handlePost}
                                    disabled={this.state.buttonDisabled}
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
        posts:state.postsReducer.posts
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getAllPosts:(data)=>dispatch(getPosts(data)),
        post:(title,body,author,category)=>dispatch(postAPost(title,body,author,category))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryPage)