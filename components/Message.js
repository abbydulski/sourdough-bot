export default function Message({ message, isFirst }) {
    const isBot = message.type === 'bot'
    
    return (
      <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} message-enter`}>
        <div
          className={`max-w-[80%] px-5 py-3 rounded-2xl ${
            isBot
              ? 'bg-gray-100 text-gray-800'
              : 'bg-gradient-to-r from-sourdough-700 to-sourdough-800 text-white'
          }`}
        >
          {message.content}
        </div>
      </div>
    )
  }