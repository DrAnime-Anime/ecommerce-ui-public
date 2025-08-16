import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // adjust the path as needed

const LatestBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("id", { ascending: false }) // latest first
        .limit(3);

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogPosts(data);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="latest-blog" className="padding-large">
      <div className="container">
        <div className="section-header d-flex flex-wrap align-items-center justify-content-between">
          <h2 className="section-title">our Journal</h2>
          <div className="btn-wrap align-right">
            <a href="blog.html" className="d-flex align-items-center">
              Read All Articles <i className="icon icon-arrow-io"></i>
            </a>
          </div>
        </div>

        <div className="row d-flex flex-wrap">
          {blogPosts.map((post) => (
            <article key={post.id} className="col-md-4 post-item">
              <div className="image-holder zoom-effect">
                <a href={post.link}>
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="post-image"
                  />
                </a>
              </div>
              <div className="post-content d-flex">
                <div className="meta-date">
                  <div className="meta-day text-primary">{post.date}</div>
                  <div className="meta-month">{post.month}</div>
                </div>
                <div className="post-header">
                  <h3 className="post-title">
                    <a href={post.link}>{post.title}</a>
                  </h3>
                  <a href="blog.html" className="blog-categories">
                    {post.category}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
