function NewsCard({ article }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            {article.author ? `By ${article.author}` : 'Unknown Author'} • 
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Read more →
          </a>
        </div>
      </div>
    )
  }
  
  export default NewsCard