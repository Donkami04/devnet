export function useAverageUptime(intervals) {
    // Function to convert an interval to seconds
    function intervalToSeconds(interval) {
      const parts = interval.match(/\d+/g);
      const days = parseInt(parts[0], 10);
      const hours = parseInt(parts[1], 10);
      const minutes = parseInt(parts[2], 10);
      const seconds = parseInt(parts[3], 10);
  
      return (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    }
  
    // Convert intervals to seconds and sum them
    const totalSeconds = intervals.reduce((total, interval) => total + intervalToSeconds(interval), 0);
  
    // Calculate the average in seconds
    const averageTotalSeconds = totalSeconds / intervals.length;
  
    // Convert the average seconds to days, hours, minutes, and seconds
    const totalDays = Math.floor(averageTotalSeconds / (24 * 60 * 60));
    const secondsRemaining = averageTotalSeconds % (24 * 60 * 60);
    const totalHours = Math.floor(secondsRemaining / (60 * 60));
    const totalMinutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
    const totalSecondsFinal = secondsRemaining % 60;
    const totalSecondsFinalRounded = totalSecondsFinal.toFixed(0);
  
    // Format and return the average result
    const averageResult = `${totalDays}d ${totalHours}h ${totalMinutes}m ${totalSecondsFinalRounded}s`;
  
    return averageResult;
  }
