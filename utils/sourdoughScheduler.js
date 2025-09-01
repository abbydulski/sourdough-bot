export function generateSourdoughSchedule(userScheduleInfo, preferences) {
    // Parse user schedule and preferences to find optimal timing
    const scheduleConflicts = parseUserAvailability(userScheduleInfo.rawSchedule)
    const preferredBakeTime = extractPreferredBakeTime(preferences)
    
    // Try to find a good starting time
    const optimalStartTime = findOptimalStartTime(scheduleConflicts, preferredBakeTime)
    
    if (!optimalStartTime) {
      // Return a message if no good timing is found
      return [{
        time: "Schedule Conflict",
        task: "I've looked at your schedule and it's quite packed! Your sourdough process needs about 28-35 hours total with key active periods. Consider starting when you have: 1) 30 minutes free to feed starter, 2) 1 hour free 5-10 hours later for mixing, 3) 2.5 hours with 30-min check-ins for stretch & folds, and 4) time to bake 12-20 hours after refrigerating. Maybe try a different 48-hour window?"
      }]
    }
  
    // Your specific sourdough technique schedule
    const schedule = [
      {
        offset: 0,
        task: "Take starter out of fridge and feed it (flour + water) 🥄",
        category: "starter",
        flexibility: "±30 min"
      },
      {
        offset: 7.5, // Middle of 5-10 hour range
        task: "Check starter - should be doubled! Begin autolyse (flour + water, no starter yet) 🌾",
        category: "mixing",
        flexibility: "This can be 5-10 hours after feeding, whenever starter doubles"
      },
      {
        offset: 8,
        task: "Add starter and salt to autolyse, mix to form dough 🍞",
        category: "mixing",
        flexibility: "±15 min"
      },
      {
        offset: 9,
        task: "First stretch and fold session (all 4 sides) 💪",
        category: "bulk_fermentation",
        flexibility: "±15 min"
      },
      {
        offset: 9.5,
        task: "Second stretch and fold session ↗️",
        category: "bulk_fermentation",
        flexibility: "±15 min"
      },
      {
        offset: 10,
        task: "Third stretch and fold session ↖️",
        category: "bulk_fermentation",
        flexibility: "±15 min"
      },
      {
        offset: 10.5,
        task: "Fourth stretch and fold session ↘️",
        category: "bulk_fermentation",
        flexibility: "±15 min"
      },
      {
        offset: 11,
        task: "Fifth stretch and fold session (final one!) ↙️",
        category: "bulk_fermentation",
        flexibility: "±15 min - This could be your last fold if dough feels strong"
      },
      {
        offset: 14, // 3 hours later, middle of "few hours" range
        task: "Shape the dough and place in banneton or bowl with towel 🏺",
        category: "shaping",
        flexibility: "This can be 2-4 hours after your last fold, when dough has risen nicely"
      },
      {
        offset: 14.25,
        task: "Into the refrigerator for cold fermentation! ❄️",
        category: "cold_proof",
        flexibility: "±30 min"
      },
      {
        offset: 30, // 16 hours later (middle of 12-20 hour range)
        task: "Preheat oven and Dutch oven to 475°F (take dough out 30 min before) 🔥",
        category: "baking",
        flexibility: "Anywhere from 12-20 hours after refrigerating works great!"
      },
      {
        offset: 30.5,
        task: "Score the dough and bake! 20 min covered, 20-25 min uncovered 🔪",
        category: "baking",
        flexibility: "±15 min"
      },
      {
        offset: 31.5,
        task: "Fresh sourdough done! Cool for at least 1 hour before slicing 🍞✨",
        category: "finished",
        flexibility: "The hardest part - waiting to slice!"
      }
    ]
  
    // Check if this schedule works with user's availability
    const hasConflicts = checkScheduleConflicts(schedule, optimalStartTime, scheduleConflicts)
    if (hasConflicts.length > 0) {
      return [{
        time: "Schedule Adjustment Needed",
        task: `Your schedule conflicts with these key steps: ${hasConflicts.join(', ')}. The most flexible parts are the rising times - we could adjust when you start or when you bake. Would you like me to try a different timing?`
      }]
    }
  
    // Convert to readable format with flexibility notes
    return schedule.map(step => ({
      time: formatTime(new Date(optimalStartTime.getTime() + (step.offset * 60 * 60 * 1000))),
      task: step.task + (step.flexibility ? ` (${step.flexibility})` : '')
    }))
  }
  
  function parseUserAvailability(scheduleText) {
    // Simple parsing - look for time commitments, meetings, work, sleep
    const conflicts = []
    const lowerText = scheduleText.toLowerCase()
    
    // Extract basic time patterns and commitments
    // This is a simplified version - you could make this much more sophisticated
    if (lowerText.includes('work') || lowerText.includes('meeting') || lowerText.includes('busy')) {
      conflicts.push('work_commitments')
    }
    if (lowerText.includes('sleep') || lowerText.includes('bed')) {
      conflicts.push('sleep_schedule') 
    }
    
    return conflicts
  }
  
  function extractPreferredBakeTime(preferences) {
    const lowerPrefs = preferences.toLowerCase()
    
    if (lowerPrefs.includes('morning')) return 'morning'
    if (lowerPrefs.includes('afternoon')) return 'afternoon'  
    if (lowerPrefs.includes('evening')) return 'evening'
    if (lowerPrefs.includes('weekend')) return 'weekend'
    
    return null
  }
  
  function findOptimalStartTime(conflicts, preferredBakeTime) {
    const now = new Date()
    
    // For now, start in 2 hours - you could make this much smarter
    // by actually parsing specific times from user input
    const startTime = new Date(now.getTime() + (2 * 60 * 60 * 1000))
    
    return startTime
  }
  
  function checkScheduleConflicts(schedule, startTime, conflicts) {
    // Simple conflict checking - this could be much more sophisticated
    const criticalSteps = schedule.filter(step => 
      step.category === 'mixing' || 
      step.category === 'bulk_fermentation' ||
      step.category === 'baking'
    )
    
    // For now, assume no conflicts - but you could implement real conflict detection
    return []
  }
  
  function formatTime(date) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const isToday = date.toDateString() === today.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()
    
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
    
    if (isToday) {
      return `Today ${timeString}`
    } else if (isTomorrow) {
      return `Tomorrow ${timeString}`
    } else {
      return `${date.toLocaleDateString()} ${timeString}`
    }
  }
  