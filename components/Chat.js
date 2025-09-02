import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Sun, Moon } from 'lucide-react'
import Message from './Message'
import ScheduleDisplay from './ScheduleDisplay'
import useChat from '../hooks/useChat'

export default function Chat({ theme = 'light', setTheme }) {
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
    <div className={`w-full max-w-6xl h-[95vh] backdrop-blur-sm rounded-3xl shadow-2xl border flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-stone-900/90 border-stone-800' : 'bg-white/95 border-white/20'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`text-white p-8 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800' : 'bg-gradient-to-br from-sourdough-800 via-sourdough-700 to-sourdough-600'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-y-1"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1" />
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🥖</span>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Sourdough Schedule Bot
              </h1>
              <span className="text-2xl">🥖</span>
            </div>
            <div className="flex-1 flex justify-end">
              {setTheme && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium shadow-lg transition-all duration-200 ${theme === 'dark' ? 'bg-stone-800/80 hover:bg-stone-700 text-stone-100 border border-stone-700' : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'}`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              )}
            </div>
          </div>
          <p className={`text-xl font-medium ${theme === 'dark' ? 'text-stone-200' : 'text-sourdough-100'}`}>Let's craft your perfect baking timeline ✨</p>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-8 space-y-6 ${theme === 'dark' ? 'bg-gradient-to-br from-stone-950/60 to-stone-900/60' : 'bg-gradient-to-br from-slate-50/50 to-stone-50/50'}`}>
        {messages.map((message, index) => (
          <Message 
            key={index} 
            message={message} 
            isFirst={index === 0}
            theme={theme}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-stone-800 to-stone-700 border-stone-700' : 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200/50'} rounded-2xl px-6 py-4 shadow-lg border`}>
              <div className={`${theme === 'dark' ? 'text-stone-200' : 'text-gray-600'} font-medium`}>
                <span className="typing-dots">Crafting your schedule</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-8 border-t ${theme === 'dark' ? 'bg-gradient-to-t from-stone-900 to-stone-800/60 border-stone-700' : 'bg-gradient-to-t from-white to-gray-50/50 border-gray-200/50'}`}>
        <form onSubmit={handleSubmit} className="relative">
          <div className={`relative rounded-2xl shadow-lg border-2 transition-all duration-300 ${theme === 'dark' ? 'bg-stone-800/80 border-stone-700 focus-within:border-sourdough-500 focus-within:shadow-xl' : 'bg-white border-gray-200 focus-within:border-sourdough-500 focus-within:shadow-xl'}`}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your schedule in detail... When do you wake up? Any meetings or commitments? When would you love fresh bread ready? The more detail, the better I can help! 🍞"
              className={`w-full px-6 py-4 pr-16 text-lg resize-none border-none rounded-2xl focus:outline-none min-h-[60px] max-h-[120px] ${theme === 'dark' ? 'bg-transparent text-stone-100 placeholder-stone-400' : 'placeholder-gray-400'}`}
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
            <p className={`text-sm ${theme === 'dark' ? 'text-stone-300' : 'text-gray-500'}`}>
              💡 Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-gray-400'}`}>
              {inputValue.length}/1000
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
