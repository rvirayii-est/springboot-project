import React from 'react';
import { Star, Mail, Phone, MessageCircle } from 'lucide-react';
import { Contact } from '../utils/types';

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
  onToggleStar: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick, onToggleStar }) => {
  const getSentimentColor = (sentiment: Contact['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'needs-attention': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  const formatLastContact = (date?: Date) => {
    if (!date) return 'No recent contact';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sage-600/10 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-sage-600 to-sage-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-sage-600 dark:group-hover:text-sage-300 transition-colors">
              {contact.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.relationship}</p>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(contact.id);
          }}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            contact.starred 
              ? 'text-amber-500 hover:text-amber-400' 
              : 'text-gray-400 dark:text-gray-500 hover:text-amber-500'
          }`}
        >
          <Star className={`w-5 h-5 ${contact.starred ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Contact Info */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
        {contact.email && (
          <div className="flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span className="truncate max-w-32">{contact.email}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {contact.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-sage-100 text-sage-700 dark:bg-sage-600/20 dark:text-sage-300 text-xs rounded-full border border-sage-200 dark:border-sage-600/30"
          >
            {tag}
          </span>
        ))}
        {contact.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400 text-xs rounded-full">
            +{contact.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getSentimentColor(contact.sentiment).replace('text-', 'bg-').replace('/20', '/60')}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Last contact: {formatLastContact(contact.lastContact)}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-500">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{contact.notes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;