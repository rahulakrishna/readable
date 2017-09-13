import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {red500} from 'material-ui/styles/colors'
import {connect} from 'react-redux'
import {getCommentDetails,voteOnComment,editComment,deleteComment} from '../actions'
import {showEditDialog,hideEditDialog,updateCommentField} from '../actions/commentActions'
import {toDate} from '../utils/helper'
import PropTypes from 'prop-types'

class Comment extends React.Component {
    static propTypes={
        commentOpen:PropTypes.bool.isRequired,
        close:PropTypes.func.isRequired,
        comment:PropTypes.object.isRequired,
        commentDetails:PropTypes.object.isRequired,
        getDetails:PropTypes.func.isRequired,
        vote:PropTypes.func.isRequired,
        edit:PropTypes.func.isRequired,
        deleteComment:PropTypes.func.isRequired
    }
    componentWillReceiveProps(){
        if(this.props.comment.id!==this.props.commentDetails.id){
            this.props.getDetails(this.props.comment.id)
        }
    }
    edit=()=>{
        this.props.edit(this.props.commentDetails.id,this.props.commentState.editComment)
        this.props.hideCommentEditDialog()
    }
    deleteComment=()=>{
        this.props.deleteComment(this.props.commentDetails.id)
        this.props.close()
    }
    render(){
        console.log(this.props.comment)
        return(
            <div>
                  <Dialog
                      open={this.props.commentOpen}
                      actions={
                        [
                            <RaisedButton
                                label="Delete Comment"
                                backgroundColor={red500}
                                onClick={this.deleteComment}
                            />,
                            <RaisedButton
                                label="Edit"
                                onClick={()=>{
                                    this.props.updateCommentField(this.props.comment.body)
                                    this.props.showCommentEditDialog()
                                }}
                            />,
                            <RaisedButton
                                label="Upvote"
                                onClick={()=>{this.props.vote(this.props.commentDetails.id,'upVote')}}
                            />,
                            <RaisedButton
                                label={`${this.props.commentDetails.voteScore} Votes`}
                                disabled={true}
                            />,
                            <RaisedButton
                                label="Downvote"
                                onClick={()=>{this.props.vote(this.props.commentDetails.id,'downVote')}}
                            />,
                            <RaisedButton
                                label="Close"
                                onClick={this.props.close}
                            />
                        ]
                      }
                      title={`${this.props.comment.author} commented`}
                  >
                      {this.props.commentDetails.body}
                      <br/>
                      {toDate(this.props.commentDetails.timestamp)}
                  </Dialog>

                    {/*Edit Dialog follows*/}
                    <Dialog
                        open={this.props.commentState.showEditDialog}
                        title={`Edit ${this.props.commentDetails.author}'s comment`}
                        actions={
                            [
                                <RaisedButton
                                    label="Close"
                                    onClick={()=>{this.props.hideCommentEditDialog()}}
                                />,
                                <RaisedButton
                                    label="Submit"
                                    onClick={this.edit}
                                />
                            ]
                        }
                    >
                        <TextField
                            floatingLabelText="Comment"
                            fullWidth={true}
                            value={this.props.commentState.editComment}
                            onChange={(e)=>{this.props.updateCommentField(e.target.value)}}
                        />
                    </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        commentDetails:state.commentDetailReducer.details,
        commentState:state.commentReducer.commentState
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getDetails:(id)=>dispatch(getCommentDetails(id)),
        vote:(id,value)=>dispatch(voteOnComment(id,value)),
        edit:(id,body)=>dispatch(editComment(id,body)),
        deleteComment:(id)=>dispatch(deleteComment(id)),
        showCommentEditDialog:()=>dispatch(showEditDialog()),
        hideCommentEditDialog:()=>dispatch(hideEditDialog()),
        updateCommentField:(comment)=>dispatch(updateCommentField(comment))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment)