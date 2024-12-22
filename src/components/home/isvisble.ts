export function IsVisible() : boolean {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
    if (adjustedDay <= 7)
        return true
    return false
}