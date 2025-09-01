import { Clock, CheckCircle } from 'lucide-react'

export default function ScheduleDisplay({ schedule }) {
  if (!schedule || schedule.length === 0) return null

  return (
    <div className="bg-sourdough-50 border-2 border-sourdough-300 rounded-xl p-5 my-4">
      <h3 className="text-xl font-bold text-sourdough-800 mb-4 flex items-center gap-2">
        <Clock size={24} />
        Your Sourdough Schedule
      </h3>
      
      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm border border-sourdough-200"
          >
            <div className="flex items-center gap-3">
              <div className="text-sourdough-700 font-bold min-w-[120px]">
                {item.time}
              </div>
              <div className="text-gray-700 flex-1">
                {item.task}
              </div>
            </div>
            <CheckCircle size={16} className="text-sourdough-500" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-sourdough-100 rounded-lg">
        <p className="text-sourdough-800 text-sm font-medium">
          💡 This timeline is flexible! Feel free to adjust by ±30 minutes for most steps.
        </p>
      </div>
    </div>
  )
}