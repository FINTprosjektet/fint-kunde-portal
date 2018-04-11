import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import { Route,  Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom'
import {fetchPostsWithRedux, deleteAdapter} from '../actions/adaptersAction';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import AdapterPage from '../components/adapters/AdapterPage';
import AdapterView from '../components/adapters/AdapterView';

class AdaptersList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteAdapter= this.deleteAdapter.bind(this);
	}
	componentDidMount(){
  	     this.props.fetchPostsWithRedux()
   }

	deleteAdapter(adapter) {
		 this.props.deleteAdapter(adapter)
	}
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	  renderPosts () {
	    return (
	    		<Router>
	     <div> 
            	<h1>Adapters</h1>

            	<ul>
            		{this.props.posts.map((post, i) =>
                	<div>
	                	<table><tbody><tr>
	            		<td width="90%"><li className="list-group-item" key={i}><Link to={{pathname: '/adapter', state: { post : post}}}>{post.name}</Link></li></td>
	                    <td width="10%"><button type="submit" onClick={() => {this.deleteAdapter(post)}}>Delete</button></td>
	                    </tr></tbody></table>

                	</div>
            		)}
            	</ul>
            	<Route
            	  path="/adapter"
            	  render={({ props }) => (
            	    <AdapterView post={this.props.post} />
            	    )}
            	/>

            	<Route path="/adapters" component={AdapterPage}/>
	      </div>
            	</Router>
	    );
	  }

}



function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchPostsWithRedux: fetchPostsWithRedux, deleteAdapter : deleteAdapter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersList));

