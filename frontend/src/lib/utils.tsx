export function formatTime(dateString: string): string {
    const date = new Date(dateString);

    // Use toLocaleString to get a formatted time
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      
        hour12: false,  // Use 12-hour format (AM/PM)
    };

    const formattedTime = date.toLocaleString('en-US', options);
    return formattedTime;
}

