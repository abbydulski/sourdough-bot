import { Clock, CheckCircle, Sparkles } from 'lucide-react'

export default function ScheduleDisplay({ schedule }) {
  if (!schedule || schedule.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200/50 rounded-2xl p-6 my-6 shadow-xl">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sparkles className="text-amber-600" size={28} />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
          Your Sourdough Timeline
        </h3>
        <Sparkles className="text-amber-600" size={28} />
      </div>
      
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-amber-100 hover:shadow-lg hover:bg-white/90 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg p-2 shadow-md">
                <Clock size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-amber-800 font-bold text-lg mb-1">
                  {item.time}
                </div>
                <div className="text-gray-700 leading-relaxed">
                  {item.task}
                </div>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle size={20} className="text-green-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            
            {/* Subtle connecting line */}
            {index < schedule.length - 1 && (
              <div className="absolute left-8 bottom-0 w-0.5 h-4 bg-gradient-to-b from-amber-300 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-blue-800 font-semibold mb-1">Flexibility Built In</p>
            <p className="text-blue-700 text-sm leading-relaxed">
              This timeline is flexible! Most steps can be adjusted by ±30 minutes. The key is watching your dough, not the clock.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
