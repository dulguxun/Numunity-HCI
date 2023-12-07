import { fetchData } from "../modules/dataFetcher.js";

const jsondata = await fetchData();
const currentUrl = new URL(window.location.href);
const communityId = currentUrl.searchParams.get('communityId');
const community = jsondata.record.community[communityId-1];
const posts = community.posts;
const postsId = currentUrl.searchParams.get('postId');
const comments = posts[postsId].comments;
const postsContainer = document.getElementById("posts-container");
class PostComment extends HTMLElement {
    constructor() {
        super();
        //implementation
        console.log(postsId);
        console.log(posts[postsId-1].postId);
        const filteredSinglePost = posts.filter(post => post.postId === 1);
        console.log(filteredSinglePost);
        this.#RenderSinglePost(filteredSinglePost);
        comments.forEach(comment => {
            this.#render(comment);
        });
        }

    #render(comment){
        this.commentId = comment.id;
        this.commentBody = comment.body;
        this.commentUsername = comment.user.username;
        this.commentProfileImage = comment.user.profileImage;
        this.commentPublishedDate = comment.publishedDate;
        
        this.innerHTML = 
        `<div class="single-comment" id="single-comment_${(this.commentId)}">
            <div class="single-comment__profile">
                <img src="${this.commentProfileImage}" alt="profile" class="single-comment__profile__img">
                <p class="single-comment__profile__name">${this.commentUsername}</p>
            </div>
            <p class="single-comment__detail">${this.commentBody}</p>

            <div class="single-comment__reactions">                            
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-up"></i>Agree</p>
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-down"></i></p>                                
                <p class="single-comment__reactions__list"><i class="fa-solid fa-reply"></i>Reply</p>
            </div>
        </div>`
    }
    #RenderSinglePost(post) {
        this.postId = post.postId;
        this.postUsername = post.username;
        this.postProfileImage = post.profileImage;
        this.postTitle = post.postTitle;
        this.postDetail = post.postDetail;
        this.publishedDate = post.publishedDate;
        this.timeAgo = new Date();
        this.timeAgo = Date.parse(this.timeAgo) - Date.parse(this.publishedDate);
        this.timeAgo = new Date(this.timeAgo);
        this.agreeCount = post.agreeCount;
        this.disagreeCount = post.disagreeCount;
        this.commentCount = post.comments.length;
        this.shareCount = post.shareCount;
        this.communityName = community.communityName;
        postsContainer.innerHTML = `
        <article class="post" id="recentPost_${this.postId}">
            <div class="post__profile" id="posts-container">
                <img src="${this.postProfileImage}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.postUsername}</p>
                <a href="#" class="post__profile__community">>>${this.communityName}</a>
            </div>
            <hr>
            <h1 class="post__title">${this.postTitle}</h1>
            <p class="post__detail">${this.postDetail}</p>
            <div class="post__reactions post__reactions--hidden">
                <agree-disagree></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${this.commentCount}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count">${this.shareCount}</span> Share
                </p>
            </div>
            <p class="post__profile__time post__profile__time--down">1h ago</p>
        </article>`;
    }

    connectedCallback() {
        //implementation
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('post-comment', PostComment);