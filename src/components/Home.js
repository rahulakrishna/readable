import React from 'react'
import {listCategories,getPosts} from './../actions'
import {connect} from 'react-redux'
import axios from 'axios'
import {Row,Col} from 'react-flexbox-grid'
import {Card,CardTitle,CardHeader,CardText} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import {capitalize,toDate} from '../utils/helper'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const NoPostsYet=(props)=>(
    <Col xs={12} md={12} sm={12} lg={12}>
        <Card>
            <CardTitle
                title={`No posts yet in ${props.category}. Check back later.`}
            />
        </Card>
    </Col>
)

class Home extends React.Component{
    static propTypes={
        categories:PropTypes.array.isRequired,
        posts:PropTypes.array.isRequired,
        getAllPosts:PropTypes.func.isRequired,
        list:PropTypes.func.isRequired
    }
    state={
        loading:false
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        this.listAllCategories()
        this.getAllPosts()
    }
    listAllCategories=()=>{
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/categories`,
            headers:{
                'Authorization':'My girlfriend loves me!'
            }
        }).then((data)=>{
            console.log('From the component:',data)
            this.props.list(data)
            this.setState({
                loading:false
            })
        })
    }
    getAllPosts=()=>{
        console.log(process.env.REACT_APP_BACKEND_URL)
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts`,
            headers:{
                'Authorization':'I should be sleeping!'
            }
        }).then((data)=>{
            this.props.getAllPosts(data.data)
        })
    }
    render(){
        const {categories,posts,match}=this.props
        const mappedCategories=categories.map((cat)=>{
            return(
                <Col xs={12} md={4} key={cat.path} style={{marginTop:'20px'}}>
                    <Link to={`${cat.path}/posts`}>
                        <Card>
                            <CardTitle title={capitalize(cat.name)} style={{textAlign:'center'}}/>
                        </Card>
                    </Link>
                </Col>
            )
        })
        const mappedPosts=posts.map((post)=>(
            <Col xs={12} md={12} sm={12} lg={12} key={post.id} style={{marginBottom:'20px'}}>
                <Link to={`${post.category}/posts/${post.id}`}>
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
                    {mappedCategories}
                </Row>

                <Row style={{marginTop:'20px'}}>
                    <Col xs={12} md={12} sm={12} lg={12} style={{marginBottom:'20px'}}>
                        <h1>All Posts</h1>
                        <hr/>
                    </Col>

                    {(this.state.loading)?<CircularProgress style={{textAlign:'center'}}/>:''}
                    {(mappedPosts.length>0 && this.state.loading!==true)?mappedPosts:<NoPostsYet category='All Posts'/>}
                </Row>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        list:(data)=>dispatch(listCategories(data)),
        getAllPosts:(data)=>dispatch(getPosts(data))
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
        posts: state.postsReducer.posts
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)