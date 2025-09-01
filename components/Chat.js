import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import Message from './Message'
import ScheduleDisplay from './ScheduleDisplay'
import useChat from '../hooks/useChat'

export default function Chat() {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const { messages, isTyping, sendMessage } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    sendMessage(inputValue)
    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full max-w-6xl h-[95vh] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-sourdough-800 via-sourdough-700 to-sourdough-600 text-white p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-y-1"></div>
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="text-yellow-300" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Sourdough Schedule Bot
            </h1>
            <Sparkles className="text-yellow-300" size={32} />
          </div>
          <p className="text-sourdough-100 text-xl font-medium">Let's craft your perfect baking timeline ✨</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-br from-slate-50/50 to-stone-50/50">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            message={message} 
            isFirst={index === 0}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl px-6 py-4 shadow-lg border border-gray-200/50">
              <div className="text-gray-600 font-medium">
                <span className="typing-dots">Crafting your schedule</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-8 bg-gradient-to-t from-white to-gray-50/50 border-t border-gray-200/50">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 focus-within:border-sourdough-500 focus-within:shadow-xl transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your schedule in detail... When do you wake up? Any meetings or commitments? When would you love fresh bread ready? The more detail, the better I can help! 🍞"
              className="w-full px-6 py-4 pr-16 text-lg resize-none border-none rounded-2xl focus:outline-none placeholder-gray-400 min-h-[60px] max-h-[120px]"
              maxLength={1000}
              rows={1}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 bottom-3 bg-gradient-to-br from-sourdough-600 to-sourdough-700 text-white p-3 rounded-xl hover:from-sourdough-700 hover:to-sourdough-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Send size={22} className="transform rotate-45" />
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-3 px-2">
            <p className="text-sm text-gray-500">
              💡 Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
            <p className="text-sm text-gray-400">
              {inputValue.length}/1000
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
