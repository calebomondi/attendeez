//---

function isWithinTimeLimit(targetTime: string): boolean {
    // Parse the target time
    const [hours, minutes, seconds] = targetTime.split(':').map(Number);
    const target = new Date();
    target.setHours(hours, minutes, seconds);

    // Get current time
    const now = new Date();

    // Calculate time difference in milliseconds
    const diff = Math.abs(now.getTime() - target.getTime());
    
    // Check if difference is less than or equal to 1 minute (60000 milliseconds)
    return diff <= 60000 * 15;
}

export default isWithinTimeLimit