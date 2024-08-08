import React, { useState } from 'react';
import { FiSearch, FiUser, FiChevronDown, FiChevronRight, FiStar, FiMenu } from 'react-icons/fi';

const TopBar = ({ activePage, toggleSidebar }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
      <button onClick={toggleSidebar} className="mr-4 lg:hidden">
        <FiMenu size={24} />
      </button>
      <h1 className="text-2xl font-bold mr-4">Opn Docs</h1>
      <span className="text-blue-200 hidden sm:inline">{activePage}</span>
    </div>
    <div className="flex items-center">
      <div className="relative mr-4 hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-2 py-1 bg-blue-500 text-white placeholder-blue-300 rounded"
        />
        <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-300" />
      </div>
      <button className="flex items-center bg-purple-500 px-3 py-1 rounded hover:bg-purple-600 transition duration-300">
        <FiUser className="mr-2" /> Login
      </button>
    </div>
  </div>
);

const SidebarItem = ({ item, children, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`ml-${depth * 4}`}>
      <div
        className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children && (
          isOpen ? <FiChevronDown className="text-blue-600" /> : <FiChevronRight className="text-blue-600" />
        )}
        <span className={`ml-2 ${depth === 0 ? 'font-semibold' : ''} text-gray-800`}>{item}</span>
      </div>
      {isOpen && children && <div>{children}</div>}
    </div>
  );
};

const Sidebar = ({ activePage, isOpen }) => {
  const sidebarData = {
    Documents: {
      Guides: {
        'Getting Started': ['Introduction', 'Setup', 'First Steps'],
        'Authentication': ['OAuth', 'API Keys', 'JWT'],
        'Webhooks': ['Configuration', 'Events', 'Security']
      },
      'Payment Methods': {
        'Credit Card': ['Visa', 'Mastercard', 'Amex'],
        'Bank Transfer': ['ACH', 'SEPA', 'Wire'],
        'E-Wallets': ['PayPal', 'Apple Pay', 'Google Pay']
      },
      'API References': {
        'Payments API': ['Create', 'Retrieve', 'Update'],
        'Customers API': ['Create', 'Retrieve', 'Update'],
        'Disputes API': ['Create', 'Retrieve', 'Resolve']
      },
      'Plugins': {
        'WooCommerce': ['Installation', 'Configuration', 'Troubleshooting'],
        'Magento': ['Installation', 'Configuration', 'Troubleshooting'],
        'Shopify': ['Installation', 'Configuration', 'Troubleshooting']
      }
    },
    Articles: {
      Billing: ['Invoicing', 'Pricing', 'Subscriptions'],
      Payments: ['Processing', 'Refunds', 'Chargebacks'],
      Security: ['Data Protection', 'Fraud Prevention', 'Compliance']
    },
    FAQs: {
      Billing: ['Billing Cycle', 'Payment Terms', 'Taxes'],
      Payments: ['Settlement', 'Currencies', 'Fees'],
      Security: ['Account Security', 'PCI Compliance', 'Encryption']
    },
    Changelog: {
      2024: {
        December: ['Feature A', 'Bug Fix B'],
        November: ['Update C', 'Enhancement D']
      },
      2023: {
        December: ['New API v2', 'Performance Improvements'],
        November: ['Security Patch', 'UI Refresh']
      }
    }
  };

  const renderSidebarItems = (items, depth = 0) => {
    return Object.entries(items).map(([key, value]) => (
      <SidebarItem key={key} item={key} depth={depth}>
        {typeof value === 'object' ? renderSidebarItems(value, depth + 1) : null}
      </SidebarItem>
    ));
  };

  return (
    <div className={`w-64 bg-gray-100 p-4 h-full overflow-y-auto transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      {renderSidebarItems(sidebarData[activePage] || {})}
    </div>
  );
};

const MainContent = ({ activePage }) => {
  const [rating, setRating] = useState(0);
  const [overallRating, setOverallRating] = useState(4.5);
  const [comments, setComments] = useState([
    { id: 1, text: "Great documentation!", date: new Date('2024-03-01'), isOpen: true },
    { id: 2, text: "Could use more examples.", date: new Date('2024-03-02'), isOpen: true }
  ]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleRating = (value) => setRating(value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment, date: new Date(), isOpen: true }]);
      setNewComment('');
    }
  };

  const toggleComment = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, isOpen: !comment.isOpen } : comment
    ));
  };

  const sortedComments = [...comments].sort((a, b) => 
    sortOrder === 'desc' ? b.date - a.date : a.date - b.date
  );

  return (
    <div className="p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{activePage}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {activePage === 'Documents' && (
            <select className="p-2 border rounded bg-white text-gray-800">
              <option>API v1</option>
              <option>API v2</option>
            </select>
          )}
          {(activePage === 'Documents' || activePage === 'Articles' || activePage === 'FAQs' || activePage === 'Changelog') && (
            <select className="p-2 border rounded bg-white text-gray-800">
              <option>English</option>
              <option>日本語</option>
              <option>ไทย</option>
            </select>
          )}
        </div>
        <div className="prose max-w-none">
          <p>Content for {activePage} goes here...</p>
        </div>
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold text-gray-800 mb-2">Rate this content:</p>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(star)} className="mr-1">
              <FiStar className={`w-6 h-6 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
            </button>
          ))}
          <span className="ml-4 text-gray-600">Overall Rating: {overallRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your comment..."
          />
          <div className="flex items-center">
            <input type="text" placeholder="Enter CAPTCHA" className="p-2 border rounded mr-2" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Post Comment</button>
          </div>
        </form>
        <div>
          <button 
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="mb-2 text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
          </button>
          {sortedComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 py-2">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleComment(comment.id)}>
                <p className="font-semibold text-gray-800">
                  {comment.isOpen ? <FiChevronDown className="inline" /> : <FiChevronRight className="inline" />} {comment.date.toLocaleString()}
                </p>
              </div>
              {comment.isOpen && <p className="mt-2 text-gray-700">{comment.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OpnDocsUI = () => {
  const [activePage, setActivePage] = useState('Documents');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainMenuItems = ['Documents', 'Articles', 'FAQs', 'API Playground', 'Changelog'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <TopBar activePage={activePage} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden">
        <div className="lg:block">
          {activePage !== 'API Playground' && <Sidebar activePage={activePage} isOpen={isSidebarOpen} />}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="bg-gray-200 p-4">
            {mainMenuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className={`mr-2 px-3 py-1 rounded ${
                  activePage === item ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'
                } transition duration-300`}
              >
                {item}
              </button>
            ))}
          </div>
          <MainContent activePage={activePage} />
        </div>
      </div>
    </div>
  );
};

export default OpnDocsUI;