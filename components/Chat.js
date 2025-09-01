import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import Message from './Message'
import ScheduleDisplay from './ScheduleDisplay'
import useChat from '../hooks/useChat'

export default function Chat() {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const { messages, isTyping, sendMessage } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    sendMessage(inputValue)
    setInputValue('')
  }

  return (
    <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sourdough-700 to-sourdough-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">🍞 Sourdough Schedule Bot</h1>
        <p className="text-sourdough-100 text-lg">Let's plan your perfect baking timeline!</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            message={message} 
            isFirst={index === 0}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
              <div className="text-gray-600">
                <span className="typing-dots">Thinking</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tell me about your schedule..."
            className="flex-1 px-4 py-3 border-2 border-sourdough-300 rounded-full focus:outline-none focus:border-sourdough-600 transition-colors"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-sourdough-700 to-sourdough-800 text-white p-3 rounded-full hover:from-sourdough-800 hover:to-sourdough-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}