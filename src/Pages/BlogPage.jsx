import React, { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 casual look ideas to dress up your kids",
    category: "Fashion",
    image: "images/post-img1.jpg",
    day: "22",
    month: "Aug-2021",
  },
  {
    id: 2,
    title: "Latest trends of wearing street wears supremely",
    category: "Trending",
    image: "images/post-img2.jpg",
    day: "25",
    month: "Aug-2021",
  },
  {
    id: 3,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img3.jpg",
    day: "28",
    month: "Aug-2021",
  },
  // Repeat or add more items as needed...
  {
    id: 4,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img2.jpg",
    day: "28",
    month: "Aug-2021",
  },
  {
    id: 5,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img3.jpg",
    day: "28",
    month: "Aug-2021",
  },
  {
    id: 6,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img1.jpg",
    day: "28",
    month: "Aug-2021",
  },
  {
    id: 7,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img3.jpg",
    day: "28",
    month: "Aug-2021",
  },
  {
    id: 8,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img1.jpg",
    day: "28",
    month: "Aug-2021",
  },
  {
    id: 9,
    title: "Types of comfortable clothes ideas for women",
    category: "Inspiration",
    image: "images/post-img2.jpg",
    day: "28",
    month: "Aug-2021",
  },
];

const BlogPage = () => {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section
        className="site-banner jarallax min-height300 padding-large"
        style={{
          background:
            "url(https://firebasestorage.googleapis.com/v0/b/thegreatstore-123.firebasestorage.app/o/Images%2Fhero-image1.jpg?alt=media&token=1a324cc9-066f-4001-9920-1890aa87512c) no-repeat",
          backgroundPosition: "top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Blog page</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <a href="/">Home /</a>
                </span>
                <span className="item">Blog</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="latest-blog" className="post-grid padding-large">
        <div className="container">
          <div className="row d-flex flex-wrap">
            {currentPosts.map((post) => (
              <article key={post.id} className="col-md-4 post-item">
                <div className="image-holder zoom-effect">
                  <a href="single-post.html">
                    <img src={post.image} alt="post" className="post-image" />
                  </a>
                </div>
                <div className="post-content d-flex">
                  <div className="meta-date">
                    <div className="meta-day text-primary">{post.day}</div>
                    <div className="meta-month">{post.month}</div>
                  </div>
                  <div className="post-header">
                    <h3 className="post-title">
                      <a href="single-post.html">{post.title}</a>
                    </h3>
                    <a href="blog.html" className="blog-categories">
                      {post.category}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="navigation paging-navigation text-center padding-medium">
            <div className="pagination loop-pagination d-flex justify-content-center">
              <button
                className="pagination-arrow d-flex align-items-center"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="icon icon-arrow-left"></i>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-numbers ${
                    currentPage === index + 1 ? "current" : ""
                  }`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="pagination-arrow d-flex align-items-center"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="icon icon-arrow-right"></i>
              </button>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
