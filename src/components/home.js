import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component{
    state = {
        posts: [ ]
    }
    componentWillMount(){
        axios.get('ttps://overwatch-api.net/api/v1/ability?page=10&limit=20')
            .then(res => {
                console.log(res.data);
                this.setState({
                    posts: res.data.slice(0,10)
                })
            })
    }
    render(){
        const {posts} = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <Link to={'/' + post.id} >
                            <span className="card-title red-text">{post.title}</span>
                            </Link>
                            <p>{post.body}</p>
                        </div>  
                    </div>
                )
            })
        ) : (
            <div className="center">Type below to search</div>
        )
        return(
            <div className="container home">
                <h4 className="center">Home</h4>
                {postList}
            </div>
        );
    }
}

export default Home;