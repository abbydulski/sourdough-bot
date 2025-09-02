export default function Message({ message, isFirst, theme = 'light' }) {
  const isBot = message.type === 'bot'
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} message-enter`}>
      <div className={`flex items-start gap-3 max-w-[85%]`}>
        {isBot && (
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow ${theme === 'dark' ? 'bg-stone-800 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
            <span className="text-sm">🥖</span>
          </div>
        )}
        <div
          className={`px-6 py-4 rounded-2xl shadow-lg border ${
            isBot
              ? `${theme === 'dark' ? 'bg-gradient-to-br from-stone-800 to-stone-700 text-stone-100 border-stone-700' : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 border-gray-200/50'}`
              : 'bg-gradient-to-br from-sourdough-600 via-sourdough-700 to-sourdough-800 text-white border-sourdough-500/30 shadow-sourdough-500/20'
          } backdrop-blur-sm`}
        >
          <div className="text-base leading-relaxed prose-message">
            {message.content}
          </div>
        </div>
        {!isBot && (
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow ${theme === 'dark' ? 'bg-stone-800 text-sky-300' : 'bg-sky-100 text-sky-700'}`}>
            <span className="text-sm">🧑‍🍳</span>
          </div>
        )}
      </div>
    </div>
  )
}
