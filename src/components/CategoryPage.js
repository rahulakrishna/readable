import React from 'react'
import {getPosts,postAPost} from '../actions'
import {updateField,clearValues,disableButton,enableButton} from '../actions/categoryPageActions'
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
    constructor(props){
        super(props)
        this.state={
            buttonDisabled:false
        }
    }
    componentDidMount(){
        const {match}=this.props
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/${match.params.category}/posts`,
            headers:{
                'Authorization':'Do I love cats?'
            }
        }).then((data)=>{
            this.props.getAllPosts(data.data)
        })
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
        posts:state.postsReducer.posts,
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
        disableButton:()=>dispatch(disableButton())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryPage)