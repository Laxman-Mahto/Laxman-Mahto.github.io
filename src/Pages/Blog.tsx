import React from 'react'
import SEO from '../Components/Ui/SEO'

const Blog: React.FC = () => {
  return (
    <div className="py-8">
      <SEO 
        title="Blog - Laxman Mahto"
        description="Thoughts and articles about web development, coding, and technology"
      />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Blog</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Blog posts coming soonnn</p>
    </div>
  )
}

export default Blog