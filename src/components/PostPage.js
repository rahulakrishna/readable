import React from 'react'
import {getPostDetails,getPostComments,postComment} from '../actions'

import {connect} from 'react-redux'

import {Row,Col} from 'react-flexbox-grid'
import {CardText,Card,CardHeader,CardTitle} from 'material-ui/Card'
import {List,ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {green500,white} from 'material-ui/styles/colors'

import {toDate} from '../utils/helper'


class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.post_id,
            author:'',
            body:'',
            buttonDisabled:false
        }
    }
    componentDidMount(){
        const {match}=this.props
        this.props.getDetails(match.params.post_id)
        this.props.getComments(match.params.post_id)
    }
    handleValueChange=(parameter)=>{
        return (e)=> {
            const state={}
            state[parameter]=e.target.value
            this.setState(state)
        }
    }
    handleComment=()=>{
        this.setState({
            buttonDisabled:true
        },()=>{
            window.setTimeout(this.setState({
                buttonDisabled:false
            }),1000)
        })
        const {match}=this.props
        this.props.postComment(match.params.post_id,this.state.body,this.state.author)
    }
    render(){
        const {details,comments}=this.props
        const mappedComments=comments.map((comment)=>{
            return(
                <div key={comment.id}>
                    <ListItem primaryText={comment.body} secondaryText={`${comment.author} commented on ${toDate(comment.timestamp)}`}/>
                </div>
            )
        })
        return(
            <div className="container-fluid">
                <Row>
                <Col xs={12} md={12} sm={12} lg={12} style={{marginBottom:'20px'}}>
                        <Card>
                            <CardHeader
                                title={details.author}
                                subtitle={`posted in ${details.category}`}
                            />
                            <CardTitle title={details.title} subtitle={`detailsed on ${toDate(details.timestamp)}`} />
                            <CardText>{details.body}</CardText>
                        </Card>
                        <h3>Comments</h3>
                        <hr/>
                        <List>
                            {mappedComments}
                            <ListItem>
                                <TextField
                                    fullWidth={true}
                                    placeholder="Your name"
                                    onChange={this.handleValueChange('author')}
                                />
                                <TextField
                                    fullWidth={true}
                                    placeholder="Your 2 cents..."
                                    multiLine={true}
                                    rows={2}
                                    onChange={this.handleValueChange('body')}
                                />
                                <RaisedButton
                                    label="Comment"
                                    fullWidth={true}
                                    backgroundColor={green500}
                                    labelColor={white}
                                    onClick={this.handleComment}
                                    disabled={this.state.buttonDisabled}
                                />
                            </ListItem>
                        </List>
                </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        details:state.postDetailsReducer.details,
        comments:state.getCommentsReducer.comments
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getDetails:(id)=>dispatch(getPostDetails(id)),
        getComments:(id)=>dispatch(getPostComments(id)),
        postComment:(id,body,author)=>dispatch(postComment(id,body,author))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)