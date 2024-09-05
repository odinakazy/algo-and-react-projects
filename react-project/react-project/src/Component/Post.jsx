/* eslint-disable react/prop-types */
function Post({ post }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-3 text-blue-400">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}

export default Post;
