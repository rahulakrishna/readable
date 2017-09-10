import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import {getCommentDetails,voteOnComment} from '../actions'
import {toDate} from '../utils/helper'

class Comment extends React.Component {
    componentWillReceiveProps(){
        if(this.props.comment.id!==this.props.commentDetails.id){
            this.props.getDetails(this.props.comment.id)
        }
    }
    render(){
        console.log(this.props.comment)
        return(
          <Dialog
              open={this.props.commentOpen}
              actions={
                [
                    <RaisedButton
                      label="Close"
                      onClick={this.props.close}
                    />,
                    <RaisedButton
                        label="Edit"
                        onClick={()=>{}}
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
                    />
                ]
              }
              title={`${this.props.comment.author} commented`}
          >
              {this.props.commentDetails.body}
              <br/>
              {toDate(this.props.commentDetails.timestamp)}
          </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return{
        commentDetails:state.commentDetailReducer.details
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getDetails:(id)=>dispatch(getCommentDetails(id)),
        vote:(id,value)=>dispatch(voteOnComment(id,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment)