import React from 'react'
import {
    getPostDetails,
    getPostComments,
    postComment,
    postVote,
    editPost,
    deletePost
} from '../actions'

import {
    updateField,
    enableButton,
    disableButton,
    showEditDialog,
    hideEditDialog,
    showDeleteDialog,
    hideDeleteDialog,
    showCommentDialog,
    hideCommentDialog,
    updateEditDialog
} from '../actions/postPageActions'

import {connect} from 'react-redux'

import {Row,Col} from 'react-flexbox-grid'
import {CardText,Card,CardHeader,CardTitle,CardActions} from 'material-ui/Card'
import {List,ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {green500,white,red500} from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import {Link} from 'react-router-dom'
import {toDate} from '../utils/helper'
import Comment from './Comment'
import PropTypes from 'prop-types'


class Post extends React.Component{
    static propTypes={
        details:PropTypes.object.isRequired,
        comments:PropTypes.array.isRequired,
        getDetails:PropTypes.func.isRequired,
        getComments:PropTypes.func.isRequired,
        postComment:PropTypes.func.isRequired,
        postVote:PropTypes.func.isRequired,
        editPost:PropTypes.func.isRequired,
        deletePost:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={
            author:'',
            body:'',
            buttonDisabled:false,
            showEditDialog:false,
            showDeleteDialog:false,
            showCommentDialog:false,
            newBody:'',
            newTitle:'',
            editSubmitButtonDisabled:false,
            selectedComment:{}
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
        this.props.postComment(match.params.post_id,this.props.applicationState.body,this.props.applicationState.author)
    }
    vote=(id,vote)=>{
        this.props.postVote(id,vote)
    }
    editPost=(details)=>{
        this.props.showEditDialog()
        this.props.updateEditDialog(details.body,details.title)
        this.setState({
            showEditDialog:true,
            newTitle:details.title,
            newBody:details.body
        })
    }
    handleEdit=()=>{
        const id=this.props.match.params.post_id
        this.props.editPost(id,this.props.applicationState.newTitle,this.props.applicationState.newBody)
        this.props.hideEditDialog()
    }
    deletePost=()=>{
        this.props.showDeleteDialog()
    }
    handleDelete=()=>{
        const id=this.props.match.params.post_id
        this.props.deletePost(id)
        this.props.hideDeleteDialog()
    }
    selectComment=(comment)=>{
        console.log(comment)
        this.setState({
            selectedComment:comment
        },()=>{
            this.setState({
                showCommentDialog:true
            })
        })
    }
    render(){
        const {details,comments}=this.props
        const mappedComments=comments.map((comment)=>{
            return(
                <div key={comment.id}>
                    <ListItem
                        primaryText={comment.body}
                        secondaryText={`${comment.author} commented on ${toDate(comment.timestamp)}`}
                        onClick={()=>{this.selectComment(comment)}}
                    />
                </div>
            )
        })
        return(
            <div className="container-fluid">
            {(Object.keys(details).length>1)?
                <div>
                    <Row>
                        <Col xs={12} md={12} sm={12} lg={12} style={{marginBottom:'20px'}}>
                            <Card>
                                <CardHeader
                                    title={details.author}
                                    subtitle={`posted in ${details.category}`}
                                />
                                <CardTitle title={details.title} subtitle={`posted on ${toDate(details.timestamp)}`} />
                                <CardText>{details.body}</CardText>
                                <CardActions>
                                    <div style={{textAlign:'right'}}>
                                        <RaisedButton
                                            label='Delete Post'
                                            onClick={()=>{(this.deletePost(details))}}
                                            backgroundColor={red500}
                                            style={{color:white}}
                                        />
                                        <RaisedButton
                                            label='Edit Post'
                                            onClick={()=>{this.editPost(details)}}
                                        />
                                        <RaisedButton
                                            label='Upvote'
                                            onClick={()=>{this.vote(details.id,'upVote')}}
                                        />
                                        <RaisedButton
                                            label={`${details.voteScore} Votes`}
                                            disabled={true}
                                        />
                                        <RaisedButton
                                            label='Downvote'
                                            onClick={()=>{this.vote(details.id,'downVote')}}
                                        />
                                    </div>
                                </CardActions>
                            </Card>
                            <h3>Comments({mappedComments.length}) <span style={{fontWeight:'normal',fontSize:'14px'}}>Click on a comment to see more details</span> </h3>
                            <hr/>
                            <List>
                                {mappedComments}
                                <ListItem>
                                    <TextField
                                        fullWidth={true}
                                        placeholder="Your name"
                                        onChange={(e)=>{this.props.updateField(e,'author')}}
                                    />
                                    <TextField
                                        fullWidth={true}
                                        placeholder="Your 2 cents..."
                                        multiLine={true}
                                        rows={2}
                                        onChange={(e)=>{this.props.updateField(e,'body')}}
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

                    <Dialog
                        title={`Editing ${details.title}`}
                        actions={[
                            <RaisedButton
                                label='Cancel'
                                onClick={()=>{this.props.hideEditDialog()}}
                            />,
                            <RaisedButton
                                label='Submit'
                                onClick={()=>{this.handleEdit()}}
                            />
                        ]}
                        open={this.props.applicationState.showEditDialog}
                        onRequestClose={()=>{this.props.hideEditDialog()}}
                    >
                        <TextField
                            fullWidth={true}
                            floatingLabelText="Title"
                            value={this.props.applicationState.newTitle}
                            onChange={(e)=>{this.props.updateField(e,'newTitle')}}
                        />
                        <TextField
                            fullWidth={true}
                            floatingLabelText="Body"
                            value={this.props.applicationState.newBody}
                            onChange={(e)=>{this.props.updateField(e,'newBody')}}
                            multiLine={true}
                        />
                    </Dialog>

                    <Dialog
                        title={`Are you sure? Delete "${details.title}"?`}
                        actions={[
                            <RaisedButton
                                label='Cancel'
                                onClick={()=>{this.props.hideDeleteDialog()}}
                            />,
                            <RaisedButton
                                label='Delete'
                                backgroundColor={red500}
                                onClick={()=>{
                                    this.handleDelete()
                                    this.setState({showEditDialog:false})
                                }}
                            />
                        ]}
                        open={this.props.applicationState.showDeleteDialog}
                        onRequestClose={()=>{this.props.hideDeleteDialog()}}
                    >

                    </Dialog>

                    <Comment
                        commentOpen={this.state.showCommentDialog}
                        close={()=>{this.setState({showCommentDialog:false})}}
                        comment={this.state.selectedComment}
                    />
                </div>
                :
                <div>
                    Post Deleted <Link to="/">Go to homepage</Link>
                </div>
            }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        details:state.postDetailsReducer.details,
        comments:state.getCommentsReducer.comments,
        applicationState:state.postPageReducer.applicationState
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getDetails:(id)=>dispatch(getPostDetails(id)),
        getComments:(id)=>dispatch(getPostComments(id)),
        postComment:(id,body,author)=>dispatch(postComment(id,body,author)),
        postVote:(id,vote)=>dispatch(postVote(id,vote)),
        editPost:(id,title,body)=>dispatch(editPost(id,title,body)),
        deletePost:(id)=>dispatch(deletePost(id)),
        updateField:(e,parameter)=>dispatch((updateField(e,parameter))),
        enableButton:()=>dispatch(enableButton()),
        disableButton:()=>dispatch(disableButton()),
        showEditDialog:()=>dispatch(showEditDialog()),
        hideEditDialog:()=>dispatch(hideEditDialog()),
        showDeleteDialog:()=>dispatch(showDeleteDialog()),
        hideDeleteDialog:()=>dispatch(hideDeleteDialog()),
        showCommentDialog:()=>dispatch(showCommentDialog()),
        hideCommentDialog:()=>dispatch(hideCommentDialog()),
        updateEditDialog:(newBody,newTitle)=>dispatch(updateEditDialog(newBody,newTitle))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
