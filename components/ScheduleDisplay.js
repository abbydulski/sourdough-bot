import { Clock, CheckCircle, Sparkles } from 'lucide-react'

export default function ScheduleDisplay({ schedule, theme = 'light' }) {
  if (!schedule || schedule.length === 0) return null

  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-stone-900 to-stone-800 border-stone-700' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200/50'} border-2 rounded-2xl p-6 my-6 shadow-xl dark:bg-gradient-to-br dark:from-stone-900 dark:to-stone-800 dark:border-stone-700`}>
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sparkles className={`${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} dark:text-amber-400`} size={28} />
        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-300' : 'bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent'} dark:text-amber-300`}>
          {theme === 'dark' ? 'Your Sourdough Timeline' : 'Your Sourdough Timeline'}
        </h3>
        <Sparkles className={`${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} dark:text-amber-400`} size={28} />
      </div>
      
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`group relative backdrop-blur-sm rounded-xl p-5 shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-stone-800/70 border border-stone-700 hover:bg-stone-800' : 'bg-white/80 border border-amber-100 hover:shadow-lg hover:bg-white/90'} dark:bg-stone-800/70 dark:border-stone-700 dark:hover:bg-stone-800`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 rounded-lg p-2 shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white' : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'} dark:from-amber-600 dark:to-orange-600`}>
                <Clock size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'} font-bold text-lg mb-1 dark:text-amber-300`}>
                  {item.time}
                </div>
                <div className={`${theme === 'dark' ? 'text-stone-200' : 'text-gray-700'} leading-relaxed dark:text-stone-200`}>
                  {item.task}
                </div>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle size={20} className={`${theme === 'dark' ? 'text-green-400' : 'text-green-500'} opacity-60 group-hover:opacity-100 transition-opacity dark:text-green-400`} />
              </div>
            </div>
            
            {/* Subtle connecting line */}
            {index < schedule.length - 1 && (
              <div className={`absolute left-8 bottom-0 w-0.5 h-4 ${theme === 'dark' ? 'bg-gradient-to-b from-stone-600 to-transparent' : 'bg-gradient-to-b from-amber-300 to-transparent'} dark:bg-gradient-to-b dark:from-stone-600 dark:to-transparent`}></div>
            )}
          </div>
        ))}
      </div>
      
      <div className={`mt-6 p-4 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-r from-stone-800 to-stone-700 border-stone-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50'} dark:bg-gradient-to-r dark:from-stone-800 dark:to-stone-700 dark:border-stone-700`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className={`${theme === 'dark' ? 'text-amber-300' : 'text-blue-800'} font-semibold mb-1 dark:text-amber-300`}>Flexibility Built In</p>
            <p className={`${theme === 'dark' ? 'text-stone-200' : 'text-blue-700'} text-sm leading-relaxed dark:text-stone-200`}>
              This timeline is flexible! Most steps can be adjusted by ±30 minutes. The key is watching your dough, not the clock.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
