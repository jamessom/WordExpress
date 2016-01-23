import React from 'react';
import Relay from 'react-relay';

import Page from '../pages/page.js';
import PostContent from './PostContent.js';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostSingle extends React.Component{

  componentDidMount(){
    const post = this._post;
    TweenMax.fromTo(post, 0.5, {
      opacity: 0
    }, {
      opacity: 1
    });
  }

  render(){
    console.log(this.props);
    const { post_title, post_content, thumbnail } = this.props.viewer.page;
    const { uploads } = this.props.viewer.settings;
    const bg = {
      backgroundImage: "url('" + uploads + thumbnail + "')"
    }

    return(
      <div ref={(c) => this._post = c} styleName="base">
        <header styleName="header" style={bg}>
        </header>
        <div styleName="main">
          <div styleName="wrapper">
            <h1 styleName="title">{post_title}</h1>
            <div styleName="content">
              <PostContent post_content={post_content}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(PostSingle, {
  initialVariables: {
    post: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_name:$post){
          id
          post_title
          post_content
        },
        settings{
          id
          uploads
        }
			}
    `,
  },
});