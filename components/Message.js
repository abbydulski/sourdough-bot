export default function Message({ message, isFirst }) {
  const isBot = message.type === 'bot'
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} message-enter`}>
      <div
        className={`max-w-[85%] px-6 py-4 rounded-2xl shadow-lg border ${
          isBot
            ? 'bg-gradient-to-br from-white to-gray-50 text-gray-800 border-gray-200/50'
            : 'bg-gradient-to-br from-sourdough-600 via-sourdough-700 to-sourdough-800 text-white border-sourdough-500/30 shadow-sourdough-500/20'
        } backdrop-blur-sm`}
      >
        <div className="text-base leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  )
}
