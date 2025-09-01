import { useState, useCallback } from 'react'
import { generateSourdoughSchedule } from '../utils/sourdoughScheduler'

const INITIAL_MESSAGE = {
  type: 'bot',
  content: (
    <div className="space-y-3">
      <p>Hello! I'm here to help you create the perfect sourdough baking schedule.</p>
      <div className="space-y-2">
        <p>Tell me about your availability over the next 48 hours:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>When do you wake up and go to sleep?</li>
          <li>Any meetings, work, or commitments?</li>
          <li>When would you prefer to do the actual baking?</li>
        </ul>
      </div>
      <p>Share as much detail as you'd like!</p>
    </div>
  )
}

export default function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const [conversationState, setConversationState] = useState('collecting_schedule')
  const [userScheduleInfo, setUserScheduleInfo] = useState({})

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const simulateTyping = useCallback((callback, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay + Math.random() * 1000)
  }, [])

  const processUserMessage = useCallback(async (userMessage) => {
    if (conversationState === 'collecting_schedule') {
      // Store user schedule info
      setUserScheduleInfo(prev => ({
        ...prev,
        rawSchedule: userMessage
      }))

      simulateTyping(() => {
        addMessage({
          type: 'bot',
          content: (
            <div className="space-y-3">
              <p>Thanks for sharing your schedule! I can see you have some flexibility there.</p>
              <p>Based on what you've told me, I'm thinking about the timing for your sourdough process.</p>
              <div className="space-y-2">
                <p>Would you like me to create a schedule that assumes:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your starter is currently active and ready to use?</li>
                  <li>You prefer a same-day bake or overnight cold fermentation?</li>
                  <li>Any specific time you'd absolutely love to have fresh bread ready?</li>
                </ul>
              </div>
              <p>Let me know your preferences and I'll create your personalized timeline!</p>
            </div>
          )
        })
        setConversationState('refining_preferences')
      })
    } else if (conversationState === 'refining_preferences') {
      // Generate the actual schedule
      simulateTyping(() => {
        const schedule = generateSourdoughSchedule(userScheduleInfo, userMessage)
        
        addMessage({
          type: 'bot',
          content: (
            <div className="space-y-4">
              <p>Perfect! Here's your personalized sourdough schedule:</p>
              <ScheduleDisplay schedule={schedule} />
              <p>This timeline gives you flexibility while ensuring perfect fermentation. Feel free to ask if you'd like me to adjust anything or if you have questions about any step!</p>
              <p className="text-sm italic">Happy baking! 🥖</p>
            </div>
          )
        })
        setConversationState('schedule_complete')
      }, 2000)
    } else if (conversationState === 'schedule_complete') {
      // Handle follow-up questions
      simulateTyping(() => {
        addMessage({
          type: 'bot',
          content: (
            <p>I'd be happy to help adjust your schedule or answer any questions about the process! What would you like to know more about?</p>
          )
        })
      })
    }
  }, [conversationState, userScheduleInfo, addMessage, simulateTyping])

  const sendMessage = useCallback((content) => {
    // Add user message
    addMessage({
      type: 'user',
      content
    })

    // Process the message
    processUserMessage(content)
  }, [addMessage, processUserMessage])

  return {
    messages,
    isTyping,
    sendMessage
  }
}